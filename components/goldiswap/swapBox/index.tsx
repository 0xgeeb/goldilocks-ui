"use client";

import { useEffect, useState } from "react";

import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath";
import { useGoldiswap } from "../../../providers";
import { Chart, Notification } from "../../goldiswap";
import InputLogo from "./InputLogo";
import SwapInput from "./SwapInput";

export const SwapBox = () => {
  const [topAmountLoading, setTopAmountLoading] = useState<boolean>(false);
  const [bottomAmountLoading, setBottomAmountLoading] =
    useState<boolean>(false);

  const {
    chartOpen,
    displayString,
    handleTopChange,
    bottomDisplayString,
    activeToggle,
    sellingLocks,
    redeemingLocks,
    debouncedHoneyBuy,
    setDisplayString,
    setBottomDisplayString,
    setHoneyBuy,
    setSellingLocks,
    setRedeemingLocks,
    flipTokens,
    findLocksBuyAmount,
    simulateBuy,
    simulateSell,
    simulateRedeem,
    goldiswapInfo,
    infoLoading,
    walletInfoLoading,
    handleTopBalance,
    handleBottomBalance,
    slippage,
    handlePercentageButtons,
    simInfo,
    setSimInfo,
    txConfirming,
    notification,
    setGettingHoney,
    setRedeemingHoney,
    changeSlippageToggle,
    topInputFlag,
    bottomInputFlag,
    setTopInputFlag,
    setBottomInputFlag,
    buyingLocks,
    debouncedGettingHoney,
    findLocksSellAmount,
    setBuyingLocks,
    redeemingHoney,
    handleBottomChange,
    setBuyingLocksLoading,
  } = useGoldiswap();

  const { floorPrice, marketPrice, simulateBuyDry, simulateSellDry } =
    useGoldiswapMath();

  const resetInfo = () => {
    setDisplayString("");
    setBottomDisplayString("");
    setHoneyBuy(0);
    setBuyingLocks(0);
    setGettingHoney(0);
    setSellingLocks(0);
    setRedeemingHoney(0);
    setRedeemingLocks(0);
    setTopAmountLoading(false);
    setBottomAmountLoading(false);
    setSimInfo(
      false,
      goldiswapInfo.fsl,
      goldiswapInfo.psl,
      goldiswapInfo.supply,
      floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply),
      marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply),
      goldiswapInfo.targetRatio,
      marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply) -
        floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply),
    );
  };

  const formatAsPercentage = Intl.NumberFormat("default", {
    style: "percent",
    maximumFractionDigits: 2,
  });

  const handleRatioInfo = (num: number) => {
    if (infoLoading) {
      return "-";
    } else if (num > 0) {
      return formatAsPercentage.format(num);
    } else {
      return "-";
    }
  };

  const loadedLocks = async (dhb: number) => {
    setBottomAmountLoading(true);
    setBuyingLocksLoading(true);
    setTimeout(() => {
      const locksAmount: number = findLocksBuyAmount(dhb);
      simulateBuy(locksAmount);
      setBottomAmountLoading(false);
      setBuyingLocksLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (activeToggle === "BUY") {
      if (debouncedHoneyBuy > 0) {
        loadedLocks(debouncedHoneyBuy);
      }
    } else if (activeToggle === "SELL") {
      setGettingHoney(
        simulateSellDry(
          sellingLocks,
          goldiswapInfo.fsl,
          goldiswapInfo.psl,
          goldiswapInfo.supply,
        ) *
          (1 - slippage.amount / 100),
      );
      setBottomDisplayString(
        (
          simulateSellDry(
            sellingLocks,
            goldiswapInfo.fsl,
            goldiswapInfo.psl,
            goldiswapInfo.supply,
          ) *
          (1 - slippage.amount / 100)
        ).toFixed(4),
      );
    }
  }, [slippage.amount]);

  useEffect(() => {
    if (!bottomInputFlag) {
      if (!debouncedHoneyBuy) {
        resetInfo();
      } else {
        setTopInputFlag(true);
        loadedLocks(debouncedHoneyBuy);
      }
    }
  }, [debouncedHoneyBuy]);

  useEffect(() => {
    if (!topInputFlag) {
      const locksWithSlippage: number =
        buyingLocks * (1 + slippage.amount / 100);
      if (!buyingLocks) {
        resetInfo();
      } else {
        setBottomInputFlag(true);
        !slippage.toggle &&
          setDisplayString(
            simulateBuyDry(
              locksWithSlippage,
              goldiswapInfo.fsl,
              goldiswapInfo.psl,
              goldiswapInfo.supply,
            ).toFixed(4),
          );
        !slippage.toggle &&
          setHoneyBuy(
            simulateBuyDry(
              locksWithSlippage,
              goldiswapInfo.fsl,
              goldiswapInfo.psl,
              goldiswapInfo.supply,
            ),
          );
        simulateBuy(locksWithSlippage);
      }
    }
  }, [buyingLocks]);

  useEffect(() => {
    if (!bottomInputFlag) {
      if (!sellingLocks) {
        resetInfo();
      } else {
        setTopInputFlag(true);
        simulateSell(sellingLocks);
        setGettingHoney(
          simulateSellDry(
            sellingLocks,
            goldiswapInfo.fsl,
            goldiswapInfo.psl,
            goldiswapInfo.supply,
          ) *
            (1 - slippage.amount / 100),
        );
        setBottomDisplayString(
          (
            simulateSellDry(
              sellingLocks,
              goldiswapInfo.fsl,
              goldiswapInfo.psl,
              goldiswapInfo.supply,
            ) *
            (1 - slippage.amount / 100)
          ).toFixed(4),
        );
      }
    }
  }, [sellingLocks]);

  useEffect(() => {
    if (!topInputFlag) {
      if (!debouncedGettingHoney) {
        resetInfo();
      } else {
        setBottomInputFlag(true);
        setTopAmountLoading(true);
        setTimeout(() => {
          const locksAmountWithSlippage: number =
            findLocksSellAmount(debouncedGettingHoney) *
            (1 + slippage.amount / 100);
          const locksAmount: number = locksAmountWithSlippage;
          !slippage.toggle && setDisplayString(locksAmount.toFixed(4));
          !slippage.toggle && setSellingLocks(locksAmount);
          simulateSell(locksAmount);
          setTopAmountLoading(false);
        }, 500);
      }
    }
  }, [debouncedGettingHoney]);

  useEffect(() => {
    if (!bottomInputFlag) {
      if (!redeemingLocks) {
        resetInfo();
      } else {
        setTopInputFlag(true);
        simulateRedeem(redeemingLocks);
        setBottomDisplayString(
          (
            redeemingLocks * floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply)
          ).toFixed(4),
        );
        setRedeemingHoney(
          redeemingLocks * floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply),
        );
      }
    }
  }, [redeemingLocks]);

  useEffect(() => {
    if (!topInputFlag) {
      if (!redeemingHoney) {
        resetInfo();
      } else {
        setBottomInputFlag(true);
        simulateRedeem(
          redeemingHoney / (goldiswapInfo.fsl / goldiswapInfo.supply),
        );
        setDisplayString(
          (redeemingHoney / (goldiswapInfo.fsl / goldiswapInfo.supply)).toFixed(
            4,
          ),
        );
        setRedeemingLocks(
          redeemingHoney / (goldiswapInfo.fsl / goldiswapInfo.supply),
        );
      }
    }
  }, [redeemingHoney]);

  return (
    <div 
      className="relative rounded-2xl p-4"
      style={{
        backgroundColor: "rgba(60, 50, 40, 0.4)",
        border: "1px solid rgba(205, 133, 63, 0.3)",
      }}
    >
      {chartOpen ? (
        <Chart />
      ) : txConfirming ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <img
            className="w-full max-w-md"
            src="/images/bg-transaction.png"
            alt="tx"
          />
        </div>
      ) : notification.toggle ? (
        <Notification />
      ) : (
        <div className="flex flex-col gap-3">
          {/* Input Container with Arrow */}
          <div className="relative">
            {/* Top Input */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-black/20 border border-amber-900/30 mb-2">
              <InputLogo type={activeToggle === "BUY" ? "honey" : "locks"} />
              <div className="flex-1">
                <SwapInput
                  isLoading={topAmountLoading}
                  value={displayString}
                  onChange={handleTopChange}
                  balance={handleTopBalance()}
                  walletInfoLoading={walletInfoLoading}
                  unitPrice={
                    activeToggle === "BUY" ? undefined : simInfo.market
                  }
                />
              </div>
              <button
                className="w-16 py-1.5 rounded-lg text-sm font-baloo font-semibold bg-amber-600/40 hover:bg-amber-700/60 border border-amber-600/30 text-amber-200 transition-colors"
                onClick={() => handlePercentageButtons(4)}
              >
                MAX
              </button>
            </div>

            {/* Flip Button - Centered between inputs */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div
                className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-amber-900/80 hover:bg-amber-800 border border-amber-600/40 hover:scale-110 transition-all shadow-lg"
                onClick={() => flipTokens()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>

            {/* Bottom Input */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-black/20 border border-amber-900/30 mt-2">
              <InputLogo type={activeToggle === "BUY" ? "locks" : "honey"} />
              <div className="flex-1">
                <SwapInput
                  isLoading={bottomAmountLoading}
                  value={bottomDisplayString}
                  onChange={handleBottomChange}
                  balance={handleBottomBalance()}
                  walletInfoLoading={walletInfoLoading}
                  unitPrice={
                    activeToggle === "BUY" ? simInfo.market : undefined
                  }
                />
              </div>
              <div className="w-16 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                <img
                  className="size-6"
                  src="/images/yellow-settings.svg"
                  alt="settings"
                  onClick={() => changeSlippageToggle(true)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
