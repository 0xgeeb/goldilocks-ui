"use client";

import { ProposeBoxMobile } from "../";
import { useDesktop } from "../../../providers";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const ProposePageMobile = () => {
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="flex min-h-screen w-screen flex-col">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <>
          <div className="relative flex-1 w-full bg-[url('/images/bg-goldiswap-mobile.png')] bg-cover">
            <h1
              className="absolute left-[3%] top-0 font-amaticbold text-[10vw] text-[#D9C6BA]"
              id="page-title"
            >
              New Proposal
            </h1>
            <ProposeBoxMobile />
          </div>
          <FooterMobile />
        </>
      )}
    </main>
  );
};
