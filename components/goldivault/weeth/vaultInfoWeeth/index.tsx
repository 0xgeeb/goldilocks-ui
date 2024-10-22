"use client"

import { useState, useEffect } from "react"
import { useGoldivault } from "../../../../providers"

export const VaultInfoWeeth = () => {

  const {
    enableInfoPopup,
    disableInfoPopup,
    infoLoading,
    goldivaultInfoBhoney
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

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  return (
    <div className={`${showInfo ? "" : "hidden"} absolute left-[71%] top-[18%] h-[47%] w-[20%] border-t-2 border-r-2 border-b-2 border-black bg-[#D5A774] bg-opacity-30 pt-[0.75%] flex flex-col font-baloo font-medium text-white text-[0.85vw]`}>
      <h1 className="pl-[4%] text-[1.5vw] mb-[1%]">Vault Info</h1>
      {
        infoLoading ?
        loadingElement() :
        <div className="flex flex-col w-[100%] h-full overflow-y-auto">
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%] bg-[#DEB486] bg-opacity-50">
            <span>Vault Expiration</span>
            <span>{formatDate(goldivaultInfoBhoney.endTime)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%] bg-[#DEB486] bg-opacity-50">
            <span>Early Withdrawal Available</span>
            <span>YES</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('tvl')}
              onMouseLeave={() => disableInfoPopup('tvl')}
            >
              Vault TVL
            </span>
            <span>${formatAsString(goldivaultInfoBhoney.vaultDeposits + goldivaultInfoBhoney.accumulatedIbgt + goldivaultInfoBhoney.accumulatedHoney)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('fixedapr')}
              onMouseLeave={() => disableInfoPopup('fixedapr')}
            >
              Fixed APR
            </span>
            <span>{formatAsString(goldivaultInfoBhoney.fixedApr)}%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('otlpapr')}
              onMouseLeave={() => disableInfoPopup('otlpapr')}
            >
              OT LP APR
            </span>
            <span>~%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('ytlpapr')}
              onMouseLeave={() => disableInfoPopup('ytlpapr')}
            >
              YT LP APR
            </span>
            <span>~%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('pointsmultiplier')}
              onMouseLeave={() => disableInfoPopup('pointsmultiplier')}
            >
              Etherfi Points Multiplier
            </span>
            <span>~x</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('pointsperyt')}
              onMouseLeave={() => disableInfoPopup('pointsperyt')}
            >
              Etherfi points per YT
            </span>
            <span>~x</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('pointsleverage')}
              onMouseLeave={() => disableInfoPopup('pointsleverage')}
            >
              YT Etherfi points leverage
            </span>
            <span>~x</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%] bg-[#DEB486] bg-opacity-50">
            <span>Total OT Liquidity</span>
            <span>${formatAsString(goldivaultInfoBhoney.otLiquidity)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%] bg-[#DEB486] bg-opacity-50">
            <span>Total YT Liquidity</span>
            <span>${formatAsString(goldivaultInfoBhoney.ytLiquidity)}</span>
          </div>
        </div>
      }
    </div>
  )
}