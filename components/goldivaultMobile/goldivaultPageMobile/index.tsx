"use client"

import { useDesktop } from "../../../providers"
import {
  StatsMobile,
  VaultDisplayMobile
} from "../"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

export const GoldivaultPageMobile = () => {

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldivault-mobile.png')]">
          <h1 className="absolute top-[0%] left-[10%] text-[#D9C6BA] text-[10vw] font-amaticbold" id="page-title">Goldivaults</h1>
          {/* <StatsMobile /> */}
          <VaultDisplayMobile />
          <FooterMobile />
        </div>
      }
    </main>
  )
}