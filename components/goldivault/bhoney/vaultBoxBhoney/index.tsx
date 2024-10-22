"use client"

import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useGoldivault } from "../../../../providers"
import { Notification, TradeTab } from "../../"

export const VaultBoxBhoney = () => {

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
    burnPopupToggle,
    setBurnPopupToggle,
    expirePopupToggle,
    setExpirePopupToggle,
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
      calculateOTRedeem()
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
    <div className="absolute top-[15%] h-[52%] w-[80%] md:w-[70%] lg:w-[42%] left-[10%] md:left-[15%] lg:left-[29%]">
      <div className="relative w-[100%] h-[100%] bg-[#995816] border-2 border-[#FFCD00]">
        <div className="absolute top-2 left-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute top-2 right-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className={`absolute inset-4 bg-[#C8894A] border-2 border-[#FFCD00]`}>
          {
            txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
            notification.toggle ? <Notification /> :
            (activeToggle === 'TRADEOT' || activeToggle === 'TRADEYT') ?
            <TradeTab /> :
            <div className="relative w-[100%] h-[100%] flex flex-col">
              <div className="absolute top-[44%] left-[47.27%] bg-[#995816] z-10 h-10 w-10 border-2 border-[#FFCD00] rounded-3xl flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFCD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>
              <div className="mx-auto w-[75%] h-[50%] py-[3.5%] relative">
                <h1 className="text-[2.25vw] md:text-[2vw] lg:text-[1vw] text-white font-baloo font-medium mb-[2.5%]">
                  {renderTopLabel()}
                  { activeToggle === 'REDEEMOT' && <span className="ml-2 cursor-pointer hover:bg-black border-2 border-white rounded-full px-2" onClick={() => setBurnPopupToggle(!burnPopupToggle)}>?</span> }
                  { activeToggle === 'REDEEMYT' && <span className="ml-2 cursor-pointer hover:bg-black border-2 border-white rounded-full px-2" onClick={() => setExpirePopupToggle(!expirePopupToggle)}>?</span> }
                </h1>
                <div className="w-[100%] h-[50%] border-2 border-black bg-white flex flex-row items-center justify-between pr-[1%] pl-[3.5%]">
                  <input
                    className="h-[100%] w-full focus:outline-none border-none bg-transparent font-bold font-baloo text-[4vw] lg:text-[2vw]"
                    type="number"
                    id="number-input"
                    placeholder="0.00"
                    value={displayString}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <span className="font-baloo text-nowrap font-bold text-[2.5vw] md:text-[2vw] lg:text-[1vw]">{renderBalanceLabel()}</span>
                </div>
                <h1 className="cursor-pointer hover:scale-110 absolute right-0 font-baloo font-medium text-white text-[2.5vw] md:text-[2vw] lg:text-[1vw] mt-[2.5%] lg:mt-[1%]" onClick={() => handleBalanceClick('bhoney')}>
                  balance: {walletInfoLoading ? loadingElement() : formatBalance(renderBalance())}
                </h1>
              </div>
              <div className="w-[100%] h-[50%] border-t-2 border-[#FFCD00] py-[3.5%] px-[12.5%]">
                <div className="mb-[2.5%] flex flex-row justify-between">
                  <h1 className="text-[2.25vw] md:text-[2vw] lg:text-[1vw] text-white font-baloo font-medium">{activeToggle === 'REDEEMYT' ? "Tokens received" : "Estimated tokens received"}</h1>
                  {activeToggle === 'REDEEMOT' && <h1 className="text-[2.5vw] md:text-[2vw] lg:text-[1vw] text-white font-baloo font-medium">Estimated tokens burned</h1> }
                  {activeToggle === 'REDEEMYT' && <h1 className="text-[2.5vw] md:text-[2vw] lg:text-[1vw] text-white font-baloo font-medium">Estimated value</h1> }
                </div>
                {
                  activeToggle === 'REDEEMYT' ?
                  <div className="w-[100%] h-[50%] flex flex-row items-center justify-between">
                    <div className="h-[100%] w-[42.5%] flex flex-row items-center justify-around">
                      <div className="flex flex-col items-center">
                        <img className="h-10 w-10" src="/images/logo-ibgt.svg" alt="ibgt" />
                        <span className="text-[1.5vw] lg:text-[1vw] text-white font-baloo font-medium mt-[5%]">iBGT: {outputTokensLoading ? loadingElement() : redeemYTAmounts.ibgt > 0 ? redeemYTAmounts.ibgt.toFixed(4) : redeemYTAmounts.ibgt}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <img className="h-10 w-10" src="/images/logo-honey.png" alt="honey" />
                        <span className="text-[1.5vw] lg:text-[1vw] text-white font-baloo font-medium mt-[5%]">Honey: {handleHoneyAmount()}</span>
                      </div>
                    </div>
                    <div className="h-[100%] w-[47.5%] flex flex-row items-center justify-between border-2 border-black bg-slate-200 px-[3.5%]">
                      <span className="font-baloo text-nowrap font-bold text-[3vw] lg:text-[1.25vw]">{outputTokensLoading ? loadingElement() : redeemYTAmounts.value > 0 ? redeemYTAmounts.value.toFixed(4) : redeemYTAmounts.value}</span>
                    </div>
                  </div> :
                  <div className="w-[100%] h-[50%] flex flex-row items-center justify-between">
                    <div className="h-[100%] w-[47.5%] flex flex-row items-center justify-between border-2 border-black bg-slate-200 px-[3.5%]">
                      <span className="font-baloo text-nowrap font-bold text-[3vw] lg:text-[1.25vw]">{outputTokensLoading ? loadingElement() : formatBalance(otAmount)}</span>
                      <span className={`font-baloo text-nowrap font-bold ${activeToggle === 'REDEEMOT' ? "text-[2vw] lg:text-[1vw]" : "text-[2.25vw] lg:text-[1.25vw]"}`}>{activeToggle === 'DEPOSIT' ? "OT" : "HONEY"}</span>
                    </div>
                    <div className={`h-[100%] w-[47.5%] flex flex-row items-center justify-between border-2 border-black ${activeToggle === 'REDEEMOT' ? "bg-red-400" : "bg-slate-200"} px-[3.5%]`}>
                      <span className="font-baloo text-nowrap font-bold text-[3vw] lg:text-[1.25vw]">{outputTokensLoading ? loadingElement() : ytAmount > 0 ? ytAmount.toFixed(4) : ytAmount}</span>
                      <span className={`font-baloo text-nowrap font-bold ${activeToggle === 'REDEEMOT' ? "text-[2vw] lg:text-[1vw]" : "text-[2.25vw] lg:text-[1.25vw]"}`}>YT</span>
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