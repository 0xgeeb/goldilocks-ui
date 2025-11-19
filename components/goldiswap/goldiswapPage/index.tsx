"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath";
import { useDesktop, useGoldiswap } from "../../../providers";
import {
  GoldiswapButton,
  RedeemPopup,
  SlippagePopup,
  Stats,
  SwapBox,
  Toggles,
  WalletBalance,
  NavBar
} from "../../goldiswap";
import { GoldiswapPageMobile } from "../../goldiswapMobile";
import { Loading, TAndCs } from "../../utils";

export const GoldiswapPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    chartOpen,
    setChartOpen,
    getChartData,
    goldiswapInfo,
    refreshGoldiswapInfo,
    infoLoading,
    checkSlippageAmount,
    slippage,
    changeSlippageToggle,
    redeemPopupToggle,
    setRedeemPopupToggle,
    activeToggle,
    wutPopup,
    setWutPopup,
  } = useGoldiswap();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

  const { marketPrice } = useGoldiswapMath();

  useEffect(() => {
    getChartData();
    refreshGoldiswapInfo();
    checkSlippageAmount();
    setPageLoading(false);
  }, []);

  const formatAsTokenPrice = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const handleTokenInfo = (num: number) => {
    if (infoLoading) {
      return "-";
    } else if (num > 0) {
      return formatAsTokenPrice(num);
    } else {
      return "-";
    }
  };

  const formatAsTokenPriceExtra = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const handlePriceInfo = (num: number) => {
    if (infoLoading) {
      return "-";
    } else if (num > 0) {
      return formatAsTokenPriceExtra(num);
    } else {
      return "-";
    }
  };

  const formatDate = (timestamp: number): string => {
    const ONE_MINUTE = 60;
    const ONE_HOUR = 60 * ONE_MINUTE;
    const ONE_DAY = 24 * ONE_HOUR;
    const ONE_WEEK = 7 * ONE_DAY;
    const now = Date.now();
    const secondsAgo = (now - timestamp) / 1000;
    if (secondsAgo < ONE_MINUTE) {
      return "just now";
    } else if (secondsAgo < ONE_HOUR) {
      const minutesAgo = Math.floor(secondsAgo / ONE_MINUTE);
      return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    } else if (secondsAgo < ONE_DAY) {
      const hoursAgo = Math.floor(secondsAgo / ONE_HOUR);
      return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else if (secondsAgo < ONE_WEEK) {
      const daysAgo = Math.floor(secondsAgo / ONE_DAY);
      return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    } else {
      const weeksAgo = Math.floor(secondsAgo / ONE_WEEK);
      return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
    }
  };

  const insideSlippage = (e: any): boolean => {
    let slipLeft = 0.45;
    let slipRight = 0.64;
    let slipUp = 0.32;
    let slipDown = 0.54;

    if (window.innerWidth > 1024) {
      slipLeft = 0.45;
      slipRight = 0.64;
      slipUp = 0.32;
      slipDown = 0.54;
    } else {
      slipLeft = 0.33;
      slipRight = 0.7;
      slipUp = 0.33;
      slipDown = 0.53;
    }

    if (
      e.clientX > window.innerWidth * slipLeft &&
      e.clientX < window.innerWidth * slipRight &&
      e.clientY > window.innerHeight * slipUp &&
      e.clientY < window.innerHeight * slipDown
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handlePopups = (e: any) => {
    if (slippage.toggle && !insideSlippage(e)) {
      changeSlippageToggle(false);
    }
    if (redeemPopupToggle) {
      setRedeemPopupToggle(false);
    }
    if (wutPopup) {
      setWutPopup(false);
    }
  };

  if(pageLoading) {
    return <Loading />
  }

  if(signed !== "TRUE") {
    return <TAndCs />
  }

  return (
    isDesktop ?
    <main className="w-screen h-screen" onClick={(e) => handlePopups(e)}>
      <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <Toggles />
        {redeemPopupToggle && <RedeemPopup />}
        <h1
          className="absolute left-[5%] top-[-0.5%] font-amaticbold text-[10vw] text-[#D9C6BA] lg:top-[16%] lg:text-[8vw] xl:left-[7.5%] 2xl:left-[10%] 2xl:top-[12.16%] tall:text-[12vw] tall:md:text-[10vw] tall:lg:text-[8vw]"
          id="page-title"
        >
          {activeToggle === "REDEEM" ? "REDEEM" : "SWAP"}
        </h1>
        <div className="absolute left-[10%] top-[15%] flex h-[3%] w-4/5 flex-row items-center justify-between bg-[#4D0B24] px-2 text-[2.25vw] md:left-[20%] md:top-[13%] md:w-3/5 md:text-[1.5vw] lg:left-1/4 lg:top-[12%] lg:w-[50%] lg:text-[1.5vw] xl:top-[7.12%] xl:text-[1vw] 2xl:left-[28.125%] 2xl:w-[43.75%] 2xl:text-[0.85vw]">
          <span className="mt-1 font-baloo text-white">locks market price:{" "}${handlePriceInfo(marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply))}</span>
          <span className="mt-1 font-baloo text-white">locks market cap:{" "}{handleTokenInfo((goldiswapInfo.supply * marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply)) /1000000)}m</span>
          <span className="mt-1 font-baloo text-white">last floor raise:{" "}{formatDate(goldiswapInfo.lastFloorRaise * Math.pow(10, 21))}</span>
        </div>
        <WalletBalance />
        {slippage.toggle && <SlippagePopup />}
        <SwapBox />
        <img className="absolute top-[68%] md:top-[55.87%] lg:top-[53.87%] xl:top-[63.37%] left-[90%] lg:left-[88.625%] 2xl:left-[75.5%] w-[4%] h-[2%] lg:w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[12%] md:w-[10%] h-[7%] lg:w-[6%] lg:h-[8%] top-[70%] md:top-[57.87%] lg:top-[55.87%] xl:top-[65.37%] left-[87%] lg:left-[87.125%] 2xl:left-[74%] px-1 border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-center text-[2.5vw] md:text-[2.25vw] lg:text-[1.5vw] xl:text-[1.2vw] tall:text-[3vw] tall:md:text-[2.25vw] tall:lg:text-[1.5vw] tall:xl:text-[1.2vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          THIS IS CHART
        </div>
        <GoldiswapButton />
        <Stats />
        {/* <LocksFetcher /> */}
      </div>
    </main>
    : <GoldiswapPageMobile />
  );
};