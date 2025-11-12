"use client"

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { cn } from "@/app/_components/utils";
import { ClassValue } from "clsx";

import {
  FieldWithLabel,
  Label,
  LabelSet,
  Container,
  FormWrapper
} from "@/app/(geo-check)/goldivault/vault/[address]/_components/./FormComponents";
import { SHORT_BUTTON_CLASSES } from "@/app/(geo-check)/goldivault/vault/[address]/_components/styles"

import { formatAsString, formatAsInterest } from "@/app/_components/utils";

import { useGoldilend } from "../../../providers";
import { useGoldilendTx } from "../../../hooks"
import { LendNotification } from "../../goldilend";

export const NewStakeTab = () => {

    const {
        lendActiveToggle,
        handlePercentageButtons,
        displayString,
        handleStakeChange,
        handleStakeBalance,
        txConfirming,
        notification,
        allowanceButtons,
        walletInfoLoading,
        infoLoading,
        goldilendInfo,
        goldilendWalletInfo,
        setAllowanceButtons,
        lock,
        stake
    } = useGoldilend();

    const {
        sendHoneyApproveTx
    } = useGoldilendTx()

    const loadingElement = () => {
        return <span className="loader-small ml-3"></span>;
    };

    const formatBalance = (num: number): string => {
        return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
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

    //todo: fix update allowances here
    const handleLeftButtonClick = async () => {
        const swapButton = document.getElementById("lend-button");
        const leftButton = document.getElementById("left-approve-button");
        const rightButton = document.getElementById("right-approve-button");
        if (leftButton) {
            leftButton.innerHTML = "approving...";
            leftButton.style.backgroundColor = "#C9E3B9";
        }
        if (rightButton) {
            rightButton.innerHTML = "approving...";
            rightButton.style.backgroundColor = "#C9E3B9";
        }
        if (lendActiveToggle === "LOCK") {
            await sendHoneyApproveTx(lock, false);
            // updateAllowance(honeyBuy + 0.01)
            swapButton && (swapButton.innerHTML = "lock");
            setAllowanceButtons(false);
        } else {
            await sendHoneyApproveTx(stake, false)
            // await sendGiBGTApproveTx(stake, false);
            // updateAllowance(honeyBuy + 0.01)
            swapButton && (swapButton.innerHTML = "deposit");
            setAllowanceButtons(false);
        }
    };

    const handleRightButtonClick = async () => {
        const swapButton = document.getElementById("lend-button");
        const rightButton = document.getElementById("right-approve-button");
        const leftButton = document.getElementById("left-approve-button");
        if (leftButton) {
            leftButton.innerHTML = "approving...";
            leftButton.style.backgroundColor = "#C9E3B9";
        }
        if (rightButton) {
            rightButton.innerHTML = "approving...";
            rightButton.style.backgroundColor = "#C9E3B9";
        }
        if (lendActiveToggle === "LOCK") {
            await sendHoneyApproveTx(0, true);
            // updateAllowance(100000000)
            swapButton && (swapButton.innerHTML = "lock");
            setAllowanceButtons(false);
        } else {
            await sendHoneyApproveTx(0, true)
            // await sendGiBGTApproveTx(0, true);
            // updateAllowance(100000000)
            swapButton && (swapButton.innerHTML = "deposit");
            setAllowanceButtons(false);
        }
    };

    const handleButtonClick = () => {
        const button = document.getElementById("lend-button");
        if (lendActiveToggle === "DEPOSIT") {
            // stakeTxFlow(button);
            console.log('deposit flow')
        }
        if (lendActiveToggle === "WITHDRAW") {
            // unstakeTxFlow(button);
            console.log('withdraw flow')
        }
    };

    return (
        <>
            <Frame border="xl" className="w-full lg:basis-2/3 flex flex-col px-24">
                <div className="flex flex-col items-center justify-between h-full">
                    <FormWrapper className="">
                        <LabelSet>
                            <Label>
                                {lendActiveToggle === "DEPOSIT" ? "Deposit HONEY" : "Withdraw gHONEY"}
                            </Label>
                        </LabelSet>
                        <FieldWithLabel
                            id="number-input"
                            label={lendActiveToggle === "DEPOSIT" ? "HONEY" : "gHONEY"}
                            value={displayString}
                            onChange={(e) => handleStakeChange(e.target.value, lendActiveToggle)}
                        />
                        <Container align="right" padding="sm">
                            <Label
                                className="cursor-pointer hover:scale-120"
                                onClick={() => handlePercentageButtons(4)}
                            >
                                Balance
                                <span className="text-teak">{" "}
                                {
                                    walletInfoLoading
                                    ? loadingElement()
                                    : formatBalance(lendActiveToggle === "DEPOSIT" ? goldilendWalletInfo.honey : goldilendWalletInfo.glhoney)
                                }
                                </span>
                            </Label>
                        </Container>
                        <LabelSet>
                            <Label>Tokens Received</Label>
                        </LabelSet>
                        <FieldWithLabel
                            id="number-input"
                            label={lendActiveToggle === "DEPOSIT" ? "gHONEY" : "HONEY"}
                            value={displayString}
                            disabled={true}
                        /> 
                    </FormWrapper>
                    <>
                        {allowanceButtons && (
                            <div>
                                <button
                                    className={cn(SHORT_BUTTON_CLASSES)}
                                    id="left-approve-button"
                                    onClick={() => handleLeftButtonClick()}
                                >
                                    Approve Tx
                                </button>
                                <button
                                    className={`${cn(SHORT_BUTTON_CLASSES)} mt-2`}
                                    id="right-approve-button"
                                    onClick={() => handleRightButtonClick()}
                                >
                                    Approve Infinite
                                </button>
                            </div>
                        )}
                        {!allowanceButtons && (
                            <ConnectButton.Custom>
                                {({ account, chain, openChainModal, openConnectModal }) => {
                                    return (
                                        <button
                                            className={cn(SHORT_BUTTON_CLASSES)}
                                            id="deposit-button"
                                            onClick={() => {
                                                const button = document.getElementById("deposit-button")

                                                if (!account) {
                                                    if (button && button.innerHTML === "Connect Wallet") {
                                                        openConnectModal();
                                                    } else {
                                                        button && (button.innerHTML = "Connect Wallet");
                                                    }
                                                } else if (chain?.name !== "Berachain") {
                                                    if (button && button.innerHTML === "Where Berachain??") {
                                                        openChainModal();
                                                    } else {
                                                        button && (button.innerHTML = "Where Berachain??");
                                                    }
                                                } else {
                                                    handleButtonClick();
                                                }
                                            }}
                                        >
                                            {lendActiveToggle === "DEPOSIT" ? "Deposit" : "Withdraw"}
                                        </button>
                                    )
                                }}
                            </ConnectButton.Custom>
                        )}
                    </>
                </div>
            </Frame>
            <div className="w-full lg:basis-1/3 flex flex-col gap-2">
                <aside className="flex h-full w-full max-w-none min-w-80 flex-col items-center gap-2.5 p-2">
                    <h2 className="font-amaticbold text-center text-4xl font-bold text-white">
                        Lending Pool Info
                    </h2>
                    <div className="h-0.5 w-[140px] bg-stone-800" />
                    <dl className="flex h-full w-full flex-col items-center gap-2">
                        <InfoRow 
                            textA="Fixed Interest Rate:"
                            textB={handleInfo(goldilendInfo.protocolInterestRate) as string}
                        />
                        <InfoRow 
                            textA="Pool Size:"
                            textB={handleInfo(goldilendInfo.glhoneySupply) as string}
                        />
                        <InfoRow 
                            textA="Total gHONEY Supply:"
                            textB={handleInfo(goldilendInfo.glhoneySupply) as string}
                        />
                        <InfoRow 
                            textA="Total Honey Borrowed:"
                            textB={handleInfo(goldilendInfo.outstandingDebt) as string}
                        />
                        <InfoRow 
                            textA="Total Redeemable gHONEY:"
                            textB={handleInfo(Math.min(goldilendInfo.poolSize - goldilendInfo.outstandingDebt, goldilendInfo.maxUtilization * goldilendInfo.poolSize)) as string}
                        />
                    </dl>
                </aside>
            </div>
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
};
const InfoRow: React.FC<InfoRowProps> = ({ textA, textB }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <dt className="font-baloo text-warm-text flex items-center text-left text-sm font-semibold">
        {textA}
      </dt>
      <dd className="text-md font-baloo text-HoneyYellow text-right font-semibold">
        {textB}
      </dd>
    </div>
  );
};