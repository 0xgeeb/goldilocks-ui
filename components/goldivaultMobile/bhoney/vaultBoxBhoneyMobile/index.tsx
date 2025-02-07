"use client"

import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useGoldivault } from "../../../../providers"
import { VaultInfoBhoneyMobile } from "../"
import {
  NotificationMobile,
  PoolsPopupMobile,
  TradeTabMobile
} from "../../"

export const VaultBoxBhoneyMobile = () => {

  const {
    displayString,
    handleChange,
    handleBalanceClick,
    debouncedDeposit,
    debouncedRedeemOT,
    calculateDeposit,
    calculateYTRedeem,
    debouncedRedeemYT,
    outputTokensLoading,
    setOutputTokensLoading,
    otAmount,
    ytAmount,
    setOtAmount,
    setYtAmount,
    txConfirming,
    refreshGoldivaultInfoBhoney,
    refreshGoldivaultWalletInfoBhoney,
    activeToggle,
    goldivaultWalletInfoBhoney,
    calculateOTRedeem,
    notification,
    walletInfoLoading,
    redeemYTAmounts,
    resetYTAmounts
  } = useGoldivault()

  const { isConnected } = useAccount()

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>
  }

  const formatBalance = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 })
  }

  useEffect(() => {
    refreshGoldivaultInfoBhoney()
    refreshGoldivaultWalletInfoBhoney()
  }, [isConnected])

  useEffect(() => {
    if(debouncedDeposit > 0) {
      calculateDeposit('bhoney')
    }
    else {
      setOtAmount(0)
      setYtAmount(0)
      setOutputTokensLoading(false)
    }
  }, [debouncedDeposit])

  useEffect(() => {
    if(debouncedRedeemOT > 0) {
      // calculateOTRedeem()
    }
    else {
      setOtAmount(0)
      setYtAmount(0)
      setOutputTokensLoading(false)
    }
  }, [debouncedRedeemOT])

  useEffect(() => {
    if(debouncedRedeemYT > 0) {
      calculateYTRedeem()
    }
    else {
      resetYTAmounts()
      setOutputTokensLoading(false)
    }
  }, [debouncedRedeemYT])

  const renderTopLabel = (): string => {
    if(activeToggle === 'DEPOSIT') {
      return 'Deposit Tokens'
    }
    else if(activeToggle === 'REDEEMOT') {
      return 'Redeem Ownership Tokens & Burn Yield Tokens'
    }
    else {
      return 'Redeem Yield Tokens'
    }
  }

  const renderBalance = () => {
    if(activeToggle === 'DEPOSIT') {
      return goldivaultWalletInfoBhoney.honey
    }
    else if(activeToggle === 'REDEEMOT') {
      return goldivaultWalletInfoBhoney.bhot
    }
    else {
      return goldivaultWalletInfoBhoney.bhyt
    }
  }

  const renderBalanceLabel = (): string => {
    if(activeToggle === 'DEPOSIT') {
      return 'HONEY'
    }
    else if(activeToggle === 'REDEEMOT') {
      return 'BHONEY OT'
    }
    else {
      return 'BHONEY YT'
    }
  }

  const handleHoneyAmount = () => {
    if(outputTokensLoading) {
      return loadingElement()
    }
    else if(redeemYTAmounts.honey > 0) {
      return redeemYTAmounts.honey.toFixed(4)
    }
    else {
      return 0
    }
  }

  return (
    <div className="absolute top-[15%] left-[5%] h-[57.5%] w-[90%]">
      <div className="relative w-[100%] h-[100%] bg-[#995816] border-2 border-[#FFCD00]">
      <div className="absolute top-1 left-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute top-1 right-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className={`absolute inset-2 bg-[#C8894A] border-2 border-[#FFCD00]`}>
          {
            txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
            notification.toggle ? <NotificationMobile /> :
            (activeToggle === 'TRADEOT' || activeToggle === 'TRADEYT') ?
            <TradeTabMobile /> :
            activeToggle === 'INFO' ?
            <VaultInfoBhoneyMobile /> :
            activeToggle === 'POOLS' ?
            <PoolsPopupMobile /> :
            <div className="relative w-[100%] h-[100%] flex flex-col">
              <div className="absolute top-[45%] left-[42.5%] bg-[#995816] z-10 h-10 w-10 border-2 border-[#FFCD00] rounded-3xl flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFCD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>
              <div className="mx-auto w-[95%] h-[50%] py-[3.5%] relative">
                <h1 className="text-white font-baloo font-medium text-[4vw]">{ renderTopLabel() }</h1>
                <div className="w-[100%] h-[50%] mt-[5%] border-2 border-black bg-white flex flex-row items-center justify-between pr-[1%] pl-[3.5%]">
                  <input
                    className="h-[100%] w-full focus:outline-none border-none bg-transparent font-bold font-baloo text-[5.5vw]"
                    type="number"
                    id="number-input"
                    placeholder="0.00"
                    value={displayString}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <span className="font-baloo text-nowrap font-bold text-[3.5vw]">{renderBalanceLabel()}</span>
                </div>
                <h1 className="absolute right-0 font-baloo font-medium text-white text-[4.5vw] mt-[2.5%]" onClick={() => handleBalanceClick('bhoney')}>
                  balance: {walletInfoLoading ? loadingElement() : formatBalance(renderBalance())}
                </h1>
              </div>
              <div className="w-[100%] h-[50%] border-t-2 border-[#FFCD00] p-[3.5%]">
                <div className="mt-[2.5%] flex flex-row justify-between">
                  <h1 className={`${activeToggle === 'REDEEMOT' ? "text-[3vw]" : "text-[4vw]"} text-white font-baloo font-medium`}>{activeToggle === 'REDEEMYT' ? "Tokens received" : "Estimated tokens received"}</h1>
                  {activeToggle === 'REDEEMOT' && <h1 className="text-[3vw] text-white font-baloo font-medium">Estimated tokens burned</h1> }
                  {/* {activeToggle === 'REDEEMYT' && <h1 className="text-[2.5vw] md:text-[2vw] lg:text-[1vw] text-white font-baloo font-medium">Estimated value</h1> } */}
                </div>
                {
                  activeToggle === 'REDEEMYT' ?
                  <div className="w-[100%] h-[50%] flex flex-row items-center justify-between">
                    <div className="h-[100%] w-[100%] flex flex-row items-center justify-around">
                      <div className="flex flex-col mt-[10%] items-center">
                        <img className="h-10 w-10" src="/images/logo-porridge.png" alt="prg" />
                        <span className="text-[4vw] text-white font-baloo font-medium mt-[10%]">PRG: {outputTokensLoading ? loadingElement() : redeemYTAmounts.ibgt > 0 ? redeemYTAmounts.ibgt.toFixed(4) : redeemYTAmounts.ibgt}</span>
                      </div>
                      {/* <div className="flex flex-col items-center">
                        <img className="h-10 w-10" src="/images/logo-honey.png" alt="honey" />
                        <span className="text-[1.5vw] lg:text-[1vw] text-white font-baloo font-medium mt-[5%]">Honey: {handleHoneyAmount()}</span>
                      </div> */}
                    </div>
                    {/* <div className="h-[100%] w-[47.5%] flex flex-row items-center justify-between border-2 border-black bg-slate-200 px-[3.5%]">
                      <span className="font-baloo text-nowrap font-bold text-[3vw] lg:text-[1.25vw]">{outputTokensLoading ? loadingElement() : redeemYTAmounts.value > 0 ? redeemYTAmounts.value.toFixed(4) : redeemYTAmounts.value}</span>
                    </div> */}
                  </div> :
                  <div className="w-[100%] h-[50%] mt-[5%] flex flex-row items-center justify-between">
                    <div className="h-[100%] w-[47.5%] flex flex-row items-center justify-between border-2 border-black bg-slate-200 px-[1%]">
                      <span className="font-baloo text-nowrap font-bold text-[4.5vw]">{outputTokensLoading ? loadingElement() : formatBalance(otAmount)}</span>
                      <span className={`font-baloo text-nowrap font-bold ${activeToggle === 'REDEEMOT' ? "text-[3.5vw]" : "text-[4vw]"}`}>{activeToggle === 'DEPOSIT' ? "OT" : "HONEY"}</span>
                    </div>
                    <div className={`h-[100%] w-[47.5%] flex flex-row items-center justify-between border-2 border-black ${activeToggle === 'REDEEMOT' ? "bg-red-400" : "bg-slate-200"} px-[1%]`}>
                      <span className="font-baloo text-nowrap font-bold text-[4.5vw]">{outputTokensLoading ? loadingElement() : ytAmount > 0 ? ytAmount.toFixed(4) : ytAmount}</span>
                      <span className={`font-baloo text-nowrap font-bold ${activeToggle === 'REDEEMOT' ? "text-[3.5vw]" : "text-[4vw]"}`}>YT</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
