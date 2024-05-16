"use client"

import { useEffect } from "react"
import { useBorrow, useDesktop } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"
import { BorrowPageMobile } from "../../borrowMobile"
import { 
  NavBar,
  WalletBalance,
  Footer,
  Loading
} from "../../utils"
import {
  BorrowBox,
  BorrowButton,
  Toggles,
  Stats,
  BorrowPopup
} from "../../borrow"

export const BorrowPage = () => {

  const {
    chartOpen,
    setChartOpen,
    infoLoading,
    setInfoLoading,
    refreshBorrowInfo,
    borrowInfo,
    borrowPopupToggle,
    setBorrowPopupToggle,
    activeToggle
  } = useBorrow()

  const { floorPrice, marketPrice } = useGoldiswapMath()

  const { isDesktop } = useDesktop()

  useEffect(() => {
    refreshBorrowInfo()
    setInfoLoading(false)
  }, [])

  const formatAsTokenPrice = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 6 })
  }

  const handleTokenInfo = (num: number) => {
    if(infoLoading) {
      return "-"
    }
    else if(num > 0) {
      return formatAsTokenPrice(num)
    }
    else {
      return "-"
    }
  }

  const handlePopups = () => {
    if(borrowPopupToggle) {
      setBorrowPopupToggle(false)
    }
  }
  
  return (
    infoLoading ?
    <Loading /> :
    isDesktop ?
    <main className="w-screen h-screen" onClick={() => handlePopups()}>
      <NavBar />
      <div className="w-[100%] h-[89%] lg:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <Toggles />
        { borrowPopupToggle && <BorrowPopup /> }
        <h1 className="absolute top-[16%] lg:top-[12.16%] right-[81%] lg:right-[78.125%] 2xl:right-[75%] text-[#D9C6BA] text-[8vw] font-amaticbold" id="page-title">{activeToggle}</h1>
        <div className="absolute top-[13.22%] lg:top-[9.387%] left-[20%] lg:left-[25%] 2xl:left-[28.125%] w-[60%] lg:w-[50%] 2xl:w-[43.75%] h-[2.78%] bg-[#634C43] flex flex-row items-center justify-between px-2 text-[1.5vw] lg:text-[0.85vw]">
          <span className="text-white font-baloo mt-1">$LOCKS floor price: ${handleTokenInfo(floorPrice(borrowInfo.fsl, borrowInfo.supply))}</span>
          <span className="text-white font-baloo mt-1">$LOCKS market price: ${handleTokenInfo(marketPrice(borrowInfo.fsl, borrowInfo.psl, borrowInfo.supply))}</span>
        </div>
        <WalletBalance />
        <BorrowBox />
        <img className="absolute top-[49.87%] lg:top-[46.04%] left-[88%] lg:left-[78.625%] 2xl:left-[75.5%] w-[4%] h-[2%] lg:w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[10%] h-[7%] lg:w-[6%] lg:h-[8%] top-[51.87%] lg:top-[48.04%] left-[85%] lg:left-[77.125%] 2xl:left-[74%] border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[2vw] lg:text-[1.2vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          THIS IS CHART
        </div>
        <BorrowButton />
        <Stats />
        <Footer />
      </div>
    </main> :
    <BorrowPageMobile />
  )
}