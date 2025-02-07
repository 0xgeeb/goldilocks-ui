"use client"

import { useGoldivault } from "../../../providers"

export const InfoPopup = () => {

  const { infoPopupText } = useGoldivault()

  return (
    <div className="z-50 absolute w-[60%] xl:w-[50%] h-[12%] top-[-2%] right-[2%]">
      <div className="w-[100%] h-[100%] bg-[#9A5816] border-2 border-[#FFCD00] relative ">
      <div className="absolute top-1 left-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute top-1 right-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute inset-2 bg-[#C8894A] border-2 border-[#FFCD00] flex flex-col items-center justify-center font-baloo font-semibold text-center px-2 text-[1.5vw] xl:text-[1.25vw] 2xl:text-[1vw]">
          <span>{ infoPopupText }</span>
        </div>
      </div>
    </div>
  )
}