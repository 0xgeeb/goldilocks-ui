"use client"

import { useState, useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useGoldilend, useWallet } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { BorrowNotification } from "../../goldilend"
import { contracts } from "../../../utils/addressi"

export const BoostTab = () => {

  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])

  const {
    infoLoading,
    findBoost,
    findPartners
  } = useGoldilend()

  const { isConnected } = useWallet()

  useEffect(() => {
    findPartners
    findBoost()
  }, [isConnected])

  return (
    <div className="w-[100%] h-[100%] flex flex-row">
      <div className="h-[100%] w-[100%] px-[0%] border-r-2 border-black flex flex-col items-center">
        <h1 className="font-amaticbold text-[3vw] mt-[2%]">select partner nfts</h1>
        <div className="flex flex-wrap overflow-y-auto w-[75%] h-[80%]" id="hide-scrollbar">
          {
            array.map((index) => (
              <div key={index} className="h-[25%] w-[33%] py-2">
                <img className="ml-[5%] h-[100%] w-[90%] border-2 border-black" src="/images/icon-beradrome.png" alt="bera" />
              </div>
            ))
          }
        </div>
      </div>
      <div className="h-[100%] w-[100%] flex flex-col items-center">
        <h1 className="font-amaticbold text-[5vw] mt-[12%]">create boost</h1>
        <h1 className="text-[1.7vw] font-baloo font-semibold text-[#9C4924]">boost amount: 69%</h1>
        <button className="h-[10%] w-[50%] border-2 border-black bg-[#E7B941] font-amaticbold text-[1.5vw]">create boost</button>
      </div>
    </div>
  )
}