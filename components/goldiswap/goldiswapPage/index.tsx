"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import styles from "@/app/(geo-check)/goldivault/_components/VaultsCardLayout.module.css";
import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { cn } from "@/app/_components/utils";

import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath";
import { useDesktop, useGoldiswap } from "../../../providers";
import {
  GoldiswapButton,
  RedeemPopup,
  SlippagePopup,
  StatsMarquee,
  SwapBox,
  Toggles,
  WalletBalance
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
    <CsrPageLayout
      onPageClick={(e) => handlePopups(e)}
      wutPopup={wutPopup}
      setWutPopup={setWutPopup}
      bgImageUrl="/images/bg-goldivault-2.png"
    >
      <div className="flex flex-col items-center justify-center p-4 sm:p-8 md:px-20 md:py-10">
        <div
          style={{
            backdropFilter: "blur(18px)",
            backgroundColor: "rgba(26,20,12, 0.75)",
          }}
          className={cn(
            "flex w-full flex-col gap-6 rounded-3xl p-6 md:p-8 max-w-6xl relative",
            styles.vaultsBg,
          )}
        >
          {/* Header Section */}
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 id="page-title" className="text-HoneyYellow font-amaticbold text-5xl md:text-6xl">
                GOLDISWAP - {activeToggle === "REDEEM" ? "REDEEM" : "SWAP"}
              </h1>
              <WalletBalance />
            </div>
            <Toggles />
          </div>

{/* Stats Marquee */}
<StatsMarquee />

          {/* Main Content */}
          <div className="flex justify-center items-start gap-6 relative">
            <div className="flex flex-col gap-6 w-full max-w-2xl">
              {slippage.toggle && <SlippagePopup />}
              {redeemPopupToggle && <RedeemPopup />}
              <SwapBox />
              <GoldiswapButton />
            </div>
          </div>
        </div>
      </div>
    </CsrPageLayout>
    : <GoldiswapPageMobile />
  );
};
