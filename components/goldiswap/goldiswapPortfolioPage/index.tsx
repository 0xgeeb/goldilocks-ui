"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import { useDesktop, useGoldiswap } from "../../../providers";
import { Loading, TAndCs } from "../../utils";
import { PortfolioWalletBalance } from "../portfolioWalletBalance";

export const GoldiswapPortfolioPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    wutPopup,
    setWutPopup,
    refreshGoldiswapWalletInfo,
    refreshGoldiswapInfo,
  } = useGoldiswap();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

  useEffect(() => {
    refreshGoldiswapWalletInfo();
    refreshGoldiswapInfo();
    setPageLoading(false);
  }, []);

  const handlePopups = () => {
    if (wutPopup) {
      setWutPopup(false);
    }
  };

  if (pageLoading) {
    return (
      <Loading />
    )
  }

  if (isDesktop && signed !== "TRUE") {
    return (
      <TAndCs />
    )
  }

  return (
    <CsrPageLayout
      onPageClick={() => handlePopups()}
      wutPopup={wutPopup}
      setWutPopup={setWutPopup}
      bgImageUrl="/images/bg-goldivault-2.png"
    >
      <div className="w-full px-8 md:px-20 py-6 md:py-10">
        <div
          style={{
            backdropFilter: "blur(18px)",
            backgroundColor: "rgba(26,20,12, 0.75)",
          }}
          className="flex flex-col gap-3 rounded-3xl p-6"
        >
          <div className="flex flex-row items-center gap-3">
            <h1
              id="page-title"
              className="text-HoneyYellow font-amaticbold text-6xl"
            >
              Portfolio
            </h1>
            <div className="w-16 h-16 bg-HoneyYellow rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" stroke="#1A140C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 11H16" stroke="#1A140C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 15H12" stroke="#1A140C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="text-WarmText h-9 text-lg mb-6 sm:mb-0">
            Track your Goldiswap positions and balances.
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Main Portfolio Content */}
            <div className="flex-1">
              <PortfolioWalletBalance />
            </div>
          </div>
        </div>
      </div>
    </CsrPageLayout>
  );
};
