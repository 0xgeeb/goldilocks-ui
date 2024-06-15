"use client"

import { useEffect } from "react"
import { useGoldiswap, useDesktop } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"
import { GoldiswapPageMobile } from "../../goldiswapMobile"
import { 
  NavBar,
  WalletBalance,
  Footer,
  Loading
} from "../../utils"
import { 
  SwapBox,
  GoldiswapButton,
  SlippagePopup,
  RedeemPopup,
  Toggles,
  Stats
} from "../../goldiswap"

export const GoldiswapPage = () => {

  const {
    chartOpen, 
    setChartOpen,
    goldiswapInfo,
    refreshGoldiswapInfo,
    infoLoading,
    setInfoLoading,
    checkSlippageAmount,
    slippage,
    changeSlippageToggle,
    redeemPopupToggle,
    setRedeemPopupToggle,
    activeToggle
  } = useGoldiswap()

  const { floorPrice, marketPrice } = useGoldiswapMath()

  const { isDesktop } = useDesktop()

  useEffect(() => {
    refreshGoldiswapInfo()
    checkSlippageAmount()
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

  const formatDate = (timestamp: number): string => {
    const ONE_MINUTE = 60
    const ONE_HOUR = 60 * ONE_MINUTE
    const ONE_DAY = 24 * ONE_HOUR
    const ONE_WEEK = 7 * ONE_DAY
    const now = Date.now()
    const secondsAgo = (now - timestamp) / 1000
    if (secondsAgo < ONE_MINUTE) {
      return 'just now';
    } else if (secondsAgo < ONE_HOUR) {
      const minutesAgo = Math.floor(secondsAgo / ONE_MINUTE)
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`
    } else if (secondsAgo < ONE_DAY) {
      const hoursAgo = Math.floor(secondsAgo / ONE_HOUR)
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`
    } else if (secondsAgo < ONE_WEEK) {
      const daysAgo = Math.floor(secondsAgo / ONE_DAY)
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
    } else {
      const weeksAgo = Math.floor(secondsAgo / ONE_WEEK)
      return `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`
    }
  }

  const insideSlippage = (e: any): boolean => {
    let slipLeft = 0.45
    let slipRight = 0.64
    let slipUp = 0.32
    let slipDown = 0.54

    if(window.innerWidth > 1024) {
      slipLeft = 0.45
      slipRight = 0.64
      slipUp = 0.32
      slipDown = 0.54
    }
    else {
      slipLeft = 0.33
      slipRight = 0.70
      slipUp = 0.33
      slipDown = 0.53
    }

    if(e.clientX > (window.innerWidth * slipLeft) && e.clientX < (window.innerWidth * slipRight) && e.clientY > (window.innerHeight * slipUp) && e.clientY < (window.innerHeight * slipDown)) {
      return true
    }
    else {
      return false
    }
  }

  const handlePopups = (e: any) => {
    if(slippage.toggle && !insideSlippage(e)) {
      changeSlippageToggle(false)
    }
    if(redeemPopupToggle) {
      setRedeemPopupToggle(false)
    }
  }

  return (
    infoLoading ?
    <Loading /> :
    isDesktop ?
    <main className="w-screen h-screen" onClick={(e) => handlePopups(e)}>
      <NavBar />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <Toggles />
        { redeemPopupToggle && <RedeemPopup /> }
        <h1 className="absolute top-[16%] lg:top-[12.16%] right-[81%] lg:right-[78.125%] 2xl:right-[75%] text-[#D9C6BA] text-[8vw] font-amaticbold" id="page-title">{activeToggle === 'REDEEM' ? "REDEEM" : "SWAP"}</h1>
        <div className="absolute top-[13.22%] lg:top-[9.387%] left-[20%] lg:left-[25%] 2xl:left-[28.125%] w-[60%] lg:w-[50%] 2xl:w-[43.75%] h-[2.78%] bg-[#4D0B24] flex flex-row items-center justify-between px-2 text-[1.5vw] lg:text-[0.85vw]">
          <span className="text-white font-baloo mt-1">FSL/PSL ratio: {handleTokenInfo((goldiswapInfo.fsl / goldiswapInfo.psl))}%</span>
          <span className="text-white font-baloo mt-1">last floor raise: {formatDate(goldiswapInfo.lastFloorRaise * Math.pow(10, 21))}</span>
        </div>
        <WalletBalance />
        { slippage.toggle && <SlippagePopup /> }
        <SwapBox />
        <img className="absolute top-[55.87%] lg:top-[51.04%] left-[88%] lg:left-[78.625%] 2xl:left-[75.5%] w-[4%] h-[2%] lg:w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[10%] h-[7%] lg:w-[6%] lg:h-[8%] top-[57.87%] lg:top-[53.04%] left-[85%] lg:left-[77.125%] 2xl:left-[74%] border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[2vw] lg:text-[1.2vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          THIS IS CHART
        </div>
        <GoldiswapButton />
        <Stats />
        <Footer />
      </div>
    </main> :
    <GoldiswapPageMobile />
  )
}