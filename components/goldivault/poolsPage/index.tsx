"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { formatAsString } from "@/app/_components/utils";

import { useDesktop, useGoldivault } from "../../../providers";
import { PoolsPageMobile } from "../../goldivaultMobile";
import { Loading, TAndCs } from "../../utils";

export const PoolsPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    wutPopup,
    setWutPopup,
    infoLoading,
  } = useGoldivault();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>;
  };

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
    signed !== "TRUE" ? (
      <TAndCs />
    ) : (
      <CsrPageLayout
        onPageClick={() => handlePopups()}
        wutPopup={wutPopup}
        setWutPopup={setWutPopup}
        bgImageUrl="/images/bg-goldivault-pools.png"
      >
        <>
          <div className="absolute z-50 size-full bg-[#00334F] opacity-50"></div>
          <h1
            className="absolute left-[1.5%] z-50 font-amaticbold text-[25vw] font-medium text-[#FFCD00] opacity-70 lg:left-[8.5%] lg:text-[10vw]"
            id="page-title"
          >
            Liquidityyyyyyyyyyyyyyyyyyyyy
          </h1>
          <h1
            className="absolute left-[1.5%] top-[22.5%] z-50 font-amaticbold text-[25vw] font-medium text-[#FFCD00] opacity-70 lg:left-[8.5%] lg:text-[10vw]"
            id="page-title"
          >
            Poooooooooooooooooooooo
          </h1>
          <h1
            className="absolute left-[1.5%] top-[45%] z-50 font-amaticbold text-[25vw] font-medium text-[#FFCD00] opacity-70 lg:left-[8.5%] lg:text-[10vw]"
            id="page-title"
          >
            ooolllllllllllllllsssssssssssss
          </h1>
          <div className="absolute left-[10%] top-[15%] z-50 h-[52%] w-4/5 md:left-[15%] md:w-[70%] lg:left-[29%] lg:w-[42%]">
            <div className="relative size-full border-2 border-[#FFCD00] bg-[#995816]">
              <div className="absolute left-0 top-2 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute right-0 top-2 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="relative size-full">
                <div
                  className={`absolute inset-4 border-2 border-[#FFCD00] bg-[#033E5E]`}
                >
                  <div className="relative flex size-full flex-col">
                    <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] px-[7.5%] py-[3%] font-baloo text-[2.5vw] font-semibold text-[#FFCD00] lg:text-[1.25vw]">
                      <span>LIQUIDITY POOL</span>
                      <span>TVL</span>
                      <span>APR</span>
                    </div>
                    {infoLoading ? (
                      loadingElement()
                    ) : (
                      <>
                        <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] px-[7.5%] py-[3%] font-baloo text-[2.5vw] font-semibold text-[#FFCD00] lg:text-[1.25vw]">
                          <a
                            href="https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="hover:underline">
                              weETH / weETH OT LP
                            </span>
                          </a>
                          <span>
                            ${formatAsString(69)}
                          </span>
                          <span>~%</span>
                        </div>
                        {/* <h1 className="m-auto font-amatic font-medium text-[#FFCD00] text-[2vw]">MOAR POOLS COMING THOON...</h1> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            href="/goldivault/vaults"
            className="absolute left-[43.5%] top-[80%] z-50 h-[6%] w-[15%] border-2 border-[#FFCD00] bg-[#542E07] hover:scale-110 lg:left-[44%] lg:h-[8%] lg:w-[12%]"
          >
            <div className="flex size-full cursor-pointer items-center justify-center">
              <span className="font-baloo text-[1.5vw] font-medium text-white lg:text-[1vw]">
                BACK TO VAULTS
              </span>
            </div>
          </a>
        </>
      </CsrPageLayout>
    )
  ) : (
    <PoolsPageMobile />
  );
};
