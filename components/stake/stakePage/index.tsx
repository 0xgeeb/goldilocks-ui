"use client"

import { useEffect } from "react"
import { useStake, useDesktop } from "../../../providers"
import { StakePageMobile } from "../../stakeMobile"
import { 
  NavBar,
  Footer,
  WalletBalance,
  Loading
} from "../../utils"
import {
  Toggles,
  StakeBox,
  StirPopup,
  Stats,
  StakeButton,
  UnstakePopup,
  ClaimTab
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
    activeToggle,
    unstakePopupToggle,
    setUnstakePopupToggle
  } = useStake()

  const { isDesktop } = useDesktop()

  useEffect(() => {
    refreshStakeInfo()
    setInfoLoading(false)
  }, [])

  const formatAsTokenPrice = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
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
    if(unstakePopupToggle) {
      setUnstakePopupToggle(false)
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

  return (
    infoLoading ?
    <Loading /> :
    isDesktop ?
    <main className="w-screen h-screen" onClick={() => handlePopups()}>
      <NavBar />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <Toggles />
        { stirPopupToggle && <StirPopup /> }
        { unstakePopupToggle && <UnstakePopup /> }
        <h1 className={`absolute top-[-0.5%] lg:top-[16%] 2xl:top-[12.16%] left-[5%] ${activeToggle === 'UNSTAKE' ? "xl:left-[5%]" : "xl:left-[7.5%]"} text-[#D9C6BA] text-[10vw] lg:text-[8vw] tall:text-[12vw] tall:md:text-[10vw] tall:lg:text-[8vw] font-amaticbold`} id="page-title">{activeToggle}</h1>
        {
          activeToggle === 'CLAIM' ?
          <ClaimTab /> :
          <>
            <div className="absolute top-[15%] md:top-[14%] lg:top-[12%] xl:top-[11%] left-[10%] md:left-[20%] lg:left-[25%] 2xl:left-[28.125%] w-[80%] md:w-[60%] lg:w-[50%] 2xl:w-[43.75%] h-[3%] bg-[#B35227] flex flex-row items-center justify-between px-2 text-[2.25vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw] 2xl:text-[0.85vw]">
              <span className="text-white font-baloo mt-1">PSL/FSL ratio: {handleTokenInfo((stakeInfo.psl / stakeInfo.fsl) * 100)}%</span>
              <span className="text-white font-baloo mt-1">last floor raise: {formatDate(stakeInfo.lastFloorRaise * Math.pow(10, 21))}</span>
            </div>
            <WalletBalance />
            <StakeBox />
            <img className="absolute top-[68%] md:top-[51%] lg:top-[49%] xl:top-[48%] left-[91%] lg:left-[82%] 2xl:left-[80%] w-[4%] h-[2%] lg:w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
            <div 
              className="absolute w-[12%] md:w-[10%] h-[7%] lg:w-[6%] lg:h-[8%] top-[70%] md:top-[53%] lg:top-[51%] xl:top-[50%] left-[87%] lg:left-[80%] 2xl:left-[78%] px-1 text-center border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[2.5vw] md:text-[2.25vw] lg:text-[1.5vw] xl:text-[1.2vw] tall:text-[3vw] tall:md:text-[2.25vw] tall:lg:text-[1.5vw] tall:xl:text-[1.2vw] hover:scale-110 cursor-pointer"
              onClick={() => setChartOpen(!chartOpen)}
            >
              THIS IS CHART
            </div>
            <StakeButton />
          </>
        }
        <Stats />
        <Footer />
      </div>
    </main> :
    <StakePageMobile />
  )
}