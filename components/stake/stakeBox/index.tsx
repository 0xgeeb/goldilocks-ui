"use client"

import { useState, useEffect } from "react"
import { useStake, useWallet } from "../../../providers"
import { Chart } from "../../utils"

export const StakeBox = () => {

  return (
    <div className="absolute top-[12.167%] left-[28.125%] w-[43.75%] h-[48.87%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA]">
      </div>
    </div>
  )
}