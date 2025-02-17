"use client";

import { useState } from "react";

export const WutPopup = () => {
  const [docsToggle, setDocsToggle] = useState<boolean>(false);
  const [mirrorToggle, setMirrorToggle] = useState<boolean>(false);
  const [twitterToggle, setTwitterToggle] = useState<boolean>(false);
  const [discordToggle, setDiscordToggle] = useState<boolean>(false);
  const [govToggle, setGovToggle] = useState<boolean>(false);

  return (
    <div className="absolute left-[41.5%] top-[11%] z-50 flex h-[35%] w-[15%] flex-col items-center justify-around border-b-2 border-l-2 border-r-2 border-black bg-[#EEDCD2] text-center font-amaticbold text-[2.75vw] font-semibold xl:left-[53%] xl:top-[15%] xl:w-[10%] xl:text-[2vw] 2xl:text-[1.5vw]">
      <a
        href="https://goldilocks.gitbook.io/docs"
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
  );
};
