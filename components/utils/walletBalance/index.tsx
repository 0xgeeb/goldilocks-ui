"use client"

import { useState, useEffect } from "react"
import { useWallet } from "../../../providers"

export const WalletBalance = ()=> {

  const [walletOpen, setWalletOpen] = useState<boolean>(false)

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
        className={`absolute h-[18%] lg:h-[24%] w-[2%] top-[22%] lg:top-[16.167%] left-[80%] lg:left-[75%] 2xl:left-[71.875%] hover:scale-105 ${walletOpen ? window.innerWidth > 1024 ? "translate-x-[1100%]" : "translate-x-[850%]" : ""} bg-[#D5A774] border-r-2 border-t-2 border-b-2 border-black cursor-pointer transition-transform ease-linear`}
        onClick={() => setWalletOpen(prev => !prev)}
      >
        <div className="flex flex-row items-center absolute bottom-[75%] md:bottom-[81%] lg:bottom-[78%] xl:bottom-[86%] 2xl:bottom-[84%] right-[-7.5%] lg:right-[5%] xl:right-[2.5%] 2xl:right-[20%] font-baloo font-semibold text-[1.2vw] lg:text-[1.3vw] 2xl:text-[0.8vw] origin-bottom-right -rotate-[90deg] text-nowrap">
          <span>WALLET</span>
          <span className="ml-2">BALANCE</span>
        </div>
      </div>
      <div className={`absolute w-[17%] lg:w-[22%] h-[32%] top-[18%] md:top-[16%] lg:top-[15%] xl:top-[12%] left-[63%] lg:left-[53%] 2xl:left-[49.875%] ${walletOpen ? "translate-x-[100%] border-r-2" : ""} font-baloo font-semibold text-[1.2vw] lg:text-[1vw] border-t-2 border-b-2 border-black bg-[#D5A774] bg-opacity-30 flex flex-col justify-between py-[1.5%] px-[0.5%] lg:px-[3%] text-white transition-transform ease-linear`}>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">{window.innerWidth > 1024 ? "locks balance:" : "locks"}</span>
          <span className="">{handleInfo(balance.locks)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">{window.innerWidth > 1024 ? "honey balance:" : "honey"}</span>
          <span className="">{handleInfo(balance.honey)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">{window.innerWidth > 1024 ? "porridge balance:" : "porridge"}</span>
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
          <span className="">claimable {window.innerWidth > 1024 ? "porridge:" : "prg:"}</span>
          <span className="">{handleInfoClaimable(balance.claimable)}</span>
        </div>
      </div>
    </>
  )
}