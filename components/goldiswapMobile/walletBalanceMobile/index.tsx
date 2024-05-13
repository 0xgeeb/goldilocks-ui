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
    <div className="absolute -rotate-[90deg] text-[3vw] w-[31.9%] h-[3.7%] top-[18%] right-[-3.8%] border-l-2 border-b-2 border-r-2 border-black bg-[#D5A774] flex items-center justify-center">
      <span className="">WALLET BALANCE</span>
    </div>
  )
}