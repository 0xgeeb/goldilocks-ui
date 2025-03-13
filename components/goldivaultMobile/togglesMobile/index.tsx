"use client";

import { useState } from "react";
import { useGoldivault } from "../../../providers";

type TogglesProps = {
  params: {
    vaultToken: string;
  };
};

export const TogglesMobile = ({ params }: TogglesProps) => {
  const [togglesOpen, setTogglesOpen] = useState<boolean>(false);

  const { activeToggle, changeActiveToggle } = useGoldivault();

  const changeToggle = (toggle: string) => {
    changeActiveToggle(toggle);
    setTogglesOpen(false);
  };

  return (
    <>
      {togglesOpen && (
        <>
          <div
            className={`z-100 absolute right-[2.5%] top-[7.5%] h-[6%] w-[25%] border-2 border-[#FFCD00] ${activeToggle === "DEPOSIT" ? "bg-[#033E5E]" : "bg-[#995816]"} flex items-center justify-center font-amaticbold text-[6vw] font-medium text-[#FFCD00]`}
            onClick={() => changeToggle("DEPOSIT")}
          >
            DEPOSIT
          </div>
          <div
            className={`z-100 absolute right-[2.5%] top-[13.5%] h-[6%] w-[25%] border-b-2 border-l-2 border-r-2 border-[#FFCD00] ${activeToggle === "REDEEMOT" ? "bg-[#033E5E]" : "bg-[#995816]"} flex items-center justify-center font-amaticbold text-[6vw] font-medium text-[#FFCD00]`}
            onClick={() => changeToggle("REDEEMOT")}
          >
            REDEEMOT
          </div>
          {/* <div
            className={`z-100 absolute right-[2.5%] top-[19.5%] w-[25%] h-[6%] border-l-2 border-r-2 border-b-2 border-[#FFCD00] ${activeToggle === 'REDEEMYT' ? "bg-[#033E5E]" : "bg-[#995816]"} flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[6vw]`}
            onClick={() => changeToggle('REDEEMYT')}
          >
            REDEEMYT
          </div> */}
          <div
            className={`z-100 absolute right-[2.5%] top-[19.5%] h-[6%] w-[25%] border-b-2 border-l-2 border-r-2 border-[#FFCD00] ${activeToggle === "TRADEOT" ? "bg-[#033E5E]" : "bg-[#995816]"} flex items-center justify-center font-amaticbold text-[6vw] font-medium text-[#FFCD00]`}
            onClick={() => changeToggle("TRADEOT")}
          >
            TRADEOT
          </div>
          <div
            className={`z-100 absolute right-[2.5%] top-[25.5%] h-[6%] w-[25%] border-b-2 border-l-2 border-r-2 border-[#FFCD00] ${activeToggle === "TRADEYT" ? "bg-[#033E5E]" : "bg-[#995816]"} flex items-center justify-center font-amaticbold text-[6vw] font-medium text-[#FFCD00]`}
            onClick={() => changeToggle("TRADEYT")}
          >
            TRADEYT
          </div>
          <div
            className={`z-100 absolute right-[2.5%] top-[31.5%] h-[6%] w-[25%] border-b-2 border-l-2 border-r-2 border-[#FFCD00] ${activeToggle === "INFO" ? "bg-[#033E5E]" : "bg-[#995816]"} flex items-center justify-center font-amaticbold text-[6vw] font-medium text-[#FFCD00]`}
            onClick={() => changeToggle("INFO")}
          >
            INFO
          </div>
          {
            params.vaultToken === "rusd" ?
            <>
              <div
                className={`z-100 absolute right-[2.5%] top-[37.5%] h-[6%] w-[25%] border-b-2 border-l-2 border-r-2 border-[#FFCD00] ${activeToggle === "ADDLIQ" ? "bg-[#033E5E]" : "bg-[#995816]"} flex items-center justify-center font-amaticbold text-[6vw] font-medium text-[#FFCD00]`}
                onClick={() => changeToggle("ADDLIQ")}
              >
                ADD LIQ
              </div>
              <div
                className={`z-100 absolute right-[2.5%] top-[43.5%] h-[6%] w-[25%] border-b-2 border-l-2 border-r-2 border-[#FFCD00] ${activeToggle === "REMOVELIQ" ? "bg-[#033E5E]" : "bg-[#995816]"} flex items-center justify-center font-amaticbold text-[6vw] font-medium text-[#FFCD00]`}
                onClick={() => changeToggle("REMOVELIQ")}
              >
                REMOVE LIQ
              </div>
            </> :
            <div
              className={`z-100 absolute right-[2.5%] top-[37.5%] h-[6%] w-[25%] border-b-2 border-l-2 border-r-2 border-[#FFCD00] ${activeToggle === "POOLS" ? "bg-[#033E5E]" : "bg-[#995816]"} flex items-center justify-center font-amaticbold text-[6vw] font-medium text-[#FFCD00]`}
              onClick={() => changeToggle("POOLS")}
            >
              POOL
            </div>
          }
        </>
      )}
      {!togglesOpen && (
        <div
          className="absolute right-[2.5%] top-[7.5%] flex h-[6%] w-[25%] items-center justify-center border-2 border-[#FFCD00] bg-[#033E5E] font-amaticbold text-[6vw] font-medium text-[#FFCD00]"
          onClick={() => setTogglesOpen(true)}
        >
          {activeToggle}
        </div>
      )}
    </>
  );
};
