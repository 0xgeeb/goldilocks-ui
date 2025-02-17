"use client";

import { useDesktop } from "../../../providers";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const PoolsPageMobile = () => {
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="h-screen w-screen">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <div className="relative h-[89%] w-full bg-[url('/images/bg-goldivault-pools-mobile.png')] bg-cover">
          <div className="absolute z-50 size-full bg-[#00334F] opacity-50"></div>
          <div className="absolute left-[2.5%] top-[2.5%] h-[87.5%] w-[95%] break-words">
            <h1
              className="m-0 font-amaticbold text-[16vw] font-medium text-[#FFCD00]"
              id="page-title"
            >
              LiquidityyyyyyyyyyyyyPPPPPPPPPPPPPPPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLSSSSSSSSSSSSSSSSSSSSS
            </h1>
          </div>
          <div className="absolute left-[10%] top-[10%] z-50 h-[65%] w-4/5">
            <div className="relative size-full border-2 border-[#FFCD00] bg-[#995816]">
              <div className="absolute left-0 top-1 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute right-0 top-1 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="relative size-full">
                <div
                  className={`absolute inset-2 border-2 border-[#FFCD00] bg-[#033E5E]`}
                >
                  <div className="relative flex size-full flex-col">
                    <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] px-[5%] py-[3%] font-baloo text-[4vw] font-semibold text-[#FFCD00]">
                      <div className="flex flex-col">
                        <span>LIQUIDITY</span>
                        <span>POOLS</span>
                      </div>
                      <span>TVL</span>
                      <span>APR</span>
                    </div>
                    <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] px-[5%] py-[3%] font-baloo text-[3.5vw] font-semibold text-[#FFCD00]">
                      <div className="flex flex-col">
                        <span>BERPS</span>
                        <span>HONEY OT</span>
                        <span>LP</span>
                      </div>
                      <span>$927,339</span>
                      <span>5%</span>
                    </div>
                    <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] px-[5%] py-[3%] font-baloo text-[3.5vw] font-semibold text-[#FFCD00]">
                      <div className="flex flex-col">
                        <span>BERPS</span>
                        <span>HONEY OT</span>
                        <span>LP</span>
                      </div>
                      <span>$92,339</span>
                      <span>53%</span>
                    </div>
                    <h1 className="m-auto font-amatic text-[8vw] font-medium text-[#FFCD00]">
                      MOAR POOLS COMING THOON...
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            href="/goldivault/vaults"
            className="absolute left-[32.5%] top-[82.5%] z-50 h-[5%] w-[35%] border-2 border-[#FFCD00] bg-[#542E07] hover:scale-110"
          >
            <div className="flex size-full cursor-pointer items-center justify-center">
              <span className="font-baloo text-[3.5vw] font-medium text-white">
                BACK TO VAULTS
              </span>
            </div>
          </a>
          <FooterMobile />
        </div>
      )}
    </main>
  );
};
