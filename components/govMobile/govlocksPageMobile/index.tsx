"use client";

import { GovLocksBoxMobile } from "../";
import { useDesktop } from "../../../providers";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const GovLocksPageMobile = () => {
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="h-screen w-screen">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <div className="relative h-[89%] w-full bg-[url('/images/bg-goldiswap-mobile.png')] bg-cover">
          <h1
            className="absolute left-[3%] top-[1.5%] font-amaticbold text-[11vw] text-[#D9C6BA]"
            id="page-title"
          >
            GovLocks
          </h1>
          <GovLocksBoxMobile />
          <FooterMobile />
        </div>
      )}
    </main>
  );
};
