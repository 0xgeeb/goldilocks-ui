"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath";
import { useBorrow, useDesktop } from "../../../providers";
import {
  BorrowBox,
  BorrowButton,
  BorrowPopup,
  Stats,
  Toggles,
  WalletBalance,
} from "../../borrow";
import { BorrowPageMobile } from "../../borrowMobile";
import { Loading, TAndCs } from "../../utils";

export const BorrowPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    chartOpen,
    setChartOpen,
    infoLoading,
    refreshBorrowInfo,
    borrowInfo,
    borrowPopupToggle,
    setBorrowPopupToggle,
    activeToggle,
    wutPopup,
    setWutPopup,
    getChartData
  } = useBorrow();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

  const { marketPrice } = useGoldiswapMath();

  useEffect(() => {
    getChartData();
    refreshBorrowInfo();
    setPageLoading(false);
  }, []);

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GHOST_GRAPH_URL,
    cache: new InMemoryCache(),
    headers: {
      "X-GHOST-KEY": process.env.NEXT_PUBLIC_GHOST_GRAPH_KEY!,
    },
  });

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

  const handlePopups = () => {
    if (borrowPopupToggle) {
      setBorrowPopupToggle(false);
    }
    if (wutPopup) {
      setWutPopup(false);
    }
  };

  return (
    <ApolloProvider client={client}>
      {pageLoading ? (
        <Loading />
      ) : isDesktop ? (
        signed !== "TRUE" ? (
          <TAndCs />
        ) : (
          <CsrPageLayout
            onPageClick={() => handlePopups()}
            wutPopup={wutPopup}
            setWutPopup={setWutPopup}
            bgImageUrl="/images/bg-goldiswap.png"
          >
            <>
              <Toggles />
              {borrowPopupToggle && <BorrowPopup />}
              <h1
                className="absolute left-[5%] top-[-0.5%] font-amaticbold text-[10vw] text-[#D9C6BA] lg:top-[16%] lg:text-[8vw] xl:left-[7.5%] 2xl:top-[12.16%] tall:text-[12vw] tall:md:text-[10vw] tall:lg:text-[8vw]"
                id="page-title"
              >
                {activeToggle}
              </h1>
              <div className="absolute left-[10%] top-[15%] flex h-[3%] w-4/5 flex-row items-center justify-between bg-[#634C43] px-2 text-[2.25vw] md:left-[20%] md:top-[14%] md:w-3/5 md:text-[1.5vw] lg:left-1/4 lg:top-[12%] lg:w-[50%] lg:text-[1.5vw] xl:top-[11%] xl:text-[1vw] 2xl:left-[28.125%] 2xl:w-[43.75%] 2xl:text-[0.85vw]">
                <span className="mt-1 font-baloo text-white">
                  locks market price:{" "}
                  ${handlePriceInfo(marketPrice(borrowInfo.fsl, borrowInfo.psl, borrowInfo.supply))}
                </span>
                <span className="mt-1 font-baloo text-white">
                  locks market cap:{" "}
                  {handleTokenInfo(
                    (borrowInfo.supply *
                      marketPrice(
                        borrowInfo.fsl,
                        borrowInfo.psl,
                        borrowInfo.supply,
                      )) /
                      1000000,
                  )}
                  m
                </span>
                <span className="mt-1 font-baloo text-white">
                  last floor raise:{" "}
                  {formatDate(borrowInfo.lastFloorRaise * Math.pow(10, 21))}
                </span>
              </div>
              <WalletBalance />
              <BorrowBox />
              {/* <img className="absolute top-[68%] md:top-[51%] lg:top-[49%] xl:top-[48%] left-[91%] lg:left-[82%] 2xl:left-[80%] w-[4%] h-[2%] lg:w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
              <div 
                className="absolute w-[12%] md:w-[10%] h-[7%] lg:w-[6%] lg:h-[8%] top-[70%] md:top-[53%] lg:top-[51%] xl:top-[50%] left-[87%] lg:left-[80%] 2xl:left-[78%] px-1 text-center border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[2.5vw] md:text-[2.25vw] lg:text-[1.5vw] xl:text-[1.2vw] tall:text-[3vw] tall:md:text-[2.25vw] tall:lg:text-[1.5vw] tall:xl:text-[1.2vw] hover:scale-110 cursor-pointer"
                onClick={() => setChartOpen(!chartOpen)}
              >
                THIS IS CHART
              </div> */}
              <BorrowButton />
              <Stats />
              {/* <LocksFetcher /> */}
            </>
          </CsrPageLayout>
        )
      ) : (
        <BorrowPageMobile />
      )}
    </ApolloProvider>
  );
};
