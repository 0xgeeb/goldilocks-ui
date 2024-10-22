"use client"

import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useGoldivault } from "../../../providers"

export const VaultBoxMobile = () => {

  // const {
  //   activeToggle,
  //   debouncedDeposit,
  //   setOtAmount,
  //   setYtAmount,
  //   setOutputTokensLoading,
  //   debouncedRedeemOT,
  //   calculateDeposit,
  //   calculateOTRedeem,
  //   goldivaultWalletInfo
  // } = useGoldivault()

  // useEffect(() => {
  //   if(debouncedDeposit > 0) {
  //     calculateDeposit()
  //   }
  //   else {
  //     setOtAmount(0)
  //     setYtAmount(0)
  //   }
  //   setOutputTokensLoading(false)
  // }, [debouncedDeposit])

  // useEffect(() => {
  //   if(debouncedRedeemOT > 0) {
  //     calculateOTRedeem()
  //   }
  //   else {
  //     setOtAmount(0)
  //     setYtAmount(0)
  //   }
  //   setOutputTokensLoading(false)
  // }, [debouncedRedeemOT])

  // const renderTopLabel = (): string => {
  //   if(activeToggle === 'DEPOSIT') {
  //     return 'Deposit Tokens'
  //   }
  //   else if(activeToggle === 'REDEEMOT') {
  //     return 'Redeem Ownership Tokens & Burn Yield Tokens'
  //   }
  //   else {
  //     return 'Redeem Yield Tokens'
  //   }
  // }

  // const renderBalance = () => {
  //   if(activeToggle === 'DEPOSIT') {
  //     return goldivaultWalletInfo.honeyWberaLP
  //   }
  //   else if(activeToggle === 'REDEEMOT') {
  //     return goldivaultWalletInfo.hwbot
  //   }
  //   else {
  //     return goldivaultWalletInfo.hwbyt
  //   }
  // }

  // const renderBalanceLabel = (): string => {
  //   if(activeToggle === 'DEPOSIT') {
  //     return 'HONEY-WBERA LP'
  //   }
  //   else if(activeToggle === 'REDEEMOT') {
  //     return 'HONEY-WBERA OT'
  //   }
  //   else {
  //     return 'HONEY-WBERA YT'
  //   }
  // }

  return (
    <div className="absolute top-[7.5%] left-[15.5%] h-[62.5%] w-[69%]">
      {/* <div className="relative w-[100%] h-[100%] bg-[#995816] border-2 border-[#FFCD00]">
      <div className="absolute top-1 left-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute top-1 right-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className={`absolute inset-2 bg-[#C8894A] border-2 border-[#FFCD00]`}>
          {
            // txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
            // notification.toggle ? <Notification /> :
            <div className="relative w-[100%] h-[100%] flex flex-col">
              <div className="absolute top-[45%] left-[42.5%] bg-[#995816] z-10 h-10 w-10 border-2 border-[#FFCD00] rounded-3xl flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFCD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>
              <div className="mx-auto w-[95%] h-[50%] py-[3.5%] relative">
                <h1 className="text-white font-baloo font-medium text-[4vw]">
                  { renderTopLabel() }
                  { activeToggle === 'REDEEMOT' && <span></span> }
                </h1>
              </div>
            </div>
          }
        </div>
      </div> */}
    </div>
  )
}
