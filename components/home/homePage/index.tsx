"use client";

import { useEffect, useState } from "react";

import { useAtom } from "jotai";

import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";

import { HomePageMobile, WutPopup } from "../";
import { useDesktop } from "../../../providers";
import { Loading } from "../../utils";

export const HomePage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);
  const [wutPopup, setWutPopup] = useState<boolean>(false);

  const { isDesktop } = useDesktop();

  useEffect(() => {
    setPageLoading(false);
  }, []);

  const handlePopups = () => {
    if (wutPopup) {
      setWutPopup(false);
    }
  };

  return pageLoading ? (
    <Loading />
  ) : isDesktop ? (
    <main
      className="flex min-h-screen flex-col overflow-hidden"
      onClick={() => handlePopups()}
    >
      {wutPopup && <WutPopup />}
      <div className="h-screen w-screen">
        <header className="flex h-[11%] w-full flex-row items-center justify-between bg-[#EEDCD2] px-[4%] font-amaticbold xl:h-[15%]">
          <a href="/" className="w-[25%] xl:w-[18%]">
            <div className="flex w-full cursor-pointer flex-row items-center hover:opacity-30">
              <img
                className="h-[70%] w-[30%] xl:w-[37%]"
                src="/images/logo-goldilocks.png"
                alt="logo"
              />
              <h1 className="text-[3vw] xl:text-[2.4vw]">Goldilocks DAO</h1>
            </div>
          </a>
          <div className="flex h-full w-[55%] flex-row items-center justify-between text-[3vw] xl:w-[45%] xl:text-[2.2vw]">
            <span
              className="cursor-pointer hover:scale-[150%]"
              onClick={() => setWutPopup(!wutPopup)}
            >
              Wut is this?
            </span>
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
        </header>
        <div className="relative h-[86%] w-full bg-[url('/images/bg-home.png')] bg-cover bg-bottom xl:h-[82%]"></div>
        <div className="h-[3%] w-full bg-black"></div>
      </div>
      <div className="relative flex w-screen flex-col items-center bg-black">
        <div className="my-[5%] flex h-[45vh] w-full flex-col items-center justify-between font-amatic xl:h-[50vh]">
          <div className="flex w-full flex-row items-center justify-center text-[4vw] text-[#FFCD00] xl:text-[2vw]">
            <h2 className="">Henlo, welcome to </h2>
            <h2 className="mx-[1%] font-amaticbold text-[5vw] xl:text-[3vw]">
              GOLDILOCKS,
            </h2>
            <h2 className=""> novel defi infrastructure on berachain</h2>
          </div>
          <h2 className="mb-[7.5%] text-[4vw] text-[#FFCD00] xl:mb-0 xl:text-[2vw]">
            check out our products
          </h2>
          <img
            className="w-[4%] animate-bounce xl:w-[2%]"
            src="/images/icon-arrows.png"
            alt="arrows"
          />
        </div>
        <div className="my-[10%] flex w-[95vw] flex-row items-center justify-between font-amatic text-[#FFCD00] xl:my-[5%] xl:w-[85vw]">
          <h1 className="mb-[12%] font-amaticbold text-[7vw] xl:mb-[6%] xl:text-[6vw]">
            GOLDISWAP
          </h1>
          <div className="flex w-[50%] flex-col items-center">
            <img
              className="mb-[3%] w-full"
              src="/images/bg-goldiswap-home.png"
              alt="goldiswap"
            />
            <div className="w-full">
              {/* <h2 className="text-[#FFCD00] text-[4vw] xl:text-[1.7vw]">This one is called </h2> */}
              {/* <h2 className="text-[#FFCD00] text-center text-[5vw] xl:text-[3vw] mx-[2%] font-amaticbold">GOLDISWAP:</h2> */}
              <h2 className="text-[4vw] text-[#FFCD00] xl:text-[2vw]">
                <span className="mx-[2%] font-amaticbold text-[5vw] text-[#FFCD00] xl:text-[3vw]">
                  GOLDISWAP:
                </span>
                novel AMM that creates up only price floors and native interest
                free unliquidatable loans
              </h2>
            </div>
          </div>
          <a
            className="mb-[12%] h-[15%] w-1/5 cursor-pointer border-2 border-[#FFCD00] hover:scale-110 hover:bg-[#FFCD00] hover:text-black xl:mb-[6%]"
            href="/goldiswap/swap"
          >
            <div className="flex items-center justify-center text-[3vw] xl:text-[2vw]">
              ENTER
            </div>
          </a>
        </div>
        <div className="my-[10%] flex w-[95vw] flex-row items-center justify-between font-amatic text-[#FFCD00] xl:my-[5%] xl:w-[85vw]">
          <h1 className="mb-[12%] font-amaticbold text-[7vw] xl:mb-[6%] xl:text-[6vw]">
            GOLDILEND
          </h1>
          <div className="flex w-[50%] flex-col items-center">
            <img
              className="mb-[3%] w-full"
              src="/images/bg-goldilend-home.png"
              alt="goldilend"
            />
            <div className="w-full">
              {/* <h2 className="text-[#FFCD00] text-[4vw] xl:text-[1.7vw]">This is </h2> */}
              {/* <h2 className="text-[#FFCD00] text-[5vw] xl:text-[3vw] mx-[2%] font-amaticbold">GOLDILEND.</h2> */}
              <h2 className="text-[4vw] text-[#FFCD00] xl:text-[2vw]">
                <span className="mx-[2%] font-amaticbold text-[5vw] text-[#FFCD00] xl:text-[3vw]">
                  GOLDILEND:
                </span>
                NFT lending platform hand crafted for beras
              </h2>
            </div>
          </div>
          <a
            className="mb-[12%] h-[15%] w-1/5 cursor-pointer border-2 border-[#FFCD00] hover:scale-110 hover:bg-[#FFCD00] hover:text-black xl:mb-[6%]"
            href="/goldilend/borrow"
          >
            <div className="flex items-center justify-center text-[3vw] xl:text-[2vw]">
              ENTER
            </div>
          </a>
        </div>
        <div className="my-[10%] flex w-[85vw] flex-row items-center justify-between font-amatic text-[#FFCD00] xl:my-[5%]">
          <h1 className="mb-[12%] font-amaticbold text-[6vw] xl:mb-[6%]">
            GOLDIVAULTS
          </h1>
          <div className="flex w-[50%] flex-col items-center">
            <img
              className="mb-[3%] w-full"
              src="/images/bg-goldivaults-home.png"
              alt="goldivaults"
            />
            <div className="w-full">
              {/* <h2 className="text-[#FFCD00] text-[4vw] xl:text-[1.7vw]">And this is </h2> */}
              {/* <h2 className="text-[#FFCD00] text-[5vw] xl:text-[3vw] mx-[2%] font-amaticbold">GOLDIVAULTS.</h2> */}
              <h2 className="text-[4vw] text-[#FFCD00] xl:text-[2vw]">
                <span className="mx-[2%] font-amaticbold text-[5vw] text-[#FFCD00] xl:text-[3vw]">
                  GOLDIVAULTS:
                </span>
                tokenizing yield across Berachain defi
              </h2>
            </div>
          </div>
          <a
            className="mb-[12%] h-[15%] w-1/5 cursor-pointer border-2 border-[#FFCD00] hover:scale-110 hover:bg-[#FFCD00] hover:text-black xl:mb-[6%]"
            href="/goldivault/vaults"
          >
            <div className="flex items-center justify-center text-[3vw] xl:text-[2vw]">
              ENTER
            </div>
          </a>
        </div>
        <div className="h-[15vh] w-full bg-black"></div>
        <div className="z-50 mx-auto mb-[0.75%] flex flex-row items-center justify-center font-amaticbold text-[1.5vw] text-[#D9C6BA]">
          <span>Audited by</span>
          <a
            className="cursor-pointer hover:scale-110"
            href="https://yaudit.dev/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="mx-3 size-8"
              src="/images/yaudit-logo.png"
              alt="yaudit"
            />
          </a>
          <span className="text-[1.15vw]">&</span>
          <a
            className="cursor-pointer hover:scale-110"
            href="https://www.cyfrin.io/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="mx-3 size-10"
              src="/images/cyfrin-logo.png"
              alt="cyfrin"
            />
          </a>
          <span className="text-[1.15vw]">&</span>
          <a
            className="cursor-pointer hover:scale-110"
            href="https://www.hyacinthaudits.xyz/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="mx-3 h-10 w-16"
              src="/images/hyacinth-logo.svg"
              alt="hyacinth"
            />
          </a>
          <span className="text-[1.15vw]">&</span>
          <a
            className="cursor-pointer hover:scale-110"
            href="https://www.halborn.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="mx-3 size-9"
              src="/images/halborn-logo.svg"
              alt="halborn"
            />
          </a>
        </div>
        <div className="absolute bottom-[0.5%] z-10 flex w-full flex-row items-center justify-between px-[2.5%]">
          <img
            className="size-10 cursor-pointer hover:animate-spin"
            src="/images/icon-share.png"
            alt="share"
          />
          <div className="flex flex-row items-center text-[#D9C6BA]">
            <span className="mr-3 font-amatic text-[2.4vw] xl:text-[1.7vw] 2xl:mr-6 2xl:text-[1.3vw]">
              OOGA BOOGA
            </span>
            <a
              className="cursor-pointer hover:scale-110"
              href="https://x.com/goldilocksmoney"
              target="_blank"
              rel="noreferrer"
            >
              <img className="size-8" src="/images/icon-x.png" alt="x" />
            </a>
            <a
              className="cursor-pointer hover:scale-110"
              href="https://discord.gg/3cdn88Mbq8"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="size-8"
                src="/images/icon-discord.png"
                alt="discord"
              />
            </a>
            <span className="ml-3 font-baloo text-[1.2vw] xl:text-[0.9vw] 2xl:ml-6 2xl:text-[0.7vw]">
              © 2024 Goldilocks DAO. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <HomePageMobile />
  );
};
