"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import { useDesktop, useGeo, useGov } from "../../../providers";
import { GovLocksBox } from "../../gov";
import { GovLocksPageMobile } from "../../govMobile";
import { Loading, TAndCs } from "../../utils";

export const GovLocksPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const { wutPopup, setWutPopup } = useGov();

  const { isDesktop } = useDesktop();

  const { signed } = useGeo();

  useEffect(() => {
    setPageLoading(false);
  }, []);

  const handlePopups = (e: any) => {
    if (wutPopup) {
      setWutPopup(false);
    }
  };

  return pageLoading ? (
    <Loading />
  ) : isDesktop ? (
    signed !== "TRUE" ? (
      <TAndCs />
    ) : (
      <CsrPageLayout
        onPageClick={(e) => handlePopups(e)}
        wutPopup={wutPopup}
        setWutPopup={setWutPopup}
        bgImageUrl="/images/bg-goldiswap.png"
      >
        <>
          <h1
            className="absolute left-[2.5%] top-[-0.5%] font-amaticbold text-[7.5vw] text-[#D9C6BA] lg:top-[16%] lg:text-[6vw] xl:left-[5%] 2xl:left-[7.5%] 2xl:top-[12.16%] tall:text-[10vw] tall:md:text-[7.5vw] tall:lg:text-[6vw]"
            id="page-title"
          >
            GovLocks
          </h1>
          <GovLocksBox />
        </>
      </CsrPageLayout>
    )
  ) : (
    <GovLocksPageMobile />
  );
};
