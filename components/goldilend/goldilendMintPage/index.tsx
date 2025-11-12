"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";
import { useAccount } from "wagmi";

import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import { useGoldilendTx } from "../../../hooks";
import { useGoldilend } from "../../../providers";
import { Loading } from "../../utils";
import { NavBar } from "../../goldiswap"

export const GoldilendMintPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const { wutPopup, setWutPopup } = useGoldilend();
  const { chain, address, isConnected } = useAccount();
  const { sendMintNFTTx, sendMintFakeHoneyTx } = useGoldilendTx();

  useEffect(() => {
    setPageLoading(false);
  }, []);

  const handleButtonClick = async (nft: string) => {
    if (nft === "band") {
      const text = document.getElementById("band-text");
      if (!isConnected) {
        text && (text.innerHTML = "no wallet");
        return;
      }
      if (chain?.name !== "Berachain") {
        text && (text.innerHTML = "no berachain");
        return;
      }
      text && (text.innerHTML = "minting...");
      const mintTx = await sendMintNFTTx(nft, address as `0x${string}`);
      if (mintTx.substring(0, 2) === "0x") {
        text && (text.innerHTML = "minted :)");
      } else {
        text && (text.innerHTML = "mint 1 band bera");
      }
    }
  };

  const handleMintButtonClick = async () => {
    const text = document.getElementById("fakehoney-text");
    if (!isConnected) {
      text && (text.innerHTML = "no wallet");
      return;
    }
    if (chain?.name !== "Berachain") {
      text && (text.innerHTML = "no berachain");
      return;
    }
    text && (text.innerHTML = "minting...");
    const mintTx = await sendMintFakeHoneyTx(address as `0x${string}`);
    if (mintTx.substring(0, 2) === "0x") {
      text && (text.innerHTML = "minted :)");
    } else {
      text && (text.innerHTML = "mint 1m fake HONEY");
    }
  }

  const handlePopups = () => {
    if (wutPopup) {
      setWutPopup(false);
    }
  };

  if(pageLoading) {
    return <Loading />
  }

  return (
    <CsrPageLayout
      onPageClick={(e) => handlePopups()}
      wutPopup={wutPopup}
      setWutPopup={setWutPopup}
      bgImageUrl="/images/bg-goldivault-2.png"
      // maskBg={`linear-gradient(#1D160DE5, #1D160DE5)`}
    >
      <div className="w-[100%] h-[89%] xl:h-[85%] relative">
        <h1
          className="absolute right-[70%] top-[1.5%] font-amaticbold text-[9vw] text-[#D9C6BA] lg:right-[73%] lg:top-0 lg:text-[7.5vw] xl:top-[15%]"
          id="page-title"
        >
          GOLDILEND
        </h1>
        <h1
          className="absolute right-[57.5%] top-[3%] font-amaticbold text-[7vw] text-[#E7B941] lg:right-[60%] lg:top-[1%] lg:text-[6vw] xl:right-[80%] xl:top-[36%]"
          id="page-title"
        >
          MINT
        </h1>
        <div className="absolute left-[10%] top-[30%] h-[45%] w-4/5 xl:left-[35%] xl:top-[20%] xl:w-[55%]">
          <div className="relative size-full">
            <div
              className="absolute left-0 top-0 size-[47.5%] cursor-pointer border-2 border-black bg-[#EEDCD2] hover:scale-110"
              onClick={() => handleMintButtonClick()}
            >
              <div className="absolute left-0 top-1 w-2 skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute right-0 top-1 w-2 -skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute inset-2 flex items-center justify-center border-2 border-black bg-[#D9C6BA]">
                <h1
                  className="text-center font-amaticbold text-[5vw] font-medium lg:text-[3vw]"
                  id="fakehoney-text"
                >
                  mint 1M fake HONEY
                </h1>
              </div>
            </div>
            <div
              className="absolute right-0 top-0 size-[47.5%] cursor-pointer border-2 border-black bg-[#EEDCD2] hover:scale-110"
              onClick={() => handleButtonClick("band")}
            >
              <div className="absolute left-0 top-1 w-2 skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute right-0 top-1 w-2 -skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute inset-2 flex items-center justify-center border-2 border-black bg-[#D9C6BA]">
                <h1
                  className="text-center font-amaticbold text-[5vw] font-medium lg:text-[3vw]"
                  id="band-text"
                >
                  mint 1 band bera
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[1%] left-[1%] z-50 flex h-[6%] w-[30%] items-center justify-center border-2 border-black bg-[#FFE59F] px-2 text-center font-baloo text-[2vw] font-semibold lg:h-[8%] xl:w-[25%] xl:text-[1.5vw] 2xl:w-[15%] 2xl:text-[1vw]">
          <span>these NFTs are FAKE</span>
        </div>
      </div>
    </CsrPageLayout>
  );
};
