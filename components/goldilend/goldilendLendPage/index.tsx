"use client"

import { useEffect } from "react"
import { useGoldilend, useDesktop } from "../../../providers"
import { GoldilendLendPageMobile } from "../../goldilendMobile"
import {
  LendToggles,
  LendBox,
  LendButton,
  Stats,
  LiquidateTab,
  ClaimTab
} from "../"
import {
  NavBar,
  Footer,
  Loading,
  LendWalletBalance,
  ChangeChain
} from "../../utils"

export const GoldilendLendPage = () => {

  const {
    infoLoading,
    setInfoLoading,
    refreshGoldilendInfo,
    lendActiveToggle
  } = useGoldilend()

  const { isDesktop } = useDesktop()

  useEffect(() => {
    refreshGoldilendInfo()
    setInfoLoading(false)
  }, [])

  return (
    infoLoading ?
    <Loading /> :
    isDesktop ?
    <main className="w-screen h-screen">
      <NavBar />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldilend.png')] relative">
        <LendToggles />
        <h1 className="absolute top-[1.5%] xl:top-[15%] right-[73%] text-[#D9C6BA] text-[7.5vw] font-amaticbold" id="page-title">GOLDILEND</h1>
        <h1 className={`absolute top-[3%] xl:top-[36%] ${lendActiveToggle === 'UNSTAKE' ? "right-[57%] xl:right-[77%]" : lendActiveToggle === 'LIQUIDATE' ? "right-[54%] xl:right-[75.5%]" : lendActiveToggle === 'LOCK' ? "right-[63%] xl:right-[80.5%]" : "right-[61%] xl:right-[80%]"} text-[#E7B941] text-[6vw] font-amaticbold`} id="page-title">{lendActiveToggle}</h1>
        {
          lendActiveToggle === 'LIQUIDATE' ?
          <LiquidateTab /> :
          lendActiveToggle === 'CLAIM' ?
          <>
            <ClaimTab />
            <LendWalletBalance />
          </> :
          <>
            <LendBox />
            <LendWalletBalance />
            <LendButton />
            <Stats />
          </>
        }
        <Footer />
        <ChangeChain />
      </div>
    </main> :
    <GoldilendLendPageMobile />
  )
}