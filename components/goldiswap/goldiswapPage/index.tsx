"use client"

import { useEffect } from "react"
import { NavBar, WalletBalance } from "../../utils"
import { useGoldiswap } from "../../../providers/GoldiswapProvider"
import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath"
import { 
  SwapBox,
  GoldiswapButton
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
    simInfo
  } = useGoldiswap()

  const { floorPrice, marketPrice } = useGoldiswapMath()

  useEffect(() => {
    refreshGoldiswapInfo()
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

  return (
    <main className="w-screen h-screen">
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
        <SwapBox />
        <img className="absolute top-[51.04%] left-[75.5%] h-[2%] w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[6%] h-[8%] top-[53.04%] left-[74%] border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[1.2vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          THIS IS CHART
        </div>
        <GoldiswapButton />
        <div className="absolute flex flex-row items-center justify-between w-[45%] top-[78%] left-[26%] text-white font-baloo text-[1.1vw]">
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
        <img className="absolute h-10 w-10 bottom-[3%] left-[3%]" src="/images/icon-share.png" alt="share" />
        <div className="absolute bottom-[3%] right-[3%] flex flex-row items-center text-[#D9C6BA]">
          <span className="font-amatic text-[1.3vw] mr-6">OOGA BOOGA</span>
          <a className="cursor-pointer hover:scale-110" href="https:x.com/goldilocksmoney">
            <img className="w-8 h-8" src="/images/icon-x.png" alt="x" />
          </a>
          <a className="cursor-pointer hover:scale-110" href="https://discord.gg/3cdn88Mbq8">
            <img className="w-8 h-8" src="/images/icon-discord.png" alt="discord" />
          </a>
          <span className="text-[0.7vw] font-baloo ml-6">© 2024 Goldilocks DAO. All rights reserved.</span>
        </div>
      </div>
    </main>
  )
}