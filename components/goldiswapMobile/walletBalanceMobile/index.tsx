"use client"

import { useEffect } from "react"
import { useGoldiswap, useWallet } from "../../../providers"

export const WalletBalanceMobile = () => {

  const { balanceMobileToggle, setBalanceMobileToggle } = useGoldiswap()

  const { refreshBalances, isConnected } = useWallet()

  useEffect(() => {
    refreshBalances()
  }, [isConnected])

  return (
    <div
      className="absolute -rotate-[90deg] text-[3vw] w-[31.9%] h-[3.7%] top-[18%] right-[-3.8%] border-l-2 border-b-2 border-r-2 border-black bg-[#D5A774] flex items-center justify-center"
      onClick={() => setBalanceMobileToggle(!balanceMobileToggle)}
    >
      <span className="">WALLET BALANCE</span>
    </div>
  )
}