"use client"

import { useGoldivault } from "../../../providers"

type VaultDisplayCardProps = {
  params: {
    address: string;
    mouseFlag: string;
    tokenName: string;
    imageUrl: string;
    vaultName: string;
  }
}

export const VaultDisplayCard = ({ params }: VaultDisplayCardProps) => {

  const {
    enableInfoPopup,
    disableInfoPopup,
    infoLoading,
    vaultDisplayInfo
  } = useGoldivault()

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const vaultInfo = 
    params.tokenName === 'weETH' ? vaultDisplayInfo.weeth :
    params.tokenName === 'rsETH' ? vaultDisplayInfo.rseth :
    params.tokenName === 'eBTC' ? vaultDisplayInfo.ebtc :
    params.tokenName === 'uniBTC' ? vaultDisplayInfo.unibtc :
    params.tokenName === 'SolvBTC.BBN' ? vaultDisplayInfo.solvbtc : 
    {
      fixedApr: 0,
      daysTil: 'ooga booga',
      liquidity: 0,
      ytPrice: 0
    }

  return (
    <a
      className="w-[95%] lg:w-[30%] ml-[2.5%] lg:ml-[2%] h-[30%] mx-0 my-2 lg:mx-2 lg:h-[75%]" 
      href={`/goldivault/vault/${params.address}`}
      onMouseEnter={() => enableInfoPopup(params.mouseFlag)}
      onMouseLeave={() => disableInfoPopup(params.mouseFlag)}
    >
      <div className="w-[100%] h-[100%] bg-[#9A5816] border-2 border-[#FFCD00] relative hover:scale-105 cursor-pointer" id="card-div-shadow">
        <div className="absolute top-2 left-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute top-2 right-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute inset-4 bg-[#C8894A] border-2 border-[#FFCD00] flex flex-col items-center justify-between py-[0.5%] px-[2.5%] font-baloo font-semibold">
          <div className="flex flex-row w-[100%] items-center justify-between">
            <span className="font-amatic font-semibold text-[5vw] md:text-[3.5vw] lg:text-[3.5vw]">{params.tokenName}</span>
            <div className={`w-[32px] md:w-[48px] lg:w-[64px] h-[32px] md:h-[48px] lg:h-[64px] bg-cover bg-[url('/images/${params.imageUrl}')] rounded-full border-2 border-[#FFCD00]`}></div>
          </div>
          {
            infoLoading ?
            loadingElement() :
            <div className="flex flex-row lg:flex-col w-[75%] lg:w-[100%] justify-between items-start text-[1.5vw] lg:text-[1vw]">
              <span>fixed APR: {formatAsString(vaultInfo.fixedApr)}%</span>
              <span>days until maturity: {vaultInfo.daysTil}</span>
              <span>liquidity: ${formatAsString(vaultInfo.liquidity)}</span>
            </div>
          }
          <div className="flex flex-row w-[100%] justify-between items-center">
            <span className="text-[1.5vw]">{params.vaultName}</span>
          </div>
        </div>
      </div>
    </a>
  )
}