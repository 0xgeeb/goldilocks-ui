"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { cn } from "@/app/_components/utils";
import styles from "@/app/(geo-check)/goldivault/_components/VaultsCardLayout.module.css";

import { NewBorrowBox, BoostPopup, BorrowFetcher, Toggles, GoldilendStatsMarquee, NewAuctionsTab, NewGHoneyTab } from "../";
import { useDesktop, useGoldilend } from "../../../providers";
import { GoldilendPageMobile } from "../../goldilendMobile";
import { Loading, TAndCs } from "../../utils";

export const GoldilendPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    activeToggle,
    wutPopup,
    setWutPopup,
    boostPopup,
    setBoostPopup,
  } = useGoldilend();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const handlePopups = () => {
    if (wutPopup) {
      setWutPopup(false);
    }
    if (boostPopup) {
      setBoostPopup(false);
    }
  };

  if(pageLoading) {
    return <Loading />
  }

  if(signed !== "TRUE") {
    return <TAndCs />
  }

  return (
    isDesktop ? (
      <CsrPageLayout
        onPageClick={() => handlePopups()}
        wutPopup={wutPopup}
        setWutPopup={setWutPopup}
        bgImageUrl="/images/bg-goldilend.png"
      >
        <div className="flex flex-col items-center justify-center px-4 pt-0 pb-2 sm:px-6 sm:pt-0 sm:pb-3 lg:px-12 lg:pt-0 lg:pb-4">
          {/* Small nav bar - outside card, top-left within page width */}
          <div className="w-full max-w-7xl flex justify-start mb-0 sm:mb-0 lg:mb-1">
            <div
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-700/40 bg-amber-900/20 px-2 py-1 shadow-lg"
              style={{ backdropFilter: "blur(18px)" }}
            >
              <Toggles />
            </div>
          </div>
          <div
            style={{
              backdropFilter: "blur(18px)",
              backgroundColor: "rgba(26,20,12, 0.75)",
            }}
            className={cn(
              "flex w-full flex-col gap-4 rounded-3xl p-4 sm:p-5 lg:p-6 max-w-7xl relative",
              styles.vaultsBg,
            )}
          >
            {/* Stats Marquee */}
            <GoldilendStatsMarquee />

            {/* Data Fetcher */}
            <BorrowFetcher />

            {/* Main Content */}
            <div className="flex flex-col gap-6 relative xl:flex-row xl:items-start xl:justify-center">
                <div
                  className={cn(
                    "flex w-full flex-col gap-6",
                    activeToggle === "GHONEY" ? "xl:max-w-none" : "xl:max-w-none"
                  ) }
                >
                {boostPopup && <BoostPopup />}
                {activeToggle === "GHONEY" ? (
                  <NewGHoneyTab />
                ) : activeToggle === "AUCTIONS" ? (
                  <NewAuctionsTab />
                ) : (
                  <NewBorrowBox />
                )}
              </div>
            </div>
          </div>
        </div>
      </CsrPageLayout>
    ) : (
      <GoldilendPageMobile />
    )
  );
};
