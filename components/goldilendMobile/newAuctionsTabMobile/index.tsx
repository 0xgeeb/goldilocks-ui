"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { cn } from "@/app/_components/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useGoldilend } from "@/providers";
import { useGoldilendTx } from "../../../hooks";
import { contracts } from "../../../utils/addressi";
import { bongbears } from "../../../utils/bongbears";

type InputValuesType = {
  [key: number]: string;
};

const COUNTDOWN_REGEX = /\d+d \d+h/;
const isTimerString = (value: string) => COUNTDOWN_REGEX.test(value);

export const NewAuctionsTabMobile = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({
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

  const { address, isConnected } = useAccount();

  const {
    auctionList,
    auctionsLoading,
    findAuctions,
    txConfirming,
    setTxConfirming,
    openNotification,
    goldilendInfo,
  } = useGoldilend();

  const {
    sendHoneyApproveTx,
    checkRepayAllowance,
    sendPlaceBidTx,
    sendCloseAuctionTx,
  } = useGoldilendTx();

  const filterCategories = [
    { key: "EXPIRING_SOON", label: "Expiring Soon" },
    { key: "HIGH_VALUE", label: "High Value" },
    { key: "NO_BIDS", label: "No Bids" },
    { key: "ENDED", label: "Ended" },
    { key: "ACTIVE", label: "Active" },
    { key: "MY_BIDS", label: "My Bids" },
  ];

  const formatNum = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  // Format address to show shortened version
  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Format timestamp to relative time
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

  const formatBeraName = (collectionNFT: string, tokenId: number, tokenIdRaw?: string): string => {
    // Normalize address to lowercase for comparison
    const normalizedAddress = collectionNFT?.toLowerCase();

    // Map contract address to collection name (normalize all to lowercase)
    const contractToName: Record<string, string> = {
      [contracts.fakebear.address.toLowerCase()]: "Fake Bear",
      [contracts.bitbear.address.toLowerCase()]: "Bit Bear",
      [contracts.babybear.address.toLowerCase()]: "Baby Bear",
      [contracts.boobear.address.toLowerCase()]: "Boo Bear",
      [contracts.bondbear.address.toLowerCase()]: "Bond Bear",
      [contracts.bandbear.address.toLowerCase()]: "Band Bear",
      [contracts.bongbear.address.toLowerCase()]: "Bong Bear",
    };

    const collectionName = contractToName[normalizedAddress] || "Unknown Bear";
    // Use raw token ID if available (for Bong Bears), otherwise use the number
    const tokenIdStr = tokenIdRaw || String(tokenId);

    // Abbreviate long Bong Bear token IDs
    if (collectionName === "Bong Bear" && tokenIdStr.length > 10) {
      const abbreviated = `${tokenIdStr.slice(0, 6)}...${tokenIdStr.slice(-4)}`;
      return `${collectionName} #${abbreviated}`;
    }

    return `${collectionName} #${tokenIdStr}`;
  };

  const getBeraImageUrl = (collectionNFT: string, tokenId: number | string, tokenIdRaw?: string): string => {
    // Normalize address to lowercase for comparison
    const normalizedAddress = collectionNFT?.toLowerCase();

    // Special handling for Bong Bear collection
    if (normalizedAddress === contracts.bongbear.address.toLowerCase()) {
      // Use raw token ID if available (for very large Bong Bear IDs)
      const tokenIdStr = tokenIdRaw || String(tokenId);
      const url = bongbears[tokenIdStr];
      if (url) {
        return url;
      }
    }

    const ipfsMap: Record<string, { hash: string; extension: string }> = {
      [contracts.fakebear.address.toLowerCase()]: { hash: "bafybeihgxnn7fec5vozkittbginoq4jhn2ctwgke3mbph2rnmtdmjt364m", extension: "jpg" },
      [contracts.bitbear.address.toLowerCase()]: { hash: "Qmek1nCGxXmSGj6qq15eyxwkh8CpDN6vc9zrzQpQxAf2nm", extension: "gif" },
      [contracts.babybear.address.toLowerCase()]: { hash: "bafybeigmu2j3b562vwcu43n2pzpezevw3m6jj7q7diwaefy6s5zc6gzak4", extension: "jpg" },
      [contracts.boobear.address.toLowerCase()]: { hash: "bafybeiftuvpxxtr5y3kvf5rvdy6i37h6kqklatksj3e66by4vvtg2b4x2u", extension: "jpg" },
      [contracts.bondbear.address.toLowerCase()]: { hash: "bafybeifikg7bvjizari7dtdejd54mj6smllgbh37alps2roan73d5674sm", extension: "jpg" },
      [contracts.bandbear.address.toLowerCase()]: { hash: "bafybeihgxnn7fec5vozkittbginoq4jhn2ctwgke3mbph2rnmtdmjt364m", extension: "jpg" },
    };

    const defaultConfig = { hash: "bafybeihgxnn7fec5vozkittbginoq4jhn2ctwgke3mbph2rnmtdmjt364m", extension: "jpg" };
    const config = ipfsMap[normalizedAddress] || defaultConfig;

    return `https://ipfs.io/ipfs/${config.hash}/${tokenId}.${config.extension}`;
  };

  // Per-auction countdowns
  const [auctionCountdowns, setAuctionCountdowns] = useState<Record<number, string>>({});
  useEffect(() => {
    const compute = () => {
      const now = Math.floor(Date.now() / 1000);
      const pad = (n: number) => n.toString().padStart(2, "0");
      const map: Record<number, string> = {};
      auctionList.forEach((a) => {
        if (a.endDate <= now) {
          map[a.auctionId] = "Ended";
        } else {
          const diff = a.endDate - now;
          const days = Math.floor(diff / (24 * 3600));
          const hours = Math.floor((diff % (24 * 3600)) / 3600);
          const mins = Math.floor((diff % 3600) / 60);
          const secs = diff % 60;
          map[a.auctionId] = `${days}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
        }
      });
      setAuctionCountdowns(map);
    };
    const id = setInterval(compute, 1000);
    compute();
    return () => clearInterval(id);
  }, [auctionList]);

  const filteredAuctions = useMemo(() => {
    let filtered = auctionList;

    if (selectedFilters.MY_BIDS) {
      // If My Bids is selected, only show auctions where user is the highest bidder
      filtered = filtered.filter((a) => a.highestBidder === address);
    } else {
      // Otherwise, filter by status filters
      filtered = filtered.filter((a) => selectedFilters[a.status]);
    }

    return filtered;
  }, [auctionList, selectedFilters, address]);

  const handleInputChange = (auctionId: number, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [auctionId]: value,
    }));
  };

  const handleBidBack = () => {
    setActiveBidAuctionId(null);
  };

  const getMinimumBid = (auction: typeof auctionList[0]) => {
    return auction.currentHighestBid && auction.currentHighestBid > auction.outstandingDebt
      ? auction.currentHighestBid
      : auction.outstandingDebt;
  };

  const handleBidConfirm = async () => {
    if (!activeBidAuctionId || !address) return;

    const auction = auctionList.find(a => a.auctionId === activeBidAuctionId);
    if (!auction) return;

    const bidAmount = parseFloat(inputValues[activeBidAuctionId] || "0");
    if (bidAmount <= 0) {
      console.error("Bid amount must be greater than 0");
      return;
    }

    const minimumBid = getMinimumBid(auction);
    if (bidAmount <= minimumBid) {
      return;
    }

    try {
      setTxConfirming(true);

      // Check HONEY allowance
      const hasAllowance = await checkRepayAllowance(bidAmount, address);

      if (!hasAllowance) {
        await sendHoneyApproveTx(bidAmount, true);
      }

      // Place bid (loanOriginator, loanId, bidAmount)
      const tx = await sendPlaceBidTx(auction.loanOriginator, auction.loanId, bidAmount);

      if (tx.startsWith("0x")) {
        openNotification(true, "Bid Placed", `Successfully bid ${bidAmount} HONEY`, tx);
        findAuctions(); // Refresh auction list
        setActiveBidAuctionId(null);
        setInputValues(prev => ({ ...prev, [activeBidAuctionId]: "" }));
      }
    } catch (error) {
      console.error("Bid error:", error);
    } finally {
      setTxConfirming(false);
    }
  };

  const handleButtonClick = (auctionId: number) => {
    setActiveBidAuctionId(auctionId);
    setInputValues((prev) => ({
      ...prev,
      [auctionId]: "",
    }));
  };

  const activeDetailsAuction = useMemo(() => {
    return auctionList.find((a) => a.auctionId === activeDetailsAuctionId) || null;
  }, [auctionList, activeDetailsAuctionId]);

  const getStatusLabel = (status: string) => {
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

  const cardClasses =
    "rounded-3xl border border-amber-900/40 bg-black/85 p-3 sm:p-4 text-white shadow-2xl";

  return (
    <div className="space-y-4">
      {/* Summary Section */}
      <div className={cardClasses}>
        <div className="flex flex-col items-center gap-2 mb-4">
          <h2 className="font-amaticbold text-center text-3xl font-bold text-white">Summary</h2>
          <div className="h-0.5 w-[140px] bg-stone-800 mx-auto" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Active Auctions</div>
            <span className="mt-1 inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              {auctionList.filter(a => a.status !== "ENDED").length}
            </span>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Total Value</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
              <span>{formatNum(auctionList.reduce((sum, a) => sum + a.collateralValue, 0))}</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Total Debt</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
              <span>{formatNum(auctionList.reduce((sum, a) => sum + a.outstandingDebt, 0))}</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-3 py-2">
            <div className="text-white text-sm font-baloo font-semibold">Avg. Discount</div>
            <span className="mt-1 inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg leading-none">
              {auctionList.length > 0
                ? formatNum(auctionList.reduce((sum, a) => sum + a.potentialDiscount, 0) / auctionList.length)
                : "0"}%
            </span>
          </div>
        </div>
      </div>

      {/* Auctions Section */}
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
                            className="peer appearance-none h-4 w-4 rounded-sm border border-HoneyYellow bg-HoneyYellow/20 checked:bg-HoneyYellow cursor-pointer"
                            checked={!!selectedFilters[key]}
                            onChange={(event) => {
                              if (key === "MY_BIDS") {
                                if (event.target.checked) {
                                  // When My Bids is checked, uncheck all other filters
                                  setSelectedFilters({
                                    EXPIRING_SOON: false,
                                    HIGH_VALUE: false,
                                    NO_BIDS: false,
                                    ENDED: false,
                                    ACTIVE: false,
                                    MY_BIDS: true,
                                  });
                                } else {
                                  // When My Bids is unchecked, check all other filters
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
                                // For other filters, if checked, uncheck MY_BIDS
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
                {/* Header: Auction ID + Status Badge */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <h3 className="font-amaticbold text-white text-2xl">
                      Auction #{auction.auctionId}
                    </h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                      {formatBeraName(auction.collateralNFT, auction.beraId, auction.beraIdRaw)}
                    </span>
                  </div>
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
                </div>

                {/* Body: Collateral + Stats */}
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center min-w-[80px]">
                    <img
                      className="border-2 border-black w-[80px] h-[80px] object-cover rounded-md"
                      src={getBeraImageUrl(auction.collateralNFT, auction.beraId, auction.beraIdRaw)}
                      alt={formatBeraName(auction.collateralNFT, auction.beraId, auction.beraIdRaw)}
                    />
                    <div className="flex flex-col items-center gap-1 w-full mt-2">
                      <span className="text-white font-baloo font-semibold uppercase tracking-wide text-xs">Discount</span>
                      <span className="inline-flex items-center rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none justify-center w-full px-2 py-1 text-xs">
                        {formatNum(auction.potentialDiscount)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="rounded-xl bg-black/10 border border-amber-900/30 flex flex-col gap-2 px-3 py-2">
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="text-white font-baloo font-semibold uppercase tracking-wide text-xs">Value</span>
                        <div className="inline-flex items-center gap-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none px-2 py-1 text-xs">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                          <span>{formatNum(auction.collateralValue)}</span>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="text-white font-baloo font-semibold uppercase tracking-wide text-xs">Debt</span>
                        <div className="inline-flex items-center gap-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none px-2 py-1 text-xs">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                          <span>{formatNum(auction.outstandingDebt)}</span>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="text-white font-baloo font-semibold uppercase tracking-wide text-xs">Highest Bid</span>
                        <div className="inline-flex items-center gap-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none px-2 py-1 text-xs">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-3 w-3" />
                          <span>{auction.currentHighestBid ? formatNum(auction.currentHighestBid) : "No bids"}</span>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="text-white font-baloo font-semibold uppercase tracking-wide text-xs">Ends in</span>
                        {(() => {
                          const countdownLabel = auctionCountdowns[auction.auctionId] || "-";
                          const isTimer = isTimerString(countdownLabel);
                          return (
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo leading-none whitespace-nowrap justify-center px-2 py-1 text-xs",
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

                {/* Bottom actions */}
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
                              className="w-full rounded-xl border border-amber-900/40 bg-black/20 pl-8 pr-3 py-2 text-sm font-baloo text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                              placeholder="0.00"
                              value={inputValues[auction.auctionId] ?? ""}
                              onChange={(event) => handleInputChange(auction.auctionId, event.target.value)}
                            />
                          </div>
                          <p className="text-white/60 text-xs font-baloo mt-1 ml-1">
                            Must bid more than {formatNum(getMinimumBid(auction))} HONEY
                          </p>
                        </div>
                        <button
                          className="flex-none px-3 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20"
                          onClick={handleBidBack}
                          disabled={txConfirming}
                        >
                          Back
                        </button>
                        <button
                          className={cn(
                            "flex-none px-3 py-2 rounded-xl font-baloo text-sm font-bold transition-all border",
                            parseFloat(inputValues[auction.auctionId] || "0") > getMinimumBid(auction) && !txConfirming
                              ? "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50 cursor-pointer"
                              : "bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                          )}
                          onClick={handleBidConfirm}
                          disabled={parseFloat(inputValues[auction.auctionId] || "0") <= getMinimumBid(auction) || txConfirming}
                        >
                          {txConfirming ? "Confirming..." : "Confirm"}
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
                            const auctionEnded = auction.status === "ENDED";
                            return (
                              <button
                                className={cn(
                                  "flex-1 py-2 rounded-xl font-baloo text-sm font-bold transition-all border cursor-pointer",
                                  auctionEnded
                                    ? "bg-amber-600/40 text-amber-300 border-amber-700/50 hover:bg-amber-700/60"
                                    : "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                                ) as string}
                                id={`bid-button${auction.auctionId}`}
                                onClick={async () => {
                                  if (auctionEnded) {
                                    // Close auction
                                    const button = document.getElementById(`bid-button${auction.auctionId}`) as HTMLButtonElement | null;
                                    if (!account) {
                                      if (button && button.innerHTML === "Connect Wallet") openConnectModal();
                                      else if (button) button.innerHTML = "Connect Wallet";
                                    } else if (chain?.name !== "Berachain") {
                                      if (button && button.innerHTML === "Where Berachain??") openChainModal();
                                      else if (button) button.innerHTML = "Where Berachain??";
                                    } else {
                                      try {
                                        setTxConfirming(true);
                                        await sendCloseAuctionTx(auction.loanOriginator, auction.loanId);
                                        findAuctions(); // Refresh auction list
                                      } catch (error) {
                                        console.error("Close auction error:", error);
                                      } finally {
                                        setTxConfirming(false);
                                      }
                                    }
                                    return;
                                  }
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
                                {auctionEnded ? "Close Auction" : "Place Bid"}
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

      {/* Details Dialog */}
      <Dialog open={!!activeDetailsAuction} onOpenChange={(open) => { if (!open) setActiveDetailsAuctionId(null); }}>
        {activeDetailsAuction && (
          <DialogContent className="max-w-[90vw] w-full max-h-[90vh] bg-black/90 border border-amber-900/40 rounded-2xl p-4 text-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between pr-8">
              <div className="flex items-center gap-2">
                <h3 className="font-amaticbold text-3xl">Auction #{activeDetailsAuction.auctionId}</h3>
                <span className="inline-flex items-center h-8 px-3 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                  {formatBeraName(activeDetailsAuction.collateralNFT, activeDetailsAuction.beraId, activeDetailsAuction.beraIdRaw)}
                </span>
              </div>
              <span
                className={cn(
                  "inline-flex items-center h-8 px-3 rounded-full text-sm font-baloo border",
                  activeDetailsAuction.status === "EXPIRING_SOON" && "bg-amber-900/40 text-amber-300 border-amber-700/50",
                  activeDetailsAuction.status === "HIGH_VALUE" && "bg-purple-900/30 text-purple-300 border-purple-700/50",
                  activeDetailsAuction.status === "NO_BIDS" && "bg-blue-900/30 text-blue-300 border-blue-700/50",
                  activeDetailsAuction.status === "ENDED" && "bg-red-900/30 text-red-300 border-red-700/50",
                  activeDetailsAuction.status === "ACTIVE" && "bg-emerald-900/30 text-emerald-300 border-emerald-700/50"
                ) as string}
              >
                {getStatusLabel(activeDetailsAuction.status)}
              </span>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 min-h-0 overflow-y-auto mt-2 space-y-4">
              {/* Overview */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center min-w-[80px]">
                  <img
                    className="border-2 border-black w-[80px] h-[80px] object-cover rounded-md"
                    src={getBeraImageUrl(activeDetailsAuction.collateralNFT, activeDetailsAuction.beraId, activeDetailsAuction.beraIdRaw)}
                    alt={formatBeraName(activeDetailsAuction.collateralNFT, activeDetailsAuction.beraId, activeDetailsAuction.beraIdRaw)}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="rounded-xl bg-black/10 border border-amber-900/30 px-4 py-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide">Value</span>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                          <span>{formatNum(activeDetailsAuction.collateralValue)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide">Debt</span>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                          <span>{formatNum(activeDetailsAuction.outstandingDebt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide">Highest Bid</span>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                          <span>{activeDetailsAuction.currentHighestBid ? formatNum(activeDetailsAuction.currentHighestBid) : "No bids"}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide">Discount</span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                          {formatNum(activeDetailsAuction.potentialDiscount)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide">Ends in</span>
                        {(() => {
                          const countdownLabel = auctionCountdowns[activeDetailsAuction.auctionId] || "-";
                          const isTimer = isTimerString(countdownLabel);
                          return (
                            <span
                              className={cn(
                                "inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none whitespace-nowrap justify-center",
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
              </div>

              {/* Winner Info or Current Status */}
              {activeDetailsAuction.status === "ENDED" && !activeDetailsAuction.currentHighestBid ? (
                // Ended without bids - Protocol transfer
                <div className="rounded-xl bg-black/20 border border-amber-900/30 p-6 text-center">
                  <img src="/images/logo-goldilocks.png" alt="Goldilocks" className="h-20 w-20 mx-auto mb-4" />
                  <h4 className="font-amaticbold text-3xl font-bold text-white mb-2">Transferred to Protocol</h4>
                  <p className="text-white text-base font-baloo font-semibold">No bids were placed during the 48-hour auction period.</p>
                  <p className="text-white text-base font-baloo font-semibold mt-2">NFT has been transferred to the protocol multisig.</p>
                </div>
              ) : activeDetailsAuction.status === "ENDED" && activeDetailsAuction.highestBidder?.toLowerCase() === address?.toLowerCase() ? (
                // Ended - User won
                <div>
                  <h4 className="font-amaticbold text-center text-4xl font-bold text-white">Winner</h4>
                  <div className="h-0.5 w-[140px] bg-stone-800 mx-auto mt-0.5 mb-4" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
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
                  <ConnectButton.Custom>
                    {({ account, chain, openChainModal, openConnectModal }) => (
                      <button
                        className="w-full py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                        onClick={async () => {
                          if (!account) {
                            openConnectModal();
                          } else if (chain?.name !== "Berachain") {
                            openChainModal();
                          } else {
                            try {
                              setTxConfirming(true);
                              const tx = await sendCloseAuctionTx(activeDetailsAuction.loanOriginator, activeDetailsAuction.loanId);

                              if (tx.startsWith("0x")) {
                                openNotification(true, "NFT Claimed", `Successfully claimed Bera #${activeDetailsAuction.beraId}`, tx);
                                findAuctions(); // Refresh auction list
                                setActiveDetailsAuctionId(null);
                              }
                            } catch (error) {
                              console.error("Claim error:", error);
                            } finally {
                              setTxConfirming(false);
                            }
                          }
                        }}
                      >
                        Claim
                      </button>
                    )}
                  </ConnectButton.Custom>
                </div>
              ) : (
                // Active or ended auctions
                <div className="rounded-xl bg-black/20 border border-amber-900/30 p-6 text-center">
                  {activeDetailsAuction.currentHighestBid ? (
                    <>
                      <h4 className="font-amaticbold text-3xl font-bold text-white mb-2">Current Highest Bid</h4>
                      <div className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none">
                        <img src="/images/logo-honey.png" alt="HONEY" className="h-6 w-6" />
                        <span>{formatNum(activeDetailsAuction.currentHighestBid)}</span>
                      </div>
                      {activeDetailsAuction.highestBidder && (
                        <p className="text-white/70 text-sm font-baloo mt-2">
                          Bidder: {formatAddress(activeDetailsAuction.highestBidder)}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <h4 className="font-amaticbold text-3xl font-bold text-white mb-2">No Bids Yet</h4>
                      <p className="text-white/70 text-lg font-baloo font-semibold">
                        Be the first to place a bid!
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
