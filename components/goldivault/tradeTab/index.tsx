"use client"

import { useEffect } from "react"
import { useGoldivault } from "../../../providers"

type TradeTabProps = {
  params: {
    vaultToken: string;
  }
}

export const TradeTab = ({ params }: TradeTabProps) => {

  const {
    displayString,
    handleChange,
    walletInfoLoading,
    activeToggle,
    tradeDirection,
    goldivaultWalletInfoWeeth,
    goldivaultWalletInfoBhoney,
    goldivaultWalletInfoSolvbtc,
    goldivaultWalletInfoUnibtc,
    handleBalanceClick,
    outputTokensLoading,
    debouncedTradeInput,
    flipTokens,
    setTradeOutput,
    tradeOutput,
    setOutputTokensLoading,
    quoteV3Swap,
    changeSlippageToggle,
    priceImpact,
    impliedApr,
    enableInfoPopup,
    disableInfoPopup
  } = useGoldivault()

  const vaultOT =
    params.vaultToken === 'weeth' ? goldivaultWalletInfoWeeth.weot :
    params.vaultToken === 'bhoney' ? goldivaultWalletInfoBhoney.bhot :
    params.vaultToken === 'solvbtc' ? goldivaultWalletInfoSolvbtc.solvbtcot :
    params.vaultToken === 'unibtc' ? goldivaultWalletInfoUnibtc.unibtcot : {}

  const vaultYT = 
    params.vaultToken === 'weeth' ? goldivaultWalletInfoWeeth.weyt :
    params.vaultToken === 'bhoney' ? goldivaultWalletInfoBhoney.bhyt :
    params.vaultToken === 'solvbtc' ? goldivaultWalletInfoSolvbtc.solvbtcyt :
    params.vaultToken === 'unibtc' ? goldivaultWalletInfoUnibtc.unibtcyt : {}

  const vaultDT = 
    params.vaultToken === 'weeth' ? goldivaultWalletInfoWeeth.weeth :
    params.vaultToken === 'bhoney' ? goldivaultWalletInfoBhoney.honey :
    params.vaultToken === 'solvbtc' ? goldivaultWalletInfoSolvbtc.solvbtc :
    params.vaultToken === 'unibtc' ? goldivaultWalletInfoUnibtc.unibtc : {}

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>
  }

  const formatBalance = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 })
  }

  const getVaultType = (vault: string): string => {
    if(vault === 'weeth') {
      return 'eth'
    }
    else if(vault === 'rseth') {
      return 'eth'
    }
    else if(vault === 'ebtc') {
      return 'btc'
    }
    else if (vault === 'unibtc') {
      return 'btc'
    }
    else {
      return 'eth'
    }
  }

  useEffect(() => {
    if(debouncedTradeInput > 0) {
      quoteV3Swap(params.vaultToken, getVaultType(params.vaultToken))
    }
    else {
      setTradeOutput(0)
      setOutputTokensLoading(false)
    }
  }, [debouncedTradeInput])

  const renderTopBalance = () => {
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        return vaultOT
      }
      else {
        return vaultDT
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        return vaultYT
      }
      else {
        return vaultDT
      }
    }
  }

  const renderBottomBalance = () => {
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        return vaultDT
      }
      else {
        return vaultOT
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        return vaultDT
      }
      else {
        return vaultYT
      }
    }
  }

  const renderTopBalanceLabel = (): string => {
    if(params.vaultToken === 'weeth') {
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
    else if(params.vaultToken === 'solvbtc') {
      if(activeToggle === 'TRADEOT') {
        if(tradeDirection === 'OUT') {
          return 'solvBTCOT'
        }
        else {
          return 'solvBTC'
        }
      }
      else {
        if(tradeDirection === 'OUT') {
          return 'solvBTCYT'
        }
        else {
          return 'solvBTC'
        }
      }
    }
    else if(params.vaultToken === 'unibtc') {
      if(activeToggle === 'TRADEOT') {
        if(tradeDirection === 'OUT') {
          return 'uniBTCOT'
        }
        else {
          return 'uniBTC'
        }
      }
      else {
        if(tradeDirection === 'OUT') {
          return 'uniBTCYT'
        }
        else {
          return 'uniBTC'
        }
      }
    }
    else {
      if(activeToggle === 'TRADEOT') {
        if(tradeDirection === 'OUT') {
          return 'BHOT'
        }
        else {
          return 'honey'
        }
      }
      else {
        if(tradeDirection === 'OUT') {
          return 'BHYT'
        }
        else {
          return 'honey'
        }
      }
    }
  }

  const renderBottomBalanceLabel = (): string => {
    if(params.vaultToken === 'weeth') {
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
    else if(params.vaultToken === 'solvbtc') {
      if(activeToggle === 'TRADEOT') {
        if(tradeDirection === 'OUT') {
          return 'solvBTC'
        }
        else {
          return 'solvBTCOT'
        }
      }
      else {
        if(tradeDirection === 'OUT') {
          return 'solvBTC'
        }
        else {
          return 'solvBTCYT'
        }
      }
    }
    else if(params.vaultToken === 'unibtc') {
      if(activeToggle === 'TRADEOT') {
        if(tradeDirection === 'OUT') {
          return 'uniBTC'
        }
        else {
          return 'uniBTCOT'
        }
      }
      else {
        if(tradeDirection === 'OUT') {
          return 'uniBTC'
        }
        else {
          return 'uniBTCYT'
        }
      }
    }
    else {
      if(activeToggle === 'TRADEOT') {
        if(tradeDirection === 'OUT') {
          return 'honey'
        }
        else {
          return 'BHOT'
        }
      }
      else {
        if(tradeDirection === 'OUT') {
          return 'honey'
        }
        else {
          return 'BHYT'
        }
      }
    }
  }

  return (
    <div className="relative w-[100%] h-[100%] flex flex-col">
      <img 
        className="absolute h-6 w-6 lg:h-7 lg:w-7 top-[16%] lg:top-[5%] left-[89%] lg:left-[87.5%] cursor-pointer hover:scale-125" 
        src="/images/icon-settings.png" 
        alt="settings"
        onClick={() => changeSlippageToggle(true)}
      />
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
        <h1 className="cursor-pointer hover:scale-110 absolute right-0 font-baloo font-medium text-white text-[2.5vw] md:text-[2vw] lg:text-[1vw] mt-[2.5%] lg:mt-[1%]" onClick={() => handleBalanceClick(params.vaultToken)}>
          balance: {walletInfoLoading ? loadingElement() : formatBalance(renderTopBalance())}
        </h1>
      </div>
      <div className="w-[100%] h-[50%] border-t-2 border-[#FFCD00] py-[3.5%] px-[12.5%]">
        <h1 className="text-[2.5vw] md:text-[2vw] lg:text-[1vw] text-white font-baloo font-medium mb-[2.5%]">
          { activeToggle === 'TRADEOT' ? "Minimum tokens received" : "Predicted Output" }
        </h1>
        <div className="h-[50%] w-[100%] flex flex-row items-center justify-between border-2 border-black bg-slate-200 pr-[1%] pl-[3.5%]">
          <span className="font-baloo text-nowrap font-bold text-[4vw] lg:text-[2vw]">{outputTokensLoading ? loadingElement() : formatBalance(tradeOutput)}</span>
          <span className="font-baloo text-nowrap font-bold text-[2.5vw] md:text-[2vw] lg:text-[1vw]">{renderBottomBalanceLabel()}</span>
        </div>
        <h1 className="cursor-pointer hover:scale-110 absolute right-0 font-baloo font-medium text-white text-[2.5vw] md:text-[2vw] lg:text-[1vw] mt-[2.5%] lg:mt-[1%] pr-[12.5%]" onClick={() => handleBalanceClick('blah')}>
          balance: {walletInfoLoading ? loadingElement() : formatBalance(renderBottomBalance())}
        </h1>
      </div>
      {
        tradeOutput > 0 &&
        <div className="flex flex-col absolute bottom-0 font-baloo font-medium left-[1%] z-50 text-white text-[1.5vw] lg:text-[0.8vw]">
          <span
            className="cursor-pointer hover:text-gray-400"
            onMouseEnter={() => enableInfoPopup('impliedapr')}
            onMouseLeave={() => disableInfoPopup('impliedapr')}
          >
            implied apr: {formatBalance(impliedApr)}%
          </span>
          <span>predicted price impact: {formatBalance(priceImpact)}%</span>
        </div>
      }
    </div>
  )
}