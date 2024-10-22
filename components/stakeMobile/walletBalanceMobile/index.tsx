"use client"

import { useStake } from "../../../providers"

export const WalletBalanceMobile = () => {

  const { balanceMobileToggle, setBalanceMobileToggle } = useStake()

  return (
    <div
      className="absolute origin-bottom-right rotate-[90deg] text-[3vw] w-[31.9%] h-[3.7%] bottom-[65.4%] right-[15.5%] border-l-2 border-t-2 border-r-2 border-black bg-[#D5A774] flex items-center justify-center"
      onClick={() => setBalanceMobileToggle(!balanceMobileToggle)}
    >
      <span className="scale-[-1]">WALLET BALANCE</span>
    </div>
  )
}