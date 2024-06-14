"use client"

import { useEffect } from "react"
import { useGoldilend, useDesktop } from "../../../providers"
import { GoldilendPageMobile } from "../../goldilendMobile"
import {
  Toggles,
  BorrowBox
} from "../"
import {
  NavBar,
  Footer,
  Loading
} from "../../utils"

export const GoldilendPage = () => {

  const {
    infoLoading,
    setInfoLoading,
    refreshGoldilendInfo,
    activeToggle
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
        <Toggles />
        <h1 className="absolute top-[1.5%] xl:top-[15%] right-[73%] text-[#D9C6BA] text-[7.5vw] font-amaticbold" id="page-title">GOLDILEND</h1>
        <h1 className={`absolute top-[3%] xl:top-[36%] ${activeToggle === 'BORROW' ? "right-[57.5%] xl:right-[78%]" : "right-[61%] xl:right-[80%]"} text-[#E7B941] text-[6vw] font-amaticbold`} id="page-title">{activeToggle}</h1>
        <BorrowBox />
        <Footer />
      </div>
    </main> :
    <GoldilendPageMobile />
  )
}