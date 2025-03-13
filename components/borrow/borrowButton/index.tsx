"use client";

import { useState } from "react";

import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useBorrowTx } from "../../../hooks";
import { useBorrow } from "../../../providers";

export const BorrowButton = () => {
  const { address, isConnected } = useAccount();

  const {
    borrowInfo,
    activeToggle,
    allowanceButtons,
    borrow,
    repay,
    updateAllowance,
    setAllowanceButtons,
    setTxConfirming,
    setDisplayString,
    setBorrow,
    setRepay,
    refreshBorrowInfo,
    openNotification,
    refreshBorrowWalletInfo,
    borrowWalletInfo,
  } = useBorrow();

  const { checkAllowance, sendApproveTx, sendBorrowTx, sendRepayTx } =
    useBorrowTx();

  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

  const refreshInfo = () => {
    setDisplayString("");
    setBorrow(0);
    setRepay(0);
    refreshBorrowWalletInfo();
    refreshBorrowInfo();
  };

  const handleButtonClick = async () => {
    const button = document.getElementById("borrow-button");
    if (activeToggle === "BORROW") {
      borrowTxFlow(button);
    }
    if (activeToggle === "REPAY") {
      repayTxFlow(button);
    }
  };

  const borrowTxFlow = async (button: HTMLElement | null) => {
    if (borrow == 0) {
      button && (button.innerHTML = "borrow");
      return;
    }
    if (
      borrow >
      (borrowWalletInfo.staked - borrowWalletInfo.locked) *
        (borrowInfo.fsl / borrowInfo.supply)
    ) {
      button && (button.innerHTML = "not enough");
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = "confirming...";
        setButtonLoadingColor(true);
      }
      const borrowTx = await sendBorrowTx(borrow);
      if (borrowTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
          true,
          "You've successfully borrowed $HONEY",
          `You borrowed ${formatAsString(borrow)} Honey with ${formatAsString(borrow / (borrowInfo.fsl / borrowInfo.supply))} Locks`,
          borrowTx,
        );
        if (button) {
          button.innerHTML = "borrow";
          setButtonLoadingColor(false);
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "borrow";
          setButtonLoadingColor(false);
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
  };

  const repayTxFlow = async (button: HTMLElement | null) => {
    if (repay == 0) {
      button && (button.innerHTML = "repay");
      return;
    }
    if (repay > borrowWalletInfo.borrowed || repay > borrowWalletInfo.honey) {
      button && (button.innerHTML = "not enough");
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkAllowance(
        repay,
        address as `0x${string}`,
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = "confirming...";
          setButtonLoadingColor(true);
        }
        const repayTx = await sendRepayTx(repay);
        if (repayTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            "You've successfully repaid $HONEY",
            `You repaid ${formatAsString(repay)} Honey`,
            repayTx,
          );
          if (button) {
            button.innerHTML = "repay";
            setButtonLoadingColor(false);
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "repay";
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

  const handleLeftButtonClick = async () => {
    const borrowButton = document.getElementById("borrow-button");
    const leftButton = document.getElementById("left-approve-button");
    const rightButton = document.getElementById("right-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#634C43";
      leftButton.style.color = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#634C43";
      rightButton.style.color = "#E7B941";
    }
    await sendApproveTx(repay, false);
    updateAllowance(repay + 0.01);
    borrowButton && (borrowButton.innerHTML = "repay");
    setAllowanceButtons(false);
  };

  const handleRightButtonClick = async () => {
    const borrowButton = document.getElementById("borrow-button");
    const rightButton = document.getElementById("right-approve-button");
    const leftButton = document.getElementById("left-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#634C43";
      leftButton.style.color = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#634C43";
      rightButton.style.color = "#E7B941";
    }
    await sendApproveTx(0, true);
    updateAllowance(10000000000);
    borrowButton && (borrowButton.innerHTML = "repay");
    setAllowanceButtons(false);
  };

  const renderButton = () => {
    if (activeToggle === "BORROW") {
      return "borrow";
    }
    if (activeToggle === "REPAY") {
      if (isConnected && repay > borrowWalletInfo.honeyBorrowAllowance) {
        return "approve honey";
      }
      return "repay";
    }
  };

  return (
    <>
      {allowanceButtons && (
        <div>
          <button
            className="cursor-pointer absolute left-[24%] top-[60%] h-[8%] w-[24%] border-2 border-black bg-[#E7B941] font-amaticbold text-[4vw] hover:scale-110 hover:bg-[#634C43] hover:text-[#E7B941] md:text-[2.75vw] lg:left-[30.9%] lg:top-[54.8%] lg:w-[16.6%] lg:text-[2vw] xl:text-[1.5vw] 2xl:top-[55%]"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="cursor-pointer absolute left-[52%] top-[60%] h-[8%] w-[24%] border-2 border-black bg-[#E7B941] font-amaticbold text-[4vw] hover:scale-110 hover:bg-[#634C43] hover:text-[#E7B941] md:text-[2.75vw] lg:left-[52.5%] lg:top-[54.8%] lg:w-[16.6%] lg:text-[2vw] xl:text-[1.5vw] 2xl:top-[55%]"
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
                className={`cursor-pointer absolute left-[32%] top-[60%] h-[8%] w-[36%] md:left-[37%] md:w-[26%] lg:left-[41.6%] lg:top-[54.8%] lg:w-[16.6%] 2xl:top-[55%] ${buttonLoadingColor ? "bg-[#634C43] text-[#E7B941]" : "bg-[#E7B941] text-black"} border-2 border-black font-amaticbold text-[5vw] hover:scale-110 hover:bg-[#634C43] hover:text-[#E7B941] md:text-[4vw] lg:text-[3vw] xl:text-[2.25vw] 2xl:text-[1.9vw] tall:text-[6vw] tall:md:text-[4vw] tall:lg:text-[3vw] tall:xl:text-[2.5vw] tall:2xl:text-[1.9vw]`}
                id="borrow-button"
                onClick={() => {
                  const button = document.getElementById("borrow-button");

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
