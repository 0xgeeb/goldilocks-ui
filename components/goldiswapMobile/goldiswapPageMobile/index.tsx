"use client"

import { useGoldiswap, useDesktop } from "../../../providers"
import {
  StatsMobile,
  GoldiswapButtonMobile
} from "../../goldiswapMobile"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

export const GoldiswapPageMobile = () => {

  const {
    chartOpen,
    setChartOpen
  } = useGoldiswap()

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
        <img className="absolute top-[51.04%] left-[75.5%] h-[2%] w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[6%] h-[8%] top-[53.04%] left-[74%] border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[1.2vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          THIS IS CHART
        </div>
        <GoldiswapButtonMobile />
        <StatsMobile />
        <FooterMobile />
      </div>
    </main>
  )
}