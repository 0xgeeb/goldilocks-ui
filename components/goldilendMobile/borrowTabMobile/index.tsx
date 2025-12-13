"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAccount } from "wagmi";

import { cn, formatAsString, formatAsLongerNumber } from "@/app/_components/utils";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Slider from "@/components/ui/slider";

import { useGoldilend } from "../../../providers";
import { BorrowButtonMobile } from "../borrowButtonMobile";
import { LendNotificationMobile } from "../../goldilendMobile";
import { contracts } from "../../../utils/addressi";
import { bongbears } from "../../../utils/bongbears";

const QUICK_DURATIONS = [7, 14, 21, 30];

export const BorrowTabMobile = () => {
  const [daysTilExpiration, setDaysTilExpiration] = useState<number>(7);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [idQuery, setIdQuery] = useState<string>("");
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

  const collectionNames = useMemo(
    () => ["Bong Bear", "Bond Bear", "Boo Bear", "Band Bear", "Baby Bear", "Bit Bear", "Fake Bear"],
    []
  );

  const [selectedCollections, setSelectedCollections] = useState<Record<string, boolean>>(() =>
    collectionNames.reduce((acc, name) => {
      acc[name] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const {
    ownedBeras,
    handleBeraClick,
    berasLoading,
    selectedBera,
    borrowLimit,
    updateBorrowLimit,
    borrowDisplayString,
    handleBorrowChange,
    loanExpiration,
    handleLoanDateChange,
    loanAmount,
    txConfirming,
    notification,
    getInterestRate,
    debouncedLoanAmount,
    debouncedLoanExpiration,
    loanInterest,
    setLoanInterest,
    loanInterestRate,
    setLoanInterestRate,
    goldilendInfo,
  } = useGoldilend();

  const { isConnected } = useAccount();

  const enabledCollections = useMemo(
    () => new Set(Object.keys(selectedCollections).filter((key) => selectedCollections[key])),
    [selectedCollections]
  );

  const filteredOwnedBeras = useMemo(() => {
    return ownedBeras.filter((bera) => enabledCollections.has(bera.name.split(" #")[0]));
  }, [ownedBeras, enabledCollections]);

  const handleSliderChange = useCallback(
    (days: string) => {
      const daysNum = parseFloat(days);
      setDaysTilExpiration(daysNum);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + daysNum);
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const year = String(currentDate.getFullYear());
      handleLoanDateChange(`${month}-${day}-${year}`);
    },
    [handleLoanDateChange]
  );

  useEffect(() => {
    // ensure initial calculations run on page load for 7 days
    handleSliderChange("7");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateBorrowLimit();
  }, [selectedBera]);

  useEffect(() => {
    const q = idQuery.replace(/[^0-9]/g, "");
    if (!carouselApi || !q) return;
    const exactIdx = ownedBeras.findIndex((b) => String(b.id) === q);
    if (exactIdx >= 0) {
      try { carouselApi.scrollTo(exactIdx, true); } catch { /* noop */ }
    }
  }, [idQuery, carouselApi, ownedBeras]);


  const checkDate = useCallback((dateString: string): boolean => {
    const dateParts = dateString.split("-");
    const [month, day, year] = dateParts.map(Number);
    const parsedDate = new Date(year, month - 1, day);
    const timestamp = parsedDate.getTime();
    const timestampDigits = Math.floor(timestamp / 1000);
    if (dateParts.length !== 3) return false;
    if (Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(year)) return false;
    if (Number.isNaN(parsedDate.getTime())) return false;
    if (timestampDigits < Math.floor(Date.now() / 1000)) return false;
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    if (parsedDate < tomorrow) return false;
    return true;
  }, []);

  const formatBeraName = (beraName: string): string => {
    const parts = beraName.split(" #");
    if (parts.length !== 2) return beraName;

    const collectionName = parts[0];
    const tokenId = parts[1];

    // Abbreviate long Bong Bear token IDs
    if (collectionName === "Bong Bear" && tokenId.length > 10) {
      const abbreviated = `${tokenId.slice(0, 6)}...${tokenId.slice(-4)}`;
      return `${collectionName} #${abbreviated}`;
    }

    return beraName;
  };

  const getBeraImageUrl = (beraName: string, tokenId: number | string, tokenIdRaw?: string): string => {
    const collectionName = beraName.split(" #")[0];

    // Special handling for Bong Bear collection
    if (collectionName === "Bong Bear") {
      // Use raw token ID if available (for very large Bong Bear IDs)
      const tokenIdStr = tokenIdRaw || String(tokenId);
      const url = bongbears[tokenIdStr];
      if (url) {
        return url;
      }
    }

    const ipfsMap: Record<string, { hash: string; extension: string }> = {
      "Fake Bear": { hash: "bafybeihgxnn7fec5vozkittbginoq4jhn2ctwgke3mbph2rnmtdmjt364m", extension: "jpg" },
      "Bit Bear": { hash: "Qmek1nCGxXmSGj6qq15eyxwkh8CpDN6vc9zrzQpQxAf2nm", extension: "gif" },
      "Baby Bear": { hash: "bafybeigmu2j3b562vwcu43n2pzpezevw3m6jj7q7diwaefy6s5zc6gzak4", extension: "jpg" },
      "Boo Bear": { hash: "bafybeiftuvpxxtr5y3kvf5rvdy6i37h6kqklatksj3e66by4vvtg2b4x2u", extension: "jpg" },
      "Bond Bear": { hash: "bafybeifikg7bvjizari7dtdejd54mj6smllgbh37alps2roan73d5674sm", extension: "jpg" },
      "Band Bear": { hash: "bafybeihgxnn7fec5vozkittbginoq4jhn2ctwgke3mbph2rnmtdmjt364m", extension: "jpg" },
    };

    const defaultConfig = { hash: "bafybeihgxnn7fec5vozkittbginoq4jhn2ctwgke3mbph2rnmtdmjt364m", extension: "jpg" };
    const config = ipfsMap[collectionName] || defaultConfig;

    return `https://ipfs.io/ipfs/${config.hash}/${tokenId}.${config.extension}`;
  };

  const getSelectedBeraContractAddress = (): string => {
    if (!selectedBera.name) return contracts.bandbear.address;

    const collectionName = selectedBera.name.split(" #")[0];

    const contractMap: Record<string, string> = {
      "Fake Bear": contracts.fakebear.address,
      "Bit Bear": contracts.bitbear.address,
      "Baby Bear": contracts.babybear.address,
      "Boo Bear": contracts.boobear.address,
      "Bond Bear": contracts.bondbear.address,
      "Band Bear": contracts.bandbear.address,
      "Bong Bear": contracts.bongbear.address,
    };

    return contractMap[collectionName] || contracts.bandbear.address;
  };

  const getSelectedBeraFairValue = (): number => {
    if (!selectedBera.name) return 0;

    const collectionName = selectedBera.name.split(" #")[0];

    const fairValueMap: Record<string, number> = {
      "Fake Bear": goldilendInfo.fakebearFairValue,
      "Bit Bear": goldilendInfo.bitbearFairValue,
      "Baby Bear": goldilendInfo.babybearFairValue,
      "Boo Bear": goldilendInfo.boobearFairValue,
      "Bond Bear": goldilendInfo.bondbearFairValue,
      "Band Bear": goldilendInfo.bandbearFairValue,
      "Bong Bear": goldilendInfo.bongbearFairValue,
    };

    return fairValueMap[collectionName] || 0;
  };

  useEffect(() => {
    if (
      selectedBera.name !== "" &&
      debouncedLoanAmount > 0 &&
      checkDate(debouncedLoanExpiration)
    ) {
      getInterestRate();
    } else {
      setLoanInterest(0);
      setLoanInterestRate(0);
    }
  }, [
    selectedBera,
    debouncedLoanAmount,
    debouncedLoanExpiration,
    checkDate,
    getInterestRate,
    setLoanInterest,
    setLoanInterestRate,
  ]);

  useEffect(() => {
    if (checkDate(debouncedLoanExpiration)) {
      const [month, day, year] = debouncedLoanExpiration.split("-").map(Number);
      const inputDate = new Date(year, month - 1, day);
      const currentDate = new Date();
      const timeDifference = inputDate.getTime() - currentDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      if (daysDifference >= 7 && daysDifference <= 30) {
        setDaysTilExpiration(daysDifference);
      }
    }
  }, [debouncedLoanExpiration]);

  // Close tooltips when clicking outside
  useEffect(() => {
    if (!openTooltip) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[aria-label*="info"]')) {
        setOpenTooltip(null);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("touchstart", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openTooltip]);

  const loadingElement = () => <span className="loader-small mx-auto mt-6" />;

  const renderCollateralSection = () => {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-full">
          {berasLoading ? (
            <div className="flex flex-col items-center justify-center py-10">{loadingElement()}</div>
          ) : filteredOwnedBeras.length === 0 ? (
            <div className="flex items-center justify-center opacity-50 mx-auto w-full">
              <div className="flex flex-col items-center">
                <img className="mb-2 w-[30%]" src="/images/icon-not-found.png" alt="not-found" />
                <h2 className="font-amaticbold text-center text-3xl font-bold text-white">no beras</h2>
              </div>
            </div>
          ) : (
            <Carousel opts={{ align: "center", loop: true, slidesToScroll: 1, dragFree: true, containScroll: "trimSnaps" }} className="pt-2" setApi={setCarouselApi}>
              <CarouselContent className="-ml-1 select-none">
                {filteredOwnedBeras.map((bera, index) => {
                  const isSelected = selectedBera.name === bera.name;
                  return (
                    <CarouselItem key={index} className="basis-1/3 pl-1 select-none">
                      <div className="flex flex-col items-center">
                        <img
                          className={`block w-full max-w-[100px] object-contain rounded-xl cursor-pointer ${isSelected ? "border-4 border-HoneyYellow" : "border-2 border-white/20"}`}
                          src={getBeraImageUrl(bera.name, bera.id, bera.idRaw)}
                          alt={bera.name}
                          draggable={false}
                          onClick={() => handleBeraClick(bera)}
                        />
                        <div className="mt-1 text-center w-full max-w-[100px]">
                          <span className="font-baloo text-xs font-semibold text-HoneyYellow leading-tight">{formatBeraName(bera.name)}</span>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="left-[-16px] -translate-x-1/2 h-6 w-6 [&>svg]:h-3 [&>svg]:w-3" />
              <CarouselNext className="right-[-16px] translate-x-1/2 h-6 w-6 [&>svg]:h-3 [&>svg]:w-3" />
            </Carousel>
          )}
        </div>

        <div className="w-full mt-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2 flex flex-col items-center">
              <div className="text-white text-sm font-baloo font-semibold text-center">Collateral</div>
              <div className="mt-1 inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                {selectedBera.name ? formatBeraName(selectedBera.name) : "None"}
              </div>
            </div>
            <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2 flex flex-col items-center">
              <div className="text-white text-sm font-baloo font-semibold text-center">Value</div>
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                <span>{selectedBera.name ? formatAsLongerNumber(getSelectedBeraFairValue()) : "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLoanSummary = (toReceive: number, totalToRepay: number, maturityLabel: string) => {
    const interestRateDisplay =
      loanInterestRate && Number(loanInterestRate) > 0
        ? `${Number(loanInterestRate).toFixed(2)}%`
        : "-";

    return (
      <div className="flex flex-col gap-1 mt-0">
        <div className="rounded-2xl bg-amber-900/10 border border-amber-900/30 p-4">
          <div className="flex flex-col gap-3">
            <div className="flex w-full items-center justify-between gap-4">
              <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Max Borrow</span>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                <span>{formatAsLongerNumber(borrowLimit)}</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Interest Rate</span>
                {/* <span className="relative inline-flex group">
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-HoneyYellow/70 text-HoneyYellow text-xs leading-none font-bold cursor-pointer touch-manipulation pointer-events-auto"
                    aria-label="Rate info"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const tooltipId = "interest-rate-mobile";
                      setOpenTooltip(openTooltip === tooltipId ? null : tooltipId);
                    }}
                  >
                    ?
                  </span>
                  <div
                    className={cn(
                      "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl transition-opacity pointer-events-none shadow-2xl z-50 max-w-[calc(100vw-2rem)]",
                      "group-hover:opacity-100 md:opacity-0",
                      openTooltip === "interest-rate-mobile" ? "opacity-100 md:opacity-100" : "opacity-0"
                    )}
                    style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                  >
                    <p className="text-HoneyYellow text-sm font-baloo whitespace-nowrap">Adjusts by day: Placeholder for a formula</p>
                    <div
                      className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
                      style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", borderRight: "2px solid rgba(205, 133, 63, 0.5)", borderBottom: "2px solid rgba(205, 133, 63, 0.5)" }}
                    />
                  </div>
                </span> */}
              </div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center text-center">
                {interestRateDisplay}
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Interest (Upfront)</span>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                <span>{loanInterest ? formatAsLongerNumber(loanInterest) : "-"}</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">You Receive</span>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                <span>{toReceive > 0 ? formatAsLongerNumber(toReceive) : "-"}</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Maturity Date</span>
              <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                {maturityLabel}
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <span className="text-white text-xs font-baloo font-semibold uppercase tracking-wide">Total to Repay</span>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none justify-center">
                <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                <span>{totalToRepay > 0 ? formatAsLongerNumber(totalToRepay) : "-"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-0 mt-0">
          <div className="text-HoneyYellow font-amaticbold text-2xl text-center px-2 mb-1">Interest is deducted upfront from your loan amount</div>
          <div className="w-full [&_button]:!mt-0">
            <BorrowButtonMobile />
          </div>
        </div>
      </div>
    );
  };

  const renderBorrowView = () => {
    const toReceive = loanAmount - loanInterest;
    const totalToRepay = loanAmount;
    const maturityLabel = loanExpiration || "mm-dd-yyyy";

    return (
      <>
        <div className="space-y-3">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <h2 className="font-amaticbold text-4xl leading-none font-semibold">Select Collateral</h2>
              <div className="relative">
                <button
                  type="button"
                  className="ml-1 h-8 w-8 flex items-center justify-center rounded-md hover:opacity-90 cursor-pointer"
                  aria-label="Open filters"
                  onClick={() => setFiltersOpen((open) => !open)}
                >
                  <img src="/images/icons/filter.svg" alt="filter" className="h-5 w-5" />
                </button>
                {filtersOpen && (
                  <div
                    className="absolute right-0 slide-out-to-top-full mb-2 z-50 w-auto min-w-[140px] rounded-2xl shadow-2xl"
                    style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative p-1.5">
                      <div className="flex items-center justify-between px-1 py-0.5">
                        <span className="text-HoneyYellow font-baloo text-lg">Collections</span>
                        <button className="text-white/70 hover:text-white cursor-pointer" onClick={() => setFiltersOpen(false)}>
                          <img src="/images/icons/clear.svg" alt="close" className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-1 flex flex-col gap-1.5 px-1">
                        {collectionNames.map((name) => (
                          <label key={name} className="relative flex items-center gap-1 text-white font-baloo font-semibold text-base leading-none cursor-pointer whitespace-nowrap select-none">
                            <input
                              type="checkbox"
                              className="peer appearance-none h-4 w-4 rounded-sm border border-HoneyYellow bg-HoneyYellow/20 checked:bg-HoneyYellow cursor-pointer"
                              checked={!!selectedCollections[name]}
                              onChange={(e) => setSelectedCollections((prev) => ({ ...prev, [name]: e.target.checked }))}
                            />
                            <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 hidden peer-checked:block">
                              <path d="M5 10l3 3 7-7" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="pl-1 whitespace-nowrap">{name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="h-0.5 w-full max-w-[280px] bg-stone-800 mx-auto" />
            <div className="w-full max-w-[280px]">
              <div className="ml-1 relative h-8 w-full">
                <img
                  src="/images/icons/search.svg"
                  alt="search"
                  className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2"
                />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 h-8 w-full text-sm font-baloo text-HoneyYellow placeholder:text-HoneyYellow/70 border-HoneyYellow/50 focus-visible:border-HoneyYellow"
                  value={idQuery}
                  onChange={(e) => setIdQuery(e.target.value)}
                  aria-label="Search by ID"
                />
                {idQuery && (
                  <button
                    type="button"
                    aria-label="Clear"
                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:opacity-90 z-10 cursor-pointer"
                    onClick={() => setIdQuery("")}
                  >
                    <img src="/images/icons/clear.svg" alt="clear" className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          {renderCollateralSection()}
        </div>

        <div className="flex flex-col gap-2 w-full -mt-2">
          <h2 className="font-amaticbold text-center text-3xl font-bold text-white">Loan Config</h2>
          <div className="h-0.5 w-[140px] bg-stone-800 mx-auto" />
          <div className="flex w-full items-center gap-2">
            <span className="text-white font-baloo font-semibold text-lg whitespace-nowrap">Loan Duration</span>
            <div className="grid grid-cols-4 gap-2 flex-1">
              {QUICK_DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={cn(
                    "w-full flex items-center justify-center px-2 py-1.5 rounded-lg border text-sm font-baloo transition-all cursor-pointer text-center",
                    daysTilExpiration === d
                      ? "bg-HoneyYellow text-black border-HoneyYellow/50"
                      : "bg-transparent text-white border-amber-900/30"
                  )}
                  onClick={() => handleSliderChange(String(d))}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/20 border border-amber-900/30 w-full">
            <Slider
              min={7}
              max={30}
              step={1}
              value={[daysTilExpiration]}
              onValueChange={(v: number[]) => handleSliderChange(String(v[0]))}
              className="flex-1"
            />
            <span className="inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none whitespace-nowrap">
              {daysTilExpiration} Days
            </span>
          </div>
          <div className="flex w-full items-center justify-between mb-1">
            <span className="text-white font-baloo font-semibold text-base">Loan Amount (Before Interest)</span>
          </div>
          <div className="flex items-center gap-2 py-2 pr-2 pl-0 rounded-xl bg-black/20 border border-amber-900/30 focus-within:ring-2 focus-within:ring-amber-700/50">
            <div className="relative w-full">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2" />
              <input
                id="loan-amount-input"
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                className="w-full bg-transparent border-none font-baloo text-lg font-bold text-white caret-white placeholder:text-white/60 focus:outline-none pl-8"
                value={borrowDisplayString}
                onChange={(e) => handleBorrowChange(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="w-12 py-1.5 rounded-lg text-xs font-baloo bg-amber-600/40 hover:bg-amber-700/60 border border-amber-600/30 text-amber-200 transition-colors cursor-pointer"
              onClick={() => handleBorrowChange(borrowLimit.toString())}
            >
              MAX
            </button>
          </div>
          {renderLoanSummary(toReceive, totalToRepay, maturityLabel)}
        </div>
      </>
    );
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

//   if (notification.toggle) {
//     return (
//       <div className={cardClasses}>
//         <LendNotificationMobile />
//       </div>
//     );
//   }

  return <div className={`${cardClasses} space-y-5`}>{renderBorrowView()}</div>;
};
