"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { BoostPopup, BorrowBox, BorrowFetcher, Toggles } from "../";
import { useDesktop, useGoldilend } from "../../../providers";
import { GoldilendPageMobile } from "../../goldilendMobile";
import { Loading, MintNFTs, TAndCs } from "../../utils";
import { NavBar } from "../../goldiswap"

export const GoldilendPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    activeToggle,
    wutPopup,
    setWutPopup,
    boostPopup,
    setBoostPopup,
    findLoans,
    refreshGoldilendInfo,
    refreshGoldilendWalletInfo
  } = useGoldilend();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

  useEffect(() => {
    // findLoans();
    refreshGoldilendInfo();
    refreshGoldilendWalletInfo();
    setPageLoading(false);
  }, []);

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GHOST_GRAPH_URL,
    cache: new InMemoryCache(),
    headers: {
      "X-GHOST-KEY": process.env.NEXT_PUBLIC_GHOST_GRAPH_KEY!,
    },
  });

  const handlePopups = () => {
    if (wutPopup) {
      setWutPopup(false);
    }
    if (boostPopup) {
      setBoostPopup(false);
    }
  };

  if(pageLoading) {
    return <Loading />
  }

  if(signed !== "TRUE") {
    return <TAndCs />
  }

  return (
    isDesktop ?
    <main className="w-screen h-screen" onClick={() => handlePopups()}>
      <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldilend.png')] relative">
        <Toggles />
        {boostPopup && <BoostPopup />}
        <h1
          className="absolute right-[70%] top-[1.5%] font-amaticbold text-[9vw] text-[#D9C6BA] lg:right-[73%] lg:top-0 lg:text-[7.5vw] xl:top-[15%]"
          id="page-title"
        >
          GOLDILEND
        </h1>
        <h1
          className={`absolute top-[3%] lg:top-[1%] xl:top-[36%] ${activeToggle === "BORROW" ? "right-[52.5%] lg:right-[58%] xl:right-[78%]" : "right-[57.5%] lg:right-[60%] xl:right-[80%]"} font-amaticbold text-[7vw] text-[#E7B941] lg:text-[6vw]`}
          id="page-title"
        >
          {activeToggle}
        </h1>
        <BorrowBox />
        {/* <BorrowFetcher /> */}
        <MintNFTs />
      </div>
    </main>
    : <GoldilendPageMobile />
  );
};
