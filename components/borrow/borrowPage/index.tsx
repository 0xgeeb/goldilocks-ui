"use client"

import { useEffect } from "react"
import { useBorrow } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"
import { 
  NavBar,
  WalletBalance,
  Footer
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
    setBorrowPopupToggle
  } = useBorrow()

  const { floorPrice, marketPrice } = useGoldiswapMath()

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
    <main className="w-screen h-screen" onClick={() => handlePopups()}>
      <NavBar />
      <div className="w-[100%] h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <Toggles />
        { borrowPopupToggle && <BorrowPopup /> }
        <h1 className="absolute top-[12.16%] left-[9%] text-[#D9C6BA] text-[8vw] font-amaticbold" id="page-title">BORROW</h1>
        <div className="absolute top-[9.387%] left-[28.125%] w-[43.75%] h-[2.78%] bg-[#634C43] flex flex-row items-center justify-between px-2">
          <span className="text-white font-baloo mt-1">$LOCKS floor price: ${handleTokenInfo(floorPrice(borrowInfo.fsl, borrowInfo.supply))}</span>
          <span className="text-white font-baloo mt-1">$LOCKS market price: ${handleTokenInfo(marketPrice(borrowInfo.fsl, borrowInfo.psl, borrowInfo.supply))}</span>
        </div>
        <WalletBalance />
        <BorrowBox />
        <img className="absolute top-[51.04%] left-[75.5%] h-[2%] w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[6%] h-[8%] top-[53.04%] left-[74%] border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[1.2vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          THIS IS CHART
        </div>
        <BorrowButton />
        <Stats />
        <Footer />
      </div>
    </main>
  )
}