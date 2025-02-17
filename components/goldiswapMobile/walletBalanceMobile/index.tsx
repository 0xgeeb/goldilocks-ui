"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useGoldiswap } from "../../../providers";

export const WalletBalanceMobile = () => {
  const { isConnected } = useAccount();

  const {
    balanceMobileToggle,
    setBalanceMobileToggle,
    refreshGoldiswapWalletInfo,
  } = useGoldiswap();

  useEffect(() => {
    refreshGoldiswapWalletInfo();
  }, [isConnected]);

  return (
    <div
      className="absolute right-[15.5%] top-[12%] flex h-[3.9%] w-[31.9%] origin-top-right -rotate-[90deg] items-center justify-center border-b-2 border-l-2 border-r-2 border-black bg-[#D5A774] text-[3vw]"
      onClick={() => setBalanceMobileToggle(!balanceMobileToggle)}
    >
      <span className="">WALLET BALANCE</span>
    </div>
  );
};
