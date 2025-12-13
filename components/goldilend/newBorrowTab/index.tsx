"use client"

import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { cn } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { FormWrapper } from "@/app/(geo-check)/goldivault/vault/[address]/_components/./FormComponents";

import { formatAsString, formatAsLongerNumber } from "@/app/_components/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import Slider from "@/components/ui/slider";
// Card wrappers not needed for image-only carousel items

import { useGoldilend } from "@/providers";
import { useGoldilendTx } from "../../../hooks";
import { contracts } from "../../../utils/addressi";
import { bongbears } from "../../../utils/bongbears";


export const NewBorrowTab = () => {

    const [daysTilExpiration, setDaysTilExpiration] = useState<number>(7);
    useEffect(() => {
        // ensure initial calculations run on page load for 7 days
        handleSliderChange(String(7));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [idQuery, setIdQuery] = useState<string>("");
    const collectionNames = useMemo(() => [
        "Bong Bear",
        "Bond Bear",
        "Boo Bear",
        "Band Bear",
        "Baby Bear",
        "Bit Bear",
        "Fake Bear"
    ], []);
    const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
    const [selectedCollections, setSelectedCollections] = useState<Record<string, boolean>>(
        () => collectionNames.reduce((acc, n) => { acc[n] = true; return acc; }, {} as Record<string, boolean>)
    );
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const [openTooltip, setOpenTooltip] = useState<string | null>(null);
    
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
        // txConfirming,
        setTxConfirming,
        // notification,
        changeActiveToggle,
        openNotification,
        getInterestRate,
        debouncedLoanAmount,
        debouncedLoanExpiration,
        loanInterest,
        setLoanInterest,
        loanInterestRate,
        setLoanInterestRate,
        updateOwnedBeras,
        findLoans,
        goldilendInfo
    } = useGoldilend();

    const { checkLoanAllowance, sendGoldilendNFTApproveTx, sendBorrowTx } = useGoldilendTx();
    
    const { address, isConnected } = useAccount();

    useEffect(() => {
        const q = idQuery.replace(/[^0-9]/g, "");
        if (!carouselApi || !q) return;
        const exactIdx = ownedBeras.findIndex((b) => String(b.id) === q);
        if (exactIdx >= 0) {
            // Snap to the slide where the exact match is located
            try { carouselApi.scrollTo(exactIdx, true); } catch { /* noop */ }
        }
    }, [idQuery, carouselApi, ownedBeras]);
    
    const enabledCollections = useMemo(() => new Set(
        Object.keys(selectedCollections).filter((k) => selectedCollections[k])
    ), [selectedCollections]);

    const visibleMockBeras = useMemo(() => {
        return ownedBeras.filter((b) => enabledCollections.has(b.name.split(" #")[0]));
    }, [ownedBeras, enabledCollections]);

    const prettyFromReal = (n: string) => n.replace("Bera", " Bear");
    const filteredOwnedBeras = useMemo(() => {
        // return ownedBeras.filter((bera) => enabledCollections.has(prettyFromReal(bera.name)));
        return ownedBeras.filter((bera) => enabledCollections.has(bera.name.split(" #")[0]));
    }, [ownedBeras, enabledCollections]);

    // useEffect(() => {
    //     if (showMock && selectedBera.name === "" && mockBeras.length > 0) {
    //         handleBeraClick(mockBeras[0]);
    //     }
    // }, [showMock, selectedBera.name, mockBeras, handleBeraClick]);

    useEffect(() => {
        updateBorrowLimit();
    }, [selectedBera]);

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
    }, [selectedBera, debouncedLoanAmount, debouncedLoanExpiration, getInterestRate, setLoanInterest, setLoanInterestRate]);

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

    const loadingElement = () => {
        return <span className="loader-small mx-auto mt-[10%]"></span>;
    };

    const checkDate = (dateString: string): boolean => {
        const dateParts = dateString.split("-");
        const [month, day, year] = dateParts.map(Number);
        const parsedDate = new Date(year, month - 1, day);
        const timestamp = parsedDate.getTime();
        const timestampDigits = Math.floor(timestamp / 1000);
        if (dateParts.length !== 3) {
            return false;
        }
        if (isNaN(month) || isNaN(day) || isNaN(year)) {
            return false;
        }
        if (isNaN(parsedDate.getTime())) {
            return false;
        }
        if (timestampDigits < Math.floor(Date.now() / 1000)) {
            return false;
        }

        // Check if the date is at least the next calendar day
        const currentDate = new Date();
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); // Set to start of tomorrow

        if (parsedDate < tomorrow) {
            return false;
        }
        return true;
    };

    const parseDate = (dateString: string): number => {
        const dateParts = dateString.split("-");
        const [month, day, year] = dateParts.map(Number);
        const parsedDate = new Date(year, month - 1, day);
        const timestamp = parsedDate.getTime();
        const currentTimestamp = Date.now();
        return Math.floor((timestamp - currentTimestamp) / 1000);
    };

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

    const handleButtonClick = async () => {
        const button = document.getElementById("borrow-button");
        if (loanAmount == 0) {
            button && (button.innerHTML = "no loan");
            return;
        }
        if (!checkDate(loanExpiration)) {
            button && (button.innerHTML = "invalid expiration");
            return;
        }
        if (selectedBera.name === "") {
            button && (button.innerHTML = "no collateral");
            return;
        }
        if (loanAmount + loanInterest > borrowLimit) {
            button && (button.innerHTML = "exceeds limit");
            return;
        }

        const selectedBeraContract = getSelectedBeraContractAddress();
        const isApproved = await checkLoanAllowance(
            address as `0x${string}`,
            selectedBeraContract
        );

        if (isApproved) {
            borrowTxFlow(button);
        } else {
            console.log('approve flow')
            button && (button.innerHTML = "approving...");
            await sendGoldilendNFTApproveTx(selectedBeraContract);
            button && (button.innerHTML = "deposit & borrow");
        }
    };

    const borrowTxFlow = async (button: HTMLElement | null) => {
    setTxConfirming(true);
    if (button) {
        button.innerHTML = "confirming...";
        button.classList.remove("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
        button.classList.add("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
    }
    const borrowTx = await sendBorrowTx(
        loanAmount,
        selectedBera,
        parseDate(loanExpiration) > 86400 ? parseDate(loanExpiration) : 86400,
    );
    if (borrowTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
        true,
        "You've successfully created a loan",
        `You borrowed ${formatAsString(loanAmount - loanInterest)} HONEY against your bera`,
        borrowTx,
        );
        button && (button.innerHTML = "deposit & borrow");
        if (button) {
            button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
            button.classList.add("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
        }
        
        updateOwnedBeras(selectedBera);
        findLoans();
        changeActiveToggle("BORROW");
        setDaysTilExpiration(7);
        setTimeout(() => {
        openNotification(false, "", "", "");
        }, 10000);
    } else {
        button && (button.innerHTML = "deposit & borrow");
        if (button) {
            button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
            button.classList.add("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
        }
        changeActiveToggle("BORROW");
        setDaysTilExpiration(7);
        setTxConfirming(false);
    }
    };

    // replaced native slider; keep computed value if needed elsewhere

    const handleSliderChange = (days: string) => {
    const daysNum = parseFloat(days);
    setDaysTilExpiration(daysNum);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysNum);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString();
    handleLoanDateChange(`${month}-${day}-${year}`);
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

    return (
        <div className="w-full flex flex-col xl:flex-row xl:items-stretch gap-6">
            <div className="w-full xl:flex-1 xl:min-w-0 flex flex-col gap-4">
                <div className="flex flex-col items-center h-full gap-4 p-1 pb-0">
                    <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
                        <h2 className="font-amaticbold text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">Select Collateral</h2>
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
                                  className="absolute left-0 slide-out-to-top-full mb-2 z-50 w-56 rounded-2xl shadow-2xl"
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
                                    <div className="mt-1 grid grid-cols-2 gap-1.5 px-1">
                                      {collectionNames.map((name) => (
                                        <label key={name} className="relative flex items-center gap-1 text-white font-baloo font-semibold text-base leading-none cursor-pointer select-none">
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
                        <div className="relative h-9 w-full max-w-[200px] sm:max-w-[220px]">
                            <img src="/images/icons/search.svg" alt="search" className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="pl-9 h-full w-full text-sm sm:text-base md:text-lg font-baloo text-HoneyYellow placeholder:text-HoneyYellow/70 border-HoneyYellow/50 focus-visible:border-HoneyYellow"
                                aria-label="Search by ID"
                                value={idQuery}
                                onChange={(e) => setIdQuery(e.target.value)}
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
                    <div className="h-0.5 w-full max-w-md bg-stone-800 mx-auto mb-4" />
                    <div className="w-full flex items-center justify-center">
                        <div className="relative mx-auto w-full max-w-[1200px] h-[200px] sm:h-[220px]">
                            {
                                berasLoading ? (
                                    <div className="flex justify-center items-center">
                                        {loadingElement()}
                                    </div>
                                ) :
                                visibleMockBeras.length === 0 ? (
                                    <div className="flex h-full items-center justify-center opacity-50 mx-auto w-full">
                                    <div className="flex flex-col items-center">
                                        <img className="mb-[5%] w-[40%] md:w-[20%]" src="/images/icon-not-found.png" alt="not-found" />
                                        <h2 className="font-amaticbold text-center text-4xl sm:text-5xl md:text-6xl font-bold text-white">no beras</h2>
                                    </div>
                                    </div>
                                ) : (
                                <Carousel opts={{ align: "center", loop: true, slidesToScroll: 1, dragFree: true, containScroll: "trimSnaps" }} className="w-full max-w-[1200px] mx-auto" setApi={setCarouselApi}>
                                    <CarouselContent className="-ml-1 select-none">
                                        {filteredOwnedBeras.map((b, index) => (
                                            <CarouselItem key={index} className="basis-[190px] md:basis-[200px] pl-1 select-none">
                                            <div className="flex flex-col items-center">
                                                <img
                                                className={`block w-full max-w-[190px] md:max-w-[200px] object-contain rounded-xl cursor-pointer ${selectedBera.name === b.name ? "border-4 border-HoneyYellow" : "border-2 border-white/20"}`}
                                                src={getBeraImageUrl(b.name, b.id, b.idRaw)}
                                                alt={b.name}
                                                draggable={false}
                                                onClick={() => handleBeraClick(b)}
                                                />
                                                <div className="mt-1 text-center w-full max-w-[180px]">
                                                <span className="font-amaticbold text-HoneyYellow text-2xl leading-none truncate">{formatBeraName(b.name)}</span>
                                                </div>
                                            </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-[-28px] -translate-x-1/2" />
                                    <CarouselNext className="right-[-28px] translate-x-1/2" />
                                </Carousel>
                            )}
                            {/* centralized selected name removed per request */}
                        </div>
                    </div>
                    {/* Summary cards moved from right to left under carousel */}
                    <div className="w-full mt-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                        <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3 w-full flex flex-col items-center">
                          <div className="text-white text-2xl font-baloo font-semibold text-center">Collateral</div>
                          <div className="mt-1 inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none justify-center">
                            {selectedBera.name ? formatBeraName(selectedBera.name) : "None"}
                          </div>
                        </div>
                        <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3 w-full flex flex-col items-center">
                          <div className="text-white text-2xl font-baloo font-semibold text-center">Value</div>
                          <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none justify-center">
                            <img src="/images/logo-honey.png" alt="HONEY" className="h-5 w-5" />
                            <span>{selectedBera.name ? formatAsLongerNumber(getSelectedBeraFairValue()) : "-"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div className="hidden xl:block w-px bg-stone-800/60" />
            <div className="w-full xl:flex-1 xl:min-w-0 flex flex-col mt-6 xl:mt-0 xl:pl-8">
                <div className="flex flex-col items-stretch justify-between h-full">
                    <FormWrapper className="gap-3 w-full my-0 justify-start pt-1">
                        <h2 className="font-amaticbold text-center text-3xl sm:text-4xl font-bold text-white">
                            Loan Config
                        </h2>
                        <div className="h-0.5 w-24 sm:w-36 bg-stone-800 mx-auto -mt-1 mb-1" />
                        {/* Loan Duration label */}
                        <div className="flex w-full flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className="text-white font-baloo font-semibold text-lg sm:text-xl lg:text-2xl whitespace-nowrap text-center sm:text-left">Loan Duration</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 w-full">
                            {[
                              { d: 7, label: "7 Days" },
                              { d: 14, label: "14 Days" },
                              { d: 21, label: "21 Days" },
                              { d: 30, label: "30 Days" },
                            ].map(({ d, label }) => (
                              <button
                                key={d}
                                className={cn(
                                  "w-full px-3 py-1.5 rounded-lg border text-sm sm:text-base font-baloo transition-all cursor-pointer text-center",
                                  daysTilExpiration === d
                                    ? "bg-HoneyYellow text-black border-HoneyYellow/50"
                                    : "bg-transparent text-white border-amber-900/30"
                                )}
                                onClick={() => handleSliderChange(String(d))}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                        {/* Shadcn slider synced with buttons */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-2.5 rounded-xl bg-black/20 border border-amber-900/30 w-full">
                          <Slider
                            min={7}
                            max={30}
                            step={1}
                            value={[daysTilExpiration]}
                            onValueChange={(v: number[]) => handleSliderChange(String(v[0]))}
                            className="flex-1"
                          />
                          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-base sm:text-lg lg:text-xl leading-none whitespace-nowrap">{daysTilExpiration} Days</span>
                        </div>
                        {/* Amount under duration section */}
                        <div className="flex w-full items-center justify-between mb-1">
                          <span className="text-white font-baloo font-semibold text-xl sm:text-2xl">Loan Amount (Before Interest)</span>
                        </div>
                        <div className="flex items-center gap-3 py-2.5 pr-2.5 pl-0 rounded-xl bg-black/20 border border-amber-900/30 focus-within:ring-2 focus-within:ring-amber-700/50 flex-wrap sm:flex-nowrap">
                            <div className="relative w-full">
                              <img src="/images/logo-honey.png" alt="HONEY" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                  id="loan-amount-input"
                                  type="number"
                                  inputMode="decimal"
                                  placeholder="0.00"
                                  className="w-full bg-transparent border-none font-baloo text-xl sm:text-2xl font-bold text-white caret-white placeholder:text-white/60 focus:outline-none pl-9"
                                  value={borrowDisplayString}
                                  onChange={(e) => handleBorrowChange(e.target.value)}
                              />
                            </div>
                          <button
                            type="button"
                            className="w-full sm:w-16 py-1.5 rounded-lg text-sm font-baloo bg-amber-600/40 hover:bg-amber-700/60 border border-amber-600/30 text-amber-200 transition-colors cursor-pointer"
                            onClick={() => handleBorrowChange(borrowLimit.toString())}
                          >
                            MAX
                          </button>
                        </div>
                        {/* Loan details split into two columns (3/3), with button + text below */}
                        <div className="flex flex-col gap-4 mt-2">
                          <div className="rounded-2xl bg-amber-900/10 border border-amber-900/30 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Left column: first 3 in order */}
                              <div className="flex flex-col gap-3">
                                <div className="flex w-full items-center justify-between gap-4">
                                    <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">Max Borrow</span>
                                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center">
                                    <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                    <span>{formatAsLongerNumber(borrowLimit)}</span>
                                  </div>
                                </div>
                                <div className="flex w-full items-center justify-between gap-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">Interest Rate</span>
                                    {/* <span className="relative inline-flex group">
                                      <span
                                        className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-HoneyYellow/70 text-HoneyYellow text-xs leading-none font-bold cursor-pointer touch-manipulation pointer-events-auto"
                                        aria-label="Rate info"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const tooltipId = "interest-rate-tooltip";
                                          setOpenTooltip(openTooltip === tooltipId ? null : tooltipId);
                                        }}
                                      >
                                        ?
                                      </span>
                                      <div
                                        className={cn(
                                          "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl transition-opacity pointer-events-none shadow-2xl z-50 max-w-[calc(100vw-2rem)]",
                                          "group-hover:opacity-100 md:opacity-0",
                                          openTooltip === "interest-rate-tooltip" ? "opacity-100 md:opacity-100" : "opacity-0"
                                        )}
                                        style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                                      >
                                        <p className="text-HoneyYellow text-base sm:text-lg font-baloo whitespace-nowrap">Adjusts by day: Placeholder</p>
                                        <div
                                          className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
                                          style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", borderRight: "2px solid rgba(205, 133, 63, 0.5)", borderBottom: "2px solid rgba(205, 133, 63, 0.5)" }}
                                        />
                                      </div>
                                    </span> */}
                                  </div>
                                  <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center text-center">{loanInterestRate ? `${Number(loanInterestRate).toFixed(2)}%` : "-"}</div>
                                </div>
                                <div className="flex w-full items-center justify-between gap-4">
                                  <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">Interest (Upfront)</span>
                                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center">
                                    <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                    <span>{loanInterest ? formatAsLongerNumber(loanInterest) : "-"}</span>
                                  </div>
                                </div>
                              </div>
                              {/* Right column: next 3 in order */}
                              <div className="flex flex-col gap-3">
                                <div className="flex w-full items-center justify-between gap-4">
                                  <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">You Receive</span>
                                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center">
                                    <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                    <span>{(loanAmount - loanInterest) > 0 ? formatAsLongerNumber(loanAmount - loanInterest) : "-"}</span>
                                  </div>
                                </div>
                                <div className="flex w-full items-center justify-between gap-4">
                                  <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">Maturity Date</span>
                                  <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center">{loanExpiration || "mm-dd-yyyy"}</div>
                                </div>
                                <div className="flex w-full items-center justify-between gap-4">
                                    <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">Total to Repay</span>
                                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center">
                                    <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                    <span>{(loanAmount) > 0 ? formatAsLongerNumber(loanAmount) : "-"}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Text above button, underneath the 2 columns */}
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="text-HoneyYellow font-amaticbold text-2xl sm:text-3xl text-center px-2">Interest is deducted upfront from your loan amount</div>
                            <div className="w-full">
                              <ConnectButton.Custom>
                                {({ account, chain, openChainModal, openConnectModal }) => {
                                  return (
                                    <button
                                      className={cn(
                                        "w-full py-3 rounded-xl font-amaticbold text-2xl sm:text-3xl transition-all border cursor-pointer",
                                        "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                                      )}
                                      id="borrow-button"
                                      onClick={() => {
                                        const button = document.getElementById("borrow-button");

                                        if(!account) {
                                          if (button && button.innerHTML === "connect wallet") {
                                            openConnectModal()
                                          }
                                          else {
                                            button && (button.innerHTML = "connect wallet");
                                          }
                                        }
                                        else if(chain?.name !== "Berachain") {
                                          if (button && button.innerHTML === "where berachain") {
                                            openChainModal()
                                          }
                                          else {
                                            button && (button.innerHTML = "where berachain");
                                          }
                                        }
                                        else {
                                          handleButtonClick()
                                        }
                                      }}
                                    >
                                      deposit & Borrow
                                    </button>
                                  )
                                }}
                              </ConnectButton.Custom>
                            </div>
                          </div>
                        </div>
                    </FormWrapper>
                </div>
            </div>
            {/* Goldilend Info sidebar removed; stats now shown in marquee */}
        </div>
    )
}

// Removed Frame wrapper; using swap-style outer container
