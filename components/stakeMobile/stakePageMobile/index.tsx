"use client"

import { useStake, useDesktop } from "../../../providers"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

export const StakePageMobile = () => {

  const {
    chartOpen,
    setChartOpen
  } = useStake()

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
        <img className="absolute top-[77.2%] right-[9%] -rotate-[90deg] h-[1.27%] w-[8.36%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[21.72%] h-[6.21%] -rotate-[90deg] top-[75%] right-[-4.8%] border-t-2 border-l-2 border-r-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[4.5vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          THIS IS CHART
        </div>
        <FooterMobile />
      </div>
    </main>
  )
}