"use client"

import { useStake, useDesktop } from "../../../providers"
import {
  StatsMobile,
  StakeButtonMobile,
  TogglesMobile,
  WalletBalanceMobile,
  StakeBoxMobile,
  ClaimTabMobile
} from "../../stakeMobile"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile,
  LocksFetcher
} from "../../utils"

export const StakePageMobile = () => {

  const {
    chartOpen,
    setChartOpen,
    activeToggle
  } = useStake()

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
          <TogglesMobile />
          <h1 className="absolute top-[0%] left-[13%] text-[#D9C6BA] text-[9vw] font-amaticbold" id="page-title">Goldiswap</h1>
          <h1 className="absolute top-[0%] left-[44%] text-[#E7B941] text-[9vw] font-amaticbold" id="page-title">{activeToggle}</h1>
          {
            activeToggle === 'CLAIM' ?
            <ClaimTabMobile /> :
            <>
              <StakeBoxMobile />
              {/* <img className="absolute bottom-[26%] left-[80%] origin-bottom-right -rotate-[90deg] h-[1.27%] w-[8.36%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
              <div 
                className="absolute h-[12vw] w-[23.6%] bottom-[30%] right-[0%] origin-bottom-right -rotate-[90deg] border-t-2 border-l-2 border-r-2 border-black bg-[#F3AA8A] font-amaticbold text-[5vw] focus:scale-110 cursor-pointer flex items-center justify-center"
                onClick={() => setChartOpen(!chartOpen)}
              >
                <span className="">THIS IS CHART</span>
              </div> */}
              <StakeButtonMobile />
              <StatsMobile />
            </>
          }
          <WalletBalanceMobile />
          <FooterMobile />
          <LocksFetcher />
        </div>
      }
    </main>
  )
}