"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { cn } from "@/app/_components/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Bid = {
  address: string;
  amount: number;
  timestamp: number; // unix seconds
};

type AuctionStatus = "EXPIRING_SOON" | "HIGH_VALUE" | "NO_BIDS" | "ENDED" | "ACTIVE";

type MockAuction = {
  auctionId: number;
  collateralValue: number;
  outstandingDebt: number;
  currentHighestBid: number | null;
  potentialDiscount: number;
  endDate: number;
  beraId: number;
  status: AuctionStatus;
  isMyBid: boolean;
  bids: Bid[];
  winner?: string;
};

type InputValuesType = {
  [key: number]: string;
};

type FilterKey = AuctionStatus | "MY_BIDS";

const COUNTDOWN_REGEX = /\d+d \d+h/;
const isTimerString = (value: string) => COUNTDOWN_REGEX.test(value);

export const NewAuctionsTabMobile = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<FilterKey, boolean>>({
    EXPIRING_SOON: true,
    HIGH_VALUE: true,
    NO_BIDS: true,
    ENDED: true,
    ACTIVE: true,
    MY_BIDS: false,
  });
  const [activeBidAuctionId, setActiveBidAuctionId] = useState<number | null>(null);
  const [activeDetailsAuctionId, setActiveDetailsAuctionId] = useState<number | null>(null);
  const [inputValues, setInputValues] = useState<InputValuesType>({});

  const filterCategories: Array<{ key: FilterKey; label: string }> = [
    { key: "EXPIRING_SOON", label: "Expiring soon" },
    { key: "HIGH_VALUE", label: "High value" },
    { key: "NO_BIDS", label: "No bids" },
    { key: "ACTIVE", label: "Active" },
    { key: "ENDED", label: "Ended" },
    { key: "MY_BIDS", label: "My bids" },
  ];

  const mockImgById: Record<number, string> = useMemo(
    () => ({
      75: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/68b8c1674bf468085f015ed07a3bd6/5968b8c1674bf468085f015ed07a3bd6.jpeg?w=1000",
      90: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/8fac1fd9e0d9b799cf8195eb3c93cc/5f8fac1fd9e0d9b799cf8195eb3c93cc.jpeg?w=1000",
      68: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
      22: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/0e72de6ad7cf6551df57cb583120bb/e50e72de6ad7cf6551df57cb583120bb.jpeg?w=1000",
      31: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/a0ccad5fccf7dbb5ca455a52ae038d/70a0ccad5fccf7dbb5ca455a52ae038d.jpeg?w=1000",
      34: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/db186a56c1c596535493f0928ad705/c6db186a56c1c596535493f0928ad705.jpeg?w=1000",
      44: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/b7f90f33cb12c9b8db5028a6a284c1/b5b7f90f33cb12c9b8db5028a6a284c1.jpeg?w=1000",
    }),
    []
  );

  const MY_WALLET = "0x11Dca4B8bbC988d3142008ccaE0264871fbeffE4";

  const mockAuctions: MockAuction[] = useMemo(() => {
    const nowSec = Math.floor(Date.now() / 1000);
    const soon = nowSec + 2 * 60 * 60; // 2 hours
    const later = nowSec + 36 * 60 * 60; // 36 hours
    const ended = nowSec - 24 * 60 * 60; // 1 day ago

    const auctions = [
      {
        auctionId: 1,
        collateralValue: 10000,
        outstandingDebt: 8500,
        currentHighestBid: 9000,
        potentialDiscount: 10.0, // Will be recalculated based on actual min bid
        endDate: soon,
        beraId: 75,
        status: "EXPIRING_SOON" as const,
        isMyBid: true,
        bids: [
          { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", amount: 8600, timestamp: nowSec - 20 * 60 },
          { address: "0x8ba1f109551bD432803012645Hac136c220C9E4e", amount: 8700, timestamp: nowSec - 18 * 60 },
          { address: "0x1234567890123456789012345678901234567890", amount: 8800, timestamp: nowSec - 15 * 60 },
          { address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", amount: 8900, timestamp: nowSec - 12 * 60 },
          { address: MY_WALLET, amount: 9000, timestamp: nowSec - 10 * 60 }, // Highest bid
        ],
      },
      {
        auctionId: 2,
        collateralValue: 20000,
        outstandingDebt: 16500,
        currentHighestBid: 18000,
        potentialDiscount: 10.0, // Will be recalculated
        endDate: later,
        beraId: 90,
        status: "HIGH_VALUE" as const,
        isMyBid: false,
        bids: [
          { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", amount: 17000, timestamp: nowSec - 60 * 60 },
          { address: "0x8ba1f109551bD432803012645Hac136c220C9E4e", amount: 17500, timestamp: nowSec - 50 * 60 },
          { address: "0x1234567890123456789012345678901234567890", amount: 18000, timestamp: nowSec - 40 * 60 },
        ],
      },
      {
        auctionId: 3,
        collateralValue: 15000,
        outstandingDebt: 12000,
        currentHighestBid: null,
        potentialDiscount: 16.0, // (1 - (12600/15000)) * 100
        endDate: nowSec + 48 * 60 * 60,
        beraId: 68,
        status: "NO_BIDS" as const,
        isMyBid: false,
        bids: [],
      },
      {
        auctionId: 4,
        collateralValue: 18000,
        outstandingDebt: 14000,
        currentHighestBid: 15500,
        potentialDiscount: 13.89, // Will be recalculated
        endDate: ended,
        beraId: 22,
        status: "ENDED" as const,
        isMyBid: true,
        winner: MY_WALLET,
        bids: [
          { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", amount: 14500, timestamp: ended - 30 * 60 },
          { address: "0x8ba1f109551bD432803012645Hac136c220C9E4e", amount: 15000, timestamp: ended - 20 * 60 },
          { address: "0x1234567890123456789012345678901234567890", amount: 15200, timestamp: ended - 15 * 60 },
          { address: MY_WALLET, amount: 15500, timestamp: ended - 10 * 60 }, // Winner
        ],
      },
      {
        auctionId: 5,
        collateralValue: 25000,
        outstandingDebt: 20000,
        currentHighestBid: 21500,
        potentialDiscount: 14.0, // Will be recalculated
        endDate: nowSec + 24 * 60 * 60,
        beraId: 31,
        status: "ACTIVE" as const,
        isMyBid: false,
        bids: [
          { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", amount: 21000, timestamp: nowSec - 40 * 60 },
          { address: "0x8ba1f109551bD432803012645Hac136c220C9E4e", amount: 21500, timestamp: nowSec - 30 * 60 },
        ],
      },
      {
        auctionId: 6,
        collateralValue: 30000,
        outstandingDebt: 24000,
        currentHighestBid: null,
        potentialDiscount: 16.0, // Will be recalculated
        endDate: ended,
        beraId: 34,
        status: "ENDED" as const,
        isMyBid: false,
        bids: [], // No bids
      },
      {
        auctionId: 7,
        collateralValue: 22000,
        outstandingDebt: 18500,
        currentHighestBid: 19800,
        potentialDiscount: 10.0, // Will be recalculated
        endDate: ended,
        beraId: 44,
        status: "ENDED" as const,
        isMyBid: true,
        winner: "0x8ba1f109551bD432803012645Hac136c220C9E4e", // Someone else won
        bids: [
          { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", amount: 19000, timestamp: ended - 35 * 60 },
          { address: MY_WALLET, amount: 19500, timestamp: ended - 25 * 60 }, // User's bid (not highest)
          { address: "0x1234567890123456789012345678901234567890", amount: 19600, timestamp: ended - 20 * 60 },
          { address: "0x8ba1f109551bD432803012645Hac136c220C9E4e", amount: 19800, timestamp: ended - 10 * 60 }, // Winner
        ],
      },
    ];

    return auctions.map((auction) => {
      const minBid = auction.currentHighestBid !== null
        ? Math.ceil(auction.currentHighestBid * 1.01)
        : Math.ceil(auction.outstandingDebt * 1.05);
      const discount = (1 - (minBid / auction.collateralValue)) * 100;
      return {
        ...auction,
        potentialDiscount: Number(discount.toFixed(2)),
      };
    });
  }, []);
  const activeAuctionsCount = mockAuctions.filter((auction) => auction.status !== "ENDED").length;
  const totalCollateralValue = mockAuctions.reduce((acc, auction) => acc + auction.collateralValue, 0);
  const totalDebt = mockAuctions.reduce((acc, auction) => acc + auction.outstandingDebt, 0);
  const avgDiscount =
    mockAuctions.length > 0
      ? mockAuctions.reduce((acc, auction) => acc + auction.potentialDiscount, 0) / mockAuctions.length
      : 0;

  const formatNum = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const calculateMinBid = (auction: MockAuction): number => {
    if (auction.currentHighestBid !== null) {
      return Math.ceil(auction.currentHighestBid * 1.01);
    }
    return Math.ceil(auction.outstandingDebt * 1.05);
  };

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimeAgo = (timestamp: number): string => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const [auctionCountdowns, setAuctionCountdowns] = useState<Record<number, string>>({});
  useEffect(() => {
    const compute = () => {
      const now = Math.floor(Date.now() / 1000);
      const pad = (n: number) => n.toString().padStart(2, "0");
      const map: Record<number, string> = {};

      mockAuctions.forEach((auction) => {
        if (auction.endDate <= now) {
          map[auction.auctionId] = "Ended";
        } else {
          const diff = auction.endDate - now;
          const days = Math.floor(diff / (24 * 3600));
          const hours = Math.floor((diff % (24 * 3600)) / 3600);
          const mins = Math.floor((diff % 3600) / 60);
          const secs = diff % 60;
          map[auction.auctionId] = `${days}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
        }
      });

      setAuctionCountdowns(map);
    };

    const id = setInterval(compute, 1000);
    compute();
    return () => clearInterval(id);
  }, [mockAuctions]);

  const filteredAuctions = useMemo(() => {
    let filtered = mockAuctions;

    if (selectedFilters.MY_BIDS) {
      filtered = filtered.filter((auction) => auction.bids.some((bid) => bid.address === MY_WALLET));
    } else {
      filtered = filtered.filter((auction) => selectedFilters[auction.status]);
    }

    return filtered;
  }, [mockAuctions, selectedFilters]);

  const handleInputChange = (auctionId: number, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [auctionId]: value,
    }));
  };

  const handleMaxClick = (auctionId: number, minBid: number) => {
    setInputValues((prev) => ({
      ...prev,
      [auctionId]: minBid.toString(),
    }));
  };

  const handleBidBack = () => {
    setActiveBidAuctionId(null);
  };

  const handleBidConfirm = () => {
    if (activeBidAuctionId === null) return;
    setActiveBidAuctionId(null);
    setInputValues((prev) => ({
      ...prev,
      [activeBidAuctionId]: "",
    }));
  };

  const handleButtonClick = (auctionId: number) => {
    setActiveBidAuctionId(auctionId);
    setInputValues((prev) => ({
      ...prev,
      [auctionId]: "",
    }));
  };

  const activeDetailsAuction = useMemo(() => {
    return mockAuctions.find((auction) => auction.auctionId === activeDetailsAuctionId) || null;
  }, [mockAuctions, activeDetailsAuctionId]);

  const getStatusLabel = (status: AuctionStatus) => {
    switch (status) {
      case "EXPIRING_SOON":
        return "Expiring soon";
      case "HIGH_VALUE":
        return "High value";
      case "NO_BIDS":
        return "No bids";
      case "ACTIVE":
        return "Active";
      case "ENDED":
      default:
        return "Ended";
    }
  };

  const renderAuctionOverview = (auction: MockAuction, variant: "list" | "dialog" = "list") => {
    const isDialog = variant === "dialog";
    const labelSizeClass = isDialog ? "text-sm" : "text-xs";
    const chipPaddingClass = isDialog ? "px-2.5 py-1" : "px-2 py-1";
    const chipTextClass = isDialog ? "text-sm" : "text-xs";
    const iconSizeClass = isDialog ? "h-4 w-4" : "h-3 w-3";
    const minWidthClass = "min-w-[80px]";
    const imageSizeClass = "border-2 border-black w-[80px] h-[80px] object-cover rounded-md";

    const statusPill = (
      <span
        className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-baloo border whitespace-nowrap",
          auction.status === "EXPIRING_SOON" && "bg-amber-900/40 text-amber-300 border-amber-700/50",
          auction.status === "HIGH_VALUE" && "bg-purple-900/30 text-purple-300 border-purple-700/50",
          auction.status === "NO_BIDS" && "bg-blue-900/30 text-blue-300 border-blue-700/50",
          auction.status === "ENDED" && "bg-red-900/30 text-red-300 border-red-700/50",
          auction.status === "ACTIVE" && "bg-emerald-900/30 text-emerald-300 border-emerald-700/50"
        ) as string}
      >
        {getStatusLabel(auction.status)}
      </span>
    );

    return (
      <>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <h3 className={cn("font-amaticbold text-white", isDialog ? "text-3xl" : "text-2xl")}>
              Auction #{auction.auctionId}
            </h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
              Bong Bear #{auction.beraId}
            </span>
          </div>
          {!isDialog && statusPill}
        </div>

        <div className="flex items-start gap-3">
          <div className={cn("flex flex-col items-center", minWidthClass)}>
            <img
              className={imageSizeClass}
              src={mockImgById[auction.beraId]}
              alt={`Bong Bear #${auction.beraId}`}
            />
            <div className="flex flex-col items-center gap-1 w-full mt-2">
              <span className={cn("text-white font-baloo font-semibold uppercase tracking-wide", labelSizeClass)}>Discount</span>
              <span className={cn("inline-flex items-center rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none justify-center w-full", chipPaddingClass, chipTextClass)}>
                {formatNum(auction.potentialDiscount)}%
              </span>
              {isDialog && <div className="mt-1">{statusPill}</div>}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className={cn("rounded-xl bg-black/10 border border-amber-900/30 flex flex-col gap-2", isDialog ? "px-4 py-3" : "px-3 py-2")}>
              <div className="flex w-full items-center justify-between gap-2">
                <span className={cn("text-white font-baloo font-semibold uppercase tracking-wide", labelSizeClass)}>Value</span>
                <div className={cn("inline-flex items-center gap-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none", chipPaddingClass, chipTextClass)}>
                  <img src="/images/logo-honey.png" alt="HONEY" className={iconSizeClass} />
                  <span>{formatNum(auction.collateralValue)}</span>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-2">
                <span className={cn("text-white font-baloo font-semibold uppercase tracking-wide", labelSizeClass)}>Debt</span>
                <div className={cn("inline-flex items-center gap-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none", chipPaddingClass, chipTextClass)}>
                  <img src="/images/logo-honey.png" alt="HONEY" className={iconSizeClass} />
                  <span>{formatNum(auction.outstandingDebt)}</span>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-2">
                <span className={cn("text-white font-baloo font-semibold uppercase tracking-wide", labelSizeClass)}>Min Bid</span>
                <div className={cn("inline-flex items-center gap-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none", chipPaddingClass, chipTextClass)}>
                  <img src="/images/logo-honey.png" alt="HONEY" className={iconSizeClass} />
                  <span>{formatNum(calculateMinBid(auction))}</span>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-2">
                <span className={cn("text-white font-baloo font-semibold uppercase tracking-wide", labelSizeClass)}>Highest Bid</span>
                <div className={cn("inline-flex items-center gap-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none", chipPaddingClass, chipTextClass)}>
                  <img src="/images/logo-honey.png" alt="HONEY" className={iconSizeClass} />
                  <span>{auction.currentHighestBid ? formatNum(auction.currentHighestBid) : "No bids"}</span>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-2">
                <span className={cn("text-white font-baloo font-semibold uppercase tracking-wide", labelSizeClass)}>Ends in</span>
                {(() => {
                  const countdownLabel = auctionCountdowns[auction.auctionId] || "-";
                  const isTimer = isTimerString(countdownLabel);
                  return (
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none whitespace-nowrap justify-center",
                        chipPaddingClass,
                        chipTextClass,
                        isTimer ? "tabular-nums min-w-[12ch]" : ""
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
      </>
    );
  };

  const cardClasses =
    "rounded-3xl border border-amber-900/40 bg-black/85 p-3 sm:p-4 text-white shadow-2xl";
  return (
    <div className="space-y-4">
      <div className={cardClasses}>
        <div className="flex flex-col items-center gap-2 mb-4">
          <h2 className="font-amaticbold text-center text-3xl font-bold text-white">Summary</h2>
          <div className="h-0.5 w-[140px] bg-stone-800 mx-auto" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Active Auctions</div>
            <span className="mt-1 inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              {activeAuctionsCount}
            </span>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Total Value</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
              <span>{formatNum(totalCollateralValue)}</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Total Debt</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
              <span>{formatNum(totalDebt)}</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Avg. Discount</div>
            <span className="mt-1 inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              {avgDiscount.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className={cardClasses}>
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="flex items-center gap-2 justify-center">
            <h2 className="font-amaticbold text-3xl font-bold text-white">Auctions</h2>
            <div className="relative">
              <button
                type="button"
                className="ml-1 h-8 w-8 flex items-center justify-center rounded-md hover:opacity-90 cursor-pointer"
                aria-label="Open filters"
                onClick={() => setFiltersOpen((value) => !value)}
              >
                <img src="/images/icons/filter.svg" alt="filter" className="h-5 w-5" />
              </button>
              {filtersOpen && (
                <div
                  className="absolute right-0 slide-out-to-top-full mb-2 z-50 w-38 rounded-2xl shadow-2xl"
                  style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="relative p-1.5">
                    <div className="flex items-center justify-between px-1 py-0.5">
                      <span className="text-HoneyYellow font-baloo text-lg">Status</span>
                      <button className="text-white/70 hover:text-white cursor-pointer" onClick={() => setFiltersOpen(false)}>
                        <img src="/images/icons/clear.svg" alt="close" className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-1 grid grid-cols-1 gap-1.5 px-1">
                      {filterCategories.map(({ key, label }) => (
                        <label key={key} className="relative flex items-center gap-1 text-white font-baloo font-semibold text-base leading-none cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer appearance-none h-4 w-4 rounded-sm border border-HoneyYellow bg-HoneyYellow/20 checked:bg-HoneyYellow"
                            checked={!!selectedFilters[key]}
                            onChange={(event) => {
                              if (key === "MY_BIDS") {
                                if (event.target.checked) {
                                  setSelectedFilters({
                                    EXPIRING_SOON: false,
                                    HIGH_VALUE: false,
                                    NO_BIDS: false,
                                    ENDED: false,
                                    ACTIVE: false,
                                    MY_BIDS: true,
                                  });
                                } else {
                                  setSelectedFilters({
                                    EXPIRING_SOON: true,
                                    HIGH_VALUE: true,
                                    NO_BIDS: true,
                                    ENDED: true,
                                    ACTIVE: true,
                                    MY_BIDS: false,
                                  });
                                }
                              } else {
                                setSelectedFilters((prev) => ({
                                  ...prev,
                                  [key]: event.target.checked,
                                  MY_BIDS: false,
                                }));
                              }
                            }}
                          />
                          <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 hidden peer-checked:block">
                            <path d="M5 10l3 3 7-7" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="pl-1 whitespace-nowrap">{label}</span>
                        </label>
                      ))}
                    </div>
                    <div
                      className="absolute bottom-[-6px] right-6 w-2.5 h-2.5 rotate-45"
                      style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", borderRight: "2px solid rgba(205, 133, 63, 0.5)", borderBottom: "2px solid rgba(205, 133, 63, 0.5)" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="h-0.5 w-[140px] bg-stone-800 mx-auto" />
        </div>
        <div className="space-y-4">
          {filteredAuctions.length === 0 ? (
            <div className="flex items-center justify-center opacity-50 mx-auto w-full py-10">
              <div className="flex flex-col items-center">
                <img className="mb-2 w-[30%]" src="/images/icon-not-found.png" alt="not-found" />
                <h2 className="font-amaticbold text-center text-3xl font-bold text-white">no auctions</h2>
              </div>
            </div>
          ) : (
            filteredAuctions.map((auction) => (

              <motion.div

                key={auction.auctionId}

                layoutId={`auction-card-${auction.auctionId}`}

                className="rounded-2xl border border-amber-900/30 bg-black/40 p-4 flex flex-col gap-3"

              >

                {renderAuctionOverview(auction)}

                  <div className="flex gap-2 pt-1">
                    <AnimatePresence mode="wait">
                      {activeBidAuctionId === auction.auctionId ? (
                        <motion.div
                          key="bid-input"
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
                                value={inputValues[auction.auctionId] ?? ""}
                                onChange={(event) => handleInputChange(auction.auctionId, event.target.value)}
                              />
                              <button
                                type="button"
                                className="absolute right-1 top-1/2 -translate-y-1/2 w-12 py-1 rounded-lg text-xs font-baloo bg-amber-600/40 hover:bg-amber-700/60 border border-amber-600/30 text-amber-200 transition-colors cursor-pointer"
                                onClick={() => handleMaxClick(auction.auctionId, calculateMinBid(auction))}
                              >
                                MAX
                              </button>
                            </div>
                          </div>
                          <button
                            className="flex-none px-3 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20"
                            onClick={handleBidBack}
                          >
                            Back
                          </button>
                          <button
                            className="flex-none px-3 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                            onClick={handleBidConfirm}
                          >
                            Confirm
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="default-buttons"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex gap-2 w-full"
                        >
                          <ConnectButton.Custom>
                            {({ account, chain, openChainModal, openConnectModal }) => {
                              const userWon = auction.status === "ENDED" && auction.winner === MY_WALLET;
                              return (
                                <button
                                  className={cn(
                                    "flex-1 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer",
                                    userWon
                                      ? "bg-green-600/40 text-green-300 border-green-700/50 hover:bg-green-700/60"
                                      : auction.status === "ENDED"
                                      ? "bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                                      : "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                                  ) as string}
                                  id={`bid-button${auction.auctionId}`}
                                  disabled={auction.status === "ENDED" && !userWon}
                                  onClick={() => {
                                    if (userWon) {
                                      setActiveDetailsAuctionId(auction.auctionId);
                                      return;
                                    }
                                    if (auction.status === "ENDED") return;
                                    const button = document.getElementById(`bid-button${auction.auctionId}`) as HTMLButtonElement | null;
                                    if (!account) {
                                      if (button && button.innerHTML === "Connect Wallet") openConnectModal();
                                      else if (button) button.innerHTML = "Connect Wallet";
                                    } else if (chain?.name !== "Berachain") {
                                      if (button && button.innerHTML === "Where Berachain??") openChainModal();
                                      else if (button) button.innerHTML = "Where Berachain??";
                                    } else {
                                      if (button) button.innerHTML = "Place Bid";
                                      handleButtonClick(auction.auctionId);
                                    }
                                  }}
                                >
                                  {userWon ? "You Won This Auction" : "Place Bid"}
                                </button>
                              );
                            }}
                          </ConnectButton.Custom>
                          <button
                            className="flex-1 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20"
                            onClick={() => setActiveDetailsAuctionId(auction.auctionId)}
                          >
                            Details
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </div>
      <Dialog open={!!activeDetailsAuction} onOpenChange={(open) => { if (!open) setActiveDetailsAuctionId(null); }}>
        {activeDetailsAuction && (
          <DialogContent className="max-w-[90vw] w-full max-h-[90vh] bg-black/90 border border-amber-900/40 rounded-2xl p-4 text-white shadow-2xl flex flex-col">
            <div className="flex-1 min-h-0 overflow-y-auto mt-2 space-y-4">
              {renderAuctionOverview(activeDetailsAuction, "dialog")}
              {activeDetailsAuction.status === "ENDED" && activeDetailsAuction.bids.length === 0 ? (
                <div className="rounded-xl bg-black/20 border border-amber-900/30 p-6 text-center">
                  <img src="/images/logo-goldilocks.png" alt="Goldilocks" className="h-20 w-20 mx-auto mb-4" />
                  <h4 className="font-amaticbold text-3xl font-bold text-white mb-2">Transferred to Protocol</h4>
                  <p className="text-white text-base font-baloo font-semibold">No bids were placed during the 48-hour auction period.</p>
                  <p className="text-white text-base font-baloo font-semibold mt-2">NFT has been transferred to the protocol multisig.</p>
                </div>
              ) : null}
              {activeDetailsAuction.status === "ENDED" && activeDetailsAuction.winner === MY_WALLET && activeDetailsAuction.bids.length > 0 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-amaticbold text-center text-4xl font-bold text-white">Winner</h4>
                    <div className="h-0.5 w-[140px] bg-stone-800 mx-auto mt-0.5 mb-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl bg-black/20 border border-amber-900/30 px-4 py-3 text-center flex flex-col items-center">
                        <div className="text-white text-sm font-baloo font-semibold uppercase tracking-wide mb-1">Value</div>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                          <span>{formatNum(activeDetailsAuction.collateralValue)}</span>
                        </div>
                      </div>
                      <div className="rounded-xl bg-black/20 border border-amber-900/30 px-4 py-3 text-center flex flex-col items-center">
                        <div className="text-white text-sm font-baloo font-semibold uppercase tracking-wide mb-1">Your Winning Bid</div>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                          <span>{formatNum(activeDetailsAuction.currentHighestBid || 0)}</span>
                        </div>
                      </div>
                      <div className="rounded-xl bg-black/20 border border-amber-900/30 px-4 py-3 text-center flex flex-col items-center">
                        <div className="text-white text-sm font-baloo font-semibold uppercase tracking-wide mb-1">Your Discount</div>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                          {formatNum((1 - ((activeDetailsAuction.currentHighestBid || 0) / activeDetailsAuction.collateralValue)) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <ConnectButton.Custom>
                    {({ account, chain, openChainModal, openConnectModal }) => (
                      <button
                        className="w-full py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                        onClick={() => {
                          if (!account) {
                            openConnectModal();
                          } else if (chain?.name !== "Berachain") {
                            openChainModal();
                          } else {
                            // Claim placeholder
                          }
                        }}
                      >
                        Claim
                      </button>
                    )}
                  </ConnectButton.Custom>
                </div>
              )}
              <div className="rounded-2xl border border-amber-900/30 bg-black/20 p-4 space-y-3">
                <h4 className="font-amaticbold text-center text-4xl font-bold text-white">Bid History</h4>
                <div className="h-0.5 w-[140px] bg-stone-800 mx-auto mt-0.5 mb-2" />
                {activeDetailsAuction.bids.length === 0 ? (
                  <p className="text-center text-white/70 font-baloo">No bids.</p>
                ) : (
                  <div className="space-y-2">
                    {[...activeDetailsAuction.bids].sort((a, b) => b.timestamp - a.timestamp).map((bid, index) => {
                      const isHighest = bid.amount === activeDetailsAuction.currentHighestBid;
                      const isMyBid = bid.address === MY_WALLET;
                      return (
                        <div
                          key={`${activeDetailsAuction.auctionId}-history-${index}`}
                          className={cn(
                            "rounded-xl border px-4 py-3 flex flex-col gap-1",
                            isHighest ? "bg-amber-900/30 border-amber-700/50" : "bg-black/30 border-amber-900/30"
                          )}
                        >
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={cn("text-sm font-baloo", isMyBid ? "text-HoneyYellow font-semibold" : "text-white/80")}>
                                {formatAddress(bid.address)}
                              </span>
                              <span className="text-white/60 text-xs font-baloo whitespace-nowrap">{formatTimeAgo(bid.timestamp)}</span>
                            </div>
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                              <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                              <span>{formatNum(bid.amount)}</span>
                            </div>
                          </div>
                          {isHighest && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-HoneyYellow/40 bg-HoneyYellow/10 text-HoneyYellow font-baloo text-xs leading-none whitespace-nowrap self-start">
                              {activeDetailsAuction.status === "ENDED"
                                ? isMyBid
                                  ? "You won the auction"
                                  : "Auction winner"
                                : isMyBid
                                ? "You are the current winner"
                                : "Current winner"}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
