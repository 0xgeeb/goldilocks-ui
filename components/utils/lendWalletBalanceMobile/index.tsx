"use client"

import { useEffect } from "react"
import { useGoldilend, useWallet } from "../../../providers"

export const LendWalletBalanceMobile = () => {

  const { balanceMobileToggle, setBalanceMobileToggle } = useGoldilend()

  const { refreshBalances, isConnected } = useWallet()

  useEffect(() => {
    refreshBalances()
  }, [isConnected])

  return (
    <div
      className="absolute origin-bottom-right rotate-[90deg] text-[3vw] w-[31.9%] h-[3.7%] top-[43%] right-[15.5%] border-l-2 border-t-2 border-r-2 border-black bg-[#D5A774] flex items-center justify-center"
      onClick={() => setBalanceMobileToggle(!balanceMobileToggle)}
    >
      <span className="scale-[-1]">WALLET BALANCE</span>
    </div>
  )
}