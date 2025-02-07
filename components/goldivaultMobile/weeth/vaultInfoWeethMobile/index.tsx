"use client"

import { useGoldivault } from "../../../../providers"

export const VaultInfoWeethMobile = () => {

  const {
    enableInfoPopup,
    disableInfoPopup,
    infoLoading,
    goldivaultInfoBhoney
  } = useGoldivault()

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
    <div className="h-[100%] w-[100%] flex flex-col font-baloo font-medium text-[4vw]">
      <h1 className="pl-[4%] text-[6.5vw] mb-[1%]">Vault Info</h1>
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
              Vault Maturity
            </span>
            <span>{formatDate(goldivaultInfoBhoney.endTime)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('tvlweeth')}
              onMouseLeave={() => disableInfoPopup('tvlweeth')}
            >
              Vault TVL
            </span>
            <span>${formatAsString(goldivaultInfoBhoney.vaultDeposits + goldivaultInfoBhoney.accumulatedIbgt + goldivaultInfoBhoney.accumulatedHoney)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('fixedaprweeth')}
              onMouseLeave={() => disableInfoPopup('fixedaprweeth')}
            >
              Fixed APR
            </span>
            <span>{formatAsString(goldivaultInfoBhoney.fixedApr)}%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('impliedyieldweeth')}
              onMouseLeave={() => disableInfoPopup('impliedyieldweeth')}
            >
              Implied Yield
            </span>
            <span>{formatAsString(goldivaultInfoBhoney.fixedApr)}%</span>
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
        </div>
      }
    </div>
  )
}