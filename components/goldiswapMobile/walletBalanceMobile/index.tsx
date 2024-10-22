"use client"

import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useGoldiswap } from "../../../providers"

export const WalletBalanceMobile = () => {

  const { isConnected } = useAccount()
  
  const {
    balanceMobileToggle,
    setBalanceMobileToggle,
    refreshGoldiswapWalletInfo
  } = useGoldiswap()

  useEffect(() => {
    refreshGoldiswapWalletInfo()
  }, [isConnected])

  return (
    <div
      className="absolute origin-top-right -rotate-[90deg] text-[3vw] w-[31.9%] h-[3.9%] top-[12%] right-[15.5%] border-l-2 border-b-2 border-r-2 border-black bg-[#D5A774] flex items-center justify-center"
      onClick={() => setBalanceMobileToggle(!balanceMobileToggle)}
    >
      <span className="">WALLET BALANCE</span>
    </div>
  )
}