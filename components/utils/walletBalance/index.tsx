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

  useEffect(() => {
    removeWalletOpen()
    window.addEventListener("resize", removeWalletOpen)
    return () => window.removeEventListener("resize", removeWalletOpen)
  }, [])
  
  function removeWalletOpen() {
    setWalletOpen(false)
  }

  return (
    <>
      <div
        className={`absolute h-[4%] w-[14%] md:w-[13%] lg:w-[10.5%] xl:w-[10%] top-[35%] xl:top-[14%] left-[25%] md:left-[20%] lg:left-[25%] xl:left-[75%] 2xl:left-[71.875%] origin-top-left xl:origin-bottom-left rotate-[90deg] hover:scale-105 ${walletOpen && window.innerWidth > 1280 ? "translate-x-[220%]" : ""} bg-[#D5A774] flex justify-center items-center font-baloo font-semibold text-[1.5vw] lg:text-[1.1vw] xl:text-[1vw] 2xl:text-[0.8vw] border-r-2 border-l-2 border-b-2 xl:border-b-0 xl:border-t-2 border-black cursor-pointer transition-transform ease-linear`}
        onClick={() => setWalletOpen(prev => !prev)}
      >
        <span className="scale-[-1]">WALLET BALANCE</span>
      </div>
      <div className={`absolute w-[19%] lg:w-[22%] h-[32%] top-[18%] md:top-[17%] lg:top-[15%] xl:top-[14%] left-[61%] lg:left-[53%] 2xl:left-[49.875%] ${walletOpen ? "translate-x-[100%] border-r-2" : ""} font-baloo font-semibold text-[1.5vw] lg:text-[1.25vw] xl:text-[1vw] border-t-2 border-b-2 border-black bg-[#D5A774] bg-opacity-30 flex flex-col justify-between py-[1.5%] px-[0.5%] xl:px-[3%] text-white transition-transform ease-linear`}>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">{window.innerWidth > 1024 ? "locks balance:" : "locks:"}</span>
          <span className="">{handleInfo(balance.locks)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">{window.innerWidth > 1024 ? "honey balance:" : "honey:"}</span>
          <span className="">{handleInfo(balance.honey)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">{window.innerWidth > 1024 ? "porridge balance:" : "porridge:"}</span>
          <span className="">{handleInfo(balance.prg)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">{window.innerWidth > 1024 ? "staked locks:" : "staked:"}</span>
          <span className="">{handleInfo(balance.staked)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">{window.innerWidth > 1024 ? "locked locks:" : "locked:"}</span>
          <span className="">{handleInfo(balance.locked)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">{window.innerWidth > 1024 ? "borrowed honey:" : "borrowed:"}</span>
          <span className="">{handleInfo(balance.borrowed)}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">{window.innerWidth > 1024 ? "claimable porridge:" : "claimable:"}</span>
          <span className="">{handleInfoClaimable(balance.claimable)}</span>
        </div>
      </div>
    </>
  )
}