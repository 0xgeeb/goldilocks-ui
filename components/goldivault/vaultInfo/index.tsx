"use client"

import { useState, useEffect } from "react"
import { useGoldivault } from "../../../providers"
import { contracts } from "../../../utils/addressi"

type VaultInfoProps = {
  params: {
    vaultToken: string;
    protocolUrl: string;
    dexLink: string;
  }
}

export const VaultInfo = ({ params }: VaultInfoProps) => {

  const {
    enableInfoPopup,
    disableInfoPopup,
    infoLoading,
    goldivaultInfoWeeth,
    goldivaultInfoBhoney,
    goldivaultInfoSolvbtc,
    goldivaultInfoUnibtc,
    activeToggle
  } = useGoldivault()

  const [showInfo, setShowInfo] = useState<boolean>(false)
  
  useEffect(() => {
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])
  
  function updateDimensions() {
    if(window.innerWidth > 1279) {
      setShowInfo(true)
    }
    else {
      setShowInfo(false)
    }
  }

  const data = 
    params.vaultToken === 'weeth' ? goldivaultInfoWeeth :
    params.vaultToken === 'bhoney' ? goldivaultInfoBhoney :
    params.vaultToken === 'unibtc' ? goldivaultInfoUnibtc :
    params.vaultToken === 'solvbtc' ? goldivaultInfoSolvbtc :
    {
      endTime: 0,
      vaultDeposits: 0,
      fixedApr: 0,
      impliedYield: 0,
      leverage: 0,
      otLiquidity: 0,
      durationRatio: 0,
      restakingYield: 0
    }
  
  const vaultOTaddy = 
    params.vaultToken === 'weeth' ? contracts.weot.address :
    params.vaultToken === 'bhoney' ? contracts.bhot.address :
    params.vaultToken === 'solvbtc' ? contracts.solvbtcot.address :
    params.vaultToken === 'unibtc' ? contracts.unibtcot.address : ''

  const vaultYTaddy = 
    params.vaultToken === 'weeth' ? contracts.weyt.address :
    params.vaultToken === 'bhoney' ? contracts.bhyt.address :
    params.vaultToken === 'solvbtc' ? contracts.solvbtcyt.address :
    params.vaultToken === 'unibtc' ? contracts.unibtcyt.address : ''

  const vaultaddy = 
    params.vaultToken === 'weeth' ? contracts.weethVault.address :
    params.vaultToken === 'bhoney' ? contracts.bhoneygoldivault.address :
    params.vaultToken === 'solvbtc' ? contracts.solvbtcVault.address :
    params.vaultToken === 'unibtc' ? contracts.unibtcVault.address : ''

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear())
    return `${month}-${day}-${year}`
  }

  const getRelativeDate = (timestamp: number): string => {
    const now = Date.now()
    const diffInMilliseconds = (timestamp * 1000) - now
    const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24))
  
    if (diffInDays === 0) {
      return "today"
    } else if (diffInDays > 0) {
      return `${Math.abs(diffInDays)} day${diffInDays === 1 ? "" : "s"}`
    } else {
      return `${Math.abs(diffInDays)} day${diffInDays === -1 ? "" : "s"} ago`
    }
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  return (
    <div className={`${showInfo ? "" : "hidden"} absolute left-[71%] top-[18%] h-[47%] w-[20%] border-t-2 border-r-2 border-b-2 border-black bg-[#D5A774] bg-opacity-30 pt-[0.75%] flex flex-col font-baloo font-medium text-white text-[0.85vw]`}>
      <h1 className="pl-[4%] text-[1.5vw] mb-[1%]">Vault Info {activeToggle === 'TRADEOT' && <span className="ml-1 text-[1vw]">(1 OT = 1 {params.vaultToken} at maturity)</span>}</h1>
      {
        infoLoading ?
        loadingElement() :
        <div className="flex flex-col w-[100%] h-full overflow-y-auto">
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('vaultmaturity')}
              onMouseLeave={() => disableInfoPopup('vaultmaturity')}
            >
              Vault Maturity:
            </span>
            <span>{formatDate(data.endTime)} ({getRelativeDate(data.endTime)})</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('fixedaprweeth')}
              onMouseLeave={() => disableInfoPopup('fixedaprweeth')}
            >
              Fixed APR/Implied Yield:
            </span>
            <span>{formatAsString(data.fixedApr)}%</span>
          </div>
          {
            params.vaultToken === 'weeth' ?
            <>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  Etherfi Points Multiplier:
                </span>
                <span>4x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  Etherfi Points Leverage:
                </span>
                <span>{formatAsString(data.leverage)}x</span>
              </div>
            </> :
            params.vaultToken === 'ebtc' ?
            <>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  Babylon Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  Babylon Points Leverage:
                </span>
                <span>69x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  Lombard Points Multiplier:
                </span>
                <span>2x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  Lombard Points Leverage:
                </span>
                <span>69x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  Symbiotic Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  Symbiotic Points Leverage:
                </span>
                <span>69x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  Veda Points Multiplier:
                </span>
                <span>3x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  Veda Points Leverage:
                </span>
                <span>69x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  Karak Points Multiplier:
                </span>
                <span>2x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  Karak Points Leverage:
                </span>
                <span>69x</span>
              </div>
            </> :
            params.vaultToken === 'rseth' ?
            <>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  KelpDAO Points Multiplier:
                </span>
                <span>2x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  KelpDAO Points Leverage:
                </span>
                <span>69x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  EigenLayer Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  EigenLayer Points Leverage:
                </span>
                <span>69x</span>
              </div>
            </> :
            params.vaultToken === 'unibtc' ?
            <>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  Bedrock Points Multiplier:
                </span>
                <span>4x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  Bedrock Points Leverage:
                </span>
                <span>{formatAsString(data.bedrockLeverage)}x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  Babylon Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  Babylon Points Leverage:
                </span>
                <span>{formatAsString(data.babylonLeverage)}x</span>
              </div>
            </> :
            <>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  Babylon Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  Babylon Points Leverage:
                </span>
                <span>69x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
                  onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
                >
                  Solv Points Multiplier:
                </span>
                <span>4x</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup('pointsleverage')}
                  onMouseLeave={() => disableInfoPopup('pointsleverage')}
                  >
                  Solv Points Leverage:
                </span>
                <span>69x</span>
              </div>
            </>
          }
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%] bg-[#DEB486] bg-opacity-50">
            <span>Liquidity:</span>
            <span>${formatAsString(data.otLiquidity)}</span>
          </div>
          {
            (params.vaultToken === 'weeth' || params.vaultToken === 'rseth') &&
            <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%] bg-[#DEB486] bg-opacity-50">
              <span>Current restaking yield:</span>
              <span>{formatAsString(data.restakingYield)}%</span>
            </div>
          }
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Contract addresses:</span>
            <a href={`https://bartio.beratrail.io/address/${vaultaddy}`} target="_blank"><span className="hover:opacity-50 cursor-pointer">Vault</span></a>
            <a href={`https://bartio.beratrail.io/address/${vaultOTaddy}`} target="_blank"><span className="hover:opacity-50 cursor-pointer">OT</span></a>
            <a href={`https://bartio.beratrail.io/address/${vaultYTaddy}`} target="_blank"><span className="hover:opacity-50 cursor-pointer">YT</span></a>
            <a href={`https://bartio.beratrail.io/address/lpaddy`} target="_blank"><span className="hover:opacity-50 cursor-pointer">LP</span></a>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <a href={params.dexLink} target="_blank"><span className="hover:opacity-50 cursor-pointer">Link to OT chart</span></a>
            <span></span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <a href={params.protocolUrl} target="_blank"><span className="hover:opacity-50 cursor-pointer">Link to underlying protocol</span></a>
            <span></span>
          </div>
        </div>
      }
    </div>
  )
}





