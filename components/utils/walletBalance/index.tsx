"use client"

import { useState, useEffect } from "react"
import { useWallet } from "../../../providers"

export const WalletBalance = ()=> {

  const [walletOpen, setWalletOpen] = useState<boolean>(false)

  const { balance, refreshBalances } = useWallet()

  useEffect(() => {
    refreshBalances()
  }, [])

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const handleInfo = (num: number): string => {
    if(num > 0) {
      return formatAsString(num)
    }
    else {
      return "-"
    }
  }

  return (
    <>
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
          <span className="">{handleInfo(balance.locks)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">honey balance:</span>
          <span className="">{handleInfo(balance.honey)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">porridge balance:</span>
          <span className="">{handleInfo(balance.prg)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">staked locks:</span>
          <span className="">{handleInfo(balance.staked)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">locked locks:</span>
          <span className="">{handleInfo(balance.locked)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">borrowed honey:</span>
          <span className="">{handleInfo(balance.borrowed)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">claimable porridge:</span>
          <span className="">{handleInfo(balance.claimable)}</span>
        </div>
      </div>
    </>
  )
}