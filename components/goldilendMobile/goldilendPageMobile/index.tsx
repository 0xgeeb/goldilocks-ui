"use client";

import {
  BorrowBoxMobile,
  BorrowButtonMobile,
  RepayTabMobile,
  TogglesMobile,
} from "../";
import { useDesktop, useGoldilend } from "../../../providers";
import { BorrowFetcher } from "../../goldilend";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const GoldilendPageMobile = () => {
  const { activeToggle } = useGoldilend();
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="h-screen w-screen">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <div className="relative h-[89%] w-full bg-[url('/images/bg-goldilend-mobile.png')] bg-cover bg-bottom">
          <TogglesMobile />
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
            {activeToggle}
          </h1>
          {activeToggle === "REPAY" ? (
            <RepayTabMobile />
          ) : (
            <>
              <BorrowBoxMobile />
              <BorrowButtonMobile />
            </>
          )}
          <BorrowFetcher />
          <FooterMobile />
        </div>
      )}
    </main>
  );
};
