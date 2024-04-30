"use client"

import { useState } from "react"
import { NavBar } from "../../utils/navBar"
import { SwapBox } from "../../goldiswap"
import { useGoldiswap } from "../../../providers/GoldiswapProvider"

export const GoldiswapPage = () => {

  const [walletOpen, setWalletOpen] = useState<boolean>(false)

  const { 
    chartOpen, 
    setChartOpen,
    activeToggle,
    changeActiveToggle 
  } = useGoldiswap()

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
          <span className="text-white font-baloo mt-1">$LOCKS floor price: $0.02</span>
          <span className="text-white font-baloo mt-1">$LOCKS market price: $0.28</span>
        </div>
        <div 
          className={`absolute h-[24%] w-[2%] top-[16.167%] left-[71.875%] hover:scale-105 ${walletOpen ? "translate-x-[1100%]" : ""} bg-[#D5A774] border-r-2 border-t-2 border-b-2 border-black cursor-pointer transition-transform ease-linear`}
          onClick={() => setWalletOpen(prev => !prev)}
        >
          <div className={`flex flex-row items-center absolute bottom-[41%] ${walletOpen ? "right-[-126%]" : "right-[-123%]"} font-baloo font-semibold text-[0.8vw] -rotate-[90deg] text-nowrap`}>
            <span>WALLET</span>
            <span className="ml-2">BALANCE</span>
          </div>
        </div>
        <div className={`absolute w-[22%] h-[32%] top-[12.167%] left-[49.875%] ${walletOpen ? "translate-x-[100%] border-r-2" : ""} font-baloo font-semibold text-[1vw] border-t-2 border-b-2 border-black bg-[#D5A774] bg-opacity-30 flex flex-col justify-between py-[1.5%] px-[3%] text-white transition-transform ease-linear`}>
          <div className="flex flex-row items-center justify-between w-[100%]">
            <span className="">locks balance:</span>
            <span className="">69.66</span>
          </div>
          <div className="flex flex-row items-center justify-between w-[100%]">
            <span className="">honey balance:</span>
            <span className="">69.66</span>
          </div>
          <div className="flex flex-row items-center justify-between w-[100%]">
            <span className="">porridge balance:</span>
            <span className="">69.66</span>
          </div>
          <div className="flex flex-row items-center justify-between w-[100%]">
            <span className="">staked locks:</span>
            <span className="">69.66</span>
          </div>
          <div className="flex flex-row items-center justify-between w-[100%]">
            <span className="">locked locks:</span>
            <span className="">69.66</span>
          </div>
          <div className="flex flex-row items-center justify-between w-[100%]">
            <span className="">borrowed honey:</span>
            <span className="">69.66</span>
          </div>
          <div className="flex flex-row items-center justify-between w-[100%]">
            <span className="">claimable porridge:</span>
            <span className="">69.66</span>
          </div>
        </div>
        <SwapBox />
        <img className="absolute top-[51.04%] left-[75.5%] h-[2%] w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[6%] h-[8%] top-[53.04%] left-[74%] border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[1.2vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          THIS IS CHART
        </div>
        <button className="absolute h-[8%] w-[16.6%] top-[64.8%] left-[41.7%] bg-[#E7B941] font-amaticbold text-[1.9vw] border-2 border-black">
          BUY
        </button>
        <div className="absolute flex flex-row items-center justify-between w-[45%] top-[78%] left-[26%] text-white font-baloo text-[1.1vw]">
          <span>$LOCKS supply: 100,000,000.64</span>
          <span>current fsl: 2,140,262.24</span>
          <span>current psl: 1,044,753.49</span>
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