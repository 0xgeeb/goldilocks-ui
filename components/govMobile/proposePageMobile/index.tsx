"use client";

import { NewProposalPreviewMobile, ProposeBoxMobile } from "../";
import { useDesktop } from "../../../providers";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const ProposePageMobile = () => {
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="h-screen w-screen">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <div className="relative h-[89%] w-full bg-[url('/images/bg-goldiswap-mobile.png')] bg-cover">
          <h1
            className="absolute left-[0.5%] top-0 font-amaticbold text-[10vw] text-[#D9C6BA]"
            id="page-title"
          >
            New Proposal
          </h1>
          <NewProposalPreviewMobile />
          <ProposeBoxMobile />
          <FooterMobile />
        </div>
      )}
    </main>
  );
};
