"use client"

import { useState, useEffect } from "react"
import { useGov, useDesktop, useGeo } from "../../../providers"
import { GovLocksBox } from "../../gov"
import { GovLocksPageMobile } from "../../govMobile"
import {
  NavBar,
  Footer,
  Loading,
  ChangeChain,
  TAndCs
} from "../../utils"

export const GovLocksPage = () => {

  const [pageLoading, setPageLoading] = useState<boolean>(true)

  const {
    wutPopup,
    setWutPopup
  } = useGov()

  const { isDesktop } = useDesktop()

  const { signed } = useGeo()

  useEffect(() => {
    setPageLoading(false)
  }, [])

  const handlePopups = (e: any) => {
    if(wutPopup) {
      setWutPopup(false)
    }
  }

  return (
    pageLoading ?
    <Loading /> :
    isDesktop ?
    (
      signed !== 'TRUE' ?
      <TAndCs /> :
      <main className="w-screen h-screen" onClick={(e) => handlePopups(e)}>
        <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
        <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
          <h1 className="absolute top-[-0.5%] lg:top-[16%] 2xl:top-[12.16%] left-[2.5%] xl:left-[5%] 2xl:left-[7.5%] text-[#D9C6BA] text-[7.5vw] lg:text-[6vw] tall:text-[10vw] tall:md:text-[7.5vw] tall:lg:text-[6vw] font-amaticbold" id="page-title">GovLocks</h1>
          <GovLocksBox />
          <Footer />
          <ChangeChain />
        </div>
      </main>
    ) :
    <GovLocksPageMobile />
  )
}