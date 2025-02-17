"use client";

import { VaultDisplayMobile } from "../";
import { useDesktop } from "../../../providers";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const GoldivaultPageMobile = () => {
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="h-screen w-screen">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <div className="relative h-[89%] w-full bg-[url('/images/bg-goldivault-mobile.png')] bg-cover">
          <h1
            className="absolute left-[10%] top-0 font-amaticbold text-[10vw] text-[#D9C6BA]"
            id="page-title"
          >
            Goldivaults
          </h1>
          {/* <StatsMobile /> */}
          <VaultDisplayMobile />
          <FooterMobile />
        </div>
      )}
    </main>
  );
};
