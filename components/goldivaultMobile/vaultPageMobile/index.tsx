"use client"

import { useGoldivault, useDesktop } from "../../../providers"
import { TogglesMobile, SlippagePopupMobile } from "../"
import {
  VaultBoxBhoneyMobile,
  VaultButtonBhoneyMobile
} from "../bhoney"
import {
  VaultBoxWeethMobile,
  VaultButtonWeethMobile,
  TogglesWeethMobile
} from "../weeth"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

type PageProps = {
  address: string;
}

export const VaultPageMobile = ({ address }: PageProps) => {

  const { slippage } = useGoldivault()

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldivault-mobile.png')]">
          <a className="absolute top-[7.5%] left-[2.5%] h-[6%] w-[25%]" href="/goldivault/vaults">
            <div className="w-[100%] h-[100%] border-2 border-[#FFCD00] bg-[#542E07] flex justify-center items-center">
              <span className="text-white font-amaticbold font-medium text-[6vw] text-center">BACK</span>
            </div>
          </a>
          <h1 className="absolute top-[0%] left-[6%] text-[#D9C6BA] text-[9vw] font-amaticbold" id="page-title">Goldivaults -</h1>
          {
            address === '0x541C4aCA915ccC83B1bf48b510D1653cba61115F' ?
            <>
              <h1 className="absolute top-[0%] left-[43%] text-[#E7B941] text-[9vw] font-amaticbold" id="page-title">bHoney</h1>
              <VaultBoxBhoneyMobile />
              <VaultButtonBhoneyMobile />
              <TogglesMobile />
            </> :
            <>
              <h1 onClick={() => console.log(slippage)} className="absolute top-[0%] left-[43%] text-[#E7B941] text-[9vw] font-amaticbold" id="page-title">weETH</h1>
              <VaultBoxWeethMobile />
              <VaultButtonWeethMobile />
              <TogglesWeethMobile />
              { slippage.toggle && <SlippagePopupMobile /> }
            </>
          }
          <FooterMobile />
        </div>
      }
    </main>
  )
}