{/* <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
  <span
    className="cursor-pointer hover:text-gray-400"
    onMouseEnter={() => enableInfoPopup('otlpapr')}
    onMouseLeave={() => disableInfoPopup('otlpapr')}
  >
    LP APR
  </span>
  <span>~%</span>
</div> */}
{/* <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
  <span
    className="cursor-pointer hover:text-gray-400"
    onMouseEnter={() => enableInfoPopup('tvlweeth')}
    onMouseLeave={() => disableInfoPopup('tvlweeth')}
  >
    Vault TVL
  </span>
  <span>${formatAsString(goldivaultInfoWeeth.vaultDeposits)}</span>
</div> */}
{/* <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
  <span
    className="cursor-pointer hover:text-gray-400"
    onMouseEnter={() => enableInfoPopup('impliedyieldweeth')}
    onMouseLeave={() => disableInfoPopup('impliedyieldweeth')}
  >
    Implied Yield
  </span>
  <span>{formatAsString(goldivaultInfoWeeth.impliedYield)}%</span>
</div> */}
{/* <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
  <span
    className="cursor-pointer hover:text-gray-400"
    onMouseEnter={() => enableInfoPopup('pointsperyt')}
    onMouseLeave={() => disableInfoPopup('pointsperyt')}
  >
    Etherfi points per YT
  </span>
  <span>~x</span>
</div> */}