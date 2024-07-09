"use client"

import { useState, useEffect } from "react"
import { useGoldilend, useWallet } from "../../../providers"

export const LendWalletBalance = () => {

  const [walletOpen, setWalletOpen] = useState<boolean>(false)

  const { lendActiveToggle } = useGoldilend()
  const { balance, refreshBalances, isConnected } = useWallet()

  useEffect(() => {
    refreshBalances()
  }, [isConnected])

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const formatAsClaimable = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 })
  }

  const handleInfo = (num: number): string => {
    if(num > 0) {
      return formatAsString(num)
    }
    else {
      return "-"
    }
  }

  const handleInfoClaimable = (num: number): string => {
    if(num > 0) {
      return formatAsClaimable(num)
    }
    else {
      return "-"
    }
  }

  return (
    <>
      {/* <div
        className={`absolute ${lendActiveToggle === 'CLAIM' ? "left-[74%] xl:left-[67%]" : "left-[74%] xl:left-[76%]"} h-[20%] w-[2%] top-[20%] hover:scale-105 ${walletOpen ? "translate-x-[1100%] xl:translate-x-[800%]" : ""} bg-[#D5A774] border-r-2 border-t-2 border-b-2 border-black cursor-pointer transition-transform ease-linear`}
        onClick={() => setWalletOpen(prev => !prev)}
      >
        <div className="flex flex-row items-center absolute bottom-[88%] right-[-10%] xl:right-[20%] font-baloo font-semibold text-[1.6vw] xl:text-[0.8vw] origin-bottom-right -rotate-[90deg] text-nowrap">
          <span>WALLET BALANCE</span>
        </div>
      </div> */}
      <div
        className={`absolute h-[4%] w-[14%] xl:w-[10%] top-[55%] xl:top-[14%] left-[78%] lg:left-[77%] xl:left-[67%] origin-top-left xl:origin-bottom-left rotate-[90deg] hover:scale-105 ${walletOpen && window.innerWidth >= 1280 ? "translate-x-[160%]" : ""} bg-[#D5A774] flex justify-center items-center font-baloo font-semibold text-[1.5vw] md:text-[1.25vw] lg:text-[1.1vw] xl:text-[1vw] 2xl:text-[0.8vw] border-r-2 border-l-2 border-b-2 xl:border-b-0 xl:border-t-2 border-black cursor-pointer transition-transform ease-linear`}
        onClick={() => setWalletOpen(prev => !prev)}
      >
        <span className="scale-[-1]">WALLET BALANCE</span>
      </div>
      <div className={`absolute ${lendActiveToggle === 'CLAIM' ? "left-[52%] xl:left-[51%]" : "left-[52%] xl:left-[60%]"} w-[22%] xl:w-[16%] h-[32%] top-[14%]  ${walletOpen ? "translate-x-[100%] xl:translate-x-[100%] border-r-2" : ""} font-baloo font-semibold text-[1.5vw] xl:text-[1vw] border-t-2 border-b-2 border-black bg-[#D5A774] bg-opacity-30 flex flex-col items-center justify-center py-[1.5%] px-[0.5%] xl:px-[3%] text-white transition-transform ease-linear`}>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">ibgt balance:</span>
          <span className="">{handleInfo(balance.ibgt)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">gibgt balance:</span>
          <span className="">{handleInfo(balance.gibgt)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">staked gibgt:</span>
          <span className="">{handleInfo(balance.lendStaked)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">claimable:</span>
          <span className="">{handleInfoClaimable(balance.lendClaimable)}</span>
        </div>
      </div>
    </>
  )
}