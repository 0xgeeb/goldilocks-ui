"use client";

import { useState } from "react";

import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldiswapTx } from "../../../hooks";
import { useGoldiswap } from "../../../providers";

export const GoldiswapButton = () => {
  const { address, isConnected } = useAccount();

  const {
    activeToggle,
    debouncedHoneyBuy,
    goldiswapWalletInfo,
    refreshGoldiswapWalletInfo,
    honeyBuy,
    allowanceButtons,
    setAllowanceButtons,
    updateAllowance,
    buyingLocks,
    refreshGoldiswapInfo,
    setTxConfirming,
    sellingLocks,
    openNotification,
    setDisplayString,
    setBottomDisplayString,
    setHoneyBuy,
    setSellingLocks,
    setRedeemingLocks,
    gettingHoney,
    redeemingLocks,
    redeemingHoney,
    setBuyingLocks,
    setGettingHoney,
    setRedeemingHoney,
    buyingLocksLoading,
  } = useGoldiswap();

  const { checkAllowance, sendApproveTx, sendBuyTx, sendSellTx, sendRedeemTx } =
    useGoldiswapTx();

  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

  const refreshInfo = () => {
    setDisplayString("");
    setBottomDisplayString("");
    setHoneyBuy(0);
    setBuyingLocks(0);
    setSellingLocks(0);
    setGettingHoney(0);
    setRedeemingLocks(0);
    setRedeemingHoney(0);
    refreshGoldiswapWalletInfo();
    refreshGoldiswapInfo();
  };

  const handleButtonClick = () => {
    const button = document.getElementById("swap-button");
    if (activeToggle === "BUY") {
      if (buyingLocks == 0 || buyingLocksLoading) {
        return;
      }
      buyTxFlow(button);
    }
    if (activeToggle === "SELL") {
      sellTxFlow(button);
    }
    if (activeToggle === "REDEEM") {
      redeemTxFlow(button);
    }
  };

  const buyTxFlow = async (button: HTMLElement | null) => {
    if (honeyBuy == 0) {
      button && (button.innerHTML = "buy");
      return;
    }
    if (honeyBuy > goldiswapWalletInfo.honey) {
      button && (button.innerHTML = "not enough");
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkAllowance(
        honeyBuy,
        address as `0x${string}`,
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = "confirming...";
          setButtonLoadingColor(true);
        }
        const buyTx = await sendBuyTx(buyingLocks, honeyBuy);
        if (buyTx === "slippage") {
          button && (button.innerHTML = "slippage too low");
          setTxConfirming(false);
          setTimeout(() => {
            if (button) {
              button.innerHTML = "buy";
              setButtonLoadingColor(false);
            }
          }, 3000);
        } else if (buyTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            "You've successfully bought $LOCKS",
            `You bought ${formatAsString(buyingLocks)} Locks with ${formatAsString(honeyBuy)} Honey`,
            buyTx,
          );
          if (button) {
            button.innerHTML = "buy";
            setButtonLoadingColor(false);
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "buy";
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

  const sellTxFlow = async (button: HTMLElement | null) => {
    if (sellingLocks == 0) {
      button && (button.innerHTML = "sell");
      return;
    }
    if (sellingLocks > goldiswapWalletInfo.locks) {
      button && (button.innerHTML = "not enough");
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = "confirming...";
        setButtonLoadingColor(true);
      }
      const sellTx = await sendSellTx(sellingLocks, gettingHoney);
      if (sellTx === "slippage") {
        button && (button.innerHTML = "slippage too low");
        setTxConfirming(false);
        setTimeout(() => {
          if (button) {
            button.innerHTML = "sell";
            setButtonLoadingColor(false);
          }
        }, 3000);
      } else if (sellTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
          true,
          "You've successfully sold $LOCKS",
          `You sold ${formatAsString(sellingLocks)} Locks for ${formatAsString(gettingHoney)} Honey`,
          sellTx,
        );
        if (button) {
          button.innerHTML = "sell";
          setButtonLoadingColor(false);
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "sell";
          setButtonLoadingColor(false);
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
  };

  const redeemTxFlow = async (button: HTMLElement | null) => {
    if (redeemingLocks == 0) {
      button && (button.innerHTML = "redeem");
      return;
    }
    if (redeemingLocks > goldiswapWalletInfo.locks) {
      button && (button.innerHTML = "not enough");
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = "confirming...";
        setButtonLoadingColor(true);
      }
      const redeemTx = await sendRedeemTx(redeemingLocks);
      if (redeemTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
          true,
          "You've successfully redeemed $LOCKS",
          `You redeemed ${formatAsString(redeemingLocks)} Locks for ${formatAsString(redeemingHoney)} Honey`,
          redeemTx,
        );
        if (button) {
          button.innerHTML = "redeem";
          setButtonLoadingColor(false);
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "redeem";
          setButtonLoadingColor(false);
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
  };

  const handleLeftButtonClick = async () => {
    const swapButton = document.getElementById("swap-button");
    const leftButton = document.getElementById("left-approve-button");
    const rightButton = document.getElementById("right-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#4D0B24";
      leftButton.style.color = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#4D0B24";
      rightButton.style.color = "#E7B941";
    }
    await sendApproveTx(honeyBuy, false);
    updateAllowance(honeyBuy + 0.01);
    swapButton && (swapButton.innerHTML = "buy");
    setAllowanceButtons(false);
  };

  const handleRightButtonClick = async () => {
    const swapButton = document.getElementById("swap-button");
    const rightButton = document.getElementById("right-approve-button");
    const leftButton = document.getElementById("left-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#4D0B24";
      leftButton.style.color = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#4D0B24";
      rightButton.style.color = "#E7B941";
    }
    await sendApproveTx(0, true);
    updateAllowance(10000000000);
    swapButton && (swapButton.innerHTML = "buy");
    setAllowanceButtons(false);
  };

  const renderButton = () => {
    if (activeToggle === "BUY") {
      if (
        isConnected &&
        debouncedHoneyBuy > goldiswapWalletInfo.honeySwapAllowance &&
        goldiswapWalletInfo.honey >= debouncedHoneyBuy &&
        honeyBuy > goldiswapWalletInfo.honeySwapAllowance
      ) {
        return "approve honey";
      }
      return "buy";
    } else if (activeToggle === "SELL") {
      return "sell";
    } else {
      return "redeem";
    }
  };

  return (
    <>
      {allowanceButtons && (
        <div className="flex gap-3">
          <button
            className="flex-1 py-3 rounded-xl font-baloo text-lg font-semibold bg-amber-600/80 hover:bg-amber-700 text-white border border-amber-500/50 transition-all"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            Approve Tx
          </button>
          <button
            className="flex-1 py-3 rounded-xl font-baloo text-lg font-semibold bg-amber-600/80 hover:bg-amber-700 text-white border border-amber-500/50 transition-all"
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
                className={`w-full py-4 rounded-xl font-baloo text-xl font-bold transition-all border ${
                  buttonLoadingColor
                    ? "bg-amber-900/60 text-HoneyYellow border-amber-700/50"
                    : "bg-HoneyYellow hover:bg-amber-500 text-black border-HoneyYellow/50"
                }`}
                id="swap-button"
                onClick={() => {
                  const button = document.getElementById("swap-button");

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
