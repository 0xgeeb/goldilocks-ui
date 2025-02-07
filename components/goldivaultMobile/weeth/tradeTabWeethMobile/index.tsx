"use client"

import { useEffect } from "react"
import { useGoldivault } from "../../../../providers"

export const TradeTabWeethMobile = () => {

  const {
    displayString,
    handleChange,
    walletInfoLoading,
    activeToggle,
    tradeDirection,
    goldivaultWalletInfoWeeth,
    handleBalanceClick,
    outputTokensLoading,
    debouncedTradeInput,
    flipTokens,
    setTradeOutput,
    tradeOutput,
    setOutputTokensLoading,
    quoteV3Swap,
    changeSlippageToggle,
    priceImpact
  } = useGoldivault()

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>
  }

  const formatBalance = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 })
  }

  useEffect(() => {
    if(debouncedTradeInput > 0) {
      quoteV3Swap()
    }
    else {
      setTradeOutput(0)
      setOutputTokensLoading(false)
    }
  }, [debouncedTradeInput])

  const renderTopBalance = () => {
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        return goldivaultWalletInfoWeeth.weot
      }
      else {
        return goldivaultWalletInfoWeeth.weeth
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        return goldivaultWalletInfoWeeth.weyt
      }
      else {
        return goldivaultWalletInfoWeeth.weeth
      }
    }
  }

  const renderBottomBalance = () => {
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        return goldivaultWalletInfoWeeth.weeth
      }
      else {
        return goldivaultWalletInfoWeeth.weot
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        return goldivaultWalletInfoWeeth.weeth
      }
      else {
        return goldivaultWalletInfoWeeth.weyt
      }
    }
  }

  const renderTopBalanceLabel = (): string => {
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        return 'WEOT'
      }
      else {
        return 'weETH'
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        return 'WEYT'
      }
      else {
        return 'weETH'
      }
    }
  }

  const renderBottomBalanceLabel = (): string => {
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        return 'weETH'
      }
      else {
        return 'WEOT'
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        return 'weETH'
      }
      else {
        return 'WEYT'
      }
    }
  }

  return (
    <div className="relative w-[100%] h-[100%] flex flex-col">
      <img 
        className="absolute h-6 w-6 top-[2.5%] left-[89%] z-10" 
        src="/images/icon-settings.png" 
        alt="settings"
        onClick={() => changeSlippageToggle(true)}
      />
      <div 
        className="absolute top-[45%] left-[42.5%] bg-[#995816] z-10 h-10 w-10 border-2 border-[#FFCD00] rounded-3xl flex justify-center items-center cursor-pointer hover:scale-[110%]"
        onClick={() => flipTokens()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFCD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
      </div>
      <div className="mx-auto w-[95%] h-[50%] py-[3.5%] relative">
        <h1 className="text-[4vw] text-white font-baloo font-medium">Trade Tokens</h1>
        <div className="w-[100%] h-[50%] border-2 border-black bg-white flex flex-row items-center justify-between mt-[5%] pr-[1%] pl-[3.5%]">
          <input
            className="h-[100%] w-full focus:outline-none border-none bg-transparent font-bold font-baloo text-[5.5vw]"
            type="number"
            id="number-input"
            placeholder="0.00"
            value={displayString}
            onChange={(e) => handleChange(e.target.value)}
          />
          <span className="font-baloo text-nowrap font-bold text-[3.5vw]">{renderTopBalanceLabel()}</span>
        </div>
        <h1 className="cursor-pointer hover:scale-110 absolute right-0 font-baloo font-medium text-white text-[4.5vw] mt-[2.5%]" onClick={() => handleBalanceClick('weeth')}>
          balance: {walletInfoLoading ? loadingElement() : formatBalance(renderTopBalance())}
        </h1>
      </div>
      <div className="w-[100%] h-[50%] border-t-2 border-[#FFCD00]">
        <div className="mx-auto w-[95%] h-[100%] py-[3.5%] relative">
          <h1 className="text-[4vw] text-white font-baloo font-medium mt-[2.5%]">Minimum tokens received</h1>
          <div className="h-[50%] w-[100%] mt-[2.5%] flex flex-row items-center justify-between border-2 border-black bg-slate-200 pr-[1%] pl-[3.5%]">
            <span className="font-baloo text-nowrap font-bold text-[5.5vw]">{outputTokensLoading ? loadingElement() : formatBalance(tradeOutput)}</span>
            <span className="font-baloo text-nowrap font-bold text-[3.5vw]">{renderBottomBalanceLabel()}</span>
          </div>
          <h1 className="cursor-pointer hover:scale-110 absolute right-0 font-baloo font-medium text-white text-[4.5vw] mt-[2.5%]" onClick={() => handleBalanceClick('blah')}>
            balance: {walletInfoLoading ? loadingElement() : formatBalance(renderBottomBalance())}
          </h1>
        </div>
      </div>
      { tradeOutput > 0 && <span className="absolute bottom-0 font-baloo font-medium left-[1%] z-50 text-white text-[3.5vw]">price impact: {formatBalance(priceImpact)}%</span> }
    </div>
  )
}