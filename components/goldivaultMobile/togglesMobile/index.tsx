"use client"

import { useState } from "react"
import { useGoldivault } from "../../../providers"

export const TogglesMobile = () => {

  const [togglesOpen, setTogglesOpen] = useState<boolean>(false)

  const {
    activeToggle,
    changeActiveToggle
  } = useGoldivault()

  const changeToggle = (toggle: string) => {
    changeActiveToggle(toggle)
    setTogglesOpen(false)
  }

  return (
    <>
      {
        togglesOpen &&
        <>
          <div
            className={`z-100 absolute right-[2.5%] top-[7.5%] w-[25%] h-[6%] border-2 border-[#FFCD00] ${activeToggle === 'DEPOSIT' ? "bg-[#033E5E]" : "bg-[#995816]"} flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[6vw]`}
            onClick={() => changeToggle('DEPOSIT')}
          >
            DEPOSIT
          </div>
          <div
            className={`z-100 absolute right-[2.5%] top-[13.5%] w-[25%] h-[6%] border-l-2 border-r-2 border-b-2 border-[#FFCD00] ${activeToggle === 'REDEEMOT' ? "bg-[#033E5E]" : "bg-[#995816]"} flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[6vw]`}
            onClick={() => changeToggle('REDEEMOT')}
          >
            REDEEMOT
          </div>
          <div
            className={`z-100 absolute right-[2.5%] top-[19.5%] w-[25%] h-[6%] border-l-2 border-r-2 border-b-2 border-[#FFCD00] ${activeToggle === 'REDEEMYT' ? "bg-[#033E5E]" : "bg-[#995816]"} flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[6vw]`}
            onClick={() => changeToggle('REDEEMYT')}
          >
            REDEEMYT
          </div>
          <div
            className={`z-100 absolute right-[2.5%] top-[25.5%] w-[25%] h-[6%] border-l-2 border-r-2 border-b-2 border-[#FFCD00] ${activeToggle === 'TRADEOT' ? "bg-[#033E5E]" : "bg-[#995816]"} flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[6vw]`}
            onClick={() => changeToggle('TRADEOT')}
          >
            TRADEOT
          </div>
          <div
            className={`z-100 absolute right-[2.5%] top-[31.5%] w-[25%] h-[6%] border-l-2 border-r-2 border-b-2 border-[#FFCD00] ${activeToggle === 'TRADEYT' ? "bg-[#033E5E]" : "bg-[#995816]"} flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[6vw]`}
            onClick={() => changeToggle('TRADEYT')}
          >
            TRADEYT
          </div>
          <div
            className={`z-100 absolute right-[2.5%] top-[37.5%] w-[25%] h-[6%] border-l-2 border-r-2 border-b-2 border-[#FFCD00] ${activeToggle === 'INFO' ? "bg-[#033E5E]" : "bg-[#995816]"} flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[6vw]`}
            onClick={() => changeToggle('INFO')}
          >
            INFO
          </div>
          <div
            className={`z-100 absolute right-[2.5%] top-[43.5%] w-[25%] h-[6%] border-l-2 border-r-2 border-b-2 border-[#FFCD00] ${activeToggle === 'POOLS' ? "bg-[#033E5E]" : "bg-[#995816]"} flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[6vw]`}
            onClick={() => changeToggle('POOLS')}
          >
            POOLS
          </div>
        </>
      }
      {
        !togglesOpen &&
        <div
          className="absolute right-[2.5%] top-[7.5%] w-[25%] h-[6%] border-2 border-[#FFCD00] bg-[#033E5E] flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[6vw]"
          onClick={() => setTogglesOpen(true)}
        >
          {activeToggle}
        </div>
      }
    </>
  )
}