"use client"

import { useStake, useWallet } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"
import { Notification, Chart } from "../../stake"

export const StakeBox = () => {

  const {
    txConfirming,
    chartOpen,
    notification,
    handlePercentageButtons,
    displayString,
    activeToggle,
    handleChange,
    handleBalance,
    handleBalanceLabel,
    infoLoading,
    stakeInfo,
    stir
  } = useStake()

  const { balancesLoading } = useWallet()
  const { floorPrice, marketPrice } = useGoldiswapMath()

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const handleInfo = (num: number) => {
    if(infoLoading) {
      return loadingElement()
    }
    else if(num > 0) {
      return formatAsString(num)
    }
    else {
      return "-"
    }
  }

  return (
    <div className="absolute top-[18%] md:top-[17%] lg:top-[15%] xl:top-[14%] left-[10%] md:left-[20%] lg:left-[25%] 2xl:left-[28.125%] w-[80%] md:w-[60%] lg:w-[50%] 2xl:w-[43.75%] h-[36%] border-2 border-black bg-[#EEDCD2]">
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
            { activeToggle === 'STIR' && <span className="absolute bottom-[0.5%] font-baloo font-semibold left-[1%] z-50 text-[2.5vw] md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw]">$honey cost to stir: {formatAsString(stir * (stakeInfo.fsl / stakeInfo.supply))}</span> }
            <span className="absolute bottom-[0.5%] font-baloo font-semibold right-[1%] z-50 text-[2.5vw] md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw]">staking apr: {handleInfo(0.5*((marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply) - floorPrice(stakeInfo.fsl, stakeInfo.supply)) / marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply)) * 100)}%</span>
            <div className="flex flex-row absolute top-0 right-0 w-[50%] lg:w-[42%] 2xl:w-[33.61%] h-[15%] text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.25vw] 2xl:text-[1vw] font-baloo font-semibold border-b-2 border-l-2 border-black">
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
            <div className="absolute flex flex-row top-[37%] left-[1%] sm:left-[2%] xl:left-[3%] items-center">
              <img className="h-6 md:h-8 w-6 md:w-8" src={`/images/logo-${activeToggle === "STAKE" || activeToggle === "UNSTAKE" ? "locks" : "porridge"}.png`} alt="coinlogo" />
              <h1 className="font-baloo font-semibold text-[3vw] md:text-[2.4vw] lg:text-[1.4vw] ml-1 lg:ml-3">{activeToggle === "STAKE" || activeToggle === "UNSTAKE" ? "LOCKS" : "PRG"}</h1>
            </div>
            <div className="absolute h-[35%] lg:h-[32%] w-[60%] lg:w-[55.6%] top-[30%] left-[26%] lg:left-[22%] border-2 border-black bg-white">
              <div className="relative h-[100%] w-[100%]">
                <input
                  className="absolute top-[1%] tall:top-[15%] left-[5%] w-[90%] focus:outline-none border-none bg-transparent font-bold font-baloo text-[4.5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[2.5vw] 2xl:text-[2vw] tall:text-[5.5vw] tall:md:text-[4vw] tall:lg:text-[3.5vw] tall:xl:text-[2.5vw] tall:2xl:text-[2vw]"
                  type="number"
                  id="number-input"
                  placeholder="0.00"
                  value={displayString}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <span 
                  className="absolute bottom-0 right-[3%] font-baloo font-bold text-[2vw] md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw] tall:text-[2.5vw] tall:md:text-[1.75vw] tall:lg:text-[1.25vw] tall:xl:text-[0.9vw] text-[#7F7F7F]"
                >
                  {handleBalanceLabel()}: {balancesLoading ? loadingElement() : handleBalance()}
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}