"use client"

import { useGoldilend, useDesktop } from "../../../providers"
import {
  LendTogglesMobile,
  LendBoxMobile,
  LendButtonMobile,
  StatsMobile,
  ClaimTabMobile,
  LiquidateTabMobile
} from ".."
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile,
  LendWalletBalanceMobile
} from "../../utils"

export const GoldilendLendPageMobile = () => {

  const { lendActiveToggle, changeLendActiveToggle } = useGoldilend()
  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-bottom bg-[url('/images/bg-goldilend-mobile.png')]">
          <LendTogglesMobile />
          <div
            className={`absolute w-[20%] h-[3.9%] border-r-2 border-l-2 border-b-2 border-black top-[7.5%] right-[15.5%] rotate-[270deg] origin-top-right  ${lendActiveToggle === 'LIQUIDATE' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] flex items-center justify-center font-baloo text-[3vw]`}
            onClick={() => changeLendActiveToggle('LIQUIDATE')}
          >
            <span className="">LIQUIDATE</span>
          </div>
          <h1 className="absolute top-[0%] left-[13%] text-[#D9C6BA] text-[9vw] font-amaticbold" id="page-title">Goldilend</h1>
          <h1 className="absolute top-[0%] left-[44%] text-[#E7B941] text-[9vw] font-amaticbold" id="page-title">{lendActiveToggle}</h1>
          {
            lendActiveToggle === 'LIQUIDATE' ?
            <LiquidateTabMobile /> :
            lendActiveToggle === 'CLAIM' ?
            <>
              <ClaimTabMobile />
              <LendWalletBalanceMobile />
            </> :
            <>
              <LendBoxMobile />
              <LendWalletBalanceMobile />
              <LendButtonMobile />
              <StatsMobile />
            </>
          }
          <FooterMobile />
        </div>
      }
    </main>
  )
}