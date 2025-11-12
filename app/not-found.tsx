"use client"

import { useState } from "react"

const WutPopup = () => {
  const [docsToggle, setDocsToggle] = useState<boolean>(false);
  const [mirrorToggle, setMirrorToggle] = useState<boolean>(false);
  const [twitterToggle, setTwitterToggle] = useState<boolean>(false);
  const [discordToggle, setDiscordToggle] = useState<boolean>(false);
  const [govToggle, setGovToggle] = useState<boolean>(false);
  
  return (
    <div className="absolute left-[42.5%] top-[11%] z-50 flex h-[35%] w-[15%] flex-col items-center justify-around border-b-2 border-l-2 border-r-2 border-black bg-[#EEDCD2] text-center font-amaticbold text-[2.75vw] font-medium xl:left-[53%] xl:top-[15%] xl:w-[10%] xl:text-[2vw] 2xl:text-[1.5vw]">
      <a
        href="https://goldilocks.gitbook.io/goldidocs"
        target="_blank"
        className="flex h-[20%] w-[100%] cursor-pointer items-center justify-center"
        onMouseEnter={() => setDocsToggle(true)}
        onMouseLeave={() => setDocsToggle(false)}
        rel="noreferrer"
      >
        <span className={`${docsToggle ? "underline" : ""}`}>docs</span>
      </a>
              <a
          href="/goldigovernance/proposals"
          className="flex h-[20%] w-[100%] cursor-pointer items-center justify-center"
          onMouseEnter={() => setGovToggle(true)}
          onMouseLeave={() => setGovToggle(false)}
        >
          <span className={`${govToggle ? "underline" : ""}`}>gov</span>
        </a>
      <a
        href="https://x.com/goldilocksmoney"
        target="_blank"
        className="flex h-[20%] w-[100%] cursor-pointer items-center justify-center"
        onMouseEnter={() => setTwitterToggle(true)}
        onMouseLeave={() => setTwitterToggle(false)}
        rel="noreferrer"
      >
        <span className={`${twitterToggle ? "underline" : ""}`}>twitter</span>
      </a>
      <a
        href="https://discord.gg/3cdn88Mbq8"
        target="_blank"
        className="flex h-[20%] w-[100%] cursor-pointer items-center justify-center"
        onMouseEnter={() => setDiscordToggle(true)}
        onMouseLeave={() => setDiscordToggle(false)}
        rel="noreferrer"
      >
        <span className={`${discordToggle ? "underline" : ""}`}>discord</span>
      </a>
      <a
        href="https://mirror.xyz/0x9F5b6da006a3E13a597A2615AA8849645cC43Ec0"
        target="_blank"
        className="flex h-[20%] w-[100%] cursor-pointer items-center justify-center"
        onMouseEnter={() => setMirrorToggle(true)}
        onMouseLeave={() => setMirrorToggle(false)}
        rel="noreferrer"
      >
        <span className={`${mirrorToggle ? "underline" : ""}`}>mirror</span>
      </a>
    </div>
  )
}

export default function NotFound() {
  const [wutToggle, setWutToggle] = useState<boolean>(false);
  
  return (
    <div className="h-screen w-screen">
      <header className="w-[100%] h-[11%] lg:h-[15%] bg-[#EEDCD2] border-b-2 border-black flex flex-row items-center justify-between font-amaticbold px-[4%]">
        <a
          href="/"
          className="w-[25%] lg:w-[18%]"
        >
          <div className="w-[100%] flex flex-row items-center hover:opacity-30 cursor-pointer">
            <img className="w-[30%] lg:w-[37%] h-[70%]" src="/images/logo-goldilocks.png" alt="logo" />
            <h1 className="text-[3vw] lg:text-[2.4vw]">Goldilocks DAO</h1>
          </div>
        </a>
        <div className="w-[65%] sm:w-[55%] lg:w-[45%] h-[100%] flex flex-row items-center justify-between text-[3.5vw] sm:text-[3vw] lg:text-[2.2vw]">
          <span className="hover:scale-[150%] cursor-pointer" onClick={() => setWutToggle(!wutToggle)} >Wut is this?</span>
          <a href="/goldiswap/swap" className="hover:scale-[150%] cursor-pointer"><span>Goldiswap</span></a>
          <a href="/goldilend" className="hover:scale-[150%] cursor-pointer"><span>Goldilend</span></a>
          <a href="/goldivault/vaults" className="hover:scale-[150%] cursor-pointer"><span>Goldivaults</span></a>
        </div>
      </header>
      <div className="flex h-[89%] w-full flex-col items-center justify-center bg-[#EEDCD2] lg:h-[85%]">
        <h1 className="font-amaticbold text-[9vw] text-[#E7B941] lg:text-[7vw]">
          where r u
        </h1>
        <img className="h-3/5" src="/images/icon-not-found.png" alt="icon" />
        {wutToggle && <WutPopup />}
      </div>
    </div>
  );
}
