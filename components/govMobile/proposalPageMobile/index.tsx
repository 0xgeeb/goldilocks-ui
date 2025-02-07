"use client"

import { useDesktop } from "../../../providers"
import { ProposalsFetcher } from "../../gov"
import {
  ProposalBoxMobile,
  ProposalButtonsMobile
} from "../"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile,
} from "../../utils"

type BoxProps = {
  number: string;
}

export const ProposalPageMobile = ({ number }: BoxProps) => {

  const { navButtonsOpen } = useDesktop()
  
  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
          <h1 className="absolute top-[0.5%] left-[3%] text-[#D9C6BA] text-[12vw] font-amaticbold" id="page-title">Proposal #{number}</h1>
          <ProposalBoxMobile number={number} />
          <ProposalButtonsMobile number={number} />
          <ProposalsFetcher />
          <FooterMobile />
        </div>
      }
    </main>
  )
}