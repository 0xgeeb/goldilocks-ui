"use client"

import { useState, useEffect } from "react"
import { useGoldiswap, useWallet } from "../../../providers"
// import { ChartMobile } from "../../utils"

export const SwapBoxMobile = () => {

  const {
    chartOpen,
    txConfirming,
    flipTokens
  } = useGoldiswap()

  return (
    <div className="absolute top-[4.6%] left-[15.5%] w-[69%] h-[55%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-3 border-2 border-black bg-[#D9C6BA]">
        {
          // chartOpen ? <ChartMobile /> :
          txConfirming ? <img src="" alt="" /> :
          // Notification.toggle ? <Notification /> :
          <div className="w-[100%] h-[100%] relative flex flex-col">
            <div
              className="absolute top-[45%] left-[42.5%] bg-[#D9C6BA] z-10 h-10 w-10 border-2 border-black rounded-3xl flex justify-center items-center cursor-pointer hover:scale-110"
              onClick={() => flipTokens()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D111C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </div>
            <div className="w-[100%] h-[50%] border-b-2 border-black">

            </div>
            <div className="w-[100%] h-[50%]">

            </div>
          </div>
        }
      </div>
    </div>
  )
}