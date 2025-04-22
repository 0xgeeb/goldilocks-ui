"use client";

import { useBorrow, useDesktop } from "../../../providers";
import {
  BorrowBoxMobile,
  BorrowButtonMobile,
  StatsMobile,
  TogglesMobile,
  WalletBalanceMobile,
} from "../../borrowMobile";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const BorrowPageMobile = () => {
  const { chartOpen, setChartOpen, activeToggle } = useBorrow();

  const { navButtonsOpen } = useDesktop();

  return (
    <main className="h-screen w-screen">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <div className="relative h-[89%] w-full bg-[url('/images/bg-goldiswap-mobile.png')] bg-cover">
          <TogglesMobile />
          <h1
            className="absolute left-[13%] top-0 font-amaticbold text-[9vw] text-[#D9C6BA]"
            id="page-title"
          >
            Goldiswap
          </h1>
          <h1
            className="absolute left-[44%] top-0 font-amaticbold text-[9vw] text-[#E7B941]"
            id="page-title"
          >
            {activeToggle}
          </h1>
          <WalletBalanceMobile />
          <BorrowBoxMobile />
          {/* <img className="absolute bottom-[26%] left-[80%] origin-bottom-right -rotate-[90deg] h-[1.27%] w-[8.36%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
          <div 
            className="absolute h-[12vw] w-[23.6%] bottom-[30%] right-[0%] origin-bottom-right -rotate-[90deg] border-t-2 border-l-2 border-r-2 border-black bg-[#F3AA8A] font-amaticbold text-[5vw] focus:scale-110 cursor-pointer flex items-center justify-center"
            onClick={() => setChartOpen(!chartOpen)}
          >
            <span className="">THIS IS CHART</span>
          </div> */}
          <BorrowButtonMobile />
          <StatsMobile />
          <FooterMobile />
          {/* <LocksFetcher /> */}
        </div>
      )}
    </main>
  );
};
