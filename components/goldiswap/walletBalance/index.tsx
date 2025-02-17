"use client";

import { useState, useEffect } from "react";
import { useGoldiswap } from "../../../providers";
import { useAccount } from "wagmi";

export const WalletBalance = () => {
  const [walletOpen, setWalletOpen] = useState<boolean>(false);

  const { isConnected } = useAccount();
  const { goldiswapWalletInfo, refreshGoldiswapWalletInfo } = useGoldiswap();

  useEffect(() => {
    refreshGoldiswapWalletInfo();
  }, [isConnected]);

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

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

  useEffect(() => {
    removeWalletOpen();
    window.addEventListener("resize", removeWalletOpen);
    return () => window.removeEventListener("resize", removeWalletOpen);
  }, []);

  function removeWalletOpen() {
    setWalletOpen(false);
  }

  return (
    <>
      <div
        className={`absolute left-[50%] top-[45%] h-[4%] w-[14%] origin-bottom-left rotate-[90deg] hover:scale-105 md:left-[80%] md:w-[13%] lg:left-[75%] lg:top-[43.5%] lg:w-[10.5%] xl:top-[12%] xl:w-[10%] 2xl:left-[71.875%] ${walletOpen && window.innerWidth >= 1280 ? "translate-x-[220%]" : ""} flex cursor-pointer items-center justify-center border-l-2 border-r-2 border-t-2 border-black bg-[#D5A774] font-baloo text-[1.5vw] font-semibold transition-transform ease-linear lg:text-[1.1vw] xl:text-[1vw] 2xl:text-[0.8vw]`}
        onClick={() => setWalletOpen((prev) => !prev)}
      >
        <span className="scale-[-1]">WALLET BALANCE</span>
      </div>
      <div
        className={`absolute left-[61%] top-[18%] h-[32%] w-[19%] md:top-[16%] lg:left-[53%] lg:top-[15%] lg:w-[22%] xl:top-[12%] 2xl:left-[49.875%] ${walletOpen ? "translate-x-[100%] border-r-2" : ""} flex flex-col justify-between border-b-2 border-t-2 border-black bg-[#D5A774] bg-opacity-30 px-[0.5%] py-[1.5%] font-baloo text-[1.5vw] font-semibold text-white transition-transform ease-linear lg:text-[1.25vw] xl:px-[3%] xl:text-[1vw]`}
      >
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">
            {window.innerWidth > 1024 ? "locks balance:" : "locks:"}
          </span>
          <span className="">{handleInfo(goldiswapWalletInfo.locks)}</span>
        </div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">
            {window.innerWidth > 1024 ? "honey balance:" : "honey:"}
          </span>
          <span className="">{handleInfo(goldiswapWalletInfo.honey)}</span>
        </div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">
            {window.innerWidth > 1024 ? "porridge balance:" : "porridge:"}
          </span>
          <span className="">{handleInfo(goldiswapWalletInfo.prg)}</span>
        </div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">
            {window.innerWidth > 1024 ? "staked locks:" : "staked:"}
          </span>
          <span className="">{handleInfo(goldiswapWalletInfo.staked)}</span>
        </div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">
            {window.innerWidth > 1024 ? "locked locks:" : "locked:"}
          </span>
          <span className="">{handleInfo(goldiswapWalletInfo.locked)}</span>
        </div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">
            {window.innerWidth > 1024 ? "borrowed honey:" : "borrowed:"}
          </span>
          <span className="">{handleInfo(goldiswapWalletInfo.borrowed)}</span>
        </div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">
            {window.innerWidth > 1024 ? "claimable porridge:" : "claimable:"}
          </span>
          <span className="">
            {handleInfoClaimable(goldiswapWalletInfo.claimable)}
          </span>
        </div>
      </div>
    </>
  );
};
