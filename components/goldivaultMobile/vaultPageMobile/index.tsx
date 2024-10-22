"use client"

import { useDesktop } from "../../../providers"
import {
  VaultBoxMobile,
  VaultButtonMobile,
  PoolsPopupMobile,
  VaultInfoMobile,
  TogglesMobile
} from "../"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

export const VaultPageMobile = () => {

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldivault-mobile.png')]">
          <PoolsPopupMobile />
          <VaultBoxMobile />
          <VaultInfoMobile />
          <TogglesMobile />
          <VaultButtonMobile />
          <FooterMobile />
        </div>
      }
    </main>
  )
}