"use client"

import { useEffect } from "react"
import { useGoldilend, useDesktop } from "../../../providers"
import {
  Toggles,
  LendBox
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
    refreshGoldilendInfo
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
      <div className="w-[100%] h-[89%] lg:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldilend.png')] relative">
        <Toggles />
        <h1 className="absolute top-[16%] lg:top-[12.16%] right-[81%] lg:right-[78.125%] 2xl:right-[75%] text-[#D9C6BA] text-[8vw] font-amaticbold" id="page-title">GOLDILEND</h1>
        <LendBox />
        <Footer />
      </div>
    </main> :
    <div>where the hell is the mobile page</div>
  )
}