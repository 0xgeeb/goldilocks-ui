"use client"

import { useState } from "react"

export const WutPopup = () => {

  const [docsToggle, setDocsToggle] = useState<boolean>(false)
  const [mirrorToggle, setMirrorToggle] = useState<boolean>(false)
  const [twitterToggle, setTwitterToggle] = useState<boolean>(false)
  const [discordToggle, setDiscordToggle] = useState<boolean>(false)

  return (
    <div className="absolute top-[11%] xl:top-[15%] left-[41.5%] xl:left-[53%] h-[30%] w-[15%] xl:w-[10%] z-50 bg-[#EEDCD2] border-b-2 border-r-2 border-l-2 border-black flex flex-col items-center justify-around font-amaticbold font-semibold text-center text-[2.75vw] xl:text-[2vw] 2xl:text-[1.5vw]">
      <a 
        href="https://goldilocks.gitbook.io/docs" 
        target="_blank"
        className="w-[100%] h-[25%] cursor-pointer flex items-center justify-center"
        onMouseEnter={() => setDocsToggle(true)}
        onMouseLeave={() => setDocsToggle(false)}
      >

        <span className={`${docsToggle ? "underline" : ""}`}>docs</span>
      </a>
      <a 
        href="https://mirror.xyz/0x9F5b6da006a3E13a597A2615AA8849645cC43Ec0" 
        target="_blank"
        className="w-[100%] h-[25%] cursor-pointer flex items-center justify-center"
        onMouseEnter={() => setMirrorToggle(true)}
        onMouseLeave={() => setMirrorToggle(false)}
      >

        <span className={`${mirrorToggle ? "underline" : ""}`}>mirror</span>
      </a>
      <a 
        href="https://x.com/goldilocksmoney" 
        target="_blank"
        className="w-[100%] h-[25%] cursor-pointer flex items-center justify-center"
        onMouseEnter={() => setTwitterToggle(true)}
        onMouseLeave={() => setTwitterToggle(false)}
      >

        <span className={`${twitterToggle ? "underline" : ""}`}>twitter</span>
      </a>
      <a 
        href="https://discord.gg/3cdn88Mbq8" 
        target="_blank"
        className="w-[100%] h-[25%] cursor-pointer flex items-center justify-center"
        onMouseEnter={() => setDiscordToggle(true)}
        onMouseLeave={() => setDiscordToggle(false)}
      >

        <span className={`${discordToggle ? "underline" : ""}`}>discord</span>
      </a>
    </div>
  )
}