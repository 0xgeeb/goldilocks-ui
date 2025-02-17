"use client";

import { useGoldilend } from "../../../providers";
import { LockTabMobile, StakeTabMobile, UnstakeTabMobile } from "../";

export const LendBoxMobile = () => {
  const { txConfirming, lendActiveToggle } = useGoldilend();

  return (
    <div className="absolute left-[15.5%] top-[7.5%] h-[39%] w-[69%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-3 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {lendActiveToggle === "LOCK" ? (
          <LockTabMobile />
        ) : lendActiveToggle === "STAKE" ? (
          <StakeTabMobile />
        ) : (
          <UnstakeTabMobile />
        )}
      </div>
    </div>
  );
};
