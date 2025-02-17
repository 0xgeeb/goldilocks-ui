"use client";

import {
  ClaimTabMobile,
  LendBoxMobile,
  LendButtonMobile,
  LendTogglesMobile,
  LendWalletBalanceMobile,
  LiquidateTabMobile,
  StatsMobile,
} from "../";
import { useDesktop, useGoldilend } from "../../../providers";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const GoldilendLendPageMobile = () => {
  const { lendActiveToggle, changeLendActiveToggle } = useGoldilend();
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="h-screen w-screen">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <div className="relative h-[89%] w-full bg-[url('/images/bg-goldilend-mobile.png')] bg-cover bg-bottom">
          <LendTogglesMobile />
          <div
            className={`absolute right-[15.5%] top-[7.5%] h-[3.9%] w-1/5 origin-top-right rotate-[270deg] border-x-2 border-b-2 border-black ${lendActiveToggle === "LIQUIDATE" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex items-center justify-center font-baloo text-[3vw] focus:bg-[#F3AA8A]`}
            onClick={() => changeLendActiveToggle("LIQUIDATE")}
          >
            <span className="">LIQUIDATE</span>
          </div>
          <h1
            className="absolute left-[13%] top-0 font-amaticbold text-[9vw] text-[#D9C6BA]"
            id="page-title"
          >
            Goldilend
          </h1>
          <h1
            className="absolute left-[44%] top-0 font-amaticbold text-[9vw] text-[#E7B941]"
            id="page-title"
          >
            {lendActiveToggle}
          </h1>
          {lendActiveToggle === "LIQUIDATE" ? (
            <LiquidateTabMobile />
          ) : lendActiveToggle === "CLAIM" ? (
            <>
              <ClaimTabMobile />
              <LendWalletBalanceMobile />
            </>
          ) : (
            <>
              <LendBoxMobile />
              <LendWalletBalanceMobile />
              <LendButtonMobile />
              <StatsMobile />
            </>
          )}
          <FooterMobile />
        </div>
      )}
    </main>
  );
};
