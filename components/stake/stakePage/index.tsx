"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";
import { useAccount } from "wagmi";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath";
import { useDesktop, useStake } from "../../../providers";
import {
  ClaimTab,
  StakeBox,
  StakeButton,
  Stats,
  StirPopup,
  Toggles,
  UnstakePopup,
  WalletBalance,
  NavBar
} from "../../stake";
import { StakePageMobile } from "../../stakeMobile";
import { Loading, TAndCs } from "../../utils";

export const StakePage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    stakeInfo,
    infoLoading,
    stirPopupToggle,
    setStirPopupToggle,
    activeToggle,
    unstakePopupToggle,
    setUnstakePopupToggle,
    wutPopup,
    setWutPopup,
    refreshStakeInfo,
    refreshStakeWalletInfo
  } = useStake();

  const { isConnected } = useAccount();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

  const { marketPrice } = useGoldiswapMath();

  useEffect(() => {
    refreshStakeInfo();
    setPageLoading(false);
  }, []);

  useEffect(() => {
    refreshStakeWalletInfo();
  }, [isConnected]);

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

  const handlePopups = () => {
    if (stirPopupToggle) {
      setStirPopupToggle(false);
    }
    if (unstakePopupToggle) {
      setUnstakePopupToggle(false);
    }
    if (wutPopup) {
      setWutPopup(false);
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

  if(pageLoading) {
    return <Loading />
  }

  if(signed !== "TRUE") {
    return <TAndCs />
  }

  return (
    isDesktop ?
    <main className="w-screen h-screen" onClick={(e) => handlePopups()}>
      <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <Toggles />
        {stirPopupToggle && <StirPopup />}
        {unstakePopupToggle && <UnstakePopup />}
        <h1
          className={`absolute left-[5%] top-[-0.5%] lg:top-[16%] 2xl:top-[12.16%] ${activeToggle === "UNSTAKE" ? "xl:left-[5%]" : "xl:left-[7.5%]"} font-amaticbold text-[10vw] text-[#D9C6BA] lg:text-[8vw] tall:text-[12vw] tall:md:text-[10vw] tall:lg:text-[8vw]`}
          id="page-title"
        >
          {activeToggle}
        </h1>
        {activeToggle === "CLAIM" ? (
          <>
            {/* <a href="https://app.kodiak.finance/#/liquidity/v2/add/0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03/0xe2cA693a47C32bd33949120d31d42b9e5Ef5c7Ef?chain=berachain_bartio" target="_blank">
              <div className="absolute top-[25%] left-[90%] md:left-[85%] lg:left-[75%] xl:left-[70%] h-[5%] w-[5%] border-black bg-[#EEDCD2] cursor-pointer hover:scale-105 flex justify-center items-center font-medium font-baloo text-[1.2vw] xl:text-[1vw]">
                $PRG LP
              </div>
            </a> */}
            <ClaimTab />
          </>
        ) : (
          <>
            <div className="absolute left-[10%] top-[15%] flex h-[3%] w-4/5 flex-row items-center justify-between bg-[#B35227] px-2 text-[2.25vw] md:left-[20%] md:top-[14%] md:w-3/5 md:text-[1.5vw] lg:left-1/4 lg:top-[12%] lg:w-[50%] lg:text-[1.5vw] xl:top-[11%] xl:text-[1vw] 2xl:left-[28.125%] 2xl:w-[43.75%] 2xl:text-[0.85vw]">
              <span className="mt-1 font-baloo text-white">
                locks market price:{" "}
                ${handlePriceInfo(marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply))}
              </span>
              <span className="mt-1 font-baloo text-white">
                locks market cap:{" "}
                {handleTokenInfo(
                  (stakeInfo.supply *
                    marketPrice(
                      stakeInfo.fsl,
                      stakeInfo.psl,
                      stakeInfo.supply,
                    )) /
                    1000000,
                )}
                m
              </span>
              <span className="mt-1 font-baloo text-white">
                last floor raise:{" "}
                {formatDate(stakeInfo.lastFloorRaise * Math.pow(10, 21))}
              </span>
            </div>
            <WalletBalance />
            <StakeBox />
            <StakeButton />
          </>
        )}
        <Stats />
        {/* <LocksFetcher /> */} 
      </div>
    </main>
    : <StakePageMobile />
  );
};
