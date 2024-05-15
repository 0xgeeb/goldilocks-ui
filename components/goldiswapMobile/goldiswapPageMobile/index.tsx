"use client"

import { useGoldiswap, useDesktop } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"
import {
  StatsMobile,
  GoldiswapButtonMobile,
  SwapBoxMobile,
  TogglesMobile,
  WalletBalanceMobile,
  SlippagePopupMobile
} from "../../goldiswapMobile"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

export const GoldiswapPageMobile = () => {

  const {
    chartOpen,
    setChartOpen,
    activeToggle,
    infoLoading,
    goldiswapInfo,
    changeSlippageToggle,
    slippage
  } = useGoldiswap()

  const { navButtonsOpen } = useDesktop()

  const { floorPrice, marketPrice } = useGoldiswapMath()

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

  const insideSlippage = (e: any): boolean => {
    const slipLeft = 0.33
    const slipRight = 0.93
    const slipUp = 0.32
    const slipDown = 0.54

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
  }

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
        <TogglesMobile />
        <h1 className="absolute top-[-0.25%] right-[69%] text-[#D9C6BA] text-[7vw] font-amaticbold" id="page-title">{activeToggle === 'REDEEM' ? "REDEEM" : "SWAP"}</h1>
        <div className="absolute bottom-[40.4%] left-[15.5%] w-[48.95vh] h-[2.3%] bg-[#4D0B24] origin-bottom-left -rotate-[90deg] text-[2.4vw] font-baloo text-white font-semibold flex flex-row items-center justify-between px-2">
          <div className="h-[100%] w-[43%] flex flex-row items-center justify-between">
            <span>$LOCKS floor price:</span>
            <span>${handleTokenInfo(floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply))}</span>
          </div>
          <div className="h-[100%] w-[43%] flex flex-row items-center justify-between">
            <span>$LOCKS market price:</span>
            <span>${handleTokenInfo(marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply))}</span>
          </div>
        </div>
        <WalletBalanceMobile />
        <img
          className="absolute h-5 w-5 top-[6%] right-[9%]"
          src="/images/icon-settings-mobile.png"
          alt="settings"
          onClick={() => changeSlippageToggle(true)}
        />
        { slippage.toggle && <SlippagePopupMobile /> }
        <SwapBoxMobile />
        <img className="absolute bottom-[26%] right-[11.8%] origin-bottom-right -rotate-[90deg] h-[1.27%] w-[8.36%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute h-[6.21%] w-[23.6%] bottom-[30%] right-[0%] origin-bottom-right -rotate-[90deg] border-t-2 border-l-2 border-r-2 border-black bg-[#F3AA8A] font-amaticbold text-[5vw] focus:scale-110 cursor-pointer flex items-center justify-center"
          onClick={() => setChartOpen(!chartOpen)}
        >
          <span className="">THIS IS CHART</span>
        </div>
        <GoldiswapButtonMobile />
        <StatsMobile />
        <FooterMobile />
      </div>
    </main>
  )
}