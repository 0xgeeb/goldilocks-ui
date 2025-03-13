"use client";

import { useState, useEffect } from "react";
import { useGoldiswap } from "../../../providers";
import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath";
import { ChartMobile, NotificationMobile, WalletBalanceMobilePopup } from "../";

export const SwapBoxMobile = () => {
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
    balanceMobileToggle,
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

  //todo: this affects the honey not the locks as users assume
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
    <div className="absolute left-[15.5%] top-[4.6%] h-[55%] w-[69%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      {/* <span className="z-10 absolute top-[0%] right-[6%] text-[2.2vw] font-baloo font-semibold">
        **0.3% fee on all buys**
      </span>
      <span className="z-10 absolute bottom-[-0.2%] left-[6%] text-[2.2vw] font-baloo font-semibold">
        target ratio: {handleRatioInfo(goldiswapInfo.targetRatio)}
      </span> */}
      <div
        className={`absolute inset-3 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {chartOpen ? (
          <ChartMobile />
        ) : txConfirming ? (
          <img
            className="h-[100%] w-[100%]"
            src="/images/bg-transaction-mobile.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <NotificationMobile />
        ) : balanceMobileToggle ? (
          <WalletBalanceMobilePopup />
        ) : (
          <div className="relative flex h-[100%] w-[100%] flex-col">
            <div className="flex h-[8%] w-[100%] flex-row border-b-2 border-black font-baloo font-medium">
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#DCC2A8] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(1)}
              >
                25%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D5A774] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(2)}
              >
                50%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D19A5B] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(3)}
              >
                75%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center bg-[#CC8634] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(4)}
              >
                MAX
              </div>
            </div>
            <div
              className="absolute left-[42.5%] top-[49%] z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl border-2 border-black bg-[#D9C6BA] focus:scale-110"
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
            <div className="h-[46%] w-[100%] border-b-2 border-black">
              <div className="absolute left-[8%] top-[15%] flex flex-row items-center">
                <img
                  className="h-6 w-6 tall:h-8 tall:w-8"
                  src={`/images/logo-${activeToggle === "BUY" ? "honey" : "locks"}.png`}
                  alt="coinlogo"
                />
                <h1 className="ml-2 font-baloo text-[6vw] font-medium">
                  {activeToggle === "BUY" ? "HONEY" : "LOCKS"}
                </h1>
              </div>
              <div className="absolute left-[8%] top-[27%] h-[16%] w-[84%] border-2 border-black bg-white">
                <div className="relative h-[100%] w-[100%]">
                  {topAmountLoading ? (
                    <span className="loader-small absolute left-[8%] top-[40%]"></span>
                  ) : (
                    <input
                      className="absolute left-[5%] top-[0%] h-[100%] w-[90%] border-none bg-transparent font-baloo text-[8vw] font-medium focus:outline-hidden"
                      type="number"
                      id="number-input"
                      placeholder="0.00"
                      value={displayString}
                      onChange={(e) => handleTopChange(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <span className="absolute bottom-[47%] right-[3%] font-baloo text-[3vw] font-bold text-[#7F7F7F]">
                balance:{" "}
                {walletInfoLoading ? loadingElement() : handleTopBalance()}
              </span>
            </div>
            <div className="h-[46%] w-[100%]">
              <div className="absolute left-[8%] top-[61%] flex flex-row items-center">
                <img
                  className="h-6 w-6 tall:h-8 tall:w-8"
                  src={`/images/logo-${activeToggle === "BUY" ? "locks" : "honey"}.png`}
                  alt="coinlogo"
                />
                <h1 className="ml-2 font-baloo text-[6vw] font-medium">
                  {activeToggle === "BUY" ? "LOCKS" : "HONEY"}
                </h1>
              </div>
              <div className="absolute left-[8%] top-[73%] h-[16%] w-[84%] border-2 border-black bg-white">
                <div className="relative h-[100%] w-[100%]">
                  {bottomAmountLoading ? (
                    <span className="loader-small absolute left-[8%] top-[40%]"></span>
                  ) : (
                    <input
                      className="absolute left-[5%] top-[0%] h-[100%] w-[90%] border-none bg-transparent font-baloo text-[8vw] font-medium focus:outline-hidden"
                      type="number"
                      id="number-input"
                      placeholder="0.00"
                      value={bottomDisplayString}
                      onChange={(e) => handleBottomChange(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <span className="absolute bottom-[1%] right-[3%] font-baloo text-[3vw] font-semibold text-[#7F7F7F]">
                balance:{" "}
                {walletInfoLoading ? loadingElement() : handleBottomBalance()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
