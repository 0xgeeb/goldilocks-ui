"use client"

import { useEffect } from "react"
import { useGoldivault } from "../../../providers"

export const TradeTab = () => {

  const {
    displayString,
    handleChange,
    walletInfoLoading,
    activeToggle,
    tradeDirection,
    goldivaultWalletInfoBhoney,
    handleBalanceClick,
    outputTokensLoading,
    debouncedTradeInput,
    flipTokens,
    setTradeOutput,
    tradeOutput,
    setOutputTokensLoading,
    quoteSwap
  } = useGoldivault()

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>
  }

  const formatBalance = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 })
  }

  useEffect(() => {
    if(debouncedTradeInput > 0) {
      quoteSwap()
    }
    else {
      setTradeOutput(0)
      setOutputTokensLoading(false)
    }
  }, [debouncedTradeInput])

  const renderTopBalance = () => {
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        return goldivaultWalletInfoBhoney.bhot
      }
      else {
        return goldivaultWalletInfoBhoney.honey
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        return goldivaultWalletInfoBhoney.bhyt
      }
      else {
        return goldivaultWalletInfoBhoney.honey
      }
    }
  }

  const renderBottomBalance = () => {
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        return goldivaultWalletInfoBhoney.honey
      }
      else {
        return goldivaultWalletInfoBhoney.bhot
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        return goldivaultWalletInfoBhoney.honey
      }
      else {
        return goldivaultWalletInfoBhoney.bhyt
      }
    }
  }

  const renderTopBalanceLabel = (): string => {
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        return 'BHOT'
      }
      else {
        return 'HONEY'
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        return 'BHYT'
      }
      else {
        return 'HONEY'
      }
    }
  }

  const renderBottomBalanceLabel = (): string => {
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        return 'HONEY'
      }
      else {
        return 'BHOT'
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        return 'HONEY'
      }
      else {
        return 'BHYT'
      }
    }
  }

  return (
    <div className="relative w-[100%] h-[100%] flex flex-col">
      <div 
        className="absolute top-[44%] left-[47.27%] bg-[#995816] z-10 h-10 w-10 border-2 border-[#FFCD00] rounded-3xl flex justify-center items-center cursor-pointer hover:scale-[110%]"
        onClick={() => flipTokens()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFCD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
      </div>
      <div className="mx-auto w-[75%] h-[50%] py-[3.5%] relative">
        <h1 className="text-[2.5vw] md:text-[2vw] lg:text-[1vw] text-white font-baloo font-medium mb-[2.5%]">Trade Tokens</h1>
        <div className="w-[100%] h-[50%] border-2 border-black bg-white flex flex-row items-center justify-between pr-[1%] pl-[3.5%]">
          <input
            className="h-[100%] w-full focus:outline-none border-none bg-transparent font-bold font-baloo text-[4vw] lg:text-[2vw]"
            type="number"
            id="number-input"
            placeholder="0.00"
            value={displayString}
            onChange={(e) => handleChange(e.target.value)}
          />
          <span className="font-baloo text-nowrap font-bold text-[2.5vw] md:text-[2vw] lg:text-[1vw]">{renderTopBalanceLabel()}</span>
        </div>
        <h1 className="cursor-pointer hover:scale-110 absolute right-0 font-baloo font-medium text-white text-[2.5vw] md:text-[2vw] lg:text-[1vw] mt-[2.5%] lg:mt-[1%]" onClick={() => handleBalanceClick('blah')}>
          balance: {walletInfoLoading ? loadingElement() : formatBalance(renderTopBalance())}
        </h1>
      </div>
      <div className="w-[100%] h-[50%] border-t-2 border-[#FFCD00] py-[3.5%] px-[12.5%]">
        <h1 className="text-[2.5vw] md:text-[2vw] lg:text-[1vw] text-white font-baloo font-medium mb-[2.5%]">Estimated tokens received</h1>
        <div className="h-[50%] w-[100%] flex flex-row items-center justify-between border-2 border-black bg-slate-200 pr-[1%] pl-[3.5%]">
          <span className="font-baloo text-nowrap font-bold text-[4vw] lg:text-[2vw]">{outputTokensLoading ? loadingElement() : formatBalance(tradeOutput)}</span>
          <span className="font-baloo text-nowrap font-bold text-[2.5vw] md:text-[2vw] lg:text-[1vw]">{renderBottomBalanceLabel()}</span>
        </div>
        <h1 className="cursor-pointer hover:scale-110 absolute right-0 font-baloo font-medium text-white text-[2.5vw] md:text-[2vw] lg:text-[1vw] mt-[2.5%] lg:mt-[1%] pr-[12.5%]" onClick={() => handleBalanceClick('blah')}>
          balance: {walletInfoLoading ? loadingElement() : formatBalance(renderBottomBalance())}
        </h1>
      </div>
    </div>
  )
}