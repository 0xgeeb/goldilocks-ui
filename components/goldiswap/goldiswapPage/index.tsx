"use client"

import { useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { NavBar } from "../../utils/navBar"

export const GoldiswapPage = () => {

  const [walletOpen, setWalletOpen] = useState<boolean>(false)
  const [chartOpen, setChartOpen] = useState<boolean>(false)
  const [activeToggleState, setActiveToggleState] = useState<string>('buy')

  const data = [
    {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 300, pv: 1200, amt: 3000},
    {name: 'Page C', uv: 350, pv: 4800, amt: 5000},
    {name: 'Page B', uv: 450, pv: 1200, amt: 3000},
    {name: 'Page C', uv: 800, pv: 4800, amt: 5000}
  ]

  const changeActiveToggle = (toggle: string) => {
    // setDisplayStringState('')
    // setBottomDisplayStringState('')
    // setHoneyBuyState(0)
    // setBuyingLocksState(0)
    // setSellingLocksState(0)
    // setGettingHoneyState(0)
    // setRedeemingLocksState(0)
    // setRedeemingHoneyState(0)
    setActiveToggleState(toggle)
    // setAllowanceButtonsState(false)
  }

  return (
    <main className="w-screen h-screen">
      <NavBar />
      <div className="w-[100%] h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <div className="absolute h-[7.5%] w-[20.27%] top-[2.62%] left-[78.89%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <div 
            className={`w-[30.27%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggleState === 'buy' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
            onClick={() => changeActiveToggle('buy')}
          >
              BUY
          </div>
          <div 
            className={`w-[30.27%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggleState === 'sell' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
            onClick={() => changeActiveToggle('sell')}
          >
              SELL
          </div>
          <div 
            className={`w-[30.27%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggleState === 'redeem' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
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
        <div className="absolute top-[12.167%] left-[28.125%] w-[43.75%] h-[48.87%] border-2 border-black bg-[#EEDCD2]">
          <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
          <span className="absolute bottom-[23%] left-[-7.5%] -rotate-[90deg] text-[0.8vw] font-baloo font-semibold">**0.3% fee on all buys**</span>
          <span className="absolute top-[23%] right-[-5.8%] -rotate-[90deg] text-[0.8vw] font-baloo font-semibold">target ratio: 33.7%</span>
          <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA]">
            {
              chartOpen ?
              <div className="w-[100%] h-[100%] bg-[#F3AA8A] flex flex-col justify-between pl-[3%] pb-[2.5%] font-baloo text-[1vw]">
                <h1 className="font-amaticbold text-[3vw] ml-[13%]">this is chart</h1>
                <LineChart width={window.innerWidth * .365} height={window.innerHeight * .24} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Line type="natural" dataKey="uv" dot={false} stroke="#000000" />
                  <CartesianGrid stroke="#000000" vertical={false} />
                  <XAxis dataKey="name" stroke="#000000" />
                  <YAxis stroke="#000000" />
                </LineChart>
              </div> :
              <div className="w-[100%] h-[100%] relative flex flex-col">
                <div className="flex flex-row absolute top-0 right-0 w-[33.61%] h-[10%] font-baloo font-semibold border-b-2 border-l-2 border-black">
                  <div className="flex flex-row items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#DCC2A8] hover:bg-[#F3AA8A] cursor-pointer">25%</div>
                  <div className="flex flex-row items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#D5A774] hover:bg-[#F3AA8A] cursor-pointer">50%</div>
                  <div className="flex flex-row items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#D19A5B] hover:bg-[#F3AA8A] cursor-pointer">75%</div>
                  <div className="flex flex-row items-center justify-center h-[100%] w-[25%] bg-[#CC8634] hover:bg-[#F3AA8A] cursor-pointer">MAX</div>
                </div>
                <img className="absolute h-6 w-6 top-[16%] left-[79%]" src="/images/icon-settings.png" alt="settings" />
                <div className="absolute top-[44%] left-[47.27%] bg-[#D9C6BA] z-10 h-10 w-10 border-2 border-black rounded-3xl flex justify-center items-center cursor-pointer hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D111C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                </div>
                <div className="w-[100%] h-[50%] border-b-2 border-black">
                  <div className="absolute flex flex-row top-[21%] left-[3%] items-center">
                    <img className="h-8 w-8" src="/images/logo-honey.png" alt="honeylogo" />
                    <h1 className="font-baloo font-semibold text-[1.4vw] ml-3">HONEY</h1>
                  </div>
                  <div className="absolute h-[22%] w-[55.6%] top-[15%] left-[22%] border-2 border-black bg-white">
                    <div className="relative h-[100%] w-[100%]">
                      <input
                        className="absolute top-[21%] left-[5%] focus:outline-none bg-transparent font-bold font-baloo text-[1.6vw]"
                        type="number"
                        id="number-input"
                      />
                      <span className="absolute bottom-[3%] right-[3%] font-baloo font-bold text-[0.9vw] text-[#7F7F7F]">balance: 69.420</span>
                    </div>
                  </div>
                </div>
                <div className="w-[100%] h-[50%]">
                  <div className="absolute flex flex-row top-[71%] left-[3%] items-center">
                    <img className="h-8 w-8" src="/images/logo-locks.png" alt="lockslogo" />
                    <h1 className="font-baloo font-semibold text-[1.4vw] ml-3">LOCKS</h1>
                  </div>
                  <div className="absolute h-[22%] w-[55.6%] top-[65%] left-[22%] border-2 border-black bg-white">
                    <div className="relative h-[100%] w-[100%]">
                      <input
                        className="absolute top-[20%] left-[5%] focus:outline-none bg-transparent font-bold font-baloo text-[1.6vw]"
                        type="number"
                        id="number-input"
                      />
                      <span className="absolute bottom-[3%] right-[3%] font-baloo font-bold text-[0.9vw] text-[#7F7F7F]">balance: 69.420</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <img className="absolute top-[51.04%] left-[75.5%] h-[2%] w-[3%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute w-[6%] h-[8%] top-[53.04%] left-[74%] border-2 border-black bg-[#F3AA8A] flex items-center justify-center font-amaticbold text-[1.2vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(prev => !prev)}
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