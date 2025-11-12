"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAccount } from "wagmi";

import { cn } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldilend } from "../../../providers";
import { contracts } from "../../../utils/addressi";
import { LendNotificationMobile } from "../../goldilendMobile";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Slider from "@/components/ui/slider";

type InputValuesType = {
  [key: number]: string;
};

type MockLoan = {
  loanId: number;
  borrowedAmount: number; // principal + interest
  interest: number;
  endDate: number; // unix seconds
  repaid?: boolean;
  liquidated?: boolean;
  collateralNFTs: string[]; // addresses
  collateralValuation: number; // in HONEY
  principal: number; // the "loan amount" requested
  status?: "EXPIRING_SOON" | "ACTIVE" | "EXPIRED" | "GRACE_PERIOD";
  beraId: number; // to map image from mock borrow tab
};

const GRACE_PERIOD_SECONDS = 24 * 60 * 60; // 24 hours in seconds
const COUNTDOWN_REGEX = /\d+d \d+h/;
const isTimerString = (value: string) => COUNTDOWN_REGEX.test(value);

export const RepayTabMobile = () => {
  const [inputValues, setInputValues] = useState<InputValuesType>({});
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [selectedStatuses, setSelectedStatuses] = useState<Record<"ACTIVE" | "EXPIRING_SOON" | "EXPIRED" | "GRACE_PERIOD", boolean>>({
    ACTIVE: true,
    EXPIRING_SOON: true,
    EXPIRED: true,
    GRACE_PERIOD: true,
  });
  const [activeRepayLoanId, setActiveRepayLoanId] = useState<number | null>(null);
  const [activeRepayMode, setActiveRepayMode] = useState<"partial" | null>(null);
  const [activeExtendLoanId, setActiveExtendLoanId] = useState<number | null>(null);
  const [extendDays, setExtendDays] = useState<number>(7);
  const [extendAmountInput, setExtendAmountInput] = useState<string>("");
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

  const {
    txConfirming,
    notification,
  } = useGoldilend();

  const { isConnected } = useAccount();

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${month}-${day}-${year}`;
  };

  const formatNum = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  // Mock loans for repay page summary and list
  const nowSec = Math.floor(Date.now() / 1000);
  const mockImgById: Record<number, string> = useMemo(() => ({
    75: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/68b8c1674bf468085f015ed07a3bd6/5968b8c1674bf468085f015ed07a3bd6.jpeg?w=1000",
    90: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/8fac1fd9e0d9b799cf8195eb3c93cc/5f8fac1fd9e0d9b799cf8195eb3c93cc.jpeg?w=1000",
    68: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
  }), []);

  const MAX_LTV = 0.8;
  const MIN_HEALTH_FACTOR_FOR_EXTEND = 1.2;

  const calculateHealthFactor = (collateralValue: number, borrowedAmount: number): number => {
    if (borrowedAmount === 0) return Infinity;
    return (collateralValue * MAX_LTV) / borrowedAmount;
  };

  const mockLoans: MockLoan[] = useMemo(() => {
    const soon = nowSec + 30 * 60;
    const later = nowSec + 10 * 24 * 60 * 60;
    const gracePeriod = nowSec - 12 * 60 * 60;
    const fullyExpired = nowSec - 2 * 24 * 60 * 60;
    return [
      {
        loanId: 1,
        principal: 3333,
        interest: 33,
        borrowedAmount: 3333 + 33,
        endDate: soon,
        repaid: false,
        liquidated: false,
        collateralNFTs: [contracts.bondbear.address],
        collateralValuation: 10000,
        status: "EXPIRING_SOON",
        beraId: 75,
      },
      {
        loanId: 2,
        principal: 4444,
        interest: 44,
        borrowedAmount: 4444 + 44,
        endDate: later,
        repaid: false,
        liquidated: false,
        collateralNFTs: [contracts.bandbear.address],
        collateralValuation: 6000,
        status: "ACTIVE",
        beraId: 68,
      },
      {
        loanId: 3,
        principal: 5555,
        interest: 55,
        borrowedAmount: 5555 + 55,
        endDate: gracePeriod,
        repaid: false,
        liquidated: false,
        collateralNFTs: [contracts.bondbear.address],
        collateralValuation: 12000,
        status: "EXPIRED",
        beraId: 90,
      },
      {
        loanId: 4,
        principal: 6666,
        interest: 66,
        borrowedAmount: 6666 + 66,
        endDate: fullyExpired,
        repaid: false,
        liquidated: false,
        collateralNFTs: [contracts.bondbear.address],
        collateralValuation: 8000,
        status: "EXPIRED",
        beraId: 75,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeLoans = isConnected ? mockLoans.filter((l) => l.endDate > nowSec && !l.repaid && !l.liquidated) : [];
  const activeLoansCount = activeLoans.length;
  const totalReceived = activeLoans.reduce((acc, l) => acc + l.borrowedAmount, 0);
  const collateralValue = activeLoans.reduce((acc, l) => acc + l.collateralValuation, 0);
  const totalToRepay = activeLoans.reduce((acc, l) => acc + l.borrowedAmount, 0);

  const nextLoan = activeLoans
    .slice()
    .sort((a, b) => a.endDate - b.endDate)[0];
  const nextPaymentHoney = nextLoan ? nextLoan.borrowedAmount : 0;

  const [countdown, setCountdown] = useState<string>("-");
  useEffect(() => {
    const update = () => {
      if (!nextLoan) {
        setCountdown("-");
        return;
      }
      const now = Math.floor(Date.now() / 1000);
      const diff = Math.max(0, nextLoan.endDate - now);
      const days = Math.floor(diff / (24 * 3600));
      const hours = Math.floor((diff % (24 * 3600)) / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;
      const pad = (n: number) => n.toString().padStart(2, "0");
      const dayLabel = pad(days);
      setCountdown(`${dayLabel}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`);
    };
    const id = setInterval(update, 1000);
    update();
    return () => clearInterval(id);
  }, [nextLoan]);

  const isLoanInGracePeriod = (loan: MockLoan): boolean => {
    const now = Math.floor(Date.now() / 1000);
    const gracePeriodEnd = loan.endDate + GRACE_PERIOD_SECONDS;
    return loan.endDate <= now && now < gracePeriodEnd && !loan.repaid && !loan.liquidated;
  };

  const isLoanFullyExpired = (loan: MockLoan): boolean => {
    const now = Math.floor(Date.now() / 1000);
    const gracePeriodEnd = loan.endDate + GRACE_PERIOD_SECONDS;
    return now >= gracePeriodEnd && !loan.repaid && !loan.liquidated;
  };

  const [loanCountdowns, setLoanCountdowns] = useState<Record<number, string>>({});
  const [gracePeriodCountdowns, setGracePeriodCountdowns] = useState<Record<number, string>>({});
  useEffect(() => {
    const compute = () => {
      const now = Math.floor(Date.now() / 1000);
      const pad = (n: number) => n.toString().padStart(2, "0");
      const countdownMap: Record<number, string> = {};
      const graceMap: Record<number, string> = {};
      
      mockLoans.forEach((l) => {
        if (isLoanInGracePeriod(l)) {
          const gracePeriodEnd = l.endDate + GRACE_PERIOD_SECONDS;
          const graceRemaining = Math.max(0, gracePeriodEnd - now);
          const days = Math.floor(graceRemaining / (24 * 3600));
          const hours = Math.floor((graceRemaining % (24 * 3600)) / 3600);
          const mins = Math.floor((graceRemaining % 3600) / 60);
          const secs = graceRemaining % 60;
          const dayLabel = pad(days);
          graceMap[l.loanId] = `${dayLabel}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
          countdownMap[l.loanId] = "Expired - Grace Period";
        } else if (l.endDate <= now) {
          countdownMap[l.loanId] = "Expired";
        } else {
          const diff = l.endDate - now;
          const days = Math.floor(diff / (24 * 3600));
          const hours = Math.floor((diff % (24 * 3600)) / 3600);
          const mins = Math.floor((diff % 3600) / 60);
          const secs = diff % 60;
          const dayLabel = pad(days);
          countdownMap[l.loanId] = `${dayLabel}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
        }
      });
      setLoanCountdowns(countdownMap);
      setGracePeriodCountdowns(graceMap);
    };
    const id = setInterval(compute, 1000);
    compute();
    return () => clearInterval(id);
  }, [mockLoans]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveExtendLoanId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeExtendLoanId]);

  useEffect(() => {
    if (!openTooltip) return;
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target && !target.closest('[aria-label*="info"]')) {
        setOpenTooltip(null);
      }
    };
    const events: Array<keyof DocumentEventMap> = ["mousedown", "touchstart"];
    events.forEach((eventName) => {
      document.addEventListener(eventName, handleClickOutside);
    });
    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, handleClickOutside);
      });
    };
  }, [openTooltip]);

  const activeExtendLoan = useMemo(() => {
    return mockLoans.find((l) => l.loanId === activeExtendLoanId) || null;
  }, [mockLoans, activeExtendLoanId]);

  const filteredLoans = useMemo(() => {
    if (!isConnected) return [];
    return mockLoans.filter((l) => {
      const actualStatus = isLoanInGracePeriod(l) ? "GRACE_PERIOD" : (l.status || "ACTIVE");
      return selectedStatuses[actualStatus];
    });
  }, [mockLoans, selectedStatuses, isConnected]);

  const handleInputChange = (loanId: number, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [loanId]: value,
    }));
  };

  const handleMaxClick = (loanId: number, amt: number) => {
    setInputValues((prev) => ({
      ...prev,
      [loanId]: amt.toString(),
    }));
  };

  const handleButtonClick = (
    loanId: number
  ) => {
    setActiveRepayLoanId(loanId);
    setActiveRepayMode(null);
    setInputValues((prev) => ({
      ...prev,
      [loanId]: "",
    }));
  };

  const handleRepayBack = () => {
    setActiveRepayLoanId(null);
    setActiveRepayMode(null);
  };

  const handleRepayPartial = () => {
    setActiveRepayMode("partial");
  };

  const handleRepayFull = async (loanId?: number) => {
    const targetLoanId = loanId ?? activeRepayLoanId;
    const loan = mockLoans.find((l) => l.loanId === targetLoanId);
    if (loan) {
      setActiveRepayLoanId(null);
      setActiveRepayMode(null);
    }
  };

  const handleRepayConfirm = () => {
    const loan = mockLoans.find((l) => l.loanId === activeRepayLoanId);
    const amount = parseFloat(inputValues[activeRepayLoanId || 0] || "0");
    if (loan && amount > 0) {
      setActiveRepayLoanId(null);
      setActiveRepayMode(null);
    }
  };


  const cardClasses =
    "rounded-3xl border border-amber-900/40 bg-black/85 p-3 sm:p-4 text-white shadow-2xl";

  if (txConfirming) {
    return (
      <div className={cardClasses}>
        <img className="mx-auto w-full max-w-xs" src="/images/bg-transaction-mobile.png" alt="tx" />
      </div>
    );
  }

  if (notification.toggle) {
    return (
      <div className={cardClasses}>
        <LendNotificationMobile />
      </div>
    );
  }

  return (
            <div className="space-y-4">
      {/* Summary Section */}
      <div className={cardClasses}>
        <div className="flex flex-col items-center gap-2 mb-4">
          <h2 className="font-amaticbold text-center text-3xl font-bold text-white">
            Summary
          </h2>
          <div className="h-0.5 w-[140px] bg-stone-800 mx-auto" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Active Loans</div>
            <span className="mt-1 inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">{activeLoansCount}</span>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Total Received</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
              <span>{formatNum(totalReceived)}</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Value</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
              <span>{formatNum(collateralValue)}</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Total to Repay</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
              <span>{formatNum(totalToRepay)}</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Next Payment</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
              <span>{formatNum(nextPaymentHoney)}</span>
                </div>
              </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Next Maturity</div>
            {(() => {
              const label = countdown;
              const isTimer = isTimerString(label);
              return (
                <span
                  className={cn(
                    "mt-1 inline-flex items-center justify-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-md leading-none whitespace-nowrap mx-auto",
                    isTimer ? "tabular-nums min-w-[12ch]" : ""
                  )}
                >
                  {label}
                </span>
              );
            })()}
          </div>
            </div>
          </div>

      {/* My Loans Section */}
      <div className={cardClasses}>
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="flex items-center gap-2 justify-center">
            <h2 className="font-amaticbold text-3xl font-bold text-white">My Loans</h2>
            <div className="relative">
            <button
              type="button"
              className="ml-1 h-8 w-8 flex items-center justify-center rounded-md hover:opacity-90 cursor-pointer"
              aria-label="Open filters"
              onClick={() => setFiltersOpen((v) => !v)}
            >
              <img src="/images/icons/filter.svg" alt="filter" className="h-5 w-5" />
            </button>
            {filtersOpen && (
              <div 
                className="absolute right-0 slide-out-to-top-full mb-2 z-50 w-38 rounded-2xl shadow-2xl"
                style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative p-1.5">
                  <div className="flex items-center justify-between px-1 py-0.5">
                    <span className="text-HoneyYellow font-baloo text-lg">Status</span>
                    <button className="text-white/70 hover:text-white cursor-pointer" onClick={() => setFiltersOpen(false)}>
                      <img src="/images/icons/clear.svg" alt="close" className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-1 grid grid-cols-1 gap-1.5 px-1">
                    {[
                      { key: "ACTIVE", label: "Active" },
                      { key: "EXPIRING_SOON", label: "Expiring soon" },
                      { key: "GRACE_PERIOD", label: "Grace Period" },
                      { key: "EXPIRED", label: "Expired" },
                    ].map(({ key, label }) => (
                      <label key={key} className="relative flex items-center gap-1 text-white font-baloo font-semibold text-base leading-none cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer appearance-none h-4 w-4 rounded-sm border border-HoneyYellow bg-HoneyYellow/20 checked:bg-HoneyYellow"
                          checked={!!selectedStatuses[key as keyof typeof selectedStatuses]}
                          onChange={(e) => setSelectedStatuses((prev) => ({ ...prev, [key]: e.target.checked }))}
                        />
                        <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 hidden peer-checked:block">
                          <path d="M5 10l3 3 7-7" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="pl-1 whitespace-nowrap">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
        </div>
      )}
          </div>
          </div>
          <div className="h-0.5 w-[140px] bg-stone-800 mx-auto" />
        </div>

        <div className="space-y-4">
          {!isConnected || filteredLoans.length === 0 ? (
            <div className="flex items-center justify-center opacity-50 mx-auto w-full py-10">
              <div className="flex flex-col items-center">
                <img className="mb-2 w-[30%]" src="/images/icon-not-found.png" alt="not-found" />
                <h2 className="font-amaticbold text-center text-3xl font-bold text-white">no loans</h2>
              </div>
            </div>
          ) : (
            filteredLoans.map((loan) => (
              <motion.div
                key={loan.loanId}
                layoutId={`extend-card-${loan.loanId}`}
                className="rounded-2xl border border-amber-900/30 bg-black/40 p-4 flex flex-col gap-3"
              >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-amaticbold text-2xl text-white">Loan #{loan.loanId}</h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">Bong Bear #{loan.beraId}</span>
                </div>
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-baloo border",
                    isLoanInGracePeriod(loan) && "bg-orange-900/40 text-orange-300 border-orange-700/50",
                    !isLoanInGracePeriod(loan) && loan.status === "EXPIRING_SOON" && "bg-amber-900/40 text-amber-300 border-amber-700/50",
                    !isLoanInGracePeriod(loan) && loan.status === "ACTIVE" && "bg-emerald-900/30 text-emerald-300 border-emerald-700/50",
                    !isLoanInGracePeriod(loan) && loan.status === "EXPIRED" && "bg-red-900/30 text-red-300 border-red-700/50"
                  ) as string}
                >
                  {isLoanInGracePeriod(loan) ? "Grace Period" : loan.status === "EXPIRING_SOON" ? "Expiring soon" : loan.status === "ACTIVE" ? "Active" : "Expired"}
                </span>
              </div>

              {/* Body */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center min-w-[80px]">
                  <img
                    className="border-2 border-black w-[80px] h-[80px] object-cover rounded-md"
                    src={mockImgById[loan.beraId]}
                    alt={`Bong Bear #${loan.beraId}`}
                  />
                  <div className="flex flex-col items-center gap-1 w-full mt-2">
                    <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide whitespace-nowrap text-center">Health</span>
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full border font-baloo text-sm leading-none justify-center w-full whitespace-nowrap",
                      calculateHealthFactor(loan.collateralValuation, loan.borrowedAmount) >= MIN_HEALTH_FACTOR_FOR_EXTEND
                        ? "border-emerald-700/50 bg-emerald-900/20 text-emerald-300"
                        : "border-red-700/50 bg-red-900/20 text-red-300"
                    )}>
                      {formatNum(calculateHealthFactor(loan.collateralValuation, loan.borrowedAmount))}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="rounded-xl bg-black/10 border border-amber-900/30 px-3 py-2 flex flex-col gap-2">
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Value</span>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xs leading-none justify-center">
                        <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                        <span>{formatNum(loan.collateralValuation)}</span>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Received</span>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xs leading-none justify-center">
                        <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                        <span>{formatNum(loan.borrowedAmount)}</span>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">To Repay</span>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xs leading-none justify-center">
                        <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                        <span>{formatNum(loan.borrowedAmount)}</span>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide whitespace-nowrap">
                          {isLoanInGracePeriod(loan) ? "Grace P." : "Maturity in"}
                        </span>
                        {isLoanInGracePeriod(loan) && (
                          <span className="relative inline-flex group">
                            <span
                              className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-HoneyYellow/70 text-HoneyYellow text-xs leading-none font-bold cursor-pointer touch-manipulation"
                              aria-label="Grace period info"
                              onClick={(e) => {
                                e.stopPropagation();
                                const tooltipId = `grace-period-${loan.loanId}`;
                                setOpenTooltip(openTooltip === tooltipId ? null : tooltipId);
                              }}
                            >
                              ?
                            </span>
                            <div
                              className={cn(
                                "absolute bottom-full mb-2 left-1/2 -translate-x-[calc(50%+3px)] px-3 py-2 rounded-xl transition-opacity pointer-events-none shadow-2xl z-50 max-w-[calc(100vw-2rem)]",
                                openTooltip === `grace-period-${loan.loanId}` ? "opacity-100" : "opacity-0"
                              )}
                              style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                            >
                              <p className="text-HoneyYellow text-sm font-baloo whitespace-nowrap">You have 24h to repay Expired Loan until Liquidation.</p>
                              <div
                                className="absolute bottom-[-6px] left-[calc(50%+3px)] -translate-x-1/2 w-2.5 h-2.5 rotate-45"
                                style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", borderRight: "2px solid rgba(205, 133, 63, 0.5)", borderBottom: "2px solid rgba(205, 133, 63, 0.5)" }}
                              />
                            </div>
                          </span>
                        )}
                      </div>
                      {(() => {
                        const countdownLabel = isLoanFullyExpired(loan)
                          ? "Expired"
                          : isLoanInGracePeriod(loan)
                            ? gracePeriodCountdowns[loan.loanId] || "-"
                            : loanCountdowns[loan.loanId] || "-";
                        const isTimer = isTimerString(countdownLabel);
                        return (
                          <span
                            className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xs leading-none justify-center whitespace-nowrap",
                              isTimer ? "tabular-nums min-w-[11ch]" : ""
                            )}
                          >
                            {countdownLabel}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom actions */}
              <div className="flex gap-2 pt-1">
                <AnimatePresence mode="wait">
                  {activeRepayLoanId === loan.loanId ? (
                    activeRepayMode === null ? (
                      <motion.div
                        key="repay-options"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-2 w-full"
                      >
                        <button
                          className="flex-1 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20"
                          onClick={handleRepayBack}
                        >
                          Back
                        </button>
                        <button
                          className="flex-1 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                          onClick={handleRepayPartial}
                        >
                          Partial
                        </button>
                        <button
                          className="flex-1 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                          onClick={() => handleRepayFull()}
                        >
                          Full Repay
                        </button>
                      </motion.div>
                    ) : activeRepayMode === "partial" ? (
                      <motion.div
                        key="partial-input"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-2 w-full"
                      >
                        <div className="flex-1">
                          <div className="relative">
                            <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2" />
                            <input
                              type="number"
                              inputMode="decimal"
                              min="0"
                              step="0.000001"
                              className="w-full rounded-xl border border-amber-900/40 bg-black/20 pl-8 pr-16 py-2 text-sm font-baloo text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                              placeholder="0.00"
                              value={inputValues[loan.loanId] ?? ""}
                              onChange={(e) => handleInputChange(loan.loanId, e.target.value)}
                            />
                            <button
                              type="button"
                              className="absolute right-1 top-1/2 -translate-y-1/2 w-12 py-1 rounded-lg text-xs font-baloo bg-amber-600/40 hover:bg-amber-700/60 border border-amber-600/30 text-amber-200 transition-colors cursor-pointer"
                              onClick={() => handleMaxClick(loan.loanId, loan.borrowedAmount)}
                            >
                              MAX
                            </button>
                          </div>
                        </div>
                        <button
                          className="flex-none px-3 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20"
                          onClick={handleRepayBack}
                        >
                          Back
                        </button>
                        <button
                          className="flex-none px-3 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                          onClick={handleRepayConfirm}
                        >
                          Confirm
                        </button>
                      </motion.div>
                    ) : null
                  ) : (
                    <motion.div
                      key="default-buttons"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-2 w-full"
                    >
                      {isLoanFullyExpired(loan) ? (
                        <>
                          <button
                            className="flex-1 py-2 rounded-xl font-baloo text-sm font-bold border bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                            disabled
                          >
                            Repay
                          </button>
                          <button
                            className="flex-1 py-2 rounded-xl font-baloo text-sm font-bold border bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                            disabled
                          >
                            Extend
                          </button>
                        </>
                      ) : (
                        <>
                          <ConnectButton.Custom>
                            {({ account, chain, openChainModal, openConnectModal }) => (
                              <button
                                className="flex-1 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                                id={`repay-button${loan.loanId}`}
                                onClick={() => {
                                  const button = document.getElementById("repay-button" + loan.loanId);
                                  if (!account) {
                                    if (button && button.innerHTML === "Connect Wallet") openConnectModal();
                                    else button && (button.innerHTML = "Connect Wallet");
                                  } else if (chain?.name !== "Berachain") {
                                    if (button && button.innerHTML === "Where Berachain??") openChainModal();
                                    else button && (button.innerHTML = "Where Berachain??");
                                  } else {
                                    if (isLoanInGracePeriod(loan)) {
                                      // For grace period loans, directly trigger full repayment
                                      handleRepayFull(loan.loanId);
                                    } else {
                                      handleButtonClick(loan.loanId);
                                    }
                                  }
                                }}
                              >
                                {isLoanInGracePeriod(loan) ? "Full Repay" : "Repay"}
                              </button>
                            )}
                          </ConnectButton.Custom>
                          {(() => {
                            const healthFactor = calculateHealthFactor(loan.collateralValuation, loan.borrowedAmount);
                            const canExtendByHealth = healthFactor >= MIN_HEALTH_FACTOR_FOR_EXTEND;
                            const canExtend = canExtendByHealth && !isLoanInGracePeriod(loan);
                            const showHealthTooltip = !canExtendByHealth && !isLoanFullyExpired(loan);
                            
                            return (
                              <div className="relative flex-1 group">
                                <button
                                  className={cn(
                                    "w-full py-2 rounded-xl font-baloo text-sm font-bold border relative",
                                    canExtend
                                      ? "bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20 cursor-pointer"
                                      : "bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                                  )}
                                  onClick={() => {
                                    if (!canExtend) return;
                                    setActiveExtendLoanId(loan.loanId);
                                  }}
                                  disabled={!canExtend}
                                >
                                  Extend
                                </button>
                                {showHealthTooltip && (
                                  <span className="absolute -top-2 -right-2 z-10 inline-flex flex-col items-center group">
                                    <span
                                      className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-HoneyYellow/70 text-HoneyYellow text-xs leading-none font-bold cursor-pointer touch-manipulation bg-black/80"
                                      aria-label="Health factor info"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const tooltipId = `health-factor-card-${loan.loanId}`;
                                        setOpenTooltip(openTooltip === tooltipId ? null : tooltipId);
                                      }}
                                    >
                                      ?
                                    </span>
                                    <div
                                      className={cn(
                                        "absolute bottom-full mb-2 left-1/2 -translate-x-[85%] px-3 py-2 rounded-xl transition-opacity pointer-events-none shadow-2xl z-50 max-w-[calc(100vw-2rem)]",
                                        openTooltip === `health-factor-card-${loan.loanId}` ? "opacity-100" : "opacity-0"
                                      )}
                                      style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                                    >
                                      <p className="text-HoneyYellow text-sm font-baloo whitespace-nowrap">
                                        Health factor is low to extend, partially repay first.
                                      </p>
                                      <div
                                        className="absolute bottom-[-6px] right-[calc(15%-6px)] w-2.5 h-2.5 rotate-45"
                                        style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", borderRight: "2px solid rgba(205, 133, 63, 0.5)", borderBottom: "2px solid rgba(205, 133, 63, 0.5)" }}
                                      />
                                    </div>
                                  </span>
                                )}
                              </div>
                            );
                          })()}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Extend Loan Dialog */}
      <Dialog open={!!activeExtendLoan} onOpenChange={(open) => { if (!open) setActiveExtendLoanId(null); }}>
        {activeExtendLoan && (
          <DialogContent className="max-w-[90vw] w-full max-h-[90vh] bg-black/90 border border-amber-900/40 rounded-2xl p-4 text-white shadow-2xl flex flex-col">
            <div className="flex flex-col gap-2 flex-shrink-0">
              <div className="flex items-start justify-between pr-8">
                <div className="flex items-center gap-2">
                  <h3 className="font-amaticbold text-3xl">Extend Loan #{activeExtendLoan.loanId}</h3>
                  <span className="inline-flex items-center h-8 px-3 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">Bong Bear #{activeExtendLoan.beraId}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto mt-2">
              <div className="flex items-stretch gap-3">
                <div className="flex flex-col items-center min-w-[80px]">
                  <img
                    className="border-2 border-black w-[80px] h-[80px] object-cover rounded-md"
                    src={mockImgById[activeExtendLoan.beraId]}
                    alt={`Bong Bear #${activeExtendLoan.beraId}`}
                  />
                  <div className="flex flex-col items-center gap-1 w-full mt-2">
                    <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide whitespace-nowrap text-center">Health</span>
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full border font-baloo text-sm leading-none justify-center w-full whitespace-nowrap",
                      calculateHealthFactor(activeExtendLoan.collateralValuation, activeExtendLoan.borrowedAmount) >= MIN_HEALTH_FACTOR_FOR_EXTEND
                        ? "border-emerald-700/50 bg-emerald-900/20 text-emerald-300"
                        : "border-red-700/50 bg-red-900/20 text-red-300"
                    )}>
                      {formatNum(calculateHealthFactor(activeExtendLoan.collateralValuation, activeExtendLoan.borrowedAmount))}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="rounded-xl bg-black/10 border border-amber-900/30 px-3 py-2 flex flex-col gap-2">
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Value</span>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xs leading-none justify-center">
                        <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                        <span>{formatNum(activeExtendLoan.collateralValuation)}</span>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Received</span>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xs leading-none justify-center">
                        <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                        <span>{formatNum(activeExtendLoan.borrowedAmount)}</span>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">To Repay</span>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xs leading-none justify-center">
                        <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                        <span>{formatNum(activeExtendLoan.borrowedAmount)}</span>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">
                          {isLoanInGracePeriod(activeExtendLoan) ? "Grace Period" : "Maturity in"}
                        </span>
                        {isLoanInGracePeriod(activeExtendLoan) && (
                          <span className="relative inline-flex group">
                            <span
                              className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-HoneyYellow/70 text-HoneyYellow text-xs leading-none font-bold cursor-pointer touch-manipulation"
                              aria-label="Grace period info"
                              onClick={(e) => {
                                e.stopPropagation();
                                const tooltipId = `grace-period-modal-${activeExtendLoan.loanId}`;
                                setOpenTooltip(openTooltip === tooltipId ? null : tooltipId);
                              }}
                            >
                              ?
                            </span>
                            <div
                              className={cn(
                                "absolute bottom-full mb-2 left-1/2 -translate-x-[calc(50%+3px)] px-3 py-2 rounded-xl transition-opacity pointer-events-none shadow-2xl z-50 max-w-[calc(100vw-2rem)]",
                                openTooltip === `grace-period-modal-${activeExtendLoan.loanId}` ? "opacity-100" : "opacity-0"
                              )}
                              style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                            >
                              <p className="text-HoneyYellow text-sm font-baloo whitespace-nowrap">You have 24 hours to repay Expired Loan until liquidation.</p>
                              <div
                                className="absolute bottom-[-6px] left-[calc(50%+3px)] -translate-x-1/2 w-2.5 h-2.5 rotate-45"
                                style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", borderRight: "2px solid rgba(205, 133, 63, 0.5)", borderBottom: "2px solid rgba(205, 133, 63, 0.5)" }}
                              />
                            </div>
                          </span>
                        )}
                      </div>
                      {(() => {
                        const countdownLabel = isLoanFullyExpired(activeExtendLoan)
                          ? "Expired"
                          : isLoanInGracePeriod(activeExtendLoan)
                            ? gracePeriodCountdowns[activeExtendLoan.loanId] || "-"
                            : loanCountdowns[activeExtendLoan.loanId] || "-";
                        const isTimer = isTimerString(countdownLabel);
                        return (
                          <span
                            className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xs leading-none justify-center whitespace-nowrap",
                              isTimer ? "tabular-nums min-w-[11ch]" : ""
                            )}
                          >
                            {countdownLabel}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-amaticbold text-center text-2xl font-bold text-white">Loan Config</h4>
                <div className="h-0.5 w-[140px] bg-stone-800 mx-auto mt-0.5 mb-2" />

                <div className="flex w-full items-center gap-2">
                  <span className="text-white font-baloo font-semibold text-base whitespace-nowrap">Add Duration</span>
                  <div className="grid grid-cols-4 gap-2 flex-1">
                    {[7,14,21,30].map((d) => (
                      <button
                        key={d}
                        className={cn(
                          "w-full px-2 py-1.5 rounded-lg border text-xs font-baloo transition-all cursor-pointer text-center",
                          extendDays === d ? "bg-HoneyYellow text-black border-HoneyYellow/50" : "bg-transparent text-white border-amber-900/30"
                        )}
                        onClick={() => setExtendDays(d)}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/20 border border-amber-900/30 w-full mt-2">
                  <Slider
                    min={7}
                    max={30}
                    step={1}
                    value={[extendDays]}
                    onValueChange={(v: number[]) => setExtendDays(v[0])}
                    className="flex-1"
                  />
                  <span className="inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none whitespace-nowrap">{extendDays} Days</span>
                </div>

                <div className="flex w-full items-center justify-between mb-1 mt-3">
                  <span className="text-white font-baloo font-semibold text-base">Borrow Additional Amount</span>
                </div>
                <div className="flex items-center gap-2 py-2 pr-2 pl-0 rounded-xl bg-black/20 border border-amber-900/30 mt-2 focus-within:ring-2 focus-within:ring-amber-700/50 focus-within:ring-inset w-full">
                  <div className="relative w-full">
                    <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2" />
                    <input
                      id="extend-amount-input"
                      type="number"
                      inputMode="decimal"
                      placeholder="0.00"
                      className="w-full bg-transparent border-none font-baloo text-lg font-bold text-white caret-white placeholder:text-white/60 focus:outline-none pl-8"
                      value={extendAmountInput}
                      onChange={(e) => setExtendAmountInput(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="w-12 py-1.5 rounded-lg text-xs font-baloo bg-amber-600/40 hover:bg-amber-700/60 border border-amber-600/30 text-amber-200 transition-colors cursor-pointer"
                    onClick={() => setExtendAmountInput(String((Number(activeExtendLoan.collateralValuation ?? 0) * 0.8) || 0))}
                  >
                    MAX
                  </button>
                </div>

                {(() => {
                  const extendAmountNum = parseFloat(extendAmountInput || "0") || 0;
                  const additionalInterest = Number(((extendAmountNum * 0.01) * (extendDays / 7)).toFixed(2));
                  const interestRate = extendAmountNum > 0 ? ((extendDays / 7) * 1).toFixed(2) : null;
                  const newMaturityTs = activeExtendLoan.endDate + extendDays * 24 * 3600;
                  const newMaturityLabel = formatDate(newMaturityTs);
                  const youReceive = Math.max(0, extendAmountNum - additionalInterest);
                  const maxBorrow = (activeExtendLoan.collateralValuation as number) * 0.8;
                  const newTotalToRepay = extendAmountNum > 0 ? extendAmountNum - additionalInterest : activeExtendLoan.borrowedAmount + additionalInterest;
                  return (
                    <div className="flex flex-col gap-2 mt-3">
                      <div className="rounded-2xl bg-amber-900/10 border border-amber-900/30 p-3">
                        <div className="flex flex-col gap-2">
                          <div className="flex w-full items-center justify-between gap-2">
                            <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Max Borrow (80% LTV)</span>
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                              <span>{formatNum(maxBorrow)}</span>
                            </div>
                          </div>
                          <div className="flex w-full items-center justify-between gap-2">
                            <div className="flex items-center gap-1">
                              <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Interest Rate</span>
                              <span className="relative inline-flex group">
                                <span
                                  className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-HoneyYellow/70 text-HoneyYellow text-xs leading-none font-bold cursor-pointer touch-manipulation pointer-events-auto"
                                  aria-label="Rate info"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const tooltipId = `interest-rate-modal-mobile-${activeExtendLoan.loanId}`;
                                    setOpenTooltip(openTooltip === tooltipId ? null : tooltipId);
                                  }}
                                >
                                  ?
                                </span>
                                <div
                                  className={cn(
                                    "absolute bottom-full mb-2 left-1/2 -translate-x-[30%] px-3 py-2 rounded-xl transition-opacity pointer-events-none shadow-2xl z-50 max-w-[calc(100vw-2rem)]",
                                    openTooltip === `interest-rate-modal-mobile-${activeExtendLoan.loanId}` ? "opacity-100" : "opacity-0"
                                  )}
                                  style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                                >
                                  <p className="text-HoneyYellow text-sm font-baloo whitespace-nowrap">Adjusts by day: Placeholder for a formula</p>
                                  <div
                                    className="absolute bottom-[-6px] left-[calc(30%-5px)] w-2.5 h-2.5 rotate-45"
                                    style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", borderRight: "2px solid rgba(205, 133, 63, 0.5)", borderBottom: "2px solid rgba(205, 133, 63, 0.5)" }}
                                  />
                                </div>
                              </span>
                            </div>
                            <div className="inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center text-center">{interestRate ? `${interestRate}%` : "-"}</div>
                          </div>
                          <div className="flex w-full items-center justify-between gap-2">
                            <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Interest (Upfront)</span>
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                              <span>{formatNum(additionalInterest)}</span>
                            </div>
                          </div>
                          <div className="flex w-full items-center justify-between gap-2">
                            <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">You Receive</span>
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                              <span>{youReceive > 0 ? formatNum(youReceive) : "-"}</span>
                            </div>
                          </div>
                          <div className="flex w-full items-center justify-between gap-2">
                            <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">New Maturity Date</span>
                            <div className="inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">{newMaturityLabel}</div>
                          </div>
                          <div className="flex w-full items-center justify-between gap-2">
                            <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Total to Repay</span>
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                              <span>{formatNum(newTotalToRepay)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="flex flex-col items-center justify-center gap-2 mt-2">
                <div className="text-HoneyYellow font-amaticbold text-xl text-center px-2">Interest is deducted upfront from your loan amount</div>
                <div className="w-full mt-1 flex gap-2">
                  <button
                    className="flex-1 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20"
                    onClick={() => setActiveExtendLoanId(null)}
                  >
                    Back
                  </button>
                  <button
                    className="flex-1 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                    onClick={() => setActiveExtendLoanId(null)}
                  >
                    Confirm Extension
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
