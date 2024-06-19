"use client"

import { useGoldilend, useDesktop } from "../../../providers"
import {
  TogglesMobile,
  BorrowBoxMobile,
  RepayTabMobile,
  BorrowButtonMobile
} from ".."
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

export const GoldilendPageMobile = () => {

  const { activeToggle } = useGoldilend()
  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] bg-cover bg-bottom bg-[url('/images/bg-goldilend-mobile.png')] relative">
          <TogglesMobile />
          <h1 className="absolute top-[0%] left-[13%] text-[#D9C6BA] text-[9vw] font-amaticbold" id="page-title">Goldilend</h1>
          <h1 className="absolute top-[0%] left-[44%] text-[#E7B941] text-[9vw] font-amaticbold" id="page-title">{activeToggle}</h1>
          {
            activeToggle === 'REPAY' ?
            <RepayTabMobile /> :
            <>
              <BorrowBoxMobile />
              <BorrowButtonMobile />
            </>
          }
          <FooterMobile />
        </div>
      }
    </main>
  )
}