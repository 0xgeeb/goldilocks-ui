"use client"

import { useEffect } from "react"
import { useGoldiswap } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"
import { 
  NavBar,
  WalletBalance,
  Footer
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
    setRedeemPopupToggle
  } = useGoldiswap()

  const { floorPrice, marketPrice } = useGoldiswapMath()

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

  const insideSlippage = (e: any): boolean => {
    const slipLeft = 0.45
    const slipRight = 0.64

    if(e.clientX > (window.innerWidth * slipLeft) && e.clientX < (window.innerWidth * slipRight) && e.clientY > (window.innerHeight * 0.32) && e.clientY < (window.innerHeight * 0.54)) {
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
    <main className="w-screen h-screen" onClick={(e) => handlePopups(e)}>
      <NavBar />
      <div className="w-[100%] h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <Toggles />
        { redeemPopupToggle && <RedeemPopup /> }
        <h1 className="absolute top-[12.16%] left-[14%] text-[#D9C6BA] text-[8vw] font-amaticbold" id="page-title">SWAP</h1>
        <div className="absolute top-[9.387%] left-[28.125%] w-[43.75%] h-[2.78%] bg-[#4D0B24] flex flex-row items-center justify-between px-2">
          <span className="text-white font-baloo mt-1">$LOCKS floor price: ${handleTokenInfo(floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply))}</span>
          <span className="text-white font-baloo mt-1">$LOCKS market price: ${handleTokenInfo(marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply))}</span>
        </div>
        <WalletBalance />
        { slippage.toggle && <SlippagePopup /> }
        <SwapBox />
        <img className="absolute top-[51.04%] left-[75.5%] h-[2%] w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[6%] h-[8%] top-[53.04%] left-[74%] border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[1.2vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          THIS IS CHART
        </div>
        <GoldiswapButton />
        <Stats />
        <Footer />
      </div>
    </main>
  )
}