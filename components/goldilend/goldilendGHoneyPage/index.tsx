"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";
import { useAccount } from "wagmi";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { cn } from "@/app/_components/utils";
import styles from "@/app/(geo-check)/goldivault/_components/VaultsCardLayout.module.css";

import {
  BorrowFetcher,
  Toggles,
  GoldilendStatsMarquee,
  BoostPopup,
  NewGHoneyTab,
} from "../";
import { useDesktop, useGoldilend } from "../../../providers";
import { GoldilendPageMobile } from "../../goldilendMobile";
import { Loading, TAndCs } from "../../utils";

export const GoldilendGHoneyPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    refreshGoldilendWalletInfo,
    refreshGoldilendInfo,
    wutPopup,
    setWutPopup,
    boostPopup,
    setBoostPopup,
    activeToggle,
    changeActiveToggle,
  } = useGoldilend();

  const { isConnected } = useAccount();
  const { isDesktop } = useDesktop();
  const signed = useAtomValue(geoAtom);

  useEffect(() => {
    refreshGoldilendInfo();
    refreshGoldilendWalletInfo();
    setPageLoading(false);
  }, [refreshGoldilendInfo, refreshGoldilendWalletInfo, setPageLoading]);

  useEffect(() => {
    if (isConnected) {
      refreshGoldilendWalletInfo();
    }
  }, [isConnected, refreshGoldilendWalletInfo]);

  useEffect(() => {
    if (activeToggle !== "GHONEY") {
      changeActiveToggle("GHONEY");
    }
  }, [activeToggle, changeActiveToggle]);

  const handlePopups = () => {
    if (wutPopup) {
      setWutPopup(false);
    }
    if (boostPopup) {
      setBoostPopup(false);
    }
  };

  if (pageLoading) {
    return <Loading />;
  }

  if (signed !== "TRUE") {
    return <TAndCs />;
  }

  if (!isDesktop) {
    return <GoldilendPageMobile />;
  }

  return (
    <CsrPageLayout
      onPageClick={() => handlePopups()}
      wutPopup={wutPopup}
      setWutPopup={setWutPopup}
      bgImageUrl="/images/bg-goldilend.png"
    >
      <div className="flex flex-col items-center justify-center px-4 pt-0 pb-2 sm:px-6 sm:pb-3 lg:px-12 lg:pb-4">
        <div className="w-full max-w-7xl flex justify-start mb-0">
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
          <GoldilendStatsMarquee />
          <BorrowFetcher />
          <div className="flex flex-col gap-6 relative xl:flex-row xl:items-start xl:justify-center">
            <div className="flex w-full flex-col gap-6">
              <NewGHoneyTab />
            </div>
          </div>
        </div>
      </div>
    </CsrPageLayout>
  );
};
