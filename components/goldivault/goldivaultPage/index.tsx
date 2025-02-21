"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import { InfoDisplayPopup, VaultDisplay } from "../";
import { useDesktop, useGeo, useGoldivault } from "../../../providers";
import { GoldivaultPageMobile } from "../../goldivaultMobile";
import { Loading, TAndCs } from "../../utils";

export const GoldivaultPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    wutPopup,
    setWutPopup,
    infoPopupToggle,
    setInfoPopupToggle,
    refreshVaultDisplayInfo,
  } = useGoldivault();

  const { isDesktop } = useDesktop();

  const { signed } = useGeo();

  useEffect(() => {
    refreshVaultDisplayInfo();
    setPageLoading(false);
  }, []);

  const handlePopups = () => {
    if (wutPopup) {
      setWutPopup(false);
    }
    if (infoPopupToggle) {
      setInfoPopupToggle(false);
    }
  };

  return pageLoading ? (
    <Loading />
  ) : isDesktop ? (
    signed !== "TRUE" ? (
      <TAndCs />
    ) : (
      <CsrPageLayout
        onPageClick={() => handlePopups()}
        wutPopup={wutPopup}
        setWutPopup={setWutPopup}
        bgImageUrl="/images/bg-goldivault.png"
      >
        {infoPopupToggle && <InfoDisplayPopup />}

        <div className="absolute size-full overflow-y-scroll">
          <h1
            className="absolute bottom-[82.5%] left-[6%] font-amaticbold text-[12vw] text-[#FFCD00] md:bottom-[80%] md:text-[11vw] lg:bottom-[71%] lg:text-[10vw] 2xl:bottom-[71%] 2xl:left-[5%] 2xl:text-[8vw] tall:bottom-[85%] tall:md:bottom-[80%] tall:lg:bottom-[76%] tall:2xl:bottom-[71%]"
            id="page-title"
          >
            Goldivaults
          </h1>
          {/* <Stats /> */}
          <VaultDisplay />
        </div>
      </CsrPageLayout>
    )
  ) : (
    <GoldivaultPageMobile />
  );
};
