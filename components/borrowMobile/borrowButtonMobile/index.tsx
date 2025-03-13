"use client";

import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useBorrowTx } from "../../../hooks";
import { useBorrow } from "../../../providers";

export const BorrowButtonMobile = () => {
  const { address } = useAccount();

  const {
    borrowInfo,
    borrowWalletInfo,
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
    refreshBorrowWalletInfo,
    openNotification,
  } = useBorrow();

  const { checkAllowance, sendApproveTx, sendBorrowTx, sendRepayTx } =
    useBorrowTx();

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
      button && (button.innerHTML = "balance too low");
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = "confirming...";
        button.style.backgroundColor = "#634C43";
        button.style.color = "#E7B941";
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
          button.style.backgroundColor = "#E7B941";
          button.style.color = "black";
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "borrow";
          button.style.backgroundColor = "#E7B941";
          button.style.color = "black";
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
    if (repay > borrowWalletInfo.borrowed) {
      button && (button.innerHTML = "balance too low");
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
          button.style.backgroundColor = "#634C43";
          button.style.color = "#E7B941";
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
            button.style.backgroundColor = "#E7B941";
            button.style.color = "black";
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "repay";
            button.style.backgroundColor = "#E7B941";
            button.style.color = "black";
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
      if (repay > borrowWalletInfo.honeyBorrowAllowance) {
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
            className="absolute left-[23%] top-[49%] h-[8%] w-[23%] border-2 border-black bg-[#E7B941] font-amaticbold text-[5vw] focus:scale-110 focus:bg-[#634C43] focus:text-[#E7B941]"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute left-[54%] top-[49%] h-[8%] w-[23%] border-2 border-black bg-[#E7B941] font-amaticbold text-[5vw] focus:scale-110 focus:bg-[#634C43] focus:text-[#E7B941]"
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
                className="absolute left-[23%] top-[49%] flex h-[8%] w-[54%] items-center justify-center border-2 border-black bg-[#E7B941] font-amaticbold text-[9vw] focus:scale-110 focus:bg-[#634C43] focus:text-[#E7B941]"
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
