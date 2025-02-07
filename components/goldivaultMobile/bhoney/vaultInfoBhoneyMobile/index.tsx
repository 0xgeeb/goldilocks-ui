"use client"

import { useGoldivault } from "../../../../providers"

export const VaultInfoBhoneyMobile = () => {

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
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%] bg-[#DEB486] bg-opacity-50">
            <span>Vault Expiration</span>
            <span>{formatDate(goldivaultInfoBhoney.endTime)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%] bg-[#DEB486] bg-opacity-50">
            <span>Early Withdrawal Available</span>
            <span>NO</span>
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
              onMouseEnter={() => enableInfoPopup('yield')}
              onMouseLeave={() => disableInfoPopup('yield')}
            >
              Accumulated Yield
            </span>
            <span>${formatAsString(goldivaultInfoBhoney.accumulatedIbgt + goldivaultInfoBhoney.accumulatedHoney)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('historicalapr')}
              onMouseLeave={() => disableInfoPopup('historicalapr')}
            >
              Historical Underlying APR
            </span>
            <span>{formatAsString(goldivaultInfoBhoney.historicalUnderlyingApr)}%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('currentapr')}
              onMouseLeave={() => disableInfoPopup('currentapr')}
            >
              Current Underlying APR
            </span>
            <a href="https://bartio.berps.berachain.com/vault" target="_blank"><img className="h-6 w-6 cursor-pointer hover:scale-110" src="/images/icon-share.png" alt="share" /></a>
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
              onMouseEnter={() => enableInfoPopup('ytimpliedvaluehistorical')}
              onMouseLeave={() => disableInfoPopup('ytimpliedvaluehistorical')}
            >
              YT Implied Value (Historical)
            </span>
            <span>${formatAsString(goldivaultInfoBhoney.ytImpliedValue)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('ytimpliedvaluecurrent')}
              onMouseLeave={() => disableInfoPopup('ytimpliedvaluecurrent')}
            >
              YT Implied Value (Current)
            </span>
            <span>$~</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('longyieldhistorical')}
              onMouseLeave={() => disableInfoPopup('longyieldhistorical')}
            >
              Long Yield APR (Historical)
            </span>
            <span>{formatAsString(goldivaultInfoBhoney.longYieldHistorical)}%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup('longyieldaprcurrent')}
              onMouseLeave={() => disableInfoPopup('longyieldaprcurrent')}
            >
              Long Yield APR (Current)
            </span>
            <span>~%</span>
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
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%] bg-[#DEB486] bg-opacity-50">
            <span>Honey backing per OT</span>
            <span>${formatAsString(goldivaultInfoBhoney.honeyBacking)}</span>
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