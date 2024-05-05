"use client"

import { useEffect } from "react"
import { useGoldiswap } from "../../../providers/GoldiswapProvider"
import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath"
import { 
  NavBar,
  WalletBalance,
  Footer
} from "../../utils"
import { 
  SwapBox,
  GoldiswapButton,
  SlippagePopup
} from "../../goldiswap"

export const GoldiswapPage = () => {

  const {
    chartOpen, 
    setChartOpen,
    activeToggle,
    changeActiveToggle,
    goldiswapInfo,
    refreshGoldiswapInfo,
    infoLoading,
    setInfoLoading,
    simInfo,
    checkSlippageAmount,
    slippage,
    changeSlippageToggle
  } = useGoldiswap()

  const { floorPrice, marketPrice } = useGoldiswapMath()

  useEffect(() => {
    refreshGoldiswapInfo()
    checkSlippageAmount()
    setInfoLoading(false)
  }, [])

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const formatAsTokenPrice = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 6 })
  }

  const loadingElement = () => {
    return <span className="loader-small ml-3 mt-2"></span>
  }

  const handleInfo = (num: number) => {
    if(infoLoading) {
      return loadingElement()
    }
    else if(num > 0) {
      return formatAsString(num)
    }
    else {
      return "-"
    }
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

  const handleColors = (num1: number, num2: number): string => {
    if(num1 > num2) {
      return 'text-red-600'
    }
    else if(num1 == num2) {
      return ''
    }
    else {
      return 'text-green-600'
    }
  }

  const insideSlippage = (e: any): boolean => {
    const slipLeft = window.innerWidth > 1700 ? 0.35 : 0.30
    const slipRight = window.innerWidth > 1700 ? 0.60 : 0.70

    if(e.clientX > (window.innerWidth * slipLeft) && e.clientX < (window.innerWidth * slipRight) && e.clientY > (window.innerHeight * 0.40) && e.clientY < (window.innerHeight * 0.68)) {
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
    <main className="w-screen h-screen" onClick={(e) => handlePopups(e)}>
      <NavBar />
      <div className="w-[100%] h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <div className="absolute h-[7.5%] w-[20.27%] top-[2.62%] left-[78.89%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <div 
            className={`w-[30.27%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggle === 'buy' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
            onClick={() => changeActiveToggle('buy')}
          >
            BUY
          </div>
          <div 
            className={`w-[30.27%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggle === 'sell' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
            onClick={() => changeActiveToggle('sell')}
          >
            SELL
          </div>
          <div 
            className={`w-[30.27%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggle === 'redeem' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
            onClick={() => changeActiveToggle('redeem')}
          >
            REDEEM
          </div>
        </div>
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
        <div className="absolute flex flex-row items-center justify-between w-[45%] top-[78%] left-[27%] text-white font-baloo text-[1.1vw]">
          <div className="flex flex-row items-center">
            <span className="mr-2">$LOCKS supply:</span>
            <span className={handleColors(goldiswapInfo.supply, simInfo.supply)}>{simInfo.toggle ? handleInfo(simInfo.supply) : handleInfo(goldiswapInfo.supply)}</span>
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-2">current fsl:</span>
            <span className={handleColors(goldiswapInfo.fsl, simInfo.fsl)}>{simInfo.toggle ? handleInfo(simInfo.fsl) : handleInfo(goldiswapInfo.fsl)}</span>
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-2">current psl:</span>
            <span className={handleColors(goldiswapInfo.psl, simInfo.psl)}>{simInfo.toggle ? handleInfo(simInfo.psl) : handleInfo(goldiswapInfo.psl)}</span>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}