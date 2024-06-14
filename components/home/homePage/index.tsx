"use client"

import { useState, useEffect } from "react"
import { useDesktop } from "../../../providers"
import { Loading } from "../../utils"
import { HomePageMobile } from "../"

export const HomePage = () => {
  
  const [pageLoading, setPageLoading] = useState<boolean>(true)

  const { isDesktop } = useDesktop()

  useEffect(() => {
    setPageLoading(false)
  }, [])
  
  return (
    pageLoading ?
    <Loading /> :
    isDesktop ?
    <main className="flex flex-col min-h-screen overflow-hidden">
      <div className="h-[100vh] w-[100vw]">
        <header className="w-[100%] h-[11%] xl:h-[15%] bg-[#EEDCD2] flex flex-row items-center justify-between font-amaticbold px-[4%]">
          <a
            href="/"
            className="w-[25%] xl:w-[18%]"
          >
            <div className="w-[100%] flex flex-row items-center hover:opacity-30 cursor-pointer">
              <img className="w-[30%] xl:w-[37%] h-[70%]" src="/images/logo-goldilocks.png" alt="logo" />
              <h1 className="text-[3vw] xl:text-[2.4vw]">Goldilocks DAO</h1>
            </div>
          </a>
          <div className="w-[55%] xl:w-[45%] h-[100%] flex flex-row items-center justify-between text-[3vw] xl:text-[2.2vw]">
            <a href="/wut" className="hover:scale-[150%] cursor-pointer"><span>Wut is this?</span></a>
            <a href="/goldiswap/swap" className="hover:scale-[150%] cursor-pointer"><span>Goldiswap</span></a>
            <a href="/goldilend/borrow" className="hover:scale-[150%] cursor-pointer"><span>Goldilend</span></a>
            <a href="/goldivaults" className="hover:scale-[150%] cursor-pointer"><span>Goldivaults</span></a>
          </div>
        </header>
        <div className="w-[100%] h-[86%] xl:h-[82%] bg-bottom bg-cover bg-[url('/images/bg-home.png')] relative">

        </div>
        <div className="w-[100%] h-[3%] bg-black"></div>
      </div>
      <div className="w-[100vw] bg-black flex flex-col items-center relative">
        <div className="h-[45vh] xl:h-[65vh] w-[100%] flex flex-col items-center justify-between font-amatic my-[5%]">
          <h1 className="text-[12vw] xl:text-[7vw] font-amaticbold text-[#FFCD00]">"Show me the honey"</h1>
          <div className="flex flex-row items-center justify-center w-[100%] text-[#FFCD00] text-[4vw] xl:text-[2vw]">
            <h2 className="">Henlo, welcome to </h2>
            <h2 className="text-[5vw] xl:text-[3vw] mx-[1%] font-amaticbold">GOLDILOCKS.</h2>
            <h2 className=""> novel defi infrastructure on berachain</h2>
            </div>
          <h2 className="text-[#FFCD00] mb-[7.5%] xl:mb-0 text-[4vw] xl:text-[2vw]">check out our three products</h2>
          <img className="w-[4%] xl:w-[2%] animate-bounce" src="/images/icon-arrows.png" alt="arrows" />
        </div>
        <div className="w-[95vw] xl:w-[85vw] flex flex-row items-center justify-between text-[#FFCD00] font-amatic my-[10%] xl:my-[5%]">
          <h1 className="text-[7vw] xl:text-[6vw] font-amaticbold mb-[12%] xl:mb-[6%]">GOLDISWAP</h1>
          <div className="flex flex-col items-center w-[50%]">
            <img className="w-[100%] mb-[3%]" src="/images/bg-goldiswap-home.png" alt="goldiswap" />
            <div className="flex flex-row flex-wrap items-center justify-center w-[100%]">
              <h2 className="text-[#FFCD00] text-[4vw] xl:text-[1.7vw]">This one is called </h2>
              <h2 className="text-[#FFCD00] text-[5vw] xl:text-[3vw] mx-[2%] font-amaticbold">GOLDISWAP.</h2>
              <h2 className="text-[#FFCD00] text-[4vw] xl:text-[1.7vw]"> where beras exchange their sweet honeys</h2>
            </div>
          </div>
          <a className="h-[15%] w-[20%] border-2 border-[#FFCD00] mb-[12%] xl:mb-[6%] hover:scale-110  hover:bg-[#FFCD00] hover:text-black cursor-pointer" href="/goldiswap/swap">
            <div className="flex items-center justify-center text-[3vw] xl:text-[2vw]">
              ENTER
            </div>
          </a>
        </div>
        <div className="w-[95vw] xl:w-[85vw] flex flex-row items-center justify-between text-[#FFCD00] font-amatic my-[10%] xl:my-[5%]">
          <h1 className="text-[7vw] xl:text-[6vw] font-amaticbold mb-[12%] xl:mb-[6%]">GOLDILEND</h1>
          <div className="flex flex-col items-center w-[50%]">
            <img className="w-[100%] mb-[3%]" src="/images/bg-goldilend-home.png" alt="goldilend" />
            <div className="flex flex-row flex-wrap items-center justify-center w-[100%]">
              <h2 className="text-[#FFCD00] text-[4vw] xl:text-[1.7vw]">This is </h2>
              <h2 className="text-[#FFCD00] text-[5vw] xl:text-[3vw] mx-[2%] font-amaticbold">GOLDILEND.</h2>
              <h2 className="text-[#FFCD00] text-[3.5vw] xl:text-[1.7vw]"> where beras borrow against their sweet assets</h2>
            </div>
          </div>
          <a className="h-[15%] w-[20%] border-2 border-[#FFCD00] mb-[12%] xl:mb-[6%] hover:scale-110  hover:bg-[#FFCD00] hover:text-black cursor-pointer" href="/goldilend/borrow">
            <div className="flex items-center justify-center text-[3vw] xl:text-[2vw]">
              ENTER
            </div>
          </a>
        </div>
        <div className="w-[85vw] flex flex-row items-center justify-between text-[#FFCD00] font-amatic my-[10%] xl:my-[5%]">
          <h1 className="text-[6vw] font-amaticbold mb-[12%] xl:mb-[6%]">GOLDIVAULTS</h1>
          <div className="flex flex-col items-center w-[50%]">
            <img className="w-[100%] mb-[3%]" src="/images/bg-goldivaults-home.png" alt="goldivaults" />
            <div className="flex flex-row flex-wrap items-center justify-center w-[100%]">
              <h2 className="text-[#FFCD00] text-[4vw] xl:text-[1.7vw]">And this is </h2>
              <h2 className="text-[#FFCD00] text-[5vw] xl:text-[3vw] mx-[2%] font-amaticbold">GOLDIVAULTS.</h2>
              <h2 className="text-[#FFCD00] text-[4vw] xl:text-[1.7vw]">where beras split their tokens</h2>
            </div>
          </div>
          <a className="h-[15%] w-[20%] border-2 border-[#FFCD00] mb-[12%] xl:mb-[6%] hover:scale-110  hover:bg-[#FFCD00] hover:text-black cursor-pointer" href="/goldivaults">
            <div className="flex items-center justify-center text-[3vw] xl:text-[2vw]">
              ENTER
            </div>
          </a>
        </div>
        <div className="w-[100%] h-[15vh] bg-black"></div>
        <img className="absolute h-10 w-10 bottom-[0.5%] left-[1%] cursor-pointer hover:animate-spin" src="/images/icon-share.png" alt="share" />
        <div className="absolute bottom-[0.5%] right-[1%] flex flex-row items-center text-[#D9C6BA]">
          <span className="font-amatic text-[2.4vw] xl:text-[1.7vw] 2xl:text-[1.3vw] mr-3 2xl:mr-6">OOGA BOOGA</span>
          <a className="cursor-pointer hover:scale-110" href="https://x.com/goldilocksmoney" target="_blank">
            <img className="w-8 h-8" src="/images/icon-x.png" alt="x" />
          </a>
          <a className="cursor-pointer hover:scale-110" href="https://discord.gg/3cdn88Mbq8" target="_blank">
            <img className="w-8 h-8" src="/images/icon-discord.png" alt="discord" />
          </a>
          <span className="text-[1.2vw] xl:text-[0.9vw] 2xl:text-[0.7vw] font-baloo ml-3 2xl:ml-6">© 2024 Goldilocks DAO. All rights reserved.</span>
        </div>
      </div>
    </main> :
    <HomePageMobile />
  )
}