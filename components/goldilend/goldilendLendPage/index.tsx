"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";
import { useAccount } from "wagmi";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import { LendBox, LendToggles } from "../";
import { useDesktop, useGoldilend } from "../../../providers";
import { GoldilendLendPageMobile } from "../../goldilendMobile";
import { Loading, TAndCs } from "../../utils";
import { NavBar } from "../../goldiswap"

export const GoldilendLendPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    refreshGoldilendWalletInfo,
    refreshGoldilendInfo,
    lendActiveToggle,
    wutPopup,
    setWutPopup
  } = useGoldilend();

  const { isConnected } = useAccount();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

  useEffect(() => {
    refreshGoldilendInfo();
    setPageLoading(false);
  }, []);

  useEffect(() => {
    refreshGoldilendWalletInfo();
  }, [isConnected]);

  const handlePopups = () => {
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
    <main className="w-screen h-screen" onClick={() => handlePopups()}>
      <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldilend.png')] relative">
        <LendToggles />
        <h1
          className="absolute right-[73%] top-[1.5%] font-amaticbold text-[7.5vw] text-[#D9C6BA] xl:top-[15%]"
          id="page-title"
        >
          GOLDILEND
        </h1>
        <h1
          className={`absolute top-[3%] xl:top-[36%] ${lendActiveToggle === "UNSTAKE" ? "right-[57%] xl:right-[77%]" : lendActiveToggle === "LIQUIDATE" ? "right-[54%] xl:right-[75.5%]" : lendActiveToggle === "LOCK" ? "right-[63%] xl:right-[80.5%]" : "right-[61%] xl:right-[80%]"} font-amaticbold text-[6vw] text-[#E7B941]`}
          id="page-title"
        >
          {lendActiveToggle}
        </h1>
        <LendBox />
      </div>
    </main>
    : <GoldilendLendPageMobile />
  );
};
