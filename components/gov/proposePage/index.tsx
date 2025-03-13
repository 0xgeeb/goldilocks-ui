"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import { NewProposalPreview, ProposeBox } from "../";
import { useDesktop, useGov } from "../../../providers";
import { ProposePageMobile } from "../../govMobile";
import { Loading, TAndCs } from "../../utils";

export const ProposePage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const { wutPopup, setWutPopup } = useGov();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

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
            className="absolute left-[2.5%] top-[-0.5%] font-amaticbold text-[7.5vw] text-[#D9C6BA] lg:text-[6vw]"
            id="page-title"
          >
            New Proposal
          </h1>
          <NewProposalPreview />
          <ProposeBox />
        </>
      </CsrPageLayout>
    )
  ) : (
    <ProposePageMobile />
  );
};
