"use client"

import { useEffect } from "react"
import { useStake, useDesktop } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"
import { StakePageMobile } from "../../stakeMobile"
import { 
  NavBar,
  WalletBalance,
  Footer,
  Loading
} from "../../utils"
import {
  Toggles,
  StakeBox,
  StirPopup,
  Stats,
  StakeButton
} from "../../stake"

export const StakePage = () => {

  const {
    stakeInfo,
    infoLoading,
    setInfoLoading,
    refreshStakeInfo,
    chartOpen,
    setChartOpen,
    stirPopupToggle,
    setStirPopupToggle,
    activeToggle
  } = useStake()

  const { floorPrice, marketPrice } = useGoldiswapMath()

  const { isDesktop } = useDesktop()

  useEffect(() => {
    refreshStakeInfo()
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
    if(stirPopupToggle) {
      setStirPopupToggle(false)
    }
  }

  return (
    infoLoading ?
    <Loading /> :
    isDesktop ?
    <main className="w-screen h-screen" onClick={() => handlePopups()}>
      <NavBar />
      <div className="w-[100%] h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <Toggles />
        { stirPopupToggle && <StirPopup /> }
        <h1 className="absolute top-[12.16%] right-[75%] text-[#D9C6BA] text-[8vw] font-amaticbold" id="page-title">{activeToggle}</h1>
        <div className="absolute top-[9.387%] left-[28.125%] w-[43.75%] h-[2.78%] bg-[#B35227] flex flex-row items-center justify-between px-2">
          <span className="text-white font-baloo mt-1">$LOCKS floor price: ${handleTokenInfo(floorPrice(stakeInfo.fsl, stakeInfo.supply))}</span>
          <span className="text-white font-baloo mt-1">$LOCKS market price: ${handleTokenInfo(marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply))}</span>
        </div>
        <WalletBalance />
        <StakeBox />
        <img className="absolute top-[46.04%] left-[75.5%] h-[2%] w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[6%] h-[8%] top-[48.04%] left-[74%] border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[1.2vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          THIS IS CHART
        </div>
        <StakeButton />
        <Stats />
        <Footer />
      </div>
    </main> :
    <StakePageMobile />
  )
}