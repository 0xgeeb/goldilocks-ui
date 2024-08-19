"use client"

import { useState, useEffect } from "react"
import { useGoldivault, useDesktop } from "../../../providers"
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

  const { isDesktop } = useDesktop()

  useEffect(() => {
    setPageLoading(false)
  }, [])

  return (
    pageLoading ?
    <Loading /> :
    isDesktop ?
    <main className="w-screen h-screen">
      <NavBar />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldivault.png')] relative">
        <h1 className="absolute bottom-[71%] left-[5%] text-[#FFCD00] text-[8vw] font-amaticbold" id="page-title">Goldivaults</h1>
        <Stats />
        <VaultDisplay />
        <Footer />
        <ChangeChain />
      </div>
    </main> :
    <div>mobile</div>
  )
}