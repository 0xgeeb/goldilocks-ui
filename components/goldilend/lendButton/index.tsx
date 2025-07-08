"use client";

import { useState } from "react";

import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldilendTx } from "../../../hooks";
import { useGoldilend } from "../../../providers";

export const LendButton = () => {
  const {
    allowanceButtons,
    lendActiveToggle,
    lock,
    stake,
    unstake,
    setAllowanceButtons,
    setTxConfirming,
    refreshGoldilendInfo,
    setDisplayString,
    setLock,
    setStake,
    setUnstake,
    openNotification,
    refreshGoldilendWalletInfo,
    goldilendWalletInfo,
  } = useGoldilend();

  const {
    checkLockAllowance,
    checkStakeAllowance,
    sendiBGTApproveTx,
    sendGiBGTApproveTx,
    sendWBERAApproveTx,
    sendLockTx,
    sendStakeTx,
    sendUnstakeTx,
  } = useGoldilendTx();

  const { address } = useAccount();

  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

  const refreshInfo = () => {
    setDisplayString("");
    setLock(0);
    setStake(0);
    setUnstake(0);
    refreshGoldilendWalletInfo();
    refreshGoldilendInfo();
  };

  const handleButtonClick = () => {
    const button = document.getElementById("lend-button");
    // if (lendActiveToggle === "LOCK") {
    //   lockTxFlow(button);
    // }
    if (lendActiveToggle === "STAKE") {
      stakeTxFlow(button);
    }
    if (lendActiveToggle === "UNSTAKE") {
      unstakeTxFlow(button);
    }
  };

  // const lockTxFlow = async (button: HTMLElement | null) => {
  //   if (lock == 0) {
  //     button && (button.innerHTML = "lock");
  //     return;
  //   }
  //   if (lock > goldilendWalletInfo.ibgt) {
  //     button && (button.innerHTML = "not enough");
  //     return;
  //   } else {
  //     const sufficientAllowance: boolean | void = await checkLockAllowance(
  //       lock,
  //       address as `0x${string}`,
  //     );
  //     if (sufficientAllowance) {
  //       setTxConfirming(true);
  //       if (button) {
  //         button.innerHTML = "confirming...";
  //         setButtonLoadingColor(true);
  //       }
  //       const lockTx = await sendLockTx(lock);
  //       if (lockTx.substring(0, 2) === "0x") {
  //         setTxConfirming(false);
  //         openNotification(
  //           true,
  //           "You've successfully locked $iBGT",
  //           `You locked ${formatAsString(lock)} iBGT`,
  //           lockTx,
  //         );
  //         if (button) {
  //           button.innerHTML = "lock";
  //           setButtonLoadingColor(false);
  //         }
  //         refreshInfo();
  //         setTimeout(() => {
  //           openNotification(false, "", "", "");
  //         }, 10000);
  //       } else {
  //         if (button) {
  //           button.innerHTML = "lock";
  //           setButtonLoadingColor(false);
  //         }
  //         refreshInfo();
  //         setTxConfirming(false);
  //       }
  //     } else {
  //       setAllowanceButtons(true);
  //     }
  //   }
  // };

  const stakeTxFlow = async (button: HTMLElement | null) => {
    if (stake == 0) {
      button && (button.innerHTML = "stake");
      return;
    }
    if (stake > goldilendWalletInfo.wbera) {
      button && (button.innerHTML = "not enough");
      return;
    } else {
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
            "You've successfully staked $WBERA",
            `You staked ${formatAsString(stake)} WBERA`,
            stakeTx,
          );
          if (button) {
            button.innerHTML = "stake";
            setButtonLoadingColor(false);
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "stake";
            setButtonLoadingColor(false);
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const unstakeTxFlow = async (button: HTMLElement | null) => {
    if (unstake == 0) {
      button && (button.innerHTML = "unstake");
      return;
    }
    if (unstake > goldilendWalletInfo.glwbera) {
      button && (button.innerHTML = "not enough");
      return;
    } else {
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
          "You've successfully unstaked $glWBERA",
          `You unstaked ${formatAsString(unstake)} glWBERA`,
          unstakeTx,
        );
        if (button) {
          button.innerHTML = "unstake";
          setButtonLoadingColor(false);
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "unstake";
          setButtonLoadingColor(false);
        }
        refreshInfo();
        setTxConfirming(false);
      }
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
      await sendiBGTApproveTx(lock, false);
      // updateAllowance(honeyBuy + 0.01)
      swapButton && (swapButton.innerHTML = "lock");
      setAllowanceButtons(false);
    } else {
      await sendWBERAApproveTx(stake, false)
      // await sendGiBGTApproveTx(stake, false);
      // updateAllowance(honeyBuy + 0.01)
      swapButton && (swapButton.innerHTML = "stake");
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
      await sendiBGTApproveTx(0, true);
      // updateAllowance(100000000)
      swapButton && (swapButton.innerHTML = "lock");
      setAllowanceButtons(false);
    } else {
      await sendWBERAApproveTx(0, true)
      // await sendGiBGTApproveTx(0, true);
      // updateAllowance(100000000)
      swapButton && (swapButton.innerHTML = "stake");
      setAllowanceButtons(false);
    }
  };

  const renderButton = () => {
    if (lendActiveToggle === "LOCK") {
      return "lock";
    }
    if (lendActiveToggle === "STAKE") {
      return "stake";
    }
    if (lendActiveToggle === "UNSTAKE") {
      return "unstake";
    }
  };

  //todo: doesnt go away when removing number and main button text doesnt change, prolly just error with allowance fetching
  return (
    <>
      {allowanceButtons && (
        <div>
          <button
            className="absolute left-[25.5%] top-[61%] h-[8%] w-[22%] border-2 border-black bg-[#E7B941] font-amaticbold text-[3.5vw] hover:scale-110 hover:bg-[#C9E3B9] hover:text-black xl:left-[33.9%] xl:top-[59%] xl:w-[16.6%] xl:text-[1.5vw] cursor-pointer"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute left-[53.5%] top-[61%] h-[8%] w-[22%] border-2 border-black bg-[#E7B941] font-amaticbold text-[3.5vw] hover:scale-110 hover:bg-[#C9E3B9] hover:text-black xl:left-[55.5%] xl:top-[59%] xl:w-[16.6%] xl:text-[1.5vw] cursor-pointer"
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
                className={`absolute left-[39%] top-[61%] h-[8%] w-[22%] xl:left-[44.7%] xl:top-[59%] xl:w-[16.6%] ${buttonLoadingColor ? "bg-[#C9E3B9] text-black" : "bg-[#E7B941] text-black"} border-2 border-black font-amaticbold text-[4vw] hover:scale-110 hover:bg-[#C9E3B9] hover:text-black xl:text-[1.9vw] cursor-pointer`}
                id="lend-button"
                onClick={() => {
                  const button = document.getElementById("lend-button");

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
                    handleButtonClick();
                  }
                }}
              >
                {renderButton()}
              </button>
            );
          }}
        </ConnectButton.Custom>
      )}
    </>
  );
};
