"use client"

import { useState, useEffect } from "react"
import { useGoldivault, useDesktop, useGeo } from "../../../providers"
import { PoolsPageMobile } from "../../goldivaultMobile"
import {
  NavBar,
  Footer,
  Loading,
  TAndCs
} from "../../utils"

export const PoolsPage = () => {

  const [pageLoading, setPageLoading] = useState<boolean>(true)

  const {
    wutPopup,
    setWutPopup,
    infoLoading,
    goldivaultInfoWeeth,
    refreshGoldivaultInfoWeeth
  } = useGoldivault()

  const { isDesktop } = useDesktop()

  const { signed } = useGeo()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>
  }

  useEffect(() => {
    setPageLoading(false)
    refreshGoldivaultInfoWeeth()
  }, [])

  const handlePopups = () => {
    if(wutPopup) {
      setWutPopup(false)
    }
  }

  return (
    pageLoading ?
    <Loading /> :
    isDesktop ?
    (
      signed !== 'TRUE' ?
      <TAndCs /> :
      <main className="h-screen w-screen" onClick={() => handlePopups()}>
        <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
        <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-[url('/images/bg-goldivault-pools.png')] relative">
          <div className="absolute h-[100%] w-[100%] z-50 bg-[#00334F] opacity-50"></div>
          <h1 className="z-50 absolute left-[1.5%] lg:left-[8.5%] text-[25vw] lg:text-[10vw] text-[#FFCD00] font-amaticbold font-medium opacity-70" id="page-title">
            Liquidityyyyyyyyyyyyyyyyyyyyy
          </h1>
          <h1 className="z-50 absolute top-[22.5%] left-[1.5%] lg:left-[8.5%] text-[25vw] lg:text-[10vw] text-[#FFCD00] font-amaticbold font-medium opacity-70" id="page-title">
            Poooooooooooooooooooooo
          </h1>
          <h1 className="z-50 absolute top-[45%] left-[1.5%] lg:left-[8.5%] text-[25vw] lg:text-[10vw] text-[#FFCD00] font-amaticbold font-medium opacity-70" id="page-title">
            ooolllllllllllllllsssssssssssss
          </h1>
          <div className="absolute top-[15%] h-[52%] w-[80%] md:w-[70%] lg:w-[42%] left-[10%] md:left-[15%] lg:left-[29%] z-50">
            <div className="relative w-[100%] h-[100%] bg-[#995816] border-2 border-[#FFCD00]">
              <div className="absolute top-2 left-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute top-2 right-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
              <div className="relative w-[100%] h-[100%]">
                <div className={`absolute inset-4 bg-[#033E5E] border-2 border-[#FFCD00]`}>
                  <div className="relative w-[100%] h-[100%] flex flex-col">
                    <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] py-[3%] px-[7.5%] text-[2.5vw] lg:text-[1.25vw] text-[#FFCD00] font-baloo font-semibold">
                      <span>LIQUIDITY POOL</span>
                      <span>TVL</span>
                      <span>APR</span>
                    </div>
                    {
                      infoLoading ?
                      loadingElement() :
                      <>
                        <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] py-[3%] px-[7.5%] text-[2.5vw] lg:text-[1.25vw] text-[#FFCD00] font-baloo font-semibold">
                          <a href="https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio" target="_blank"><span className="hover:underline">weETH / weETH OT LP</span></a>
                          <span>${formatAsString(goldivaultInfoWeeth.otLiquidity)}</span>
                          <span>~%</span>
                        </div>
                        {/* <h1 className="m-auto font-amatic font-medium text-[#FFCD00] text-[2vw]">MOAR POOLS COMING THOON...</h1> */}
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="/goldivault/vaults" className="absolute z-50 top-[80%] h-[6%] lg:h-[8%] w-[15%] lg:w-[12%] left-[43.5%] lg:left-[44%] border-2 border-[#FFCD00] bg-[#542E07] hover:scale-110">
            <div className="flex justify-center items-center cursor-pointer w-[100%] h-[100%]">
              <span className="text-white text-[1.5vw] lg:text-[1vw] font-baloo font-medium">BACK TO VAULTS</span>
            </div>
          </a>
          <Footer />
        </div>
      </main>
    ) :
    <PoolsPageMobile />
  )
}