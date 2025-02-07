"use client"

import { useDesktop } from "../../../providers"
import { ProposeBoxMobile, NewProposalPreviewMobile } from "../"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile,
} from "../../utils"

export const ProposePageMobile = () => {

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
          <h1 className="absolute top-[0%] left-[0.5%] text-[#D9C6BA] text-[10vw] font-amaticbold" id="page-title">New Proposal</h1>
          <NewProposalPreviewMobile />
          <ProposeBoxMobile />
          <FooterMobile />
        </div>
      }
    </main>
  )
}