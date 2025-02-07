"use client"

import { useGoldivault } from "../../../providers"

export const PoolsPopupMobile = () => {

  const {
    infoLoading,
    goldivaultInfoBhoney
  } = useGoldivault()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>
  }

  return (
    <div className="relative w-[100%] h-[100%] flex flex-col bg-[#033E5E]">
      <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] py-[3%] px-[2.5%] text-[3vw] text-[#FFCD00] font-baloo font-semibold">
        <span>LIQUIDITY POOL</span>
        <span>TVL</span>
        <span>APR</span>
      </div>
      {
        infoLoading ?
        loadingElement() :
        <>
          <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] py-[3%] px-[2.5%] text-[3vw] text-[#FFCD00] font-baloo font-semibold">
            <a href="https://app.kodiak.finance/#/liquidity/v2/add/0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03/0xde0a616437151c5D655c5341f24D624cBf35B0DE?chain=berachain_bartio" target="_blank"><span className="hover:underline">BHONEY OT LP</span></a>                      
            <span>${formatAsString(goldivaultInfoBhoney.otLiquidity)}</span>
            <span>~%</span>
          </div>
          <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] py-[3%] px-[2.5%] text-[3vw] text-[#FFCD00] font-baloo font-semibold">
            <a href="https://app.kodiak.finance/#/liquidity/v2/add/0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03/0x3c3834513371895A25A37aF3cdc83b8DC0352cC1?chain=berachain_bartio" target="_blank"><span className="hover:underline">BHONEY YT LP</span></a>
            <span>${formatAsString(goldivaultInfoBhoney.ytLiquidity)}</span>
            <span>~%</span>
          </div>
          {/* <h1 className="m-auto font-amatic font-medium text-[#FFCD00] text-[2vw]">MOAR POOLS COMING THOON...</h1> */}
        </>
      }
    </div>
  )
}