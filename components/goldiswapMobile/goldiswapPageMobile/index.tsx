"use client";

import { useDesktop, useGoldiswap } from "../../../providers";
import {
  GoldiswapButtonMobile,
  SlippagePopupMobile,
  StatsMobile,
  SwapBoxMobile,
  TogglesMobile,
  WalletBalanceMobile,
} from "../../goldiswapMobile";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const GoldiswapPageMobile = () => {
  const {
    chartOpen,
    setChartOpen,
    activeToggle,
    infoLoading,
    goldiswapInfo,
    changeSlippageToggle,
    slippage,
  } = useGoldiswap();

  const { navButtonsOpen } = useDesktop();

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

  const insideSlippage = (e: any): boolean => {
    const slipLeft = 0.33;
    const slipRight = 0.93;
    const slipUp = 0.32;
    const slipDown = 0.54;

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

  return (
    <main className="h-screen w-screen">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <div className="relative h-[89%] w-full bg-[url('/images/bg-goldiswap-mobile.png')] bg-cover">
          <TogglesMobile />
          <h1
            className="absolute right-[69%] top-[-0.25%] font-amaticbold text-[6vw] text-[#D9C6BA] tall:text-[7vw]"
            id="page-title"
          >
            {activeToggle === "REDEEM" ? "REDEEM" : "SWAP"}
          </h1>
          <div className="absolute bottom-[40.4%] left-[15.5%] flex h-[2.3%] w-[48.95vh] origin-bottom-left -rotate-90 flex-row items-center justify-between bg-[#4D0B24] px-2 font-baloo text-[2.75vw] font-medium text-white">
            <div className="flex h-full w-[43%] flex-row items-center justify-between">
              <span className="mt-1 font-baloo text-white">PSL/FSL ratio:</span>
              <span className="mt-1 font-baloo text-white">
                {handleTokenInfo((goldiswapInfo.psl / goldiswapInfo.fsl) * 100)}
                %
              </span>
            </div>
            <div className="flex h-full w-[43%] flex-row items-center justify-between">
              <span className="mt-1 font-baloo text-white">
                last floor raise:
              </span>
              <span className="mt-1 font-baloo text-white">
                {formatDate(goldiswapInfo.lastFloorRaise * Math.pow(10, 21))}
              </span>
            </div>
          </div>
          <WalletBalanceMobile />
          <img
            className="absolute right-[9%] top-[6%] size-5"
            src="/images/icon-settings-mobile.png"
            alt="settings"
            onClick={() => changeSlippageToggle(true)}
          />
          {slippage.toggle && <SlippagePopupMobile />}
          <SwapBoxMobile />
          <img className="absolute bottom-[26%] left-[80%] origin-bottom-right -rotate-[90deg] h-[1.27%] w-[8.36%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
          <div 
            className="absolute h-[12vw] w-[23.6%] bottom-[30%] right-[0%] origin-bottom-right -rotate-[90deg] border-t-2 border-l-2 border-r-2 border-black bg-[#F3AA8A] font-amaticbold text-[5vw] focus:scale-110 cursor-pointer flex items-center justify-center"
            onClick={() => setChartOpen(!chartOpen)}
          >
            <span className="">THIS IS CHART</span>
          </div>
          <GoldiswapButtonMobile />
          <StatsMobile />
          {/* <FooterMobile /> */}
          {/* <LocksFetcher /> */}
        </div>
      )}
    </main>
  );
};
