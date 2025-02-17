"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useGoldilend } from "../../../providers";

export const LendWalletBalanceMobile = () => {
  const { isConnected } = useAccount();

  const {
    balanceMobileToggle,
    setBalanceMobileToggle,
    refreshGoldilendWalletInfo,
  } = useGoldilend();

  useEffect(() => {
    refreshGoldilendWalletInfo();
  }, [isConnected]);

  return (
    <div
      className="absolute right-[15.5%] top-[43%] flex h-[3.7%] w-[31.9%] origin-bottom-right rotate-[90deg] items-center justify-center border-l-2 border-r-2 border-t-2 border-black bg-[#D5A774] text-[3vw]"
      onClick={() => setBalanceMobileToggle(!balanceMobileToggle)}
    >
      <span className="scale-[-1]">WALLET BALANCE</span>
    </div>
  );
};
