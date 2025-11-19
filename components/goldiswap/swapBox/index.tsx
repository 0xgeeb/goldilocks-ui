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
    <div className="absolute left-[10%] top-[18%] h-[48.87%] w-4/5 border-2 border-black bg-[#EEDCD2] md:left-[20%] md:top-[16%] md:w-3/5 lg:left-1/4 lg:top-[15%] lg:w-[50%] xl:top-[10.12%] xl:h-[55.25%] 2xl:left-[28.125%] 2xl:w-[43.75%]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-6 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {chartOpen ? (
          <Chart />
        ) : txConfirming ? (
          <img
            className="size-full"
            src="/images/bg-transaction.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <Notification />
        ) : (
          <div className="relative flex size-full flex-col divide-y-2 divide-black">
            <div className="absolute right-0 top-0 flex h-[10%] w-[50%] flex-row border-b-2 border-l-2 border-black font-baloo text-[2.5vw] font-semibold md:text-[2vw] lg:w-[42%] lg:text-[1.5vw] xl:text-[1.25vw] 2xl:w-[33.61%] 2xl:text-[1vw]">
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#DCC2A8] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(1)}
              >
                25%
              </div>
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D5A774] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(2)}
              >
                50%
              </div>
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D19A5B] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(3)}
              >
                75%
              </div>
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center bg-[#CC8634] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(4)}
              >
                MAX
              </div>
            </div>

            <div
              className="absolute left-1/2 top-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-3xl border-2! border-black bg-[#D9C6BA] hover:scale-110"
              onClick={() => flipTokens()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0D111C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>
            <div className="flex h-1/2 w-full items-center gap-4 border-t-0! px-8">
              <InputLogo type={activeToggle === "BUY" ? "honey" : "locks"} />
              <div className="h-1/2 w-3/5 border-2 border-black bg-white">
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
              <div className="h-1/2">
                <img
                  className="size-8 cursor-pointer hover:animate-spin"
                  src="/images/icon-settings.png"
                  alt="settings"
                  onClick={() => changeSlippageToggle(true)}
                />
              </div>
            </div>
            <div className="flex h-1/2 w-full items-center gap-4 px-8">
              <InputLogo type={activeToggle === "BUY" ? "locks" : "honey"} />
              <div className="h-1/2 w-3/5 border-2 border-black bg-white">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};