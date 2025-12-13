"use client"

import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { AnimatePresence, motion } from "motion/react";
import { readContract } from "@wagmi/core";
import { formatEther } from "viem";

import { cn } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldilend } from "@/providers";
import { useGoldilendTx } from "../../../hooks";
import { contracts } from "../../../utils/addressi";
import { config } from "../../../providers/WagmiProvider";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Slider from "@/components/ui/slider";
import { bongbears } from "../../../utils/bongbears";

type InputValuesType = {
  [key: number]: string;
};

type AllowanceFlagsType = {
  [key: number]: boolean;
};

type MockLoan = {
  loanId: number;
  borrowedAmount: number; // principal + interest
  repaidAmount?: number; // amount already repaid
  interest: number;
  endDate: number; // unix seconds
  repaid?: boolean;
  liquidated?: boolean;
  collateralNFT: string; // addresses
  collateralValuation: number; // in HONEY
  principal: number; // the "loan amount" requested
  status?: "EXPIRING_SOON" | "ACTIVE" | "EXPIRED" | "GRACE_PERIOD" | "REPAID";
  beraId: number; // to map image from mock borrow tab,
  duration: number;
  realBorrowedAmount: bigint;
  realInterest: bigint;
};

const GRACE_PERIOD_SECONDS = 24 * 60 * 60; // 24 hours in seconds

const COUNTDOWN_REGEX = /\d+d \d+h/;
const isTimerString = (value: string) => COUNTDOWN_REGEX.test(value);

