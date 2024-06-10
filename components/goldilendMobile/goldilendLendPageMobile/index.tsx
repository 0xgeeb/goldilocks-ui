"use client"

import { useGoldilend, useDesktop } from "../../../providers"
import {
  LendTogglesMobile,
  LendBoxMobile
} from ".."
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

export const GoldilendLendPageMobile = () => {

  const {
    lendActiveToggle
  } = useGoldilend()

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-bottom bg-[url('/images/bg-goldilend-mobile.png')]">
          <LendTogglesMobile />
          <h1 className="absolute top-[0%] left-[13%] text-[#D9C6BA] text-[9vw] font-amaticbold" id="page-title">Goldilend</h1>
          <h1 className="absolute top-[0%] left-[44%] text-[#E7B941] text-[9vw] font-amaticbold" id="page-title">{lendActiveToggle}</h1>
          <LendBoxMobile />
          <FooterMobile />
        </div>
      }
    </main>
  )
}