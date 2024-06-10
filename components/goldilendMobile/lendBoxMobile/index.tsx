"use client"

import { useGoldilend } from "../../../providers"
import {
  LockTabMobile,
  StakeTabMobile,
  UnstakeTabMobile
} from "../"

export const LendBoxMobile = () => {

  const {
    txConfirming,
    lendActiveToggle,
  } = useGoldilend()

  return (
    <div className="absolute top-[7.5%] left-[15.5%] w-[69%] h-[39%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-3 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          lendActiveToggle === 'LOCK' ?
          <LockTabMobile /> :
          lendActiveToggle === 'STAKE' ?
          <StakeTabMobile /> :
          <UnstakeTabMobile />
        }
      </div>
    </div>
  )
}