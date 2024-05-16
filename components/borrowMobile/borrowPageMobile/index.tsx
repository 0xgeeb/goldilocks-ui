"use client"

import { useBorrow, useDesktop } from "../../../providers"
import {
  StatsMobile,
  BorrowButtonMobile,
  BorrowBoxMobile,
  TogglesMobile,
  WalletBalanceMobile
} from "../../borrowMobile"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

export const BorrowPageMobile = () => {

  const {
    chartOpen,
    setChartOpen,
    activeToggle
  } = useBorrow()

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
          <TogglesMobile />
          <h1 className="absolute top-[-0.25%] right-[69%] text-[#D9C6BA] text-[7vw] font-amaticbold" id="page-title">{activeToggle}</h1>
          <WalletBalanceMobile />
          <BorrowBoxMobile />
          <img className="absolute bottom-[26%] right-[11.8%] origin-bottom-right -rotate-[90deg] h-[1.27%] w-[8.36%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
          <div 
            className="absolute h-[6.21%] w-[23.6%] bottom-[30%] right-[0%] origin-bottom-right -rotate-[90deg] border-t-2 border-l-2 border-r-2 border-black bg-[#F3AA8A] font-amaticbold text-[5vw] focus:scale-110 cursor-pointer flex items-center justify-center"
            onClick={() => setChartOpen(!chartOpen)}
          >
            <span className="">THIS IS CHART</span>
          </div>
          <BorrowButtonMobile />
          <StatsMobile />
          <FooterMobile />
        </div>
      }
    </main>
  )
}