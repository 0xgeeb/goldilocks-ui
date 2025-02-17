"use client";

import { useDesktop } from "../../../providers";
import { NavBarMobile, FooterMobile } from "../../utils";

export const HomePageMobile = () => {
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {navButtonsOpen && (
        <div className="absolute top-[11%] z-50 h-[89%] w-[100%] bg-[#E4B19B]">
          <div className="flex h-[100%] w-[100%] flex-col items-center justify-between py-[8%]">
            <div className="flex h-[80%] w-[100%] flex-col items-center justify-between font-amaticbold text-[11vw]">
              <a
                href="https://goldilocks.gitbook.io/docs"
                target="_blank"
                className="cursor-pointer hover:scale-[150%]"
                rel="noreferrer"
              >
                <span>Wut Is This?</span>
              </a>
              <a
                href="/goldiswap/swap"
                className="cursor-pointer hover:scale-[150%]"
              >
                <span>Goldiswap</span>
              </a>
              <a
                href="/goldilend/borrow"
                className="cursor-pointer hover:scale-[150%]"
              >
                <span>Goldilend</span>
              </a>
              <a
                href="/goldivault/vaults"
                className="cursor-pointer hover:scale-[150%]"
              >
                <span>Goldivaults</span>
              </a>
            </div>
            <div className="flex h-[10%] w-[50%] flex-row items-center justify-between">
              <h1 className="font-amaticbold text-[7vw]">ooga booga</h1>
              <div className="mt-2 flex h-[100%] w-[40%] flex-row items-center">
                <a
                  className="mr-2 w-[55%] cursor-pointer hover:scale-[150%]"
                  href="https:x.com/goldilocksmoney"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className=""
                    src="/images/icon-x-dark.png"
                    alt="twitter"
                  />
                </a>
                <a
                  className="w-[30%] cursor-pointer hover:scale-[150%]"
                  href="https://discord.gg/3cdn88Mbq8"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className=""
                    src="/images/icon-discord-dark.png"
                    alt="discord"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="h-[100vh] w-[100vw]">
        <NavBarMobile />
        <div className="h-[75%] w-[100%] bg-[url('/images/bg-home-mobile.png')] bg-cover bg-bottom"></div>
        <div className="flex h-[25%] w-[100%] justify-center bg-black">
          <img
            className="mt-[10%] h-[25%] animate-bounce"
            src="/images/icon-arrows.png"
            alt="arrows"
          />
        </div>
      </div>
      {!navButtonsOpen && (
        <div className="relative flex w-[100vw] flex-col items-center bg-black">
          <div className="my-[10%] flex w-[100%] flex-col items-center font-amatic text-[7vw] text-[#FFCD00]">
            <div className="mt-[5%] flex w-[100%] flex-row items-center justify-center">
              <h2 className="">Henlo, welcome to </h2>
              <h2 className="mx-[2%] font-amaticbold text-[8vw]">
                GOLDILOCKS,
              </h2>
            </div>
            <h2 className=""> novel defi infrastructure on berachain</h2>
            <h2 className="">check out our products</h2>
          </div>
          <div className="my-[15%] flex w-[70vw] flex-col items-center font-amatic text-[7vw] text-[#FFCD00]">
            <img
              className="w-[100%]"
              src="/images/bg-goldiswap-home-mobile.png"
              alt="goldiswap"
            />
            <h2 className="mt-2 text-[6vw] text-[#FFCD00]">
              <span className="mx-[2%] font-amaticbold text-[8vw] text-[#FFCD00]">
                GOLDISWAP:
              </span>
              novel AMM that creates up only price floors and native interest
              free unliquidatable loans
            </h2>
            {/* <div className="flex flex-row items-center justify-center w-[100%] mt-[2.5%]">
              <h2 className="">This one is called </h2>
              <h2 className="mx-[2%] font-amaticbold text-[8vw]">GOLDISWAP</h2>
            </div>
            <h2 className="text-[6.5vw]">where beras exchange their sweet honeys</h2> */}
            <a
              className="mt-[5%] h-[20%] w-[55%] border-2 border-[#FFCD00]"
              href="/goldiswap/swap"
            >
              <div className="flex items-center justify-center text-[8vw]">
                ENTER
              </div>
            </a>
          </div>
          <div className="my-[15%] flex w-[70vw] flex-col items-center font-amatic text-[7vw] text-[#FFCD00]">
            <img
              className="w-[100%]"
              src="/images/bg-goldilend-home-mobile.png"
              alt="goldiswap"
            />
            <h2 className="mt-2 text-[6vw] text-[#FFCD00]">
              <span className="mx-[2%] font-amaticbold text-[8vw] text-[#FFCD00]">
                GOLDILEND:
              </span>
              NFT lending platform hand crafted for beras
            </h2>
            {/* <div className="flex flex-row items-center justify-center w-[100%] mt-[2.5%]">
              <h2 className="">This is </h2>
              <h2 className="mx-[2%] font-amaticbold text-[8vw]">GOLDILEND</h2>
            </div>
            <h2 className="text-[6.5vw]">where beras borrow against their sweet assets</h2> */}
            <a
              className="mt-[5%] h-[20%] w-[55%] border-2 border-[#FFCD00]"
              href="/goldilend/borrow"
            >
              <div className="flex items-center justify-center text-[8vw]">
                ENTER
              </div>
            </a>
          </div>
          <div className="my-[15%] flex w-[70vw] flex-col items-center font-amatic text-[7vw] text-[#FFCD00]">
            <img
              className="w-[100%]"
              src="/images/bg-goldivaults-home-mobile.png"
              alt="goldiswap"
            />
            <h2 className="mt-2 text-[6vw] text-[#FFCD00]">
              <span className="mx-[2%] font-amaticbold text-[8vw] text-[#FFCD00]">
                GOLDIVAULTS:
              </span>
              tokenizing yield across Berachain defi
            </h2>
            {/* <div className="flex flex-row items-center justify-center w-[100%] mt-[2.5%]">
              <h2 className="">And this is </h2>
              <h2 className="mx-[2%] font-amaticbold text-[8vw]">GOLDIVAULTS</h2>
            </div>
            <h2 className="text-[6.5vw]">where beras split their tokens</h2> */}
            <a
              className="mt-[5%] h-[20%] w-[55%] border-2 border-[#FFCD00]"
              href="/goldivault/vaults"
            >
              <div className="flex items-center justify-center text-[8vw]">
                ENTER
              </div>
            </a>
          </div>
          <div className="mb-[5%] mt-[30%] flex w-[90vw] flex-col items-center justify-around">
            <div className="flex w-[50%] flex-row items-center justify-between">
              <span className="font-amaticbold text-[6vw] text-[#D9C6BA]">
                ooga booga
              </span>
              <div className="flex w-[50%] flex-row items-center justify-end">
                <a
                  className="w-[40%] cursor-pointer focus:scale-[150%]"
                  href="https://x.com/goldilocksmoney"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="" src="/images/icon-x.png" alt="twitter" />
                </a>
                <a
                  className="w-[40%] cursor-pointer focus:scale-[150%]"
                  href="https://discord.gg/3cdn88Mbq8"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className=""
                    src="/images/icon-discord.png"
                    alt="discord"
                  />
                </a>
              </div>
            </div>
            <span className="font-baloo text-[3.2vw] font-semibold text-[#D9C6BA]">
              © 2024 Goldilocks DAO. All rights reserved.
            </span>
          </div>
        </div>
      )}
    </main>
  );
};
