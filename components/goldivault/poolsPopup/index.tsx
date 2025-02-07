"use client"

import { useGoldivault } from "../../../providers"

type PoolsPopupProps = {
  params: {
    vaultToken: string;
    poolUrl: string;
    poolName: string
  }
}

export const PoolsPopup = ({ params }: PoolsPopupProps) => {

  const {
    poolsPopupToggle,
    setPoolsPopupToggle,
    infoLoading,
    goldivaultInfoWeeth,
    goldivaultInfoBhoney
  } = useGoldivault()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>
  }

  const data = 
    params.vaultToken === 'weeth' ? goldivaultInfoWeeth :
    params.vaultToken === 'bhoney' ? goldivaultInfoBhoney : {}

  return (
    <>
      { poolsPopupToggle && <div className="absolute w-[100%] h-[100%] z-50 bg-black opacity-70"></div> }
      {
        poolsPopupToggle &&
        <div className="absolute top-[15%] h-[52%] w-[80%] md:w-[70%] lg:w-[42%] left-[10%] md:left-[15%] lg:left-[29%] z-50">
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
                      <a href={params.poolUrl} target="_blank"><span className="hover:underline">{params.poolName}</span></a>                      
                      <span>${formatAsString(data.otLiquidity)}</span>
                      <span>~%</span>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      }
      <div className="absolute z-40 right-[5%] lg:right-[9%] top-[3%] lg:top-[6%] h-[6%] lg:h-[7%] w-[15%] lg:w-[10%] border-2 border-[#FFCD00] text-[#FFCD00] bg-[#033E5E] hover:bg-[#FFCD00] hover:text-[#033E5E] hover:border-2 hover:border-[#033E5E] cursor-pointer flex items-center justify-center" onClick={() => setPoolsPopupToggle(!poolsPopupToggle)}>
        <span className="text-[1.5vw] lg:text-[1vw] font-baloo font-semibold">LIQUIDITY POOL</span>
      </div>
    </>
  )
}