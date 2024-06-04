"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useGoldilend, useNotification, useWallet } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { contracts } from "../../../utils/addressi"

export const RepayTab = () => {

  const {
    infoLoading
  } = useGoldilend()

  return (
    <div className="h-[100%] w-[100%] flex flex-col">
      <div className="w-[100%] h-[15%] border-b-2 border-black">
        <h1 className="font-amaticbold ml-[4%] text-[2.3vw]">my loans</h1>
      </div>
      <div className="w-[100%] h-[26%] border-b-2 border-black flex flex-row">
        <h1>Loan 1</h1>
        <div className="w-[35%] px-[3%] flex flex-col justify-center">
          <div className="w-[100%] flex flex-row items-center justify-between">
            <span>total amount to repay:</span>
            <span>69 iBGT</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between">
            <span>amount repaid:</span>
            <span>9 iBGT</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between">
            <span>amount outstanding:</span>
            <span>69 iBGT</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between">
            <span>days left:</span>
            <span>9 days</span>
          </div>
        </div>
      </div>
    </div>
  )
}