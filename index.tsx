"use client"

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import { cn } from "@/app/_components/utils";
import { ClassValue } from "clsx";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  FieldWithLabel,
  FormWrapper
} from "@/app/(geo-check)/goldivault/vault/[address]/_components/./FormComponents";
import { HoverText } from "@/app/(geo-check)/goldivault/vault/[address]/_components/./InfoHover"; 
import { formatAsString } from "@/app/_components/utils";

import { useGoldilendTx } from "./hooks";
import { useGoldilend } from "@/providers";
import { contracts } from "./utils/addressi";


export const NewBorrowTab = () => {

    const [daysTilExpiration, setDaysTilExpiration] = useState<number>(7);

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
    infoLoading
    } = useGoldilend();

    const { checkLoanAllowance, sendGoldilendNFTApproveTx, sendBorrowTx } = useGoldilendTx();

    const { address, isConnected } = useAccount();

    useEffect(() => {
        updateBorrowLimit();
    }, [selectedBera, updateBorrowLimit]);

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
            if (daysDifference >= 1 && daysDifference <= 90) {
                setDaysTilExpiration(daysDifference);
            }
        }
    }, [debouncedLoanExpiration]);

    const loadingElement = () => {
        return <span className="loader-small mx-auto mt-[10%]"></span>;
    };


    const handleInfo = (num: number) => {
        if (infoLoading) {
            return loadingElement();
        } else if (num > 0) {
            return formatAsString(num);
        } else {
            return "-";
        }
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
        const [, bandFlag] = await checkLoanAllowance(
            address as `0x${string}`,
        );
        if (
            // (bondFlag || selectedBera.name !== "BondBera") &&
            (bandFlag || selectedBera.name !== "BandBera")
        ) {
            borrowTxFlow(button);
        } else {
            button && (button.innerHTML = "approving...");
            
            // if (!bondFlag && selectedBera.name === "BondBera") {
            //   await sendGoldilendNFTApproveTx(contracts.bondbear.address);
            // }
            if (!bandFlag && selectedBera.name === "BandBera") {
            await sendGoldilendNFTApproveTx(contracts.bandbear.address);
            }
            button && (button.innerHTML = "create loan");
            
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
        parseDate(loanExpiration),
    );
    if (borrowTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
        true,
        "You've successfully created a loan",
        `You borrowed ${formatAsString(loanAmount - loanInterest)} HONEY against your bera`,
        borrowTx,
        );
        button && (button.innerHTML = "create loan");
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
        button && (button.innerHTML = "create loan");
        if (button) {
            button.classList.remove("bg-amber-900/60", "text-HoneyYellow", "border-amber-700/50");
            button.classList.add("bg-HoneyYellow", "hover:bg-amber-500", "text-black", "border-HoneyYellow/50");
        }
        changeActiveToggle("BORROW");
        setDaysTilExpiration(7);
        setTxConfirming(false);
    }
    };

    const sliderValue = ((daysTilExpiration - 1) / (90 - 1)) * 100;

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

    return (
        <>
            <div className="w-full lg:basis-3/8 flex flex-col gap-2">
                <div className="flex flex-col items-center h-full gap-3 p-6">
                    <h2 className="font-amaticbold text-center text-4xl font-bold text-white">
                        Select Collateral
                    </h2>
                    <div className="h-0.5 w-[140px] bg-stone-800" />
                    <div className="flex flex-wrap justify-center gap-4 overflow-y-auto p-4" id="hide-scrollbar">
                        {
                            berasLoading ? loadingElement() :
                            (!isConnected || ownedBeras.length == 0) ?
                                <div className="flex size-full flex-col items-center justify-center opacity-50">
                                    <img
                                        className="mb-[5%] w-[50%]"
                                        src="/images/icon-not-found.png"
                                        alt="not-found"
                                    />
                                    <h2 className="font-amaticbold text-center text-4xl font-bold text-white">
                                        no beras
                                    </h2>
                                </div> :
                            ownedBeras.map((bera, index) => (
                                <div key={index} className="">
                                    <img
                                        className={`h-[125px] w-[125px] border-3 border-white rounded-xl hover:cursor-pointer ${selectedBera.index == bera.index ? "border-6 border-white" : "opacity-65"}`}
                                        onClick={() => handleBeraClick(bera)}
                                        src={
                                            bera.name === "BondBera"
                                                ? "/images/icon-bondbear.png"
                                                : "/images/icon-bandbear.png"
                                        }
                                        alt="bera"
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Frame border="xl" className="w-full lg:basis-3/8 flex flex-col">
                <div className="flex flex-col items-center justify-between h-full">
                    <FormWrapper className="gap-3">
                        <h2 className="font-amaticbold text-center text-4xl font-bold text-white">
                            Create Loan
                        </h2>
                        <div className="h-0.5 w-[140px] bg-stone-800 mx-auto" />
                        <FieldWithLabel
                            id="number-input"
                            label={"Loan Amount"}
                            placeholder={"0"}
                            value={borrowDisplayString}
                            onChange={(e) => handleBorrowChange(e.target.value)}
                        />
                        <FieldWithLabel 
                            id="number-input"
                            label={"Repay Deadline"}
                            placeholder={"mm-dd-yyyy"}
                            value={loanExpiration}
                            onChange={(e) => handleLoanDateChange(e.target.value)}
                        />
                        <div className="flex w-[95%] flex-row items-center justify-between">
                            <div className="flex h-full w-[70%] items-center justify-center rounded-xl bg-[#322514] p-2">
                                <input
                                    className="size-full rounded-xl bg-black hover:cursor-pointer"
                                    id="date-slider"
                                    type="range"
                                    min="1"
                                    max="90"
                                    value={daysTilExpiration}
                                    onChange={(e) => handleSliderChange(e.target.value)}
                                    style={{
                                        background: `linear-gradient(to right, #CFA08B ${sliderValue}%, #322514 ${sliderValue}%)`,
                                    }}
                                />
                            </div>
                            <span className="text-sm font-bold text-teak">{daysTilExpiration} Day{daysTilExpiration > 1 ? "s" : ""}</span>
                        </div>
                        <InfoRow 
                            textA="Interest Rate:"
                            textB={handleInfo(loanInterestRate) as string}
                            hoverEnabled={false}
                            hoverText=""
                        />
                        <InfoRow 
                            textA="Interest Due:"
                            textB={handleInfo(loanInterest) as string}
                            hoverEnabled={false}
                            hoverText=""
                        />
                        <InfoRow 
                            textA="Total Amount to Repay:"
                            textB={handleInfo(loanAmount) as string}
                            hoverEnabled={false}
                            hoverText=""
                        />
                        <InfoRow 
                            textA="You Will Receive:"
                            textB={handleInfo(loanAmount - loanInterest) as string}
                            hoverEnabled={true}
                            hoverText="Interest on the loan is paid upfront from the borrow amount"
                        />
                        <ConnectButton.Custom>
                            {({ account, chain, openChainModal, openConnectModal }) => {
                                return (
                                    <button
                                        className={cn(
                                            "w-full py-4 rounded-xl font-baloo text-xl font-bold transition-all border",
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
                                        Create Loan
                                    </button>
                                )
                            }}
                        </ConnectButton.Custom>
                    </FormWrapper>
                </div>
            </Frame>
      {/* Goldilend Info sidebar removed; stats are now shown via page marquee */}
        </>
    )
}

function Frame({
  children,
  border,
  className,
}: {
  children?: React.ReactNode;
  // If we define a border, define it by radius. If we omit, we don't want a border
  border?: '3xl' | '2xl' | 'xl' | 'lg' | undefined
  className?: ClassValue;
}) {
  return (
    <div
      className={cn(
        `${border ? "rounded-" + border : "border-none"} border-2 border-[#352A1C] p-2`,
        className,
      )}
    >
      {children}
    </div>
  );
};

type InfoRowProps = {
  textA: string;
  textB: string;
  hoverEnabled: boolean;
  hoverText: string;
};
const InfoRow: React.FC<InfoRowProps> = ({ textA, textB, hoverEnabled, hoverText }: InfoRowProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <dt className="font-baloo text-warm-text flex items-center text-left text-md font-semibold">
        {textA}
        {hoverEnabled && <HoverText hoverText={hoverText} />}
      </dt>
      <dd className="text-md font-baloo text-HoneyYellow text-right font-semibold">
        {textB}
      </dd>
    </div>
  );
};

// Goldilend Info sidebar removed here as well to avoid duplicate UI