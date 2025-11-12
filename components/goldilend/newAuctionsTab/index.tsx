"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "@/app/_components/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Bid = {
  address: string;
  amount: number;
  timestamp: number; // unix seconds
};

type MockAuction = {
  auctionId: number;
  collateralValue: number;
  outstandingDebt: number;
  currentHighestBid: number | null;
  potentialDiscount: number;
  endDate: number; // unix seconds
  beraId: number;
  status: "EXPIRING_SOON" | "HIGH_VALUE" | "NO_BIDS" | "ENDED" | "ACTIVE";
  isMyBid: boolean;
  bids: Bid[];
  winner?: string; // address of winner if ended
};

type InputValuesType = {
  [key: number]: string;
};

const COUNTDOWN_REGEX = /\d+d \d+h/;
const isTimerString = (value: string) => COUNTDOWN_REGEX.test(value);

export const NewAuctionsTab = () => {
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

  const filterCategories = [
    { key: "EXPIRING_SOON", label: "Expiring Soon" },
    { key: "HIGH_VALUE", label: "High Value" },
    { key: "NO_BIDS", label: "No Bids" },
    { key: "ENDED", label: "Ended" },
    { key: "ACTIVE", label: "Active" },
    { key: "MY_BIDS", label: "My Bids" },
  ];

  // Mock image mapping
  const mockImgById: Record<number, string> = useMemo(() => ({
    75: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/68b8c1674bf468085f015ed07a3bd6/5968b8c1674bf468085f015ed07a3bd6.jpeg?w=1000",
    90: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/8fac1fd9e0d9b799cf8195eb3c93cc/5f8fac1fd9e0d9b799cf8195eb3c93cc.jpeg?w=1000",
    68: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
    22: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/0e72de6ad7cf6551df57cb583120bb/e50e72de6ad7cf6551df57cb583120bb.jpeg?w=1000",
    31: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/a0ccad5fccf7dbb5ca455a52ae038d/70a0ccad5fccf7dbb5ca455a52ae038d.jpeg?w=1000",
    34: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/db186a56c1c596535493f0928ad705/c6db186a56c1c596535493f0928ad705.jpeg?w=1000",
    44: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/b7f90f33cb12c9b8db5028a6a284c1/b5b7f90f33cb12c9b8db5028a6a284c1.jpeg?w=1000",
  }), []);

  const MY_WALLET = "0x11Dca4B8bbC988d3142008ccaE0264871fbeffE4";

  // Mock auctions
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

    // Calculate potential discount based on min bid
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

  const formatNum = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  // Calculate min bid: if there's a highest bid, use highest bid + 1%, otherwise use debt + 5%
  const calculateMinBid = (auction: MockAuction): number => {
    if (auction.currentHighestBid !== null) {
      return Math.ceil(auction.currentHighestBid * 1.01); // highest bid + 1%
    }
    return Math.ceil(auction.outstandingDebt * 1.05); // debt + 5%
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

  // Per-auction countdowns
  const [auctionCountdowns, setAuctionCountdowns] = useState<Record<number, string>>({});
  useEffect(() => {
    const compute = () => {
      const now = Math.floor(Date.now() / 1000);
      const pad = (n: number) => n.toString().padStart(2, "0");
      const map: Record<number, string> = {};
      mockAuctions.forEach((a) => {
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
  }, [mockAuctions]);

  const filteredAuctions = useMemo(() => {
    let filtered = mockAuctions;
    
    if (selectedFilters.MY_BIDS) {
      // If My Bids is selected, only show auctions where user has bids
      filtered = filtered.filter((a) => a.bids.some((bid) => bid.address === MY_WALLET));
    } else {
      // Otherwise, filter by status filters
      filtered = filtered.filter((a) => selectedFilters[a.status]);
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
    setActiveBidAuctionId(null);
  };

  const handleButtonClick = (auctionId: number) => {
    setActiveBidAuctionId(auctionId);
    setInputValues((prev) => ({
      ...prev,
      [auctionId]: "",
    }));
  };

  // Esc close handled by Dialog; keep state reset on open change

  const activeDetailsAuction = useMemo(() => {
    return mockAuctions.find((a) => a.auctionId === activeDetailsAuctionId) || null;
  }, [mockAuctions, activeDetailsAuctionId]);

  return (
    <div 
      className="relative w-full rounded-3xl border border-amber-600/30 bg-black/20 p-4 sm:p-6"
      style={{
        boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
      }}
    >
      {/* Summary Section */}
      <div className="mb-6">
        <h2 className="text-white font-amaticbold text-5xl mb-4">
          Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
            <div className="text-white text-xl font-baloo font-semibold mb-1">Active Auctions</div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none">12</span>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
            <div className="text-white text-xl font-baloo font-semibold mb-1">Total Value</div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-5 w-5" />
              <span>2,450,000</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
            <div className="text-white text-xl font-baloo font-semibold mb-1">Total Debt</div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none">
              <img src="/images/logo-honey.png" alt="HONEY" className="h-5 w-5" />
              <span>1,850,000</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
            <div className="text-white text-xl font-baloo font-semibold mb-1">Avg. Discount</div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none">24.5%</span>
          </div>
        </div>
      </div>

      {/* Auctions Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-white font-amaticbold text-5xl">
            Auctions
          </h2>
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
                className="absolute left-0 slide-out-to-top-full mb-2 z-50 w-38 rounded-2xl shadow-2xl"
                style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative p-1.5">
                  <div className="flex items-center justify-between px-1 py-0.5">
                    <span className="text-HoneyYellow font-baloo text-lg">Status</span>
                    <button 
                      className="text-white/70 hover:text-white cursor-pointer" 
                      onClick={() => setFiltersOpen(false)}
                    >
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
                          onChange={(e) => {
                            if (key === "MY_BIDS") {
                              if (e.target.checked) {
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
                                [key]: e.target.checked,
                                MY_BIDS: false,
                              }));
                            }
                          }}
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" id="hide-scrollbar">
          {filteredAuctions.map((auction) => (
            <motion.div
              key={auction.auctionId}
              layoutId={`details-card-${auction.auctionId}`}
              className={cn(
                "rounded-2xl border border-amber-900/30 bg-black/20 p-4 flex flex-col gap-3"
              )}
              aria-hidden={activeDetailsAuctionId === auction.auctionId || undefined}
            >
              {/* Header: Auction ID + Status Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.h3 layoutId={`details-title-${auction.auctionId}`} className="font-amaticbold text-4xl text-white">Auction #{auction.auctionId}</motion.h3>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xl leading-none">Bong Bear #{auction.beraId}</span>
                </div>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-baloo border",
                    auction.status === "EXPIRING_SOON" && "bg-amber-900/40 text-amber-300 border-amber-700/50",
                    auction.status === "HIGH_VALUE" && "bg-purple-900/30 text-purple-300 border-purple-700/50",
                    auction.status === "NO_BIDS" && "bg-blue-900/30 text-blue-300 border-blue-700/50",
                    auction.status === "ENDED" && "bg-red-900/30 text-red-300 border-red-700/50",
                    auction.status === "ACTIVE" && "bg-emerald-900/30 text-emerald-300 border-emerald-700/50"
                  ) as string}
                >
                  {auction.status === "EXPIRING_SOON" ? "Expiring Soon" : auction.status === "HIGH_VALUE" ? "High Value" : auction.status === "NO_BIDS" ? "No Bids" : auction.status === "ACTIVE" ? "Active" : "Ended"}
                </span>
              </div>

              {/* Body: Collateral left, Summary right */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center min-w-[120px]">
                  <motion.img layoutId={`details-image-${auction.auctionId}`}
                    className="border-2 border-black w-[120px] h-[120px] object-cover rounded-md"
                    src={mockImgById[auction.beraId]}
                    alt={`Bong Bear #${auction.beraId}`}
                  />
                </div>
                <motion.div layoutId={`details-summary-${auction.auctionId}`} className="flex-1 flex flex-col gap-3">
                  <div className="rounded-xl bg-black/10 border border-amber-900/30 px-4 py-3 w-full">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      <div className="flex items-center justify-between gap-3 min-w-0">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Value</span>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                          <span>{formatNum(auction.collateralValue)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 min-w-0">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Debt</span>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                          <span>{formatNum(auction.outstandingDebt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 min-w-0">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Min Bid</span>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                          <span>{formatNum(calculateMinBid(auction))}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 min-w-0">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Highest Bid</span>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                          <span className="whitespace-nowrap">{auction.currentHighestBid ? formatNum(auction.currentHighestBid) : "No bids"}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 min-w-0">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Discount</span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0">{formatNum(auction.potentialDiscount)}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 min-w-0">
                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Ends in</span>
                        {(() => {
                          const countdownLabel = auctionCountdowns[auction.auctionId] || "-";
                          const isTimer = isTimerString(countdownLabel);
                          return (
                            <span
                              className={cn(
                                "inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0 whitespace-nowrap justify-center",
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
                </motion.div>
              </div>
              {/* Bottom actions: wide equal buttons */}
              <div className="flex gap-3 pt-1">
                <AnimatePresence mode="wait">
                  {activeBidAuctionId === auction.auctionId ? (
                    <motion.div
                      key="bid-input"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-3 w-full"
                    >
                      <div className="flex-1">
                        <div className="relative">
                          <img src="/images/logo-honey.png" alt="HONEY" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.000001"
                            className="w-full rounded-xl border border-amber-900/40 bg-black/20 pl-9 pr-24 py-3 text-lg font-baloo text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                            placeholder="0.00"
                            value={inputValues[auction.auctionId] ?? ""}
                            onChange={(e) => handleInputChange(auction.auctionId, e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-16 py-1.5 rounded-lg text-md font-baloo bg-amber-600/40 hover:bg-amber-700/60 border border-amber-600/30 text-amber-200 transition-colors cursor-pointer"
                            onClick={() => handleMaxClick(auction.auctionId, calculateMinBid(auction))}
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                      <button
                        className={cn(
                          "flex-none w-38 py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer",
                          "bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20"
                        )}
                        onClick={handleBidBack}
                      >
                        Back
                      </button>
                      <button
                        className={cn(
                          "flex-none w-38 py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer",
                          "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                        )}
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
                      className="flex gap-3 w-full"
                    >
                      <ConnectButton.Custom>
                        {({ account, chain, openChainModal, openConnectModal }) => {
                          const userWon = auction.status === "ENDED" && auction.winner === MY_WALLET;
                          return (
                            <button
                              className={cn(
                                "flex-1 py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer",
                                userWon
                                  ? "bg-green-600/40 text-green-300 border-green-700/50 hover:bg-green-700/60"
                                  : auction.status === "ENDED"
                                  ? "bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                                  : "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                              )}
                              id={`bid-button${auction.auctionId}`}
                              disabled={auction.status === "ENDED" && !userWon}
                              onClick={() => {
                                if (userWon) {
                                  // If user won, open details modal to claim
                                  setActiveDetailsAuctionId(auction.auctionId);
                                  return;
                                }
                                if (auction.status === "ENDED") return;
                                const button = document.getElementById("bid-button" + auction.auctionId);
                                if (!account) {
                                  if (button && button.innerHTML === "Connect Wallet") openConnectModal();
                                  else button && (button.innerHTML = "Connect Wallet");
                                } else if (chain?.name !== "Berachain") {
                                  if (button && button.innerHTML === "Where Berachain??") openChainModal();
                                  else button && (button.innerHTML = "Where Berachain??");
                                } else {
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
                        className={cn(
                          "flex-1 py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer",
                          "bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20"
                        )}
                        onClick={() => {
                          setActiveDetailsAuctionId(auction.auctionId);
                        }}
                      >
                        Details
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Dialog open={!!activeDetailsAuction} onOpenChange={(open) => { if (!open) setActiveDetailsAuctionId(null); }}>
        {activeDetailsAuction && (
        <DialogContent className="max-w-[720px] w-[min(720px,calc(100vw-32px))] max-h-[90vh] bg-black/90 border border-amber-900/40 rounded-2xl p-4 text-white shadow-2xl flex flex-col">
                {/* Header replicated from card */}
                <div className="flex items-start justify-between pr-12">
                  <div className="flex items-center gap-3">
                    <h3 className="font-amaticbold text-4xl">Auction #{activeDetailsAuction.auctionId}</h3>
                    <span className="inline-flex items-center h-10 px-4 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-base leading-none">Bong Bear #{activeDetailsAuction.beraId}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center h-10 px-4 rounded-full text-base font-baloo border",
                        activeDetailsAuction.status === "EXPIRING_SOON" && "bg-amber-900/40 text-amber-300 border-amber-700/50",
                        activeDetailsAuction.status === "HIGH_VALUE" && "bg-purple-900/30 text-purple-300 border-purple-700/50",
                        activeDetailsAuction.status === "NO_BIDS" && "bg-blue-900/30 text-blue-300 border-blue-700/50",
                        activeDetailsAuction.status === "ENDED" && "bg-red-900/30 text-red-300 border-red-700/50",
                        activeDetailsAuction.status === "ACTIVE" && "bg-emerald-900/30 text-emerald-300 border-emerald-700/50"
                      ) as string}
                    >
                      {activeDetailsAuction.status === "EXPIRING_SOON" ? "Expiring Soon" : activeDetailsAuction.status === "HIGH_VALUE" ? "High Value" : activeDetailsAuction.status === "NO_BIDS" ? "No Bids" : activeDetailsAuction.status === "ACTIVE" ? "Active" : "Ended"}
                    </span>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 min-h-0 overflow-y-auto mt-2">
                  {/* Body: image + summary copied inside expandable card */}
                  <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center min-w-[120px]">
                      <img
                        className="border-2 border-black w-[120px] h-[120px] object-cover rounded-md"
                        src={mockImgById[activeDetailsAuction.beraId]}
                        alt={`Bong Bear #${activeDetailsAuction.beraId}`}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="rounded-xl bg-black/10 border border-amber-900/30 px-4 py-3 w-full">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                          <div className="flex items-center justify-between gap-3 min-w-0">
                            <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Value</span>
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0">
                              <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                              <span>{formatNum(activeDetailsAuction.collateralValue)}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-3 min-w-0">
                            <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Debt</span>
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0">
                              <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                              <span>{formatNum(activeDetailsAuction.outstandingDebt)}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-3 min-w-0">
                            <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Min Bid</span>
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0">
                              <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                              <span>{formatNum(calculateMinBid(activeDetailsAuction))}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-3 min-w-0">
                            <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Highest Bid</span>
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0">
                              <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                              <span className="whitespace-nowrap">{activeDetailsAuction.currentHighestBid ? formatNum(activeDetailsAuction.currentHighestBid) : "No bids"}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-3 min-w-0">
                            <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Discount</span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0">{formatNum(activeDetailsAuction.potentialDiscount)}%</span>
                          </div>
                          <div className="flex items-center justify-between gap-3 min-w-0">
                            <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0">Ends in</span>
                            {(() => {
                              const countdownLabel = auctionCountdowns[activeDetailsAuction.auctionId] || "-";
                              const isTimer = isTimerString(countdownLabel);
                              return (
                                <span
                                  className={cn(
                                    "inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none flex-shrink-0 whitespace-nowrap justify-center",
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

                  {/* Bid History or Winner Info */}
                  {activeDetailsAuction.status === "ENDED" && activeDetailsAuction.bids.length === 0 ? (
                    // Ended without bids - Protocol transfer
                    <div className="mt-4">
                      <div className="rounded-xl bg-black/20 border border-amber-900/30 p-6 text-center">
                        <img src="/images/logo-goldilocks.png" alt="Goldilocks" className="h-24 w-24 mx-auto mb-4" />
                        <h4 className="font-amaticbold text-3xl font-bold text-white mb-2">Transferred to Protocol</h4>
                        <p className="text-white text-lg font-baloo font-semibold mb-2">
                          No bids were placed during the 48-hour auction period. NFT has been transferred to the protocol multisig.
                        </p>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-amaticbold text-center text-4xl font-bold text-white">Bid History</h4>
                        <div className="h-0.5 w-[140px] bg-stone-800 mx-auto mt-0.5 mb-4" />
                        <div className="rounded-xl bg-black/20 border border-amber-900/30 p-6 text-center">
                          <p className="text-white text-lg font-baloo font-semibold">No bids</p>
                        </div>
                      </div>
                    </div>
                  ) : activeDetailsAuction.status === "ENDED" && activeDetailsAuction.winner === MY_WALLET ? (
                    // Ended - User won
                    <div className="mt-4">
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
                            {formatNum(((1 - ((activeDetailsAuction.currentHighestBid || 0) / activeDetailsAuction.collateralValue)) * 100))}%
                          </span>
                        </div>
                      </div>
                      <ConnectButton.Custom>
                        {({ account, chain, openChainModal, openConnectModal }) => (
                          <button
                            className={cn(
                              "w-full py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer",
                              "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                            )}
                            onClick={() => {
                              if (!account) {
                                openConnectModal();
                              } else if (chain?.name !== "Berachain") {
                                openChainModal();
                              } else {
                                // Handle claim
                              }
                            }}
                          >
                            Claim
                          </button>
                        )}
                      </ConnectButton.Custom>
                      {/* Bid History */}
                      {activeDetailsAuction.bids.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-amaticbold text-center text-4xl font-bold text-white">Bid History</h4>
                          <div className="h-0.5 w-[140px] bg-stone-800 mx-auto mt-0.5 mb-4" />
                          <div className="space-y-2">
                            {[...activeDetailsAuction.bids].sort((a, b) => b.timestamp - a.timestamp).map((bid, index) => {
                              const isHighest = bid.amount === activeDetailsAuction.currentHighestBid;
                              const isMyBid = bid.address === MY_WALLET;
                              return (
                                <div
                                  key={index}
                                  className={cn(
                                    "rounded-xl border px-4 py-3 flex items-center justify-between",
                                    isHighest
                                      ? "bg-amber-900/30 border-amber-700/50"
                                      : "bg-black/20 border-amber-900/30"
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={cn(
                                      "text-sm font-baloo font-semibold",
                                      isMyBid ? "text-HoneyYellow" : "text-white"
                                    )}>
                                      {formatAddress(bid.address)}
                                    </span>
                                    {isHighest && (
                                      <span className="px-2 py-0.5 rounded-full bg-HoneyYellow/20 text-HoneyYellow text-xs font-baloo border border-HoneyYellow/30">
                                        {activeDetailsAuction.status === "ENDED" 
                                          ? (isMyBid ? "You won the auction" : "Auction Winner")
                                          : (isMyBid ? "You are the current winner" : "Current Winner")
                                        }
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                                      <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                      <span>{formatNum(bid.amount)}</span>
                                    </div>
                                    <span className="text-white text-xs font-baloo font-semibold">{formatTimeAgo(bid.timestamp)}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : activeDetailsAuction.status === "NO_BIDS" && activeDetailsAuction.bids.length === 0 ? (
                    // No bids yet
                    <div className="mt-4">
                      <h4 className="font-amaticbold text-center text-4xl font-bold text-white">Bid History</h4>
                      <div className="h-0.5 w-[140px] bg-stone-800 mx-auto mt-0.5 mb-4" />
                      <div className="rounded-xl bg-black/20 border border-amber-900/30 p-6 text-center">
                        <p className="text-white text-lg font-baloo font-semibold">No bids</p>
                      </div>
                    </div>
                  ) : (
                    // Active auctions with bids
                    <div className="mt-4">
                      <h4 className="font-amaticbold text-center text-4xl font-bold text-white">Bid History</h4>
                      <div className="h-0.5 w-[140px] bg-stone-800 mx-auto mt-0.5 mb-4" />
                      <div className="space-y-2">
                        {[...activeDetailsAuction.bids].sort((a, b) => b.timestamp - a.timestamp).map((bid, index) => {
                          const isHighest = bid.amount === activeDetailsAuction.currentHighestBid;
                          const isMyBid = bid.address === MY_WALLET;
                          return (
                            <div
                              key={index}
                              className={cn(
                                "rounded-xl border px-4 py-3 flex items-center justify-between",
                                isHighest
                                  ? "bg-amber-900/30 border-amber-700/50"
                                  : "bg-black/20 border-amber-900/30"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <span className={cn(
                                  "text-sm font-baloo",
                                  isMyBid ? "text-HoneyYellow font-semibold" : "text-white/80"
                                )}>
                                  {formatAddress(bid.address)}
                                </span>
                                {isHighest && (
                                  <span className="px-2 py-0.5 rounded-full bg-HoneyYellow/20 text-HoneyYellow text-xs font-baloo border border-HoneyYellow/30">
                                    {activeDetailsAuction.status === "ENDED" 
                                      ? (isMyBid ? "You won the auction" : "Auction Winner")
                                      : (isMyBid ? "You are the current winner" : "Current Winner")
                                    }
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-sm leading-none">
                                  <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                  <span>{formatNum(bid.amount)}</span>
                                </div>
                                <span className="text-white text-xs font-baloo font-semibold">{formatTimeAgo(bid.timestamp)}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
        </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
