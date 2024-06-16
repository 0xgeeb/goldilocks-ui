"use client"

import { useStake, useWallet } from "../../../providers"
import { ChartSmallMobile } from "../../utils"
import {
  WalletBalanceMobilePopup,
  NotificationMobile
} from "../../stakeMobile"

export const StakeBoxMobile = () => {

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
    balanceMobileToggle,
    stir,
    stakeInfo
  } = useStake()

  const { balancesLoading } = useWallet()

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  return (
    <div className="absolute top-[4.6%] left-[15.5%] w-[69%] h-[30%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-3 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          chartOpen ? <ChartSmallMobile /> :
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile-small.png" alt="tx" /> :
          notification.toggle ? <NotificationMobile /> :
          balanceMobileToggle ? <WalletBalanceMobilePopup /> :
          <div className="w-[100%] h-[100%] relative flex flex-col">
            <div className="w-[100%] h-[13%] flex flex-row font-baloo font-semibold border-b-2 border-black">
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
            <div className="absolute flex flex-row top-[20%] left-[8%] items-center">
              <img className="h-8 w-8" src={`/images/logo-${activeToggle === "STAKE" || activeToggle === "UNSTAKE" ? "locks" : "porridge"}.png`} alt="coinlogo" />
              <h1 className="font-baloo font-semibold text-[6vw] ml-2">{activeToggle === "STAKE" || activeToggle === "UNSTAKE" ? "LOCKS" : "PRG"}</h1>
            </div>
            <div className="absolute h-[30%] w-[84%] top-[43%] left-[8%] border-2 border-black bg-white">
              <div className="relative h-[100%] w-[100%]">
                <input
                  className="absolute top-[12%] left-[7%] w-[90%] focus:outline-none border-none bg-transparent font-semibold font-baloo text-[8vw]"
                  type="number"
                  id="number-input"
                  placeholder="0.00"
                  value={displayString}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </div>
            <span
              className="absolute bottom-[9%] right-[2%] font-baloo font-bold text-[3vw] text-[#7F7F7F]"
              >
              {handleBalanceLabel()}: {balancesLoading ? loadingElement() : handleBalance()}
            </span>
            { activeToggle === 'STIR' && <span className="absolute bottom-[1%] font-baloo font-semibold right-[2%] z-50 text-[3vw] text-[#7F7F7F]">$honey cost to stir: {formatAsString(stir * (stakeInfo.fsl / stakeInfo.supply))}</span> }
          </div>
        }
      </div>
    </div>
  )
}