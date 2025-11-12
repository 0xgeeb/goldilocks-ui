"use client"

import { useState } from "react"
import { cn, formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi"

import { useGoldilend } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"

export const GhoneyButton = () => {
    
    const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

    const {
        lendActiveToggle,
        stake,
        unstake,
        goldilendWalletInfo,
        setTxConfirming,
        openNotification,
        setAllowanceButtons,
        setDisplayString,
        setStake,
        setUnstake,
        refreshGoldilendInfo,
        refreshGoldilendWalletInfo,
        allowanceButtons
    } = useGoldilend()

    const {
        checkStakeAllowance,
        sendHoneyApproveTx,
        sendStakeTx,
        sendUnstakeTx
    } = useGoldilendTx()

    const { address } = useAccount()

    const refreshInfo = () => {
        setDisplayString("");
        setStake(0);
        setUnstake(0);
        refreshGoldilendWalletInfo();
        refreshGoldilendInfo();
    };

    const handleButtonClick = () => {
        console.log(lendActiveToggle)
        const button = document.getElementById("deposit-button");
        if (lendActiveToggle === "DEPOSIT") {
            depositTxFlow(button);
        }
        if (lendActiveToggle === "WITHDRAW") {
            withdrawTxFlow(button);
        }
    };

    const depositTxFlow = async (button: HTMLElement | null) => {
        if (stake == 0) {
            button && (button.innerHTML = "deposit");
            return;
        }
        if (stake > goldilendWalletInfo.honey) {
            button && (button.innerHTML = "not enough");
            return;
        }
        else {
            const sufficientAllowance: boolean | void = await checkStakeAllowance(
                stake,
                address as `0x${string}`,
            );
            if (sufficientAllowance) {
                setTxConfirming(true);
                if (button) {
                    button.innerHTML = "confirming...";
                    setButtonLoadingColor(true);
                }
                const stakeTx = await sendStakeTx(stake);
                if (stakeTx.substring(0, 2) === "0x") {
                    setTxConfirming(false);
                    openNotification(
                        true,
                        "You've successfully deposited $HONEY",
                        `You deposited ${formatAsString(stake)} HONEY`,
                        stakeTx,
                    );
                    if (button) {
                        button.innerHTML = "deposit";
                        setButtonLoadingColor(false);
                    }
                    refreshInfo();
                    setTimeout(() => {
                        openNotification(false, "", "", "");
                    }, 10000);
                }
                else {
                    if (button) {
                        button.innerHTML = "deposit";
                        setButtonLoadingColor(false);
                    }
                    refreshInfo();
                    setTxConfirming(false);
                }
            }
            else {
                setAllowanceButtons(true);
            }
        }
      };
    
    const withdrawTxFlow = async (button: HTMLElement | null) => {
        if (unstake == 0) {
            button && (button.innerHTML = "withdraw");
            return;
        }
        if (unstake > goldilendWalletInfo.glhoney) {
            button && (button.innerHTML = "not enough");
            return;
        }
        else {
            setTxConfirming(true);
            if (button) {
                button.innerHTML = "confirming...";
                setButtonLoadingColor(true);
            }
            const unstakeTx = await sendUnstakeTx(unstake);
            if (unstakeTx.substring(0, 2) === "0x") {
                setTxConfirming(false);
                openNotification(
                    true,
                    "You've successfully withdrew $glHONEY",
                    `You withdrew ${formatAsString(unstake)} glHONEY`,
                    unstakeTx,
                );
                if (button) {
                    button.innerHTML = "withdraw";
                    setButtonLoadingColor(false);
                }
                refreshInfo();
                setTimeout(() => {
                    openNotification(false, "", "", "");
                }, 10000);
            }
            else {
                if (button) {
                    button.innerHTML = "withdraw";
                    setButtonLoadingColor(false);
                }
                refreshInfo();
                setTxConfirming(false);
            }
        }
    };
    
    const handleLeftButtonClick = async () => {
        const depositButton = document.getElementById("deposit-button");
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
        await sendHoneyApproveTx(stake, false)
        depositButton && (depositButton.innerHTML = "deposit");
        setAllowanceButtons(false);
    };
    
    const handleRightButtonClick = async () => {
        const depositButton = document.getElementById("deposit-button");
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
        await sendHoneyApproveTx(0, true)
        depositButton && (depositButton.innerHTML = "deposit");
        setAllowanceButtons(false);
    };

    return (
        <>
            {allowanceButtons && (
                <div className="w-full flex gap-2">
                    <button
                        className="flex-1 py-3 rounded-xl font-amaticbold text-4xl transition-all border bg-[#E7B941] hover:bg-[#C9E3B9] text-black border-black cursor-pointer"
                        id="left-approve-button"
                        onClick={() => handleLeftButtonClick()}
                    >
                        approve tx
                    </button>
                    <button
                        className="flex-1 py-3 rounded-xl font-amaticbold text-4xl transition-all border bg-[#E7B941] hover:bg-[#C9E3B9] text-black border-black cursor-pointer"
                        id="right-approve-button"
                        onClick={() => handleRightButtonClick()}
                    >
                        approve infinite
                    </button>
                </div>
            )}
            {!allowanceButtons && (
                <ConnectButton.Custom>
                    {({ account, chain, openChainModal, openConnectModal }) => {
                        return (
                            <button
                                className={cn(
                                    "w-full py-3 rounded-xl font-amaticbold text-4xl transition-all border",
                                    "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50 cursor-pointer"
                                )}
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
                                {lendActiveToggle === "DEPOSIT" ? "deposit" : "withdraw"}
                            </button>
                        )
                    }}
                </ConnectButton.Custom>
            )}
        </>
    )
}