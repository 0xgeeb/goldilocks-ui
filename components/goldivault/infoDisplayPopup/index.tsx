"use client";

import { useGoldivault } from "../../../providers";

export const InfoDisplayPopup = () => {
  const { infoPopupText, infoLoading } = useGoldivault();

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>;
  };

  const texts = infoPopupText.split(";");

  return (
    <div className="absolute right-[0%] top-[0%] z-50 h-[16%] w-3/5 xl:w-[50%]">
      <div className="relative size-full border-2 border-[#FFCD00] bg-[#9A5816] px-2 text-center font-baloo text-[1.5vw] font-semibold xl:text-[1.25vw] 2xl:text-[1vw]">
        <div className="absolute left-0 top-1 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute right-0 top-1 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute inset-2 flex flex-col items-center justify-center border-2 border-[#FFCD00] bg-[#C8894A]">
          <span>{infoLoading ? loadingElement() : texts[0]}</span>
          <span className="mx-auto w-4/5 border-b-2 border-[#FFCD00]"></span>
          <span>{texts[1]}</span>
        </div>
      </div>
    </div>
  );
};
