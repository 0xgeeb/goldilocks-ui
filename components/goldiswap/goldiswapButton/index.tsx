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
        <div>
          <button
            className="cursor-pointer absolute left-[24%] top-[70%] h-[8%] w-[24%] border-2 border-black bg-[#E7B941] font-amaticbold text-[4vw] hover:scale-110 hover:bg-[#4D0B24] hover:text-[#E7B941] md:top-[68%] md:text-[2.75vw] lg:left-[30.9%] lg:top-[69%] lg:w-[16.6%] lg:text-[2vw] xl:top-[69%] xl:text-[1.75vw] 2xl:text-[1.5vw]"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="cursor-pointer absolute left-[52%] top-[70%] h-[8%] w-[24%] border-2 border-black bg-[#E7B941] font-amaticbold text-[4vw] hover:scale-110 hover:bg-[#4D0B24] hover:text-[#E7B941] md:top-[68%] md:text-[2.75vw] lg:left-[52.5%] lg:top-[69%] lg:w-[16.6%] lg:text-[2vw] xl:top-[69%] xl:text-[1.75vw] 2xl:text-[1.5vw]"
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
                className={`cursor-pointer absolute left-[32%] top-[70%] h-[8%] w-[36%] md:left-[37%] md:top-[68%] md:w-[26%] lg:left-[41.6%] lg:top-[69%] lg:w-[16.6%] ${buttonLoadingColor ? "bg-[#4D0B24] text-[#E7B941]" : "bg-[#E7B941] text-black"} border-2 border-black font-amaticbold text-[5vw] hover:scale-110 hover:bg-[#4D0B24] hover:text-[#E7B941] md:text-[4vw] lg:text-[3vw] xl:text-[2vw] 2xl:text-[1.9vw] tall:text-[6vw] tall:md:text-[4vw] tall:lg:text-[3vw] tall:xl:text-[2.5vw] tall:2xl:text-[1.9vw]`}
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
