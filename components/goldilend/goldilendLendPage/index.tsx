"use client"

import { useEffect } from "react"
import { useGoldilend, useDesktop } from "../../../providers"
import {

} from "../"
import {
  NavBar,
  Footer,
  Loading
} from "../../utils"

export const GoldilendLendPage = () => {

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
      <div className="w-[100%] h-[89%] lg:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldilend.png')] relative">
        <h1 className="absolute top-[15%] right-[73%] text-[#D9C6BA] text-[7.5vw] font-amaticbold" id="page-title">GOLDILEND</h1>
        <Footer />
      </div>
    </main> :
    <div>mobile please ???????</div>
  )
}