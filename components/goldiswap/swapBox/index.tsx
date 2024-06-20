"use client"

import { useState, useEffect } from "react"
import { useGoldiswap, useWallet } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath"
import { Notification, Chart } from "../../goldiswap"

export const SwapBox = () => {

  const [topAmountLoading, setTopAmountLoading] = useState<boolean>(false)
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
    setRedeemingHoney,
    changeSlippageToggle,
    topInputFlag,
    bottomInputFlag,
    setTopInputFlag,
    setBottomInputFlag,
    buyingLocks,
    debouncedGettingHoney,
    findLocksSellAmount,
    setBuyingLocks,
    redeemingHoney,
    handleBottomChange
  } = useGoldiswap()

  const { balancesLoading } = useWallet()

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
    setBuyingLocks(0)
    setGettingHoney(0)
    setSellingLocks(0)
    setRedeemingHoney(0)
    setRedeemingLocks(0)
    setTopAmountLoading(false)
    setBottomAmountLoading(false)
    setSimInfo(false, goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply, floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply), marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply), goldiswapInfo.targetRatio)
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

  //todo: this affects the honey not the locks as users assume
  useEffect(() => {
    if(activeToggle === 'BUY') {
      if(debouncedHoneyBuy > 0) {
        loadedLocks(debouncedHoneyBuy)
      }
    }
    else if(activeToggle === 'SELL') {
      setGettingHoney(simulateSellDry(sellingLocks, goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply) * (1 - (slippage.amount / 100)))
      setBottomDisplayString((simulateSellDry(sellingLocks, goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply) * (1 - (slippage.amount / 100))).toFixed(4))
    }
  }, [slippage.amount])

  useEffect(() => {
    if(!bottomInputFlag) {
      if(!debouncedHoneyBuy) {
        resetInfo()
      }
      else {
        setTopInputFlag(true)
        loadedLocks(debouncedHoneyBuy)
      }
    }
  }, [debouncedHoneyBuy])

  useEffect(() => {
    if(!topInputFlag) {
      const locksWithSlippage: number = buyingLocks * (1 + (slippage.amount / 100))
      if(!buyingLocks) {
        resetInfo()
      }
      else {
        setBottomInputFlag(true)
        !slippage.toggle && setDisplayString(simulateBuyDry(locksWithSlippage, goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply).toFixed(4))
        !slippage.toggle && setHoneyBuy(simulateBuyDry(locksWithSlippage, goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply))
        simulateBuy(locksWithSlippage)
      }
    }
  }, [buyingLocks])

  useEffect(() => {
    if(!bottomInputFlag) {
      if(!sellingLocks) {
        resetInfo()
      }
      else {
        setTopInputFlag(true)
        simulateSell(sellingLocks)
        setGettingHoney(simulateSellDry(sellingLocks, goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply) * (1 - (slippage.amount / 100)))
        setBottomDisplayString((simulateSellDry(sellingLocks, goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply) * (1 - (slippage.amount / 100))).toFixed(4))
      }
    }
  }, [sellingLocks])

  useEffect(() => {
    if(!topInputFlag) {
      if(!debouncedGettingHoney) {
        resetInfo()
      }
      else {
        setBottomInputFlag(true)
        setTopAmountLoading(true)
        setTimeout(() => {
          const locksAmountWithSlippage: number = findLocksSellAmount(debouncedGettingHoney) * (1 + (slippage.amount / 100))
          const locksAmount: number = locksAmountWithSlippage
          !slippage.toggle && setDisplayString(locksAmount.toFixed(4))
          !slippage.toggle && setSellingLocks(locksAmount)
          simulateSell(locksAmount)
          setTopAmountLoading(false)
        }, 500)
      }
    }
  }, [debouncedGettingHoney])

  useEffect(() => {
    if(!bottomInputFlag) {
      if(!redeemingLocks) {
        resetInfo()
      }
      else {
        setTopInputFlag(true)
        simulateRedeem(redeemingLocks)
        setBottomDisplayString((redeemingLocks * floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply)).toFixed(4))
        setRedeemingHoney(redeemingLocks * floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply))
      }
    }
  }, [redeemingLocks])

  useEffect(() => {
    if(!topInputFlag) {
      if(!redeemingHoney) {
        resetInfo()
      }
      else {
        setBottomInputFlag(true)
        simulateRedeem(redeemingHoney / (goldiswapInfo.fsl / goldiswapInfo.supply))
        setDisplayString((redeemingHoney / (goldiswapInfo.fsl / goldiswapInfo.supply)).toFixed(4))
        setRedeemingLocks(redeemingHoney / (goldiswapInfo.fsl / goldiswapInfo.supply))
      }
    }
  }, [redeemingHoney])

  return (
    <div className="absolute top-[18%] md:top-[16%] lg:top-[15%] xl:top-[10.12%] left-[10%] md:left-[20%] lg:left-[25%] 2xl:left-[28.125%] w-[80%] md:w-[60%] lg:w-[50%] 2xl:w-[43.75%] h-[48.87%] xl:h-[55.25%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-6 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          chartOpen ? <Chart /> :
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
          notification.toggle ? <Notification /> :
          <div className="w-[100%] h-[100%] relative flex flex-col">
            <div className="flex flex-row absolute top-0 right-0 w-[50%] lg:w-[42%] 2xl:w-[33.61%] h-[10%] text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.25vw] 2xl:text-[1vw] font-baloo font-semibold border-b-2 border-l-2 border-black">
              <div 
                className="flex items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#DCC2A8] hover:bg-[#F3AA8A] cursor-pointer"
                onClick={() => handlePercentageButtons(1)}
              >
                25%
              </div>
              <div 
                className="flex items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#D5A774] hover:bg-[#F3AA8A] cursor-pointer"
                onClick={() => handlePercentageButtons(2)}
              >
                50%
              </div>
              <div 
                className="flex items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#D19A5B] hover:bg-[#F3AA8A] cursor-pointer"
                onClick={() => handlePercentageButtons(3)}
              >
                75%
              </div>
              <div 
                className="flex items-center justify-center h-[100%] w-[25%] bg-[#CC8634] hover:bg-[#F3AA8A] cursor-pointer"
                onClick={() => handlePercentageButtons(4)}
              >
                MAX
              </div>
            </div>
            <img 
              className="absolute h-6 w-6 lg:h-7 lg:w-7 top-[16%] left-[89%] lg:left-[79%] cursor-pointer hover:scale-125" 
              src="/images/icon-settings.png" 
              alt="settings"
              onClick={() => changeSlippageToggle(true)}
            />
            <div 
              className="absolute top-[44%] left-[47.27%] bg-[#D9C6BA] z-10 h-10 w-10 border-2 border-black rounded-3xl flex justify-center items-center cursor-pointer hover:scale-110"
              onClick={() => flipTokens()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D111C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </div>
            <div className="w-[100%] h-[50%] border-b-2 border-black">
              <div className="absolute flex flex-row top-[21%] left-[1%] sm:left-[2%] xl:left-[3%] items-center">
                <img className="h-6 md:h-8 w-6 md:w-8" src={`/images/logo-${activeToggle === "BUY" ? "honey" : "locks"}.png`} alt="coinlogo" />
                <h1 className="font-baloo font-semibold text-[3vw] md:text-[2.4vw] lg:text-[1.4vw] ml-1 lg:ml-3">{activeToggle === "BUY" ? "HONEY" : "LOCKS"}</h1>
              </div>
              <div className="absolute h-[25%] lg:h-[22%] w-[60%] lg:w-[55.6%] top-[15%] left-[26%] lg:left-[22%] border-2 border-black bg-white">
                <div className="relative h-[100%] w-[100%]">
                  {
                    topAmountLoading ?
                    <span className="absolute top-[40%] left-[8%] loader-small"></span> : 
                    <input
                      className="absolute top-[15%] xl:top-[17%] left-[5%] w-[90%] focus:outline-none border-none bg-transparent font-bold font-baloo text-[5.5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[2.5vw] 2xl:text-[2vw]"
                      type="number"
                      id="number-input"
                      placeholder="0.00"
                      value={displayString}
                      onChange={(e) => handleTopChange(e.target.value)}
                    />
                  }
                  <span className="absolute bottom-0 right-[3%] font-baloo font-bold text-[2.5vw] md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw] text-[#7F7F7F]">balance: {balancesLoading ? loadingElement() : handleTopBalance()}</span>
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[50%]">
              <div className="absolute flex flex-row top-[71%] left-[1%] sm:left-[2%] xl:left-[3%] items-center">
                <img className="h-6 md:h-8 w-6 md:w-8" src={`/images/logo-${activeToggle === "BUY" ? "locks" : "honey"}.png`} alt="coinlogo" />
                <h1 className="font-baloo font-semibold text-[3vw] md:text-[2.4vw] lg:text-[1.4vw] ml-1 lg:ml-3">{activeToggle === "BUY" ? "LOCKS" : "HONEY"}</h1>
              </div>
              <div className="absolute h-[25%] lg:h-[22%] w-[60%] lg:w-[55.6%] top-[65%] left-[26%] lg:left-[22%] border-2 border-black bg-white">
                <div className="relative h-[100%] w-[100%]">
                  {
                    bottomAmountLoading ?
                    <span className="absolute top-[40%] left-[8%] loader-small"></span> :
                    <input
                      className="absolute top-[15%] xl:top-[17%] left-[5%] w-[90%] focus:outline-none border-none bg-transparent font-bold font-baloo text-[5.5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[2.5vw] 2xl:text-[2vw]"
                      type="number"
                      id="number-input"
                      placeholder="0.00"
                      value={bottomDisplayString}
                      onChange={(e) => handleBottomChange(e.target.value)}
                    />
                  }
                  <span className="absolute bottom-0 right-[3%] font-baloo font-bold text-[2.5vw] md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw] text-[#7F7F7F]">balance: {balancesLoading ? loadingElement() : handleBottomBalance()}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}