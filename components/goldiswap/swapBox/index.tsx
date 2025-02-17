"use client";

import { useState, useEffect } from "react";
import { useGoldiswap } from "../../../providers";
import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath";
import { Notification, Chart } from "../../goldiswap";

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

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>;
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
    <div className="absolute left-[10%] top-[18%] h-[48.87%] w-[80%] border-2 border-black bg-[#EEDCD2] md:left-[20%] md:top-[16%] md:w-[60%] lg:left-[25%] lg:top-[15%] lg:w-[50%] xl:top-[10.12%] xl:h-[55.25%] 2xl:left-[28.125%] 2xl:w-[43.75%]">
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
            className="h-[100%] w-[100%]"
            src="/images/bg-transaction.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <Notification />
        ) : (
          <div className="relative flex h-[100%] w-[100%] flex-col">
            <div className="absolute right-0 top-0 flex h-[10%] w-[50%] flex-row border-b-2 border-l-2 border-black font-baloo text-[2.5vw] font-semibold md:text-[2vw] lg:w-[42%] lg:text-[1.5vw] xl:text-[1.25vw] 2xl:w-[33.61%] 2xl:text-[1vw]">
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#DCC2A8] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(1)}
              >
                25%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D5A774] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(2)}
              >
                50%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D19A5B] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(3)}
              >
                75%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center bg-[#CC8634] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(4)}
              >
                MAX
              </div>
            </div>
            <img
              className="absolute left-[89%] top-[16%] h-6 w-6 cursor-pointer hover:animate-spin lg:left-[79%] lg:h-9 lg:w-9"
              src="/images/icon-settings.png"
              alt="settings"
              onClick={() => changeSlippageToggle(true)}
            />
            <div
              className="absolute left-[47.27%] top-[44%] z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl border-2 border-black bg-[#D9C6BA] hover:scale-110"
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
            <div className="h-[50%] w-[100%] border-b-2 border-black">
              <div className="absolute left-[1%] top-[21%] flex flex-row items-center sm:left-[2%] xl:left-[3%]">
                <img
                  className="h-6 w-6 md:h-8 md:w-8"
                  src={`/images/logo-${activeToggle === "BUY" ? "honey" : "locks"}.png`}
                  alt="coinlogo"
                />
                <h1 className="ml-1 font-baloo text-[3vw] font-semibold md:text-[2.4vw] lg:ml-3 lg:text-[1.4vw]">
                  {activeToggle === "BUY" ? "HONEY" : "LOCKS"}
                </h1>
              </div>
              <div className="absolute left-[26%] top-[15%] h-[25%] w-[60%] border-2 border-black bg-white lg:left-[22%] lg:h-[22%] lg:w-[55.6%]">
                <div className="relative h-[100%] w-[100%]">
                  {topAmountLoading ? (
                    <span className="loader-small absolute left-[8%] top-[40%]"></span>
                  ) : (
                    <input
                      className="absolute left-[5%] top-[7.5%] w-[90%] border-none bg-transparent font-baloo text-[4.5vw] font-bold focus:outline-none md:text-[4vw] lg:text-[3.5vw] xl:text-[2.25vw] 2xl:text-[2vw] tall:top-[15%] tall:text-[5.5vw] tall:md:text-[4vw] tall:lg:text-[3.5vw] tall:xl:text-[2.5vw] tall:2xl:text-[2vw]"
                      type="number"
                      id="number-input"
                      placeholder="0.00"
                      value={displayString}
                      onChange={(e) => handleTopChange(e.target.value)}
                    />
                  )}
                  <span className="absolute bottom-0 right-[3%] font-baloo text-[2vw] font-bold text-[#7F7F7F] md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw] tall:text-[2.5vw] tall:md:text-[1.75vw] tall:lg:text-[1.25vw] tall:xl:text-[0.9vw]">
                    balance:{" "}
                    {walletInfoLoading ? loadingElement() : handleTopBalance()}
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[50%] w-[100%]">
              <div className="absolute left-[1%] top-[71%] flex flex-row items-center sm:left-[2%] xl:left-[3%]">
                <img
                  className="h-6 w-6 md:h-8 md:w-8"
                  src={`/images/logo-${activeToggle === "BUY" ? "locks" : "honey"}.png`}
                  alt="coinlogo"
                />
                <h1 className="ml-1 font-baloo text-[3vw] font-semibold md:text-[2.4vw] lg:ml-3 lg:text-[1.4vw]">
                  {activeToggle === "BUY" ? "LOCKS" : "HONEY"}
                </h1>
              </div>
              <div className="absolute left-[26%] top-[65%] h-[25%] w-[60%] border-2 border-black bg-white lg:left-[22%] lg:h-[22%] lg:w-[55.6%]">
                <div className="relative h-[100%] w-[100%]">
                  {bottomAmountLoading ? (
                    <span className="loader-small absolute left-[8%] top-[40%]"></span>
                  ) : (
                    <input
                      className="absolute left-[5%] top-[7.5%] w-[90%] border-none bg-transparent font-baloo text-[4.5vw] font-bold focus:outline-none md:text-[4vw] lg:text-[3.5vw] xl:text-[2.25vw] 2xl:text-[2vw] tall:top-[15%] tall:text-[5.5vw] tall:md:text-[4vw] tall:lg:text-[3.5vw] tall:xl:text-[2.5vw] tall:2xl:text-[2vw]"
                      type="number"
                      id="number-input"
                      placeholder="0.00"
                      value={bottomDisplayString}
                      onChange={(e) => handleBottomChange(e.target.value)}
                    />
                  )}
                  <span className="absolute bottom-0 right-[3%] font-baloo text-[2vw] font-bold text-[#7F7F7F] md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw] tall:text-[2.5vw] tall:md:text-[1.75vw] tall:lg:text-[1.25vw] tall:xl:text-[0.9vw]">
                    balance:{" "}
                    {walletInfoLoading
                      ? loadingElement()
                      : handleBottomBalance()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
