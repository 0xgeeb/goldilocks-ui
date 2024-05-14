"use client"

import { useEffect } from "react"
import { useBorrow, useWallet } from "../../../providers"

export const WalletBalanceMobile = () => {
  
  const { balanceMobileToggle, setBalanceMobileToggle } = useBorrow()

  const { refreshBalances, isConnected } = useWallet()

  useEffect(() => {
    refreshBalances()
  }, [isConnected])

  return (
    <div
      className="absolute origin-bottom-left -rotate-[90deg] text-[3vw] w-[31.9%] h-[3.7%] top-[30.9%] right-[-23.4%] border-l-2 border-b-2 border-r-2 border-black bg-[#D5A774] flex items-center justify-center"
      onClick={() => setBalanceMobileToggle(!balanceMobileToggle)}
    >
      <span className="">WALLET BALANCE</span>
    </div>
  )
}