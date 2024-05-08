"use client"

import { useDesktop } from "../../../providers"
import {
  NavBarMobile,
  NavBarButtons
} from "../../utils"

export const GoldiswapPageMobile = () => {

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
    </main>
  )
}