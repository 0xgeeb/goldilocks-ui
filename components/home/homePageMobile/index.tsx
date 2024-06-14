"use client"

import { useDesktop } from "../../../providers"
import {
  NavBarMobile,
  FooterMobile
} from "../../utils"

export const HomePageMobile = () => {

  const { navButtonsOpen } = useDesktop()

  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      { 
        navButtonsOpen && 
        <div className="z-50 absolute top-[11%] h-[89%] w-[100%] bg-[#E4B19B]">
          <div className="h-[100%] w-[100%] py-[8%] flex flex-col items-center justify-between">
            <div className="w-[100%] h-[90%] flex flex-col items-center justify-between font-amaticbold text-[11vw]">
              <a href="/wut" className="hover:scale-[150%] cursor-pointer"><span>Wut Is This?</span></a>
              <a href="/goldiswap/swap" className="hover:scale-[150%] cursor-pointer"><span>Goldiswap</span></a>
              <a href="/goldilend/borrow" className="hover:scale-[150%] cursor-pointer"><span>Goldilend</span></a>
              <a href="/goldivaults" className="hover:scale-[150%] cursor-pointer"><span>Goldivaults</span></a>
            </div>
            <div className="w-[50%] h-[10%] flex flex-row items-center justify-between">
              <h1 className="font-amaticbold text-[7vw]">ooga booga</h1>
              <div className="h-[100%] w-[40%] mt-2 flex flex-row items-center">
                <a className="hover:scale-[150%] cursor-pointer w-[55%] mr-2" href="https:x.com/goldilocksmoney" target="_blank"><img className="" src="/images/icon-x-dark.png" alt="twitter" /></a>
                <a className="hover:scale-[150%] cursor-pointer w-[30%]" href="https://discord.gg/3cdn88Mbq8" target="_blank"><img className="" src="/images/icon-discord-dark.png" alt="discord" /></a>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="h-[100vh] w-[100vw]">
        <NavBarMobile />
        
      </div>
      {
        !navButtonsOpen &&
        <div className="w-[100vw] bg-black flex flex-col items-center relative">

        </div>
      }
      <FooterMobile />
    </main>
  )
}