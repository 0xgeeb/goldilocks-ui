"use client"

import { useState, useMemo } from "react";
import { useAccount } from "wagmi";

import { cn } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { FormWrapper } from "@/app/(geo-check)/goldivault/vault/[address]/_components/./FormComponents";

import { formatAsString } from "@/app/_components/utils";
import { Input } from "@/components/ui/input";

import { useGoldilendTx } from "../../../hooks";
import { useGoldilend } from "@/providers";
import { contracts } from "../../../utils/addressi";
import { LoanInfo } from "@/utils/interfaces";


export const NewLiquidateTab = () => {
    const [selectedLoan, setSelectedLoan] = useState<LoanInfo | null>(null);
    const [bidAmount, setBidAmount] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const {
        liquidatableLoans,
        infoLoading,
        txConfirming,
        setTxConfirming,
        openNotification,
        goldilendWalletInfo,
        findLoans,
    } = useGoldilend();

    const { checkRepayAllowance } = useGoldilendTx();

    // Placeholder functions for design purposes
    const sendPlaceBidTx = async (originator: string, loanId: number, amount: number) => {
        // Mock implementation - returns fake tx hash
        return "0x1234567890abcdef";
    };

    const sendCloseAuctionTx = async (originator: string, loanId: number) => {
        // Mock implementation - returns fake tx hash
        return "0x1234567890abcdef";
    };

    const { address, isConnected } = useAccount();

    const loadingElement = () => {
        return <span className="loader-small mx-auto mt-[10%]"></span>;
    };

    const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp * 1000);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = String(date.getFullYear());
        return `${month}-${day}-${year}`;
    };

    const filteredLoans = useMemo(() => {
        if (!searchQuery) return liquidatableLoans;
        const query = searchQuery.toLowerCase();
        return liquidatableLoans.filter(loan =>
            loan.loanId.toString().includes(query)
        );
    }, [liquidatableLoans, searchQuery]);

    const handleLoanSelect = (loan: LoanInfo) => {
        setSelectedLoan(loan);
        setBidAmount("");
    };

    const handleBackToList = () => {
        setSelectedLoan(null);
        setBidAmount("");
    };

    const handleBidChange = (value: string) => {
        // Only allow valid number input
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setBidAmount(value);
        }
    };

    const handlePlaceBid = async () => {
        if (!selectedLoan) return;

        const button = document.getElementById("place-bid-button");
        const bidAmountNum = parseFloat(bidAmount);

        if (!bidAmountNum || bidAmountNum === 0) {
            button && (button.innerHTML = "enter bid amount");
            setTimeout(() => button && (button.innerHTML = "place bid"), 2000);
            return;
        }

        if (bidAmountNum > goldilendWalletInfo.honey) {
            button && (button.innerHTML = "insufficient honey");
            setTimeout(() => button && (button.innerHTML = "place bid"), 2000);
            return;
        }

        // Check allowance (placeholder for now)
        // const sufficientAllowance = await checkRepayAllowance(
        //     bidAmountNum,
        //     address as `0x${string}`
        // );

        // if (!sufficientAllowance) {
        //     button && (button.innerHTML = "approving...");
        //     // Approval logic would go here
        //     button && (button.innerHTML = "place bid");
        //     return;
        // }

        // Place bid
        setTxConfirming(true);
        if (button) {
            button.innerHTML = "confirming...";
            button.classList.remove("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
            button.classList.add("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
        }

        const bidTx = await sendPlaceBidTx(
            address as `0x${string}`,
            selectedLoan.loanId,
            bidAmountNum
        );

        if (bidTx.substring(0, 2) === "0x") {
            setTxConfirming(false);
            openNotification(
                true,
                "Bid placed successfully",
                `You bid ${formatAsString(bidAmountNum)} Honey on loan ${selectedLoan.loanId}`,
                bidTx
            );
            button && (button.innerHTML = "place bid");
            if (button) {
                button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
                button.classList.add("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
            }
            setBidAmount("");
            setTimeout(() => {
                openNotification(false, "", "", "");
            }, 10000);
        } else {
            button && (button.innerHTML = "place bid");
            if (button) {
                button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
                button.classList.add("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
            }
            setTxConfirming(false);
        }
    };

    const handleCloseAuction = async () => {
        if (!selectedLoan) return;

        const button = document.getElementById("close-auction-button");

        setTxConfirming(true);
        if (button) {
            button.innerHTML = "confirming...";
            button.classList.remove("bg-red-600", "hover:bg-red-700", "text-white", "border-red-700/50");
            button.classList.add("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
        }

        const closeTx = await sendCloseAuctionTx(
            address as `0x${string}`,
            selectedLoan.loanId
        );

        if (closeTx.substring(0, 2) === "0x") {
            setTxConfirming(false);
            openNotification(
                true,
                "Auction closed successfully",
                `Auction for loan ${selectedLoan.loanId} has been closed`,
                closeTx
            );
            button && (button.innerHTML = "close auction");
            if (button) {
                button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
                button.classList.add("bg-red-600", "hover:bg-red-700", "text-white", "border-red-700/50");
            }
            findLoans();
            handleBackToList();
            setTimeout(() => {
                openNotification(false, "", "", "");
            }, 10000);
        } else {
            button && (button.innerHTML = "close auction");
            if (button) {
                button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
                button.classList.add("bg-red-600", "hover:bg-red-700", "text-white", "border-red-700/50");
            }
            setTxConfirming(false);
        }
    };

    // Loan List View
    if (!selectedLoan) {
        return (
            <>
                <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-col items-center h-full gap-2.5 p-3">
                        <div className="flex w-full items-center justify-center gap-2">
                            <h2 className="font-amaticbold text-5xl font-bold text-white">Liquidatable Loans</h2>
                            <div className="ml-1 relative h-10 w-56">
                                <img src="/images/icons/search.svg" alt="search" className="pointer-events-none absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2" />
                                <Input
                                    type="search"
                                    placeholder="Search by Loan ID..."
                                    className="pl-9 h-10 w-full font-amaticbold text-xl text-HoneyYellow placeholder:text-HoneyYellow/70 border-HoneyYellow/50 focus-visible:border-HoneyYellow"
                                    aria-label="Search by loan ID"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        aria-label="Clear"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:opacity-90 z-10"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        <img src="/images/icons/clear.svg" alt="clear" className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="h-0.5 w-full max-w-[500px] bg-stone-800 mx-auto" />

                        {infoLoading ? (
                            <div className="w-full flex-1 flex items-center justify-center">{loadingElement()}</div>
                        ) : filteredLoans.length === 0 ? (
                            <div className="w-full flex-1 flex items-center justify-center">
                                <div className="flex flex-col items-center opacity-50">
                                    <img className="mb-[5%] w-[60%] md:w-[40%]" src="/images/icon-not-found.png" alt="not-found" />
                                    <h2 className="font-amaticbold text-center text-6xl md:text-7xl font-bold text-white">no liquidatable loans</h2>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col gap-3 overflow-y-auto max-h-[600px]" id="hide-scrollbar">
                                {filteredLoans.map((loan, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl bg-black/20 border border-amber-900/30 p-4 hover:bg-black/30 hover:border-HoneyYellow/50 transition-all cursor-pointer"
                                        onClick={() => handleLoanSelect(loan)}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-amaticbold text-3xl text-HoneyYellow">Loan #{loan.loanId}</h3>
                                            <span className="px-4 py-1.5 rounded-lg bg-red-900/40 text-red-200 font-amaticbold text-xl border border-red-800/50">
                                                Liquidatable
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <div className="text-white/60 text-lg font-amaticbold">Liquidation Price</div>
                                                <div className="text-HoneyYellow font-amaticbold text-2xl flex items-center gap-1">
                                                    <img src="/images/logo-honey.png" alt="honey" className="h-5 w-5" />
                                                    <span>{formatAsString(loan.borrowedAmount)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-white/60 text-lg font-amaticbold">Expired On</div>
                                                <div className="text-HoneyYellow font-amaticbold text-2xl">{formatDate(loan.endDate)}</div>
                                            </div>
                                            <div>
                                                <div className="text-white/60 text-lg font-amaticbold">Collateral</div>
                                                <div className="flex gap-2 mt-1">
                                                    {loan.collateralNFTs.map((nft, idx) => (
                                                        <img
                                                            key={idx}
                                                            className="h-12 w-12 rounded-lg border-2 border-white/20"
                                                            src={
                                                                nft === contracts.bondbear.address
                                                                    ? "/images/icon-bondbear.png"
                                                                    : "/images/icon-bandbear.png"
                                                            }
                                                            alt="collateral"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-white/60 text-lg font-amaticbold">Auction Ends</div>
                                                <div className="text-HoneyYellow font-amaticbold text-2xl">{formatDate(loan.endDate + 86400 * 7)}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }

    // Auction Detail View
    return (
        <>
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col items-center h-full gap-2.5 p-3">
                    <div className="flex w-full items-center justify-between gap-2">
                        <button
                            onClick={handleBackToList}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/20 border border-amber-900/30 hover:bg-black/30 hover:border-HoneyYellow/50 transition-all"
                        >
                            <span className="text-HoneyYellow font-amaticbold text-2xl">← Back</span>
                        </button>
                        <h2 className="font-amaticbold text-5xl font-bold text-white">Loan #{selectedLoan.loanId} Auction</h2>
                        <div className="w-[100px]"></div> {/* Spacer for centering */}
                    </div>
                    <div className="h-0.5 w-full bg-stone-800 mx-auto" />

                    <div className="w-full flex flex-col gap-4 mt-4">
                        {/* Loan Details Section */}
                        <div className="rounded-xl bg-black/20 border border-amber-900/30 p-4">
                            <h3 className="font-amaticbold text-4xl text-HoneyYellow mb-3">Loan Details</h3>
                            <div className="grid grid-cols-5 gap-3">
                                <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3 flex flex-col items-center justify-center text-center">
                                    <div className="text-white/60 text-lg font-amaticbold">Loan ID</div>
                                    <div className="text-HoneyYellow font-amaticbold text-2xl">#{selectedLoan.loanId}</div>
                                </div>
                                <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3 flex flex-col items-center justify-center text-center">
                                    <div className="text-white/60 text-lg font-amaticbold">Liquidation Price</div>
                                    <div className="text-HoneyYellow font-amaticbold text-2xl flex items-center gap-1">
                                        <img src="/images/logo-honey.png" alt="honey" className="h-5 w-5" />
                                        <span>{formatAsString(selectedLoan.borrowedAmount)}</span>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3 flex flex-col items-center justify-center text-center">
                                    <div className="text-white/60 text-lg font-amaticbold">Expired On</div>
                                    <div className="text-HoneyYellow font-amaticbold text-2xl">{formatDate(selectedLoan.endDate)}</div>
                                </div>
                                <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3 flex flex-col items-center justify-center text-center">
                                    <div className="text-white/60 text-lg font-amaticbold">Auction Ends</div>
                                    <div className="text-HoneyYellow font-amaticbold text-2xl">{formatDate(selectedLoan.endDate + 86400 * 7)}</div>
                                </div>
                                <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3 flex flex-col items-center justify-center text-center">
                                    <div className="text-white/60 text-lg font-amaticbold mb-2">Collateral NFT</div>
                                    <div className="flex gap-2 justify-center">
                                        {selectedLoan.collateralNFTs.map((nft, idx) => (
                                            <div key={idx} className="flex flex-col items-center">
                                                <img
                                                    className="h-20 w-20 rounded-xl border-2 border-HoneyYellow/50"
                                                    src={
                                                        nft === contracts.bondbear.address
                                                            ? "/images/icon-bondbear.png"
                                                            : "/images/icon-bandbear.png"
                                                    }
                                                    alt="collateral"
                                                />
                                                <span className="mt-1 text-HoneyYellow font-amaticbold text-sm">
                                                    {nft === contracts.bondbear.address ? "Bond Bear" : "Band Bear"} #{selectedLoan.collateralNFTIds[idx]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bidding Section */}
                        <FormWrapper className="gap-4">
                            <h3 className="font-amaticbold text-center text-4xl font-bold text-white">
                                Place Your Bid
                            </h3>
                            <div className="h-0.5 w-[160px] bg-stone-800 mx-auto" />

                            <div className="flex w-full items-center justify-between mb-1">
                                <span className="text-white/80 font-amaticbold text-2xl">Bid Amount (Honey)</span>
                                <span className="text-white/60 font-amaticbold text-lg">
                                    Balance: {formatAsString(goldilendWalletInfo.honey)} Honey
                                </span>
                            </div>

                            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/20 border border-amber-900/30">
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    className="w-full bg-transparent border-none font-amaticbold text-2xl md:text-3xl font-bold text-HoneyYellow placeholder:text-white/30 focus:outline-none"
                                    value={bidAmount}
                                    onChange={(e) => handleBidChange(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="w-20 py-2 rounded-lg text-xl font-amaticbold bg-amber-600/40 hover:bg-amber-700/60 border border-amber-600/30 text-amber-200 transition-colors"
                                    onClick={() => setBidAmount(String(goldilendWalletInfo.honey))}
                                >
                                    MAX
                                </button>
                            </div>

                            {/* Info Cards */}
                            <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
                                    <div className="text-white/60 text-lg font-amaticbold">Your Bid</div>
                                    <div className="text-HoneyYellow font-amaticbold text-2xl flex items-center gap-1">
                                        <img src="/images/logo-honey.png" alt="honey" className="h-5 w-5" />
                                        <span>{bidAmount || "0.00"}</span>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
                                    <div className="text-white/60 text-lg font-amaticbold">Potential Return</div>
                                    <div className="text-green-400 font-amaticbold text-2xl">
                                        {bidAmount && parseFloat(bidAmount) > 0 && parseFloat(bidAmount) < selectedLoan.borrowedAmount
                                            ? `${((1 - parseFloat(bidAmount) / selectedLoan.borrowedAmount) * 100).toFixed(2)}% discount`
                                            : "-"}
                                    </div>
                                </div>
                            </div>

                            <div className="h-0.5 w-full bg-stone-800/60 my-2" />

                            <div className="text-HoneyYellow font-amaticbold text-2xl text-center">
                                Bid to acquire the collateral at a discount
                            </div>

                            <div className="h-0.5 w-full bg-stone-800/60 my-2" />

                            {/* Action Buttons */}
                            <ConnectButton.Custom>
                                {({ account, chain, openChainModal, openConnectModal }) => {
                                    return (
                                        <div className="flex gap-3 w-full">
                                            <button
                                                className={cn(
                                                    "flex-1 py-3 rounded-xl font-amaticbold text-4xl transition-all border",
                                                    "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                                                )}
                                                id="place-bid-button"
                                                onClick={() => {
                                                    const button = document.getElementById("place-bid-button");

                                                    if (!account) {
                                                        if (button && button.innerHTML === "connect wallet") {
                                                            openConnectModal();
                                                        } else {
                                                            button && (button.innerHTML = "connect wallet");
                                                        }
                                                    } else if (chain?.name !== "Berachain") {
                                                        if (button && button.innerHTML === "where berachain") {
                                                            openChainModal();
                                                        } else {
                                                            button && (button.innerHTML = "where berachain");
                                                        }
                                                    } else {
                                                        handlePlaceBid();
                                                    }
                                                }}
                                            >
                                                Place Bid
                                            </button>

                                            <button
                                                className={cn(
                                                    "flex-1 py-3 rounded-xl font-amaticbold text-4xl transition-all border",
                                                    "bg-red-600 hover:bg-red-700 text-white border-red-700/50"
                                                )}
                                                id="close-auction-button"
                                                onClick={() => {
                                                    const button = document.getElementById("close-auction-button");

                                                    if (!account) {
                                                        if (button && button.innerHTML === "connect wallet") {
                                                            openConnectModal();
                                                        } else {
                                                            button && (button.innerHTML = "connect wallet");
                                                        }
                                                    } else if (chain?.name !== "Berachain") {
                                                        if (button && button.innerHTML === "where berachain") {
                                                            openChainModal();
                                                        } else {
                                                            button && (button.innerHTML = "where berachain");
                                                        }
                                                    } else {
                                                        handleCloseAuction();
                                                    }
                                                }}
                                            >
                                                Close Auction
                                            </button>
                                        </div>
                                    );
                                }}
                            </ConnectButton.Custom>
                        </FormWrapper>
                    </div>
                </div>
            </div>
        </>
    );
};
