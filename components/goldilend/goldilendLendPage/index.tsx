"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useGoldilend, useDesktop, useGeo } from "../../../providers"
import { GoldilendLendPageMobile } from "../../goldilendMobile"
import {
  LendToggles,
  LendBox
} from "../"
import {
  NavBar,
  Footer,
  Loading,
  ChangeChain,
  TAndCs
} from "../../utils"

export const GoldilendLendPage = () => {

  const [pageLoading, setPageLoading] = useState<boolean>(true)

  const {
    refreshGoldilendWalletInfo,
    refreshGoldilendInfo,
    lendActiveToggle,
    wutPopup,
    setWutPopup,
    findBoost
  } = useGoldilend()

  const { isConnected } = useAccount()

  const { isDesktop } = useDesktop()

  const { signed } = useGeo()

  useEffect(() => {
    refreshGoldilendInfo()
    setPageLoading(false)
  }, [])
  
  useEffect(() => {
    refreshGoldilendWalletInfo()
    findBoost()
  }, [isConnected])

  const handlePopups = () => {
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
      <main className="w-screen h-screen" onClick={() => handlePopups()}>
        <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
        <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldilend.png')] relative">
          <LendToggles />
          <h1 className="absolute top-[1.5%] xl:top-[15%] right-[73%] text-[#D9C6BA] text-[7.5vw] font-amaticbold" id="page-title">GOLDILEND</h1>
          <h1 className={`absolute top-[3%] xl:top-[36%] ${lendActiveToggle === 'UNSTAKE' ? "right-[57%] xl:right-[77%]" : lendActiveToggle === 'LIQUIDATE' ? "right-[54%] xl:right-[75.5%]" : lendActiveToggle === 'LOCK' ? "right-[63%] xl:right-[80.5%]" : "right-[61%] xl:right-[80%]"} text-[#E7B941] text-[6vw] font-amaticbold`} id="page-title">{lendActiveToggle}</h1>
          <LendBox />
          <Footer />
          <ChangeChain />
        </div>
      </main>
    ) :
    <GoldilendLendPageMobile />
  )
}