export const NewRepayTab = () => {
    const [inputValues, setInputValues] = useState<InputValuesType>({});
    const [allowanceFlags, setAllowanceFlags] = useState<AllowanceFlagsType>({});
    const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);
    const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
    const [selectedStatuses, setSelectedStatuses] = useState<Record<"ACTIVE" | "EXPIRING_SOON" | "EXPIRED" | "GRACE_PERIOD" | "REPAID", boolean>>({
        ACTIVE: true,
        EXPIRING_SOON: true,
        EXPIRED: true,
        GRACE_PERIOD: true,
        REPAID: true
    });
    const [activeRepayLoanId, setActiveRepayLoanId] = useState<number | null>(null);
    const [activeRepayMode, setActiveRepayMode] = useState<"partial" | null>(null);
    const [activeExtendLoanId, setActiveExtendLoanId] = useState<number | null>(null);
    const [extendDays, setExtendDays] = useState<number>(7);
    const [extendAmountInput, setExtendAmountInput] = useState<string>("");
    const [openTooltip, setOpenTooltip] = useState<string | null>(null);
    const [renewalInterest, setRenewalInterest] = useState<number>(0);
    const [renewalInterestRate, setRenewalInterestRate] = useState<number>(0);
    const [loanGracePeriod, setLoanGracePeriod] = useState<number>(86400); // Default 24 hours
    const [minDuration, setMinDuration] = useState<number>(604800); // Default 7 days

    const {
        infoLoading,
        userLoans,
        findLoans,
        txConfirming,
        setTxConfirming,
        notification,
        openNotification,
        refreshGoldilendInfo,
        refreshGoldilendWalletInfo,
        goldilendWalletInfo,
        borrowLimit,
        updateBorrowLimit,
        goldilendInfo
    } = useGoldilend();

    const {
        checkRepayAllowance,
        sendRepayTx,
        sendHoneyApproveTx,
        sendRenewTx
    } = useGoldilendTx();

    const { address, isConnected } = useAccount();

    const loadingElement = () => {
        return <span className="loader-small m-auto"></span>;
    };

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

    // Calculate renewal interest using the same formula as getInterestRate from provider
    const calculateRenewalInterest = async (existingLoanAmount: number, newBorrowAmount: number, durationDays: number) => {
        try {
            const loanDuration = durationDays * 24 * 60 * 60; // Convert days to seconds

            // Fetch required contract parameters
            const [debtResult, utilizationRatioMultiplierResult, interestPaymentPercentageResult, slopeResult] = await Promise.all([
                readContract(config, {
                    address: contracts.goldilend.address as `0x${string}`,
                    abi: contracts.goldilend.abi,
                    functionName: "outstandingDebt",
                    args: [],
                }),
                readContract(config, {
                    address: contracts.goldilend.address as `0x${string}`,
                    abi: contracts.goldilend.abi,
                    functionName: "utilizationRatioMultiplier",
                    args: [],
                }),
                readContract(config, {
                    address: contracts.goldilend.address as `0x${string}`,
                    abi: contracts.goldilend.abi,
                    functionName: "interestPaymentPercentage",
                    args: [],
                }),
                readContract(config, {
                    address: contracts.goldilend.address as `0x${string}`,
                    abi: contracts.goldilend.abi,
                    functionName: "slope",
                    args: [],
                }),
            ]);

            const debt = parseFloat(formatEther(debtResult as unknown as bigint));
            const utilizationRatioMultiplier = parseFloat(formatEther(utilizationRatioMultiplierResult as unknown as bigint));
            const interestPaymentPercentage = parseFloat(formatEther(interestPaymentPercentageResult as unknown as bigint));
            const slope = parseFloat(formatEther(slopeResult as unknown as bigint));

            // Get protocol interest rate and total supply from state
            const rate = goldilendInfo.protocolInterestRate;
            const totalSupply = goldilendInfo.glhoneySupply;

            // Calculate interest based on smart contract formula
            const yearSeconds = 365 * 24 * 60 * 60;
            const durationPortion = loanDuration / yearSeconds;

            // Calculate interest for existing loan extension
            const ratioExisting = (debt + existingLoanAmount) / (totalSupply * utilizationRatioMultiplier) + interestPaymentPercentage;
            const interestRateExisting = ratioExisting * (rate + (slope * rate * durationPortion));
            const existingLoanInterest = interestRateExisting * existingLoanAmount * durationPortion;

            // Calculate interest for new borrow amount
            let newBorrowInterest = 0;
            if (newBorrowAmount > 0) {
                const ratioNew = (debt + existingLoanAmount + newBorrowAmount) / (totalSupply * utilizationRatioMultiplier) + interestPaymentPercentage;
                const interestRateNew = ratioNew * (rate + (slope * rate * durationPortion));
                newBorrowInterest = interestRateNew * newBorrowAmount * durationPortion;
            }

            // Total interest = interest on extending existing loan + interest on new borrow amount
            // This matches the contract: _calculateInterest(existingLoan, ...) + _calculateInterest(newBorrow, ...)
            const totalInterest = existingLoanInterest + newBorrowInterest;

            // Calculate the interest rate percentage (using combined loan amount for rate display)
            const totalLoanAmount = existingLoanAmount + newBorrowAmount;
            const ratio = (debt + totalLoanAmount) / (totalSupply * utilizationRatioMultiplier) + interestPaymentPercentage;
            const calculatedRate = ratio * (rate + (slope * rate * durationPortion)) * 100;

            setRenewalInterest(totalInterest);
            setRenewalInterestRate(calculatedRate);
        } catch (error) {
            console.error("Error calculating renewal interest:", error);
            setRenewalInterest(0);
            setRenewalInterestRate(0);
        }
    };

    // Mock loans for repay page summary and list
    // Collateral valuations reference the mock "Bong Bear" valuations in NewBorrowTab
    const nowSec = Math.floor(Date.now() / 1000);
    // Image mapping as in NewBorrowTab
    const mockImgById: Record<number, string> = useMemo(() => ({
        75: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/68b8c1674bf468085f015ed07a3bd6/5968b8c1674bf468085f015ed07a3bd6.jpeg?w=1000",
        90: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/8fac1fd9e0d9b799cf8195eb3c93cc/5f8fac1fd9e0d9b799cf8195eb3c93cc.jpeg?w=1000",
        68: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
        1: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
        2: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
        3: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
        4: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
        5: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
        6: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
        7: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
        8: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
        9: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
        10: "https://i2.seadn.io/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/62950fe1bdecfafcb68c58245327c6/6d62950fe1bdecfafcb68c58245327c6.jpeg?w=1000",
    }), []);

    const mockLoans = userLoans

    // const mockLoans: MockLoan[] = useMemo(() => {
    //     const soon = nowSec + 30 * 60; // ~30 minutes
    //     const later = nowSec + 10 * 24 * 60 * 60; // ~10 days
    //     const gracePeriod = nowSec - 12 * 60 * 60; // ~12 hours ago (in grace period)
    //     const fullyExpired = nowSec - 2 * 24 * 60 * 60; // ~2 days ago (past grace period)
    //     return [
    //         {
    //             loanId: 1,
    //             principal: 3333,
    //             interest: 33,
    //             borrowedAmount: 3333 + 33,
    //             endDate: soon,
    //             repaid: false,
    //             liquidated: false,
    //             collateralNFTs: [contracts.bondbear.address],
    //             collateralValuation: 10000, // Bong Bear #75
    //             status: "EXPIRING_SOON",
    //             beraId: 75,
    //         },
    //         {
    //             loanId: 2,
    //             principal: 4444,
    //             interest: 44,
    //             borrowedAmount: 4444 + 44,
    //             endDate: later,
    //             repaid: false,
    //             liquidated: false,
    //             collateralNFTs: [contracts.bandbear.address],
    //             collateralValuation: 6000, // Bong Bear #68 - reduced to show unhealthy active loan
    //             status: "ACTIVE",
    //             beraId: 68,
    //         },
    //         {
    //             loanId: 3,
    //             principal: 5555,
    //             interest: 55,
    //             borrowedAmount: 5555 + 55,
    //             endDate: gracePeriod,
    //             repaid: false,
    //             liquidated: false,
    //             collateralNFTs: [contracts.bondbear.address],
    //             collateralValuation: 12000, // Bong Bear #90 - in grace period
    //             status: "EXPIRED",
    //             beraId: 90,
    //         },
    //         {
    //             loanId: 4,
    //             principal: 6666,
    //             interest: 66,
    //             borrowedAmount: 6666 + 66,
    //             endDate: fullyExpired,
    //             repaid: false,
    //             liquidated: false,
    //             collateralNFTs: [contracts.bondbear.address],
    //             collateralValuation: 8000, // Bong Bear #75 - fully expired
    //             status: "EXPIRED",
    //             beraId: 75,
    //         },
    //     ];
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // Summary metrics derived from mock loans
    const activeLoans = mockLoans.filter((l) => l.endDate > nowSec && !l.repaid && !l.liquidated);
    const activeLoansCount = activeLoans.length;
    // Treat Received == To Repay for mock
    const totalReceived = activeLoans.reduce((acc, l) => acc + l.borrowedAmount, 0);
    // Collateral value shows only active loans
    const collateralValue = activeLoans.reduce((acc, l) => acc + l.collateralValuation, 0);
    // Total to repay is the sum of remaining balances (borrowedAmount - repaidAmount)
    const totalToRepay = activeLoans.reduce((acc, l) => acc + (l.borrowedAmount - (l.repaidAmount || 0)), 0);

    const nextLoan = activeLoans
        .slice()
        .sort((a, b) => a.endDate - b.endDate)[0];

    // Live countdown for next maturity
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
            setCountdown(`${days}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`);
        };
        const id = setInterval(update, 1000);
        update();
        return () => clearInterval(id);
    }, [nextLoan]);

    // Check if loan is in grace period and calculate remaining time
    const isLoanInGracePeriod = (loan: MockLoan): boolean => {
        const now = Math.floor(Date.now() / 1000);
        const gracePeriodEnd = loan.endDate + GRACE_PERIOD_SECONDS;
        return loan.endDate <= now && now < gracePeriodEnd && !loan.repaid && !loan.liquidated;
    };

    // Check if loan is fully expired (past grace period)
    const isLoanFullyExpired = (loan: MockLoan): boolean => {
        const now = Math.floor(Date.now() / 1000);
        const gracePeriodEnd = loan.endDate + GRACE_PERIOD_SECONDS;
        return now >= gracePeriodEnd && !loan.repaid && !loan.liquidated;
    };

    // Per-loan countdowns and grace period countdowns
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
                    // Calculate grace period remaining time
                    const gracePeriodEnd = l.endDate + GRACE_PERIOD_SECONDS;
                    const graceRemaining = Math.max(0, gracePeriodEnd - now);
                    const days = Math.floor(graceRemaining / (24 * 3600));
                    const hours = Math.floor((graceRemaining % (24 * 3600)) / 3600);
                    const mins = Math.floor((graceRemaining % 3600) / 60);
                    const secs = graceRemaining % 60;
                    graceMap[l.loanId] = `${days}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
                    countdownMap[l.loanId] = "Expired - Grace Period";
                } else if (l.endDate <= now) {
                    countdownMap[l.loanId] = "Expired";
                } else {
                    const diff = l.endDate - now;
                    const days = Math.floor(diff / (24 * 3600));
                    const hours = Math.floor((diff % (24 * 3600)) / 3600);
                    const mins = Math.floor((diff % 3600) / 60);
                    const secs = diff % 60;
                    countdownMap[l.loanId] = `${days}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
                }
            });
            setLoanCountdowns(countdownMap);
            setGracePeriodCountdowns(graceMap);
        };
        const id = setInterval(compute, 1000);
        compute();
        return () => clearInterval(id);
    }, [mockLoans]);

    // Close extend modal on outside click
    // Esc close handled by Dialog; keep state reset on open change
    // Close on escape
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveExtendLoanId(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [activeExtendLoanId]);

    // Close tooltips when clicking outside
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

    // Calculate renewal interest when extend parameters change
    useEffect(() => {
        if (activeExtendLoan && goldilendInfo.glhoneySupply > 0) {
            const newBorrowAmount = parseFloat(extendAmountInput || "0") || 0;
            calculateRenewalInterest(activeExtendLoan.borrowedAmount, newBorrowAmount, extendDays);
        } else {
            setRenewalInterest(0);
            setRenewalInterestRate(0);
        }
    }, [activeExtendLoan, extendDays, extendAmountInput, goldilendInfo]);

    // Check if loan can be renewed
    // Contract logic: if(userLoan.endDate + LOAN_GRACE_PERIOD - block.timestamp > renewMinDuration) revert InvalidRenew();
    // This means: timeUntilGracePeriodEnds > minDuration = too early to renew
    const canRenewLoan = (loan: MockLoan | null): boolean => {
        if (!loan || loan.repaid || loan.liquidated) return false;

        const now = Math.floor(Date.now() / 1000);
        const timeUntilGracePeriodEnds = loan.endDate + loanGracePeriod - now;

        // Can only renew if time remaining is <= minDuration
        return timeUntilGracePeriodEnds <= minDuration;
    };

    const toggleStatus = (key: "ACTIVE" | "EXPIRING_SOON" | "EXPIRED") => {
        setSelectedStatuses((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const filteredLoans = useMemo(() => {
        return mockLoans.filter((l) => {
            const actualStatus = l.repaid ? "REPAID" : isLoanInGracePeriod(l) ? "GRACE_PERIOD" : (l.status || "ACTIVE");
            return selectedStatuses[actualStatus];
        });
    }, [mockLoans, selectedStatuses]);

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

    const handleAllowanceChange = (loanId: number, flag: boolean) => {
        setAllowanceFlags((prev) => ({
            ...prev,
            [loanId]: flag,
        }));
    };

    const refreshInfo = () => {
        const newValues: InputValuesType = {};
        Object.keys(inputValues).forEach((key) => {
            newValues[parseInt(key)] = "0";
        });
        setInputValues(newValues);
        findLoans();
        refreshGoldilendInfo();
        refreshGoldilendWalletInfo();
    };

    const handleButtonClick = async (
        loanId: number,
        amt: number,
        borrowedAmt: number,
        interest: number,
        realBorrowedAmount: bigint,
        realInterest: bigint
    ) => {
        setActiveRepayLoanId(loanId);
        setActiveRepayMode(null); // Reset to show Back/Partial/Full buttons
        setInputValues((prev) => ({
            ...prev,
            [loanId]: "",
        }));
    }

    const handleRepayBack = () => {
        setActiveRepayLoanId(null);
        setActiveRepayMode(null);
    };

    const handleRepayPartial = () => {
        setActiveRepayMode("partial");
    };

    const handleRepayFull = async (loanId?: number) => {
        // Directly initiate full repayment transaction
        const targetLoanId = loanId ?? activeRepayLoanId;
        const loan = userLoans.find((l) => l.loanId === targetLoanId);
        console.log(loanId, userLoans)

        const button = document.getElementById("full-repay-button");

        if (loan) {
            // Calculate remaining amount to repay (subtract any partial repayments)
            const remainingAmount = loan.borrowedAmount - (loan.repaidAmount || 0);

            setTxConfirming(true);
            if (button) {
                button.innerHTML = "confirming...";
                button.classList.remove("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
                button.classList.add("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
            }

            try {
                // Check allowance before repaying (use remaining amount)
                const hasAllowance = await checkRepayAllowance(remainingAmount, address as `0x${string}`);
                if (!hasAllowance) {
                    // Send approval transaction for the remaining repay amount
                    await sendHoneyApproveTx(remainingAmount, false);
                }

                await sendRepayTx(
                    remainingAmount,
                    loan.loanId,
                    true,
                    loan.realBorrowedAmount,
                    loan.realInterest,
                    address as string,
                    loan.repaidAmount
                );
                setActiveRepayLoanId(null);
                setActiveRepayMode(null);
            } catch (error) {
                console.error("Error in full repay:", error);
            } finally {
                setTxConfirming(false);
                if (button) {
                    button.innerHTML = "Full Repay";
                    button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
                    button.classList.add("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
                }
            }
        }
    };

    const handleRepayConfirm = async () => {
        const targetLoanId = activeRepayLoanId;
        const loan = userLoans.find((l) => l.loanId === targetLoanId);
        const amount = parseFloat(inputValues[activeRepayLoanId || 0] || "0");

        const button = document.getElementById("partial-repay-confirm-button");

        if (loan && amount > 0) {
            setTxConfirming(true);
            if (button) {
                button.innerHTML = "confirming...";
                button.classList.remove("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
                button.classList.add("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
            }

            try {
                // Check allowance before repaying
                const hasAllowance = await checkRepayAllowance(amount, address as `0x${string}`);
                if (!hasAllowance) {
                    // Send approval transaction for the partial repay amount
                    await sendHoneyApproveTx(amount, false);
                }

                await sendRepayTx(
                    amount,
                    loan.loanId,
                    false,
                    loan.realBorrowedAmount,
                    loan.realInterest,
                    address as string,
                    loan.repaidAmount
                );
                setActiveRepayLoanId(null);
                setActiveRepayMode(null);
            } catch (error) {
                console.error("Error in partial repay:", error);
            } finally {
                setTxConfirming(false);
                if (button) {
                    button.innerHTML = "Confirm";
                    button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
                    button.classList.add("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
                }
            }
        }
    };

    const handleRenewConfirm = async () => {
        if (!activeExtendLoan) return;

        // Check if loan can be renewed
        if (!canRenewLoan(activeExtendLoan)) {
            console.error("Cannot renew loan yet - too far from expiration");
            return;
        }

        const button = document.getElementById("renew-confirm-button");
        const newBorrowAmount = parseFloat(extendAmountInput || "0") || 0;
        const newDuration = extendDays * 24 * 60 * 60; // Convert days to seconds

        setTxConfirming(true);
        if (button) {
            button.innerHTML = "confirming...";
            button.classList.remove("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
            button.classList.add("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
        }

        try {
            const renewTx = await sendRenewTx(
                address as string,
                activeExtendLoan.loanId,
                newBorrowAmount,
                newDuration,
                BigInt(Math.floor(renewalInterest * 1e18)) // Convert to wei
            );

            if (renewTx.substring(0, 2) === "0x") {
                setTxConfirming(false);
                openNotification(
                    true,
                    "You've successfully renewed your loan",
                    `Extended by ${extendDays} days${newBorrowAmount > 0 ? ` and borrowed ${formatNum(newBorrowAmount - (newBorrowAmount * (renewalInterestRate / 100) * ((extendDays * 24 * 60 * 60) / (365 * 24 * 60 * 60))))} additional HONEY` : ''}`,
                    renewTx,
                );

                // Reset button state
                if (button) {
                    button.innerHTML = "Confirm Renewal";
                    button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
                    button.classList.add("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
                }

                // Refresh data and close modal
                findLoans();
                refreshGoldilendInfo();
                refreshGoldilendWalletInfo();
                setActiveExtendLoanId(null);
                setExtendAmountInput("");
                setExtendDays(7);

                setTimeout(() => {
                    openNotification(false, "", "", "");
                }, 10000);
            } else {
                // Transaction failed
                if (button) {
                    button.innerHTML = "Confirm Renewal";
                    button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
                    button.classList.add("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
                }
                setTxConfirming(false);
            }
        } catch (error) {
            console.error("Error renewing loan:", error);
            // Reset button state on error
            if (button) {
                button.innerHTML = "Confirm Renewal";
                button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
                button.classList.add("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
            }
            setTxConfirming(false);
        }
    };

    //todo: fix update allowance here
    const handleLeftButtonClick = async (amt: number, loanId: number) => {
        const swapButton = document.getElementById("repay-button" + loanId);
        const leftButton = document.getElementById("left-approve-button" + loanId);
        const rightButton = document.getElementById("right-approve-button" + loanId);
        if (leftButton) {
            leftButton.innerHTML = "approving...";
            leftButton.style.backgroundColor = "#C9E3B9";
        }
        if (rightButton) {
            rightButton.innerHTML = "approving...";
            rightButton.style.backgroundColor = "#C9E3B9";
        }
        await sendHoneyApproveTx(amt, false);
        // updateAllowance(honeyBuy + 0.01)
        swapButton && (swapButton.innerHTML = "REPAY LOAN");
        // setAllowanceButtons(false)
        handleAllowanceChange(loanId, false);
    };

    const handleRightButtonClick = async (loanId: number) => {
        const swapButton = document.getElementById("repay-button" + loanId);
        const leftButton = document.getElementById("left-approve-button" + loanId);
        const rightButton = document.getElementById("right-approve-button" + loanId);
        if (leftButton) {
            leftButton.innerHTML = "approving...";
            leftButton.style.backgroundColor = "#C9E3B9";
        }
        if (rightButton) {
            rightButton.innerHTML = "approving...";
            rightButton.style.backgroundColor = "#C9E3B9";
        }
        await sendHoneyApproveTx(0, true);
        // updateAllowance(100000000)
        swapButton && (swapButton.innerHTML = "REPAY LOAN");
        // setAllowanceButtons(false)
        handleAllowanceChange(loanId, false);
    };

    return (
        <div className="w-full flex flex-col">
            {/* Summary Section */}
            <div className="mb-6">
                <h2 className="font-amaticbold text-5xl mb-4 font-medium text-white">
                    Summary
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
                    <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
                        <div className="text-white text-2xl font-baloo font-semibold">Active Loans</div>
                        <span className="mt-1 inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none">{activeLoansCount}</span>
                    </div>
                    {/* <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
                        <div className="text-white text-2xl font-baloo font-semibold">Total Received</div>
                        <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none">
                            <img src="/images/logo-honey.png" alt="HONEY" className="h-5 w-5" />
                            <span>{formatNum(totalReceived)}</span>
                        </div>
                    </div> */}
                    {/* <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
                        <div className="text-white text-2xl font-baloo font-semibold">Value</div>
                        <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none">
                            <img src="/images/logo-honey.png" alt="HONEY" className="h-5 w-5" />
                            <span>{formatNum(collateralValue)}</span>
                        </div>
                    </div> */}
                    <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
                        <div className="text-white text-2xl font-baloo font-semibold">Total to Repay</div>
                        <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none">
                            <img src="/images/logo-honey.png" alt="HONEY" className="h-5 w-5" />
                            <span>{formatNum(totalToRepay)}</span>
                        </div>
                    </div>
                    <div className="rounded-xl bg-black/10 border border-amber-900/20 px-4 py-3">
                        <div className="text-white text-2xl font-baloo font-semibold">Next Maturity</div>
                        {(() => {
                            const nextLabel = countdown;
                            const isTimer = isTimerString(nextLabel);
                            return (
                                <span
                                    className={cn(
                                        "mt-1 inline-flex items-center justify-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-2xl leading-none whitespace-nowrap mx-auto",
                                        isTimer ? "tabular-nums min-w-[13ch]" : "",
                                    )}
                                >
                                    {nextLabel}
                                </span>
                            );
                        })()}
                    </div>
                </div>
            </div>

            {/* My Loans Section */}
            <div className="flex items-center gap-2">
                <h2 className="font-amaticbold text-5xl my-2 font-medium text-white">My Loans</h2>
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
                                    className="peer appearance-none h-4 w-4 rounded-sm border border-HoneyYellow bg-HoneyYellow/20 checked:bg-HoneyYellow cursor-pointer"
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" id="hide-scrollbar">
                {!isConnected || filteredLoans.length === 0 ? (
                    <div className="col-span-full flex items-center justify-center opacity-50 mx-auto w-full py-10">
                        <div className="flex flex-col items-center">
                            <img className="mb-2 w-[30%] md:w-[20%]" src="/images/icon-not-found.png" alt="not-found" />
                            <h2 className="font-amaticbold text-center text-4xl md:text-5xl font-bold text-white">no loans</h2>
                        </div>
                    </div>
                ) : (
                    filteredLoans.map((loan) => (
                    <motion.div
                        key={loan.loanId}
                        layoutId={`extend-card-${loan.loanId}`}
                        className={cn(
                            "rounded-2xl border border-amber-900/30 bg-black/20 p-4 flex flex-col gap-3"
                        )}
                        aria-hidden={activeExtendLoanId === loan.loanId || undefined}
                    >
                        {/* Header: Loan ID + Status Badge */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <motion.h3 layoutId={`extend-title-${loan.loanId}`} className="font-amaticbold text-4xl text-white">Loan #{loan.loanId}</motion.h3>
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xl leading-none">{formatBeraName(loan.collateralNFT, loan.beraId, loan.beraIdRaw)}</span>
                                </div>
                                <span
                                    className={cn(
                                        "px-3 py-1 rounded-full text-sm font-baloo border",
                                        loan.repaid && "bg-blue-900/30 text-blue-300 border-blue-700/50",
                                        !loan.repaid && isLoanInGracePeriod(loan) && "bg-orange-900/40 text-orange-300 border-orange-700/50",
                                        !loan.repaid && !isLoanInGracePeriod(loan) && loan.status === "EXPIRING_SOON" && "bg-amber-900/40 text-amber-300 border-amber-700/50",
                                        !loan.repaid && !isLoanInGracePeriod(loan) && loan.status === "ACTIVE" && "bg-emerald-900/30 text-emerald-300 border-emerald-700/50",
                                        !loan.repaid && !isLoanInGracePeriod(loan) && loan.status === "EXPIRED" && "bg-red-900/30 text-red-300 border-red-700/50"
                                    ) as string}
                                >
                                    {loan.repaid ? "Repaid" : isLoanInGracePeriod(loan) ? "Grace Period" : loan.status === "EXPIRING_SOON" ? "Expiring soon" : loan.status === "ACTIVE" ? "Active" : "Expired"}
                                </span>
                            </div>
                        </div>

                        {/* Body: Collateral left, Summary right */}
                        <div className="flex items-stretch gap-4">
                            <div className="flex flex-col items-center min-w-[120px] justify-between">
                                <motion.img layoutId={`extend-image-${loan.loanId}`}
                                    className="border-2 border-black w-[120px] h-[120px] object-cover rounded-md"
                                    src={getBeraImageUrl(loan.collateralNFT, loan.beraId, loan.beraIdRaw)}
                                    alt={formatBeraName(loan.collateralNFT, loan.beraId, loan.beraIdRaw)}
                                />
                                {/* <div className="flex flex-col items-center gap-1 w-full">
                                    <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide">Health Factor</span>
                                    <span className={cn(
                                        "inline-flex items-center px-2.5 py-1 rounded-full border font-baloo text-lg leading-none justify-center w-full",
                                        calculateHealthFactor(loan.collateralValuation, loan.borrowedAmount) >= MIN_HEALTH_FACTOR_FOR_EXTEND
                                            ? "border-emerald-700/50 bg-emerald-900/20 text-emerald-300"
                                            : "border-red-700/50 bg-red-900/20 text-red-300"
                                    )}>
                                        {formatNum(calculateHealthFactor(loan.collateralValuation, loan.borrowedAmount))}
                                    </span>
                                </div> */}
                            </div>
                            <motion.div layoutId={`extend-summary-${loan.loanId}`} className="flex-1 flex flex-col gap-3">
                                <div className="rounded-xl bg-black/10 border border-amber-900/30 px-4 py-3 w-full flex flex-col gap-2">
                                    {/* <div className="flex w-full items-center justify-between gap-4">
                                        <span className="text-white text-xl font-baloo font-semibold uppercase tracking-wide">Value</span>
                                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xl leading-none justify-center">
                                            <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                            <span>{formatNum(loan.collateralValuation)}</span>
                                        </div>
                                    </div> */}
                                    <div className="flex w-full items-center justify-between gap-4">
                                        <span className="text-white text-xl font-baloo font-semibold uppercase tracking-wide">Initial Borrow</span>
                                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xl leading-none justify-center">
                                            <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                            <span>{formatNum(loan.borrowedAmount)}</span>
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center justify-between gap-4">
                                        <span className="text-white text-xl font-baloo font-semibold uppercase tracking-wide">To Repay</span>
                                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xl leading-none justify-center">
                                            <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                            <span>{formatNum(loan.borrowedAmount - (loan.repaidAmount || 0))}</span>
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white text-xl font-baloo font-semibold uppercase tracking-wide">
                                                {isLoanInGracePeriod(loan) ? "Grace Period" : "Maturity in"}
                                            </span>
                                            {isLoanInGracePeriod(loan) && (
                                                <span className="relative inline-flex group">
                                                    <span
                                                        className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-HoneyYellow/70 text-HoneyYellow text-xs leading-none font-bold cursor-pointer touch-manipulation"
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
                                                            "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl transition-opacity pointer-events-none shadow-2xl z-50 max-w-[calc(100vw-2rem)]",
                                                            "group-hover:opacity-100 md:opacity-0",
                                                            openTooltip === `grace-period-${loan.loanId}` ? "opacity-100 md:opacity-100" : "opacity-0"
                                                        )}
                                                        style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                                                    >
                                                        <p className="text-HoneyYellow text-base md:text-lg font-baloo whitespace-nowrap">You have 24 hours to repay Expired Loan until Liquidation.</p>
                                                        <div
                                                            className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
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
                                                        "inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xl leading-none justify-center whitespace-nowrap",
                                                        isTimer ? "tabular-nums min-w-[13ch]" : ""
                                                    )}
                                                >
                                                    {countdownLabel}
                                                </span>
                                            );
                                        })()}
                                    </div>
                                </div>

                                <div className="hidden">
                                    <ConnectButton.Custom>
                                        {({ account, chain, openChainModal, openConnectModal }) => (
                                            <button
                                                className={cn(
                                                    "flex-1 py-3 rounded-xl font-baloo text-lg font-bold transition-all border",
                                                    "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                                                )}
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
                                                        handleButtonClick(loan.loanId, loan.borrowedAmount, loan.borrowedAmount, loan.interest, BigInt(0), BigInt(0));
                                                    }
                                                }}
                                            >
                                                Repay
                                            </button>
                                        )}
                                    </ConnectButton.Custom>
                                    <button
                                        className={cn(
                                            "flex-1 py-3 rounded-xl font-baloo text-lg font-bold transition-all border",
                                            canRenewLoan(loan)
                                                ? "bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20 cursor-pointer"
                                                : "bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                                        )}
                                        onClick={() => {
                                            if (!canRenewLoan(loan)) return;
                                            updateBorrowLimit(loan.collateralNFT)
                                            setActiveExtendLoanId(loan.loanId)
                                        }}
                                        disabled={!canRenewLoan(loan)}
                                    >
                                        Renew
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                        {/* Bottom actions: wide equal buttons */}
                        <div className="flex gap-3 pt-1">
                            <AnimatePresence mode="wait">
                                {activeRepayLoanId === loan.loanId ? (
                                    activeRepayMode === null ? (
                                        // Initial state: Show Back/Partial/Full buttons
                                        <motion.div
                                            key="repay-options"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex gap-3 w-full"
                                        >
                                            <button
                                                className={cn(
                                                    "flex-1 py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer",
                                                    "bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20"
                                                )}
                                                onClick={handleRepayBack}
                                            >
                                                Back
                                            </button>
                                            <button
                                                className={cn(
                                                    "flex-1 py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer",
                                                    "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                                                )}
                                                onClick={handleRepayPartial}
                                            >
                                                Partial
                                            </button>
                                            <button
                                                id="full-repay-button"
                                                className={cn(
                                                    "flex-1 py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer",
                                                    "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                                                )}
                                                onClick={() => handleRepayFull()}
                                                disabled={txConfirming}
                                            >
                                                Full Repay
                                            </button>
                                        </motion.div>
                                    ) : activeRepayMode === "partial" ? (
                                        // Partial state: Show input field + Back/Confirm buttons
                                        <motion.div
                                            key="partial-input"
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
                                                        value={inputValues[loan.loanId] ?? ""}
                                                        onChange={(e) => handleInputChange(loan.loanId, e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-16 py-1.5 rounded-lg text-md font-baloo bg-amber-600/40 hover:bg-amber-700/60 border border-amber-600/30 text-amber-200 transition-colors cursor-pointer"
                                                        onClick={() => handleMaxClick(loan.loanId, loan.borrowedAmount - (loan.repaidAmount || 0))}
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
                                                onClick={handleRepayBack}
                                            >
                                                Back
                                            </button>
                                            <button
                                                id="partial-repay-confirm-button"
                                                className={cn(
                                                    "flex-none w-38 py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer",
                                                    "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                                                )}
                                                onClick={handleRepayConfirm}
                                                disabled={txConfirming}
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
                                        className="flex gap-3 w-full"
                                    >
                                        {isLoanFullyExpired(loan) || loan.repaid ? (
                                            <>
                                                <button
                                                    className={cn(
                                                        "flex-1 py-3 rounded-xl font-baloo text-lg font-bold border",
                                                        "bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                                                    )}
                                                    disabled
                                                >
                                                    Repay
                                                </button>
                                                <button
                                                    className={cn(
                                                        "flex-1 py-3 rounded-xl font-baloo text-lg font-bold border",
                                                        "bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                                                    )}
                                                    disabled
                                                >
                                                    Renew
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <ConnectButton.Custom>
                                                    {({ account, chain, openChainModal, openConnectModal }) => (
                                                        <button
                                                            className={cn(
                                                                "flex-1 py-3 rounded-xl font-baloo text-lg font-bold transition-all border cursor-pointer",
                                                                "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                                                            )}
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
                                                                        handleButtonClick(loan.loanId, loan.borrowedAmount, loan.borrowedAmount, loan.interest, BigInt(0), BigInt(0));
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            {isLoanInGracePeriod(loan) ? "Full Repay" : "Repay"}
                                                        </button>
                                                    )}
                                                </ConnectButton.Custom>
                                                <button
                                                    className={cn(
                                                        "flex-1 py-3 rounded-xl font-baloo text-lg font-bold transition-all border",
                                                        canRenewLoan(loan)
                                                            ? "bg-transparent text-white border-amber-900/40 hover:bg-amber-900/20 cursor-pointer"
                                                            : "bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                                                    )}
                                                    onClick={() => {
                                                        if (!canRenewLoan(loan)) return;
                                                        updateBorrowLimit(loan.collateralNFT)
                                                        setActiveExtendLoanId(loan.loanId)
                                                    }}
                                                    disabled={!canRenewLoan(loan)}
                                                >
                                                    Renew
                                                </button>
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
            <Dialog open={!!activeExtendLoan} onOpenChange={(open) => { if (!open) setActiveExtendLoanId(null); }}>
                {activeExtendLoan && (
                <DialogContent className="max-w-[720px] w-[min(720px,calc(100vw-32px))] max-h-[90vh] bg-black/90 border border-amber-900/40 rounded-2xl p-4 text-white shadow-2xl flex flex-col">
                            {/* Header replicated from card */}
                            <div className="flex flex-col gap-2 flex-shrink-0">
                                <div className="flex items-start justify-between pr-12">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-amaticbold text-4xl">Renew Loan #{activeExtendLoan.loanId}</h3>
                                        <span className="inline-flex items-center h-10 px-4 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-base leading-none">{formatBeraName(activeExtendLoan.collateralNFT, activeExtendLoan.beraId, activeExtendLoan.beraIdRaw)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={cn(
                                                "inline-flex items-center h-10 px-4 rounded-full text-base font-baloo border",
                                                activeExtendLoan.repaid && "bg-blue-900/30 text-blue-300 border-blue-700/50",
                                                !activeExtendLoan.repaid && isLoanInGracePeriod(activeExtendLoan) && "bg-orange-900/40 text-orange-300 border-orange-700/50",
                                                !activeExtendLoan.repaid && !isLoanInGracePeriod(activeExtendLoan) && activeExtendLoan.status === "EXPIRING_SOON" && "bg-amber-900/40 text-amber-300 border-amber-700/50",
                                                !activeExtendLoan.repaid && !isLoanInGracePeriod(activeExtendLoan) && activeExtendLoan.status === "ACTIVE" && "bg-emerald-900/30 text-emerald-300 border-emerald-700/50",
                                                !activeExtendLoan.repaid && !isLoanInGracePeriod(activeExtendLoan) && activeExtendLoan.status === "EXPIRED" && "bg-red-900/30 text-red-300 border-red-700/50"
                                            ) as string}
                                        >
                                            {activeExtendLoan.repaid ? "Repaid" : isLoanInGracePeriod(activeExtendLoan) ? "Grace Period" : activeExtendLoan.status === "EXPIRING_SOON" ? "Expiring soon" : activeExtendLoan.status === "ACTIVE" ? "Active" : "Expired"}
                                        </span>
                                        {/* {(() => {
                                            const healthFactor = calculateHealthFactor(activeExtendLoan.collateralValuation, activeExtendLoan.borrowedAmount);
                                            const canExtendByHealth = healthFactor >= MIN_HEALTH_FACTOR_FOR_EXTEND;
                                            const showHealthTooltip = !canExtendByHealth && !isLoanFullyExpired(activeExtendLoan);
                                            
                                            return showHealthTooltip ? (
                                                <span className="relative inline-flex group">
                                                    <span
                                                        className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-HoneyYellow/70 text-HoneyYellow text-xs leading-none font-bold cursor-pointer touch-manipulation"
                                                        aria-label="Health factor info"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const tooltipId = `health-factor-modal-${activeExtendLoan.loanId}`;
                                                            setOpenTooltip(openTooltip === tooltipId ? null : tooltipId);
                                                        }}
                                                    >
                                                        ?
                                                    </span>
                                                    <div
                                                        className={cn(
                                                            "absolute bottom-full mb-2 left-1/2 -translate-x-[85%] px-4 py-2.5 rounded-xl transition-opacity pointer-events-none shadow-2xl z-50 max-w-[calc(100vw-2rem)]",
                                                            "group-hover:opacity-100 md:opacity-0",
                                                            openTooltip === `health-factor-modal-${activeExtendLoan.loanId}` ? "opacity-100 md:opacity-100" : "opacity-0"
                                                        )}
                                                        style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                                                    >
                                                        <p className="text-HoneyYellow text-base md:text-lg font-baloo whitespace-nowrap">You need to partially repay this loan to improve the health factor and extend the loan</p>
                                                        <div
                                                            className="absolute bottom-[-6px] right-[calc(15%-6px)] w-2.5 h-2.5 rotate-45"
                                                            style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", borderRight: "2px solid rgba(205, 133, 63, 0.5)", borderBottom: "2px solid rgba(205, 133, 63, 0.5)" }}
                                                        />
                                                    </div>
                                                </span>
                                            ) : null;
                                        })()} */}
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable content */}
                            <div className="flex-1 min-h-0 overflow-y-auto mt-2">
                            {/* Body: image + summary copied inside expandable card */}
                            <div className="flex items-stretch gap-4">
                                <div className="flex flex-col items-center min-w-[120px] justify-between">
                                    <img
                                        className="border-2 border-black w-[120px] h-[120px] object-cover rounded-md"
                                        src={getBeraImageUrl(activeExtendLoan.collateralNFT, activeExtendLoan.beraId, activeExtendLoan.beraIdRaw)}
                                        alt={formatBeraName(activeExtendLoan.collateralNFT, activeExtendLoan.beraId, activeExtendLoan.beraIdRaw)}
                                    />
                                    {/* <div className="flex flex-col items-center gap-1 w-full">
                                        <span className="text-white text-sm font-baloo font-semibold uppercase tracking-wide">Health Factor</span>
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-1 rounded-full border font-baloo text-lg leading-none justify-center w-full",
                                            calculateHealthFactor(activeExtendLoan.collateralValuation, activeExtendLoan.borrowedAmount) >= MIN_HEALTH_FACTOR_FOR_EXTEND
                                                ? "border-emerald-700/50 bg-emerald-900/20 text-emerald-300"
                                                : "border-red-700/50 bg-red-900/20 text-red-300"
                                        )}>
                                            {formatNum(calculateHealthFactor(activeExtendLoan.collateralValuation, activeExtendLoan.borrowedAmount))}
                                        </span>
                                    </div> */}
                                </div>
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="rounded-xl bg-black/10 border border-amber-900/30 px-4 py-3 w-full flex flex-col gap-2">
                                        <div className="flex w-full items-center justify-between gap-4">
                                            <span className="text-white text-xl font-baloo font-semibold uppercase tracking-wide">Initial Borrow</span>
                                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xl leading-none justify-center">
                                                <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                                <span>{formatNum(activeExtendLoan.borrowedAmount)}</span>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center justify-between gap-4">
                                            <span className="text-white text-xl font-baloo font-semibold uppercase tracking-wide">To Repay</span>
                                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xl leading-none justify-center">
                                                <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                                <span>{formatNum(activeExtendLoan.borrowedAmount - (activeExtendLoan.repaidAmount || 0))}</span>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center justify-between gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white text-xl font-baloo font-semibold uppercase tracking-wide">
                                                    {isLoanInGracePeriod(activeExtendLoan) ? "Grace Period" : "Maturity in"}
                                                </span>
                                                {isLoanInGracePeriod(activeExtendLoan) && (
                                                    <span className="relative inline-flex group">
                                                        <span
                                                            className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-HoneyYellow/70 text-HoneyYellow text-xs leading-none font-bold cursor-pointer touch-manipulation"
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
                                                                "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl transition-opacity pointer-events-none shadow-2xl z-50 max-w-[calc(100vw-2rem)]",
                                                                "group-hover:opacity-100 md:opacity-0",
                                                                openTooltip === `grace-period-modal-${activeExtendLoan.loanId}` ? "opacity-100 md:opacity-100" : "opacity-0"
                                                            )}
                                                            style={{ backgroundColor: "rgba(60, 50, 40, 0.95)", border: "2px solid rgba(205, 133, 63, 0.5)" }}
                                                        >
                                                            <p className="text-HoneyYellow text-base md:text-lg font-baloo whitespace-nowrap">You have 24 hours to repay Expired Loan until liquidation.</p>
                                                            <div
                                                                className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
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
                                                            "inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-xl leading-none justify-center whitespace-nowrap",
                                                            isTimer ? "tabular-nums min-w-[13ch]" : ""
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

                            {/* Loan Config copied below */}
                            <div className="mt-4">
                                <h4 className="font-amaticbold text-center text-3xl sm:text-4xl font-bold text-white">Loan Config</h4>
                                <div className="h-0.5 w-24 sm:w-36 bg-stone-800 mx-auto -mt-1 mb-1" />

                                {/* Duration controls */}
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
                                                    extendDays === d ? "bg-HoneyYellow text-black border-HoneyYellow/50" : "bg-transparent text-white border-amber-900/30"
                                                )}
                                                onClick={() => setExtendDays(d)}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-2.5 rounded-xl bg-black/20 border border-amber-900/30 w-full mt-2">
                                    <Slider
                                        min={1}
                                        max={30}
                                        step={1}
                                        value={[extendDays]}
                                        onValueChange={(v: number[]) => setExtendDays(v[0])}
                                        className="flex-1"
                                    />
                                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-base sm:text-lg lg:text-xl leading-none whitespace-nowrap">{extendDays} Days</span>
                                </div>

                                {/* Borrow Additional Amount label (borrow style) */}
                                <div className="flex w-full items-center justify-between mb-1 mt-3">
                                    <span className="text-white font-baloo font-semibold text-xl sm:text-2xl">Borrow Additional Amount</span>
                                </div>
                                {/* Amount input (reused from borrow tab) */}
                                <div className="flex items-center gap-3 py-2.5 pr-2.5 pl-0 rounded-xl bg-black/20 border border-amber-900/30 focus-within:ring-2 focus-within:ring-amber-700/50 flex-wrap sm:flex-nowrap">
                                    <div className="relative w-full">
                                        <img src="/images/logo-honey.png" alt="HONEY" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            id="extend-amount-input"
                                            type="number"
                                            inputMode="decimal"
                                            placeholder="0.00"
                                            className="w-full bg-transparent border-none font-baloo text-xl sm:text-2xl font-bold text-white caret-white placeholder:text-white/60 focus:outline-none pl-9"
                                            value={extendAmountInput}
                                            onChange={(e) => setExtendAmountInput(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full sm:w-16 py-1.5 rounded-lg text-sm font-baloo bg-amber-600/40 hover:bg-amber-700/60 border border-amber-600/30 text-amber-200 transition-colors cursor-pointer"
                                        onClick={() => setExtendAmountInput(borrowLimit.toString())}
                                    >
                                        MAX
                                    </button>
                                </div>

                                {/* Borrow-style summary (using actual interest calculations) */}
                                {(() => {
                                    const extendAmountNum = parseFloat(extendAmountInput || "0") || 0;

                                    const newMaturityTs = activeExtendLoan.endDate + extendDays * 24 * 3600;
                                    const newMaturityLabel = formatDate(newMaturityTs);

                                    // You receive = new borrow amount minus the actual calculated interest (deducted upfront)
                                    // Use renewalInterest from calculateRenewalInterest, not an estimate
                                    const youReceive = extendAmountNum > 0 ? extendAmountNum - renewalInterest : 0;

                                    // Total to repay after renewal = existing loan + new borrow amount
                                    const newTotalToRepay = activeExtendLoan.borrowedAmount + extendAmountNum;

                                    return (
                                        <div className="flex flex-col gap-4 mt-2">
                                            <div className="rounded-2xl bg-amber-900/10 border border-amber-900/30 p-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Left column: first 3 in order */}
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex w-full items-center justify-between gap-4">
                                                            <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">Max Borrow</span>
                                                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center">
                                                                <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                                                <span>{formatNum(borrowLimit)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex w-full items-center justify-between gap-4">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">Interest Rate</span>
                                                            </div>
                                                            <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center text-center">
                                                                {renewalInterestRate > 0 ? `${renewalInterestRate.toFixed(2)}%` : "-"}
                                                            </div>
                                                        </div>
                                                        <div className="flex w-full items-center justify-between gap-4">
                                                            <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">Interest (Upfront)</span>
                                                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center">
                                                                <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                                                <span>{renewalInterest > 0 ? formatNum(renewalInterest) : "-"}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Right column: next 3 in order */}
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex w-full items-center justify-between gap-4">
                                                            <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">You Receive</span>
                                                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center">
                                                                <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                                                <span>{youReceive > 0 ? formatNum(youReceive) : "-"}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex w-full items-center justify-between gap-4">
                                                            <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">Maturity Date</span>
                                                            <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center">{newMaturityLabel}</div>
                                                        </div>
                                                        <div className="flex w-full items-center justify-between gap-4">
                                                            <span className="text-white text-[0.75rem] sm:text-xs font-baloo font-semibold uppercase tracking-wide">Total to Repay</span>
                                                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo text-lg sm:text-xl leading-none justify-center">
                                                                <img src="/images/logo-honey.png" alt="HONEY" className="h-4 w-4" />
                                                                <span>{formatNum(newTotalToRepay)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            
                            {/* Informational text and actions (pinned footer) */}
                            <div className="flex flex-col items-center justify-center gap-2">
                                    <div className="text-HoneyYellow font-amaticbold text-2xl sm:text-3xl text-center px-2">Interest is deducted upfront from your loan amount</div>
                                    {!canRenewLoan(activeExtendLoan) && (
                                        <div className="text-red-400 font-baloo text-base sm:text-lg text-center px-2">
                                            Cannot renew yet - loan must be within 7 days of expiration (including grace period)
                                        </div>
                                    )}
                                    <div className="w-full">
                                        <button
                                            id="renew-confirm-button"
                                            className={cn(
                                                "w-full py-3 rounded-xl font-amaticbold text-2xl sm:text-3xl transition-all border",
                                                canRenewLoan(activeExtendLoan) && !txConfirming
                                                    ? "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50 cursor-pointer"
                                                    : "bg-gray-900/30 text-gray-500 border-gray-700/40 cursor-not-allowed opacity-50"
                                            )}
                                            onClick={handleRenewConfirm}
                                            disabled={txConfirming || !canRenewLoan(activeExtendLoan)}
                                        >
                                            Confirm Renewal
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                </DialogContent>
                )}
            </Dialog>
        </div>
    )
}
