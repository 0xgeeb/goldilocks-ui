"use client";

import { useGoldivault } from "../../../providers";

export const InfoDisplayPopup = () => {
  const { infoPopupText, infoLoading } = useGoldivault();

  const texts = infoPopupText.split(";");

  return (
    <div className="fixed top-0 right-0 z-50 h-[16%] w-3/5 xl:w-[50%]">
      <div className="text-HoneyYellow font-baloo relative size-full rounded-lg border-2 border-[#352A1C] bg-[#1A140C] p-2 text-center text-[1.5vw] font-semibold xl:text-[1.25vw] 2xl:text-[1vw]">
        <div className="flex size-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-[#352A1C]">
          <span>
            {infoLoading ? (
              <span className="loading loading-spinner loading-sm text-WarmText"></span>
            ) : (
              texts[0]
            )}
          </span>
          <span className="mx-auto w-4/5 border-b-2 border-[#352A1C]"></span>
          <span>{texts[1]}</span>
        </div>
      </div>
    </div>
  );
};
