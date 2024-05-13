"use client"

import { useState, useEffect } from "react"
import { useWallet } from "../../../providers"

export const WalletBalanceMobile = () => {

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
    <div className="absolute w-[7.4%] h-[16.2%] top-[12%] left-[84.5%] border-t-2 border-b-2 border-r-2 border-black bg-[#D5A774]">
      <span className="absolute -rotate-[90deg] text-nowrap text-[3vw] bottom-[41.5%] left-[-130%]">WALLET BALANCE</span>
    </div>
  )
}