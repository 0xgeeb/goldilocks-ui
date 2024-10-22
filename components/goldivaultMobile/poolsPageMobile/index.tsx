"use client"

import { useDesktop } from "../../../providers"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

export const PoolsPageMobile = () => {

  const { navButtonsOpen } = useDesktop()
  
  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      {
        !navButtonsOpen &&
        <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldivault-pools-mobile.png')]">
          <div className="absolute h-[100%] w-[100%] z-50 bg-[#00334F] opacity-50"></div>
          <div className="absolute top-[2.5%] h-[87.5%] left-[2.5%] w-[95%]  break-words">
            <h1 className="text-[16vw] text-[#FFCD00] font-amaticbold font-medium m-0" id="page-title">
              LiquidityyyyyyyyyyyyyPPPPPPPPPPPPPPPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLSSSSSSSSSSSSSSSSSSSSS
            </h1>
          </div>
          <div className="absolute top-[10%] h-[65%] w-[80%] left-[10%] z-50">
            <div className="relative w-[100%] h-[100%] bg-[#995816] border-2 border-[#FFCD00]">
              <div className="absolute top-1 left-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute top-1 right-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="relative w-[100%] h-[100%]">
                <div className={`absolute inset-2 bg-[#033E5E] border-2 border-[#FFCD00]`}>
                  <div className="relative w-[100%] h-[100%] flex flex-col">
                    <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] py-[3%] px-[5%] text-[4vw] text-[#FFCD00] font-baloo font-semibold">  
                      <div className="flex flex-col">
                        <span>LIQUIDITY</span>
                        <span>POOLS</span>
                      </div>
                      <span>TVL</span>
                      <span>APR</span>
                    </div>
                    <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] py-[3%] px-[5%] text-[3.5vw] text-[#FFCD00] font-baloo font-semibold">
                      <div className="flex flex-col">
                        <span>BERPS</span>
                        <span>HONEY OT</span>
                        <span>LP</span>
                      </div>
                      <span>$927,339</span>
                      <span>5%</span>
                    </div>
                    <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] py-[3%] px-[5%] text-[3.5vw] text-[#FFCD00] font-baloo font-semibold">
                      <div className="flex flex-col">
                        <span>BERPS</span>
                        <span>HONEY OT</span>
                        <span>LP</span>
                      </div>
                      <span>$92,339</span>
                      <span>53%</span>
                    </div>
                    <h1 className="m-auto font-amatic font-medium text-[#FFCD00] text-[8vw]">MOAR POOLS COMING THOON...</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="/goldivault/vaults" className="absolute z-50 top-[82.5%] h-[5%] w-[35%] left-[32.5%] border-2 border-[#FFCD00] bg-[#542E07] hover:scale-110">
            <div className="flex justify-center items-center cursor-pointer w-[100%] h-[100%]">
              <span className="text-white text-[3.5vw] font-baloo font-medium">BACK TO VAULTS</span>
            </div>
          </a>
          <FooterMobile />
        </div>
      }
    </main>
  )
}