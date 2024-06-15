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
      <div
        className={`absolute ${lendActiveToggle === 'CLAIM' ? "left-[74%] xl:left-[67%]" : "left-[74%] xl:left-[76%]"} h-[20%] w-[2%] top-[20%] hover:scale-105 ${walletOpen ? "translate-x-[1100%] xl:translate-x-[800%]" : ""} bg-[#D5A774] border-r-2 border-t-2 border-b-2 border-black cursor-pointer transition-transform ease-linear`}
        onClick={() => setWalletOpen(prev => !prev)}
      >
        <div className="flex flex-row items-center absolute bottom-[88%] right-[-10%] xl:right-[20%] font-baloo font-semibold text-[1.6vw] xl:text-[0.8vw] origin-bottom-right -rotate-[90deg] text-nowrap">
          <span>WALLET</span>
          <span className="ml-2">BALANCE</span>
        </div>
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