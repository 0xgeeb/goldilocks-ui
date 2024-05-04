"use client"

import { useState, useEffect } from "react"
import { useGoldiswap, useWallet } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath"
import { Chart, Notification } from "../../goldiswap"

export const SwapBox = () => {

  const [bottomAmountLoading, setBottomAmountLoading] = useState<boolean>(false)
  
  const {
    chartOpen,
    displayString,
    handleTopChange,
    bottomDisplayString,
    activeToggle,
    sellingLocks,
    redeemingLocks,
    debouncedHoneyBuy,
    setDisplayString,
    setBottomDisplayString,
    setHoneyBuy,
    setSellingLocks,
    setRedeemingLocks,
    flipTokens,
    findLocksBuyAmount,
    simulateBuy,
    simulateSell,
    simulateRedeem,
    goldiswapInfo,
    infoLoading,
    handleTopBalance,
    handleBottomBalance,
    slippage,
    handlePercentageButtons,
    setSimInfo,
    txConfirming,
    notification,
    setGettingHoney,
    setRedeemingHoney
  } = useGoldiswap()

  const { balance, balancesLoading } = useWallet()

  const { 
    floorPrice,
    marketPrice,
    simulateBuyDry,
    simulateSellDry
  } = useGoldiswapMath()

  const resetInfo = () => {
    setDisplayString('')
    setBottomDisplayString('')
    setHoneyBuy(0)
    setSellingLocks(0)
    setRedeemingLocks(0)
    setBottomAmountLoading(false)
    setSimInfo(false, goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply)
  }

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>
  }

  const formatAsPercentage = Intl.NumberFormat('default', {
    style: 'percent',
    maximumFractionDigits: 2
  })

  const handleRatioInfo = (num: number) => {
    if(infoLoading) {
      return "-"
    }
    else if(num > 0) {
      return formatAsPercentage.format(num)
    }
    else {
      return "-"
    }
  }

  const loadedLocks = async (dhb: number) => {
    setBottomAmountLoading(true)
    setTimeout(() => {
      const locksAmount: number = findLocksBuyAmount(dhb)
      simulateBuy(locksAmount)
      setBottomAmountLoading(false)
    }, 500)
  }

  useEffect(() => {
    if(!debouncedHoneyBuy) {
      resetInfo()
    }
    else {
      loadedLocks(debouncedHoneyBuy)
    }
  }, [debouncedHoneyBuy])

  useEffect(() => {
    if(!sellingLocks) {
      resetInfo()
    }
    else {
      simulateSell(sellingLocks)
      setGettingHoney(simulateSellDry(sellingLocks, goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply) * (1 - (slippage.amount / 100)))
      setBottomDisplayString((simulateSellDry(sellingLocks, goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply) * (1 - (slippage.amount / 100))).toFixed(4))
    }
  }, [sellingLocks])

  useEffect(() => {
    if(!redeemingLocks) {
      resetInfo()
    }
    else {
      simulateRedeem(redeemingLocks)
      setBottomDisplayString((redeemingLocks * floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply)).toFixed(4))
      setRedeemingHoney(redeemingLocks * floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply))
    }
  }, [redeemingLocks])

  return (
    <div className="absolute top-[12.167%] left-[28.125%] w-[43.75%] h-[48.87%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <span className="absolute bottom-[23%] left-[-7.5%] -rotate-[90deg] text-[0.8vw] font-baloo font-semibold">**0.3% fee on all buys**</span>
      {/* todo: not looking perfect on large screen */}
      <span 
        className="absolute top-[13%] right-[2.9%] transform -translate-y-1/2 -rotate-[90deg] text-[0.8vw] font-baloo font-semibold"
        style={{ transformOrigin: 'top right' }}
      >
        target ratio: {handleRatioInfo(goldiswapInfo.targetRatio)}
      </span>
      <div className={`absolute inset-6 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          chartOpen ? <Chart /> :
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
          notification.toggle ? <Notification /> :
          <div className="w-[100%] h-[100%] relative flex flex-col">
            <div className="flex flex-row absolute top-0 right-0 w-[33.61%] h-[10%] font-baloo font-semibold border-b-2 border-l-2 border-black">
              <div 
                className="flex flex-row items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#DCC2A8] hover:bg-[#F3AA8A] cursor-pointer"
                onClick={() => handlePercentageButtons(1)}
              >
                  25%
              </div>
              <div 
                className="flex flex-row items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#D5A774] hover:bg-[#F3AA8A] cursor-pointer"
                onClick={() => handlePercentageButtons(2)}
              >
                  50%
              </div>
              <div 
                className="flex flex-row items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#D19A5B] hover:bg-[#F3AA8A] cursor-pointer"
                onClick={() => handlePercentageButtons(3)}
              >
                  75%
              </div>
              <div 
                className="flex flex-row items-center justify-center h-[100%] w-[25%] bg-[#CC8634] hover:bg-[#F3AA8A] cursor-pointer"
                onClick={() => handlePercentageButtons(4)}
              >
                  MAX
              </div>
            </div>
            <img className="absolute h-6 w-6 top-[16%] left-[79%]" src="/images/icon-settings.png" alt="settings" />
            <div 
              className="absolute top-[44%] left-[47.27%] bg-[#D9C6BA] z-10 h-10 w-10 border-2 border-black rounded-3xl flex justify-center items-center cursor-pointer hover:scale-110"
              onClick={() => flipTokens()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D111C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </div>
            <div className="w-[100%] h-[50%] border-b-2 border-black">
              <div className="absolute flex flex-row top-[21%] left-[3%] items-center">
                <img className="h-8 w-8" src={`/images/logo-${activeToggle === "buy" ? "honey" : "locks"}.png`} alt="coinlogo" />
                <h1 className="font-baloo font-semibold text-[1.4vw] ml-3">{activeToggle === "buy" ? "HONEY" : "LOCKS"}</h1>
              </div>
              <div className="absolute h-[22%] w-[55.6%] top-[15%] left-[22%] border-2 border-black bg-white">
                <div className="relative h-[100%] w-[100%]">
                  <input
                    className="absolute top-[21%] left-[5%] focus:outline-none border-none bg-transparent font-bold font-baloo text-[1.6vw]"
                    type="number"
                    id="number-input"
                    placeholder="0.00"
                    value={displayString}
                    onChange={(e) => handleTopChange(e.target.value)}
                  />
                  <span className="absolute bottom-[3%] right-[3%] font-baloo font-bold text-[0.9vw] text-[#7F7F7F]">balance: {balancesLoading ? loadingElement() : handleTopBalance()}</span>
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[50%]">
              <div className="absolute flex flex-row top-[71%] left-[3%] items-center">
                <img className="h-8 w-8" src={`/images/logo-${activeToggle === "buy" ? "locks" : "honey"}.png`} alt="coinlogo" />
                <h1 className="font-baloo font-semibold text-[1.4vw] ml-3">{activeToggle === "buy" ? "LOCKS" : "HONEY"}</h1>
              </div>
              <div className="absolute h-[22%] w-[55.6%] top-[65%] left-[22%] border-2 border-black bg-white">
                <div className="relative h-[100%] w-[100%]">
                  {
                    bottomAmountLoading ?
                    <span className="absolute top-[40%] left-[8%] loader-small"></span> :
                    <input
                      className="absolute top-[20%] left-[5%] focus:outline-none border-none bg-transparent font-bold font-baloo text-[1.6vw]"
                      type="number"
                      id="number-input"
                      placeholder="0.00"
                      value={bottomDisplayString}
                      disabled={true}
                    />
                  }

                  <span className="absolute bottom-[3%] right-[3%] font-baloo font-bold text-[0.9vw] text-[#7F7F7F]">balance: {balancesLoading ? loadingElement() : handleBottomBalance()}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}