"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

export const MintNFTs = () => {
  const [popup, setPopup] = useState<boolean>(false);

  const { chain } = useAccount();

  useEffect(() => {
    if (chain?.name === "Berachain") {
      setPopup(true);
    }
  }, [chain]);

  return (
    popup && (
      <div className="absolute bottom-[1%] left-[1%] flex h-[6%] w-[30%] items-center justify-center border-2 border-black bg-[#FFE59F] px-2 text-center font-baloo text-[2vw] font-semibold lg:h-[8%] xl:w-[25%] xl:text-[1.5vw] 2xl:w-[15%] 2xl:text-[1vw]">
        <a href="/goldilend/mint" className="cursor-pointer hover:underline">
          <span>mint NFTs for goldilend here</span>
        </a>
      </div>
    )
  );
};
