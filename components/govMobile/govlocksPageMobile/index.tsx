"use client"

import { useDesktop } from "../../../providers"
import { GovLocksBoxMobile } from "../"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile,
} from "../../utils"

export const GovLocksPageMobile = () => {

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
          <h1 className="absolute top-[1.5%] left-[3%] text-[#D9C6BA] text-[11vw] font-amaticbold" id="page-title">GovLocks</h1>
          <GovLocksBoxMobile />
          <FooterMobile />
        </div>
      }
    </main>
  )
}