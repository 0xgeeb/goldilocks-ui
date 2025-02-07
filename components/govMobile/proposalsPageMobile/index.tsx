"use client"

import { useDesktop } from "../../../providers"
import { ProposalsFetcher } from "../../gov"
import { ProposalsBoxMobile } from "../"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile,
} from "../../utils"

export const ProposalsPageMobile = () => {

  const { navButtonsOpen } = useDesktop()
  
  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
          <h1 className="absolute top-[1.5%] left-[3%] text-[#D9C6BA] text-[11vw] font-amaticbold" id="page-title">GoldiGovernance</h1>
          <a href="/goldigovernance/propose">
            <div className="absolute h-[6%] w-[30%] top-[3%] right-[4%] bg-[#E7B941] text-black font-amaticbold flex items-center justify-center text-[5.5vw] border-2 border-black">
              new proposal
            </div>
          </a>
          <a href="/goldigovernance/govlocks">
            <div className="absolute h-[6%] w-[30%] top-[10.5%] right-[4%] bg-[#E7B941] text-black font-amaticbold flex items-center justify-center text-[5.5vw] border-2 border-black">
              get $govLOCKS
            </div>
          </a>
          <ProposalsBoxMobile />
          <ProposalsFetcher />
          <FooterMobile />
        </div>
      }
    </main>
  )
}