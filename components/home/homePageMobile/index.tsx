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
            <div className="w-[100%] h-[80%] flex flex-col items-center justify-between font-amaticbold text-[11vw]">
              <a href="https://goldilocks.gitbook.io/docs" target="_blank" className="hover:scale-[150%] cursor-pointer"><span>Wut Is This?</span></a>
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
        <div className="w-[100%] h-[75%] bg-cover bg-bottom bg-[url('/images/bg-home-mobile.png')]">

        </div>
        <div className="w-[100%] h-[25%] bg-black flex justify-center">
          <img className="mt-[10%] h-[25%] animate-bounce" src="/images/icon-arrows.png" alt="arrows" />
        </div>
      </div>
      {
        !navButtonsOpen &&
        <div className="w-[100vw] bg-black flex flex-col items-center relative">
          <div className="w-[100%] flex flex-col items-center font-amatic my-[10%] text-[#FFCD00] text-[7vw]">
            <h1 className="text-[14vw] font-amaticbold">"Show me the honey"</h1>
            <div className="flex flex-row items-center justify-center w-[100%] mt-[5%]">
              <h2 className="">Henlo, welcome to </h2>
              <h2 className="mx-[2%] font-amaticbold text-[8vw]">GOLDILOCKS.</h2>
              </div>
            <h2 className=""> novel defi infrastructure on berachain</h2>
            <h2 className="">check out our three products</h2>
          </div>
          <div className="w-[100vw] flex flex-col items-center text-[#FFCD00] text-[7vw] font-amatic my-[15%]">
            <img className="w-[70%]" src="/images/bg-goldiswap-home-mobile.png" alt="goldiswap" />
            <div className="flex flex-row items-center justify-center w-[100%] mt-[2.5%]">
              <h2 className="">This one is called </h2>
              <h2 className="mx-[2%] font-amaticbold text-[8vw]">GOLDISWAP</h2>
            </div>
            <h2 className="text-[6.5vw]">where beras exchange their sweet honeys</h2>
            <a className="h-[20%] w-[55%] border-2 border-[#FFCD00] mt-[5%]" href="/goldiswap/swap">
              <div className="flex items-center justify-center text-[8vw]">
                ENTER
              </div>
            </a>
          </div>
          <div className="w-[100vw] flex flex-col items-center text-[#FFCD00] text-[7vw] font-amatic my-[15%]">
            <img className="w-[70%]" src="/images/bg-goldilend-home-mobile.png" alt="goldiswap" />
            <div className="flex flex-row items-center justify-center w-[100%] mt-[2.5%]">
              <h2 className="">This is </h2>
              <h2 className="mx-[2%] font-amaticbold text-[8vw]">GOLDILEND</h2>
            </div>
            <h2 className="text-[6.5vw]">where beras borrow against their sweet assets</h2>
            <a className="h-[20%] w-[55%] border-2 border-[#FFCD00] mt-[5%]" href="/goldilend/borrow">
              <div className="flex items-center justify-center text-[8vw]">
                ENTER
              </div>
            </a>
          </div>
          <div className="w-[100vw] flex flex-col items-center text-[#FFCD00] text-[7vw] font-amatic my-[15%]">
            <img className="w-[70%]" src="/images/bg-goldivaults-home-mobile.png" alt="goldiswap" />
            <div className="flex flex-row items-center justify-center w-[100%] mt-[2.5%]">
              <h2 className="">And this is </h2>
              <h2 className="mx-[2%] font-amaticbold text-[8vw]">GOLDIVAULTS</h2>
            </div>
            <h2 className="text-[6.5vw]">where beras split their tokens</h2>
            <a className="h-[20%] w-[55%] border-2 border-[#FFCD00] mt-[5%]" href="/goldivaults">
              <div className="flex items-center justify-center text-[8vw]">
                ENTER
              </div>
            </a>
          </div>
          <div className="mt-[30%] mb-[5%] w-[90vw] flex flex-col items-center justify-around">
            <div className="w-[50%] flex flex-row items-center justify-between">
              <span className="text-[6vw] font-amaticbold text-[#D9C6BA]">ooga booga</span>
              <div className="flex flex-row items-center justify-end w-[50%]">
                <a className="focus:scale-[150%] cursor-pointer w-[40%]" href="https://x.com/goldilocksmoney" target="_blank"><img className="" src="/images/icon-x.png" alt="twitter" /></a>
                <a className="focus:scale-[150%] cursor-pointer w-[40%]" href="https://discord.gg/3cdn88Mbq8" target="_blank"><img className="" src="/images/icon-discord.png" alt="discord" /></a>
              </div>
            </div>
            <span className="text-[3.2vw] font-semibold font-baloo text-[#D9C6BA]">© 2024 Goldilocks DAO. All rights reserved.</span>
          </div>
        </div>
      }
    </main>
  )
}