"use client"

import { useState, useEffect } from "react"
import { useGoldivault, useDesktop } from "../../../providers"
import { GoldivaultPageMobile } from "../../goldivaultMobile"
import {
  Stats,
  VaultDisplay
} from "../"
import {
  NavBar,
  Footer,
  Loading,
  ChangeChain
} from "../../utils"

export const GoldivaultPage = () => {

  const [pageLoading, setPageLoading] = useState<boolean>(true)

  const { wutPopup, setWutPopup } = useGoldivault()

  const { isDesktop } = useDesktop()

  useEffect(() => {
    setPageLoading(false)
  }, [])

  const handlePopups = () => {
    if(wutPopup) {
      setWutPopup(false)
    }
  }

  return (
    pageLoading ?
    <Loading /> :
    isDesktop ?
    <main className="w-screen h-screen" onClick={() => handlePopups()}>
      <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldivault.png')] relative">
        <h1 className="absolute bottom-[82.5%] md:bottom-[80%] lg:bottom-[76%] 2xl:bottom-[71%] tall:bottom-[85%] tall:md:bottom-[80%] tall:lg:bottom-[76%] tall:2xl:bottom-[71%] left-[6%] 2xl:left-[5%] text-[#FFCD00] text-[12vw] md:text-[11vw] lg:text-[10vw] 2xl:text-[8vw] font-amaticbold" id="page-title">Goldivaults</h1>
        {/* <Stats /> */}
        <VaultDisplay />
        <Footer />
        <ChangeChain />
      </div>
    </main> :
    // <GoldivaultPageMobile />
    <div>henlo. sorry napzilla didnt finish the mobile view yet</div>
  )
}