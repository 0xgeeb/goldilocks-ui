"use client";

import { useGoldivault } from "../../../providers";

export const InfoPopup = () => {
  const { infoPopupText } = useGoldivault();

  return (
    <div className="absolute left-[2%] top-[-2%] z-50 h-[12%] w-[60%] xl:w-[50%]">
      <div className="relative h-[100%] w-[100%] border-2 border-[#FFCD00] bg-[#9A5816]">
        <div className="absolute left-0 top-1 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute right-0 top-1 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute inset-2 flex flex-col items-center justify-center border-2 border-[#FFCD00] bg-[#C8894A] px-2 text-center font-baloo text-[1.5vw] font-semibold xl:text-[1.25vw] 2xl:text-[1vw]">
          <span>{infoPopupText}</span>
        </div>
      </div>
    </div>
  );
};
