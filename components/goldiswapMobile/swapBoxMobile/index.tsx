"use client"

import { useState, useEffect } from "react"
import { useGoldiswap, useWallet } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath"
import {
  ChartMobile,
  NotificationMobile,
  WalletBalanceMobilePopup
} from "../"

export const SwapBoxMobile = () => {

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
    topInputFlag,
    bottomInputFlag,
    setTopInputFlag,
    setBottomInputFlag,
    buyingLocks,
    debouncedGettingHoney,
    findLocksSellAmount,
    setBuyingLocks,
    redeemingHoney,
    handleBottomChange,
    balanceMobileToggle,
    setBuyingLocksLoading
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
    setBuyingLocksLoading(true)
    setTimeout(() => {
      const locksAmount: number = findLocksBuyAmount(dhb)
      simulateBuy(locksAmount)
      setBottomAmountLoading(false)
      setBuyingLocksLoading(false)
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
    <div className="absolute top-[4.6%] left-[15.5%] w-[69%] h-[55%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      {/* <span className="z-10 absolute top-[0%] right-[6%] text-[2.2vw] font-baloo font-semibold">
        **0.3% fee on all buys**
      </span>
      <span className="z-10 absolute bottom-[-0.2%] left-[6%] text-[2.2vw] font-baloo font-semibold">
        target ratio: {handleRatioInfo(goldiswapInfo.targetRatio)}
      </span> */}
      <div className={`absolute inset-3 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          chartOpen ? <ChartMobile /> :
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile.png" alt="tx" /> :
          notification.toggle ? <NotificationMobile /> :
          balanceMobileToggle ? <WalletBalanceMobilePopup /> :
          <div className="w-[100%] h-[100%] relative flex flex-col">
            <div className="w-[100%] h-[8%] flex flex-row font-baloo font-medium border-b-2 border-black">
              <div
                className="h-[100%] w-[25%] flex items-center justify-center bg-[#DCC2A8] focus:bg-[#F3AA8A] cursor-pointer border-r-2 border-black"
                onClick={() => handlePercentageButtons(1)}
              >
                25%
              </div>
              <div
                className="h-[100%] w-[25%] flex items-center justify-center bg-[#D5A774] focus:bg-[#F3AA8A] cursor-pointer border-r-2 border-black"
                onClick={() => handlePercentageButtons(2)}
              >
                50%
              </div>
              <div
                className="h-[100%] w-[25%] flex items-center justify-center bg-[#D19A5B] focus:bg-[#F3AA8A] cursor-pointer border-r-2 border-black"
                onClick={() => handlePercentageButtons(3)}
              >
                75%
              </div>
              <div
                className="h-[100%] w-[25%] flex items-center justify-center bg-[#CC8634] focus:bg-[#F3AA8A] cursor-pointer"
                onClick={() => handlePercentageButtons(4)}
              >
                MAX
              </div>
            </div>
            <div
              className="absolute top-[49%] left-[42.5%] bg-[#D9C6BA] z-10 h-10 w-10 border-2 border-black rounded-3xl flex justify-center items-center cursor-pointer focus:scale-110"
              onClick={() => flipTokens()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D111C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </div>
            <div className="w-[100%] h-[46%] border-b-2 border-black">
              <div className="absolute flex flex-row items-center top-[15%] left-[8%]">
                <img className="h-6 tall:h-8 w-6 tall:w-8" src={`/images/logo-${activeToggle === "BUY" ? "honey" : "locks"}.png`} alt="coinlogo" />
                <h1 className="font-baloo font-medium text-[6vw] ml-2">{activeToggle === "BUY" ? "HONEY" : "LOCKS"}</h1>
              </div>
              <div className="absolute h-[16%] w-[84%] top-[27%] left-[8%] border-2 border-black bg-white">
                <div className="relative h-[100%] w-[100%]">
                  {
                    topAmountLoading ?
                    <span className="absolute top-[40%] left-[8%] loader-small"></span> : 
                    <input
                      className="absolute top-[0%] h-[100%] left-[5%] w-[90%] focus:outline-none border-none bg-transparent font-medium font-baloo text-[8vw]"
                      type="number"
                      id="number-input"
                      placeholder="0.00"
                      value={displayString}
                      onChange={(e) => handleTopChange(e.target.value)}
                    />
                  }
                </div>
              </div>
              <span className="absolute bottom-[47%] right-[3%] font-baloo font-bold text-[3vw] text-[#7F7F7F]">balance: {balancesLoading ? loadingElement() : handleTopBalance()}</span>
            </div>
            <div className="w-[100%] h-[46%]">
              <div className="absolute flex flex-row items-center top-[61%] left-[8%]">
                <img className="h-6 tall:h-8 w-6 tall:w-8" src={`/images/logo-${activeToggle === "BUY" ? "locks" : "honey"}.png`} alt="coinlogo" />
                <h1 className="font-baloo font-medium text-[6vw] ml-2">{activeToggle === "BUY" ? "LOCKS" : "HONEY"}</h1>
              </div>
              <div className="absolute h-[16%] w-[84%] top-[73%] left-[8%] border-2 border-black bg-white">
                <div className="relative h-[100%] w-[100%]">
                  {
                    bottomAmountLoading ?
                    <span className="absolute top-[40%] left-[8%] loader-small"></span> : 
                    <input
                      className="absolute top-[0%] h-[100%] left-[5%] w-[90%] focus:outline-none border-none bg-transparent font-medium font-baloo text-[8vw]"
                      type="number"
                      id="number-input"
                      placeholder="0.00"
                      value={bottomDisplayString}
                      onChange={(e) => handleBottomChange(e.target.value)}
                    />
                  }
                </div>
              </div>
              <span className="absolute bottom-[1%] right-[3%] font-baloo font-semibold text-[3vw] text-[#7F7F7F]" onClick={() => console.log(balancesLoading)}>balance: {balancesLoading ? loadingElement() : handleBottomBalance()}</span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}