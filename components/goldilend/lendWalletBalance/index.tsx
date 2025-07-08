"use client";

import { useState } from "react";

import { formatAsString } from "@/app/_components/utils";

import { useGoldilend } from "../../../providers";

// todo: copy the stake page for this and lend box small screen size
export const LendWalletBalance = () => {
  const [walletOpen, setWalletOpen] = useState<boolean>(false);

  const { goldilendWalletInfo } = useGoldilend();

  const formatAsClaimable = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const handleInfo = (num: number): string => {
    if (num > 0) {
      return formatAsString(num);
    } else {
      return "-";
    }
  };

  const handleInfoClaimable = (num: number): string => {
    if (num > 0) {
      return formatAsClaimable(num);
    } else {
      return "-";
    }
  };

  return (
    <>
      <div
        className={`absolute left-[20%] top-[35%] h-[4%] w-[14%] origin-top-left rotate-90 hover:scale-105 xl:left-[76%] xl:top-[14%] xl:w-[10%] xl:origin-bottom-left ${walletOpen && window.innerWidth >= 1280 ? "translate-x-[160%]" : ""} flex cursor-pointer items-center justify-center border-x-2 border-b-2 border-black bg-[#D5A774] font-baloo text-[1.5vw] font-semibold transition-transform ease-linear md:text-[1.25vw] lg:text-[1.1vw] xl:border-b-0 xl:border-t-2 xl:text-[1vw] 2xl:text-[0.8vw]`}
        onClick={() => setWalletOpen((prev) => !prev)}
      >
        <span className="-scale-100">WALLET BALANCE</span>
      </div>
      <div
        className={`absolute left-[61%] top-[14%] h-[32%] w-[19%] xl:left-[60%] xl:w-[16%] ${walletOpen ? "translate-x-full border-r-2" : ""} flex flex-col items-center justify-center border-y-2 border-black bg-[#D5A774]/30 px-[0.5%] py-[1.5%] font-baloo text-[1.5vw] font-semibold text-white transition-transform ease-linear xl:text-[1vw]`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <span className="">wbera balance:</span>
          <span className="">{handleInfo(goldilendWalletInfo.wbera)}</span>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <span className="">glwbera balance:</span>
          <span className="">{handleInfo(goldilendWalletInfo.glwbera)}</span>
        </div>
        {/* <div className="flex w-full flex-row items-center justify-between">
          <span className="">staked gibgt:</span>
          <span className="">{handleInfo(goldilendWalletInfo.lendStaked)}</span>
        </div> */}
      </div>
    </>
  );
};
