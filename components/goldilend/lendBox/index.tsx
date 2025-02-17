"use client";

import { useGoldilend } from "../../../providers";
import {
  LockTab,
  StakeTab,
  UnstakeTab,
  LendButton,
  Stats,
  LendWalletBalance,
  LiquidateTab,
  ClaimTab,
} from "..";

export const LendBox = () => {
  const { lendActiveToggle, txConfirming } = useGoldilend();

  return lendActiveToggle === "LIQUIDATE" ? (
    <LiquidateTab />
  ) : lendActiveToggle === "CLAIM" ? (
    <>
      <ClaimTab />
    </>
  ) : (
    <>
      <div className="absolute left-[20%] top-[14%] z-20 h-[40%] w-[60%] border-2 border-black bg-[#EEDCD2] xl:left-[30%] xl:w-[46%]">
        <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
        <div
          className={`absolute inset-6 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}
        >
          {lendActiveToggle === "LOCK" ? (
            <LockTab />
          ) : lendActiveToggle === "STAKE" ? (
            <StakeTab />
          ) : (
            <UnstakeTab />
          )}
        </div>
      </div>
      <LendWalletBalance />
      <LendButton />
      <Stats />
    </>
  );
};
