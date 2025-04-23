"use client";

import { useGoldivault } from "../../../providers";

export const InfoPopup = () => {
  const { infoPopupText } = useGoldivault();

  return (
    <div className="absolute top-[0%] left-[0%] z-50 h-[12%] w-[60%] xl:w-[50%]">
      <div className="relative h-[100%] w-[100%] border-2 border-[#FFCD00] bg-[#9A5816]">
        <div className="absolute top-1 left-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute top-1 right-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute right-0 bottom-1 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="font-baloo absolute inset-2 flex flex-col items-center justify-center border-2 border-[#FFCD00] bg-[#C8894A] px-2 text-center text-[1.5vw] font-semibold xl:text-[1.25vw] 2xl:text-[1vw]">
          <span>{infoPopupText}</span>
        </div>
      </div>
    </div>
  );
};
