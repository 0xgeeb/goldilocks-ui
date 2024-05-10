"use client"

import { useStake, useDesktop } from "../../../providers"
import {
  StatsMobile
} from "../../stakeMobile"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
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
      <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
        <h1 className="absolute top-[-0.25%] right-[69%] text-[#D9C6BA] text-[7vw] font-amaticbold" id="page-title">{activeToggle}</h1>
        <img className="absolute top-[73.2%] right-[10.5%] -rotate-[90deg] h-[1.27%] w-[8.36%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute h-[12%] w-[13%] top-[67%] text-nowrap right-[0%] border-t-2 border-l-2 border-b-2 border-black bg-[#F3AA8A] font-amaticbold text-[4.5vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          <span className="absolute -rotate-[90deg] right-[-21%] bottom-[35%]">THIS IS CHART</span>
        </div>
        <StatsMobile />
        <FooterMobile />
      </div>
    </main>
  )
}