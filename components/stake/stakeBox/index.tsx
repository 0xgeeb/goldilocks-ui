"use client"

import { useStake, useWallet } from "../../../providers"
import { Notification } from "../../stake"
import { SmallChart } from "../../utils"

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
    handleBalanceLabel
  } = useStake()

  const { balancesLoading } = useWallet()

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>
  }

  return (
    <div className="absolute top-[12.167%] left-[28.125%] w-[43.75%] h-[35.87%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-6 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          chartOpen ? <SmallChart /> :
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
          notification.toggle ? <Notification /> :
          <div className="w-[100%] h-[100%] relative flex flex-col">
            <div className="flex flex-row absolute top-0 right-0 w-[33.61%] h-[14.9%] font-baloo font-semibold border-b-2 border-l-2 border-black">
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
            <div className="absolute flex flex-row top-[37%] left-[3%] items-center">
              <img className="h-8 w-8" src={`/images/logo-${activeToggle === "STAKE" || activeToggle === "UNSTAKE" ? "locks" : "porridge"}.png`} alt="coinlogo" />
              <h1 className="font-baloo font-semibold text-[1.4vw] ml-3">{activeToggle === "STAKE" || activeToggle === "UNSTAKE" ? "LOCKS" : "PRG"}</h1>
            </div>
            <div className="absolute h-[32%] w-[55.6%] top-[30%] left-[22%] border-2 border-black bg-white">
              <div className="relative h-[100%] w-[100%]">
                <input
                  className="absolute top-[17%] left-[5%] w-[90%] focus:outline-none border-none bg-transparent font-bold font-baloo text-[1.6vw]"
                  type="number"
                  id="number-input"
                  placeholder="0.00"
                  value={displayString}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <span 
                  className="absolute bottom-0 right-[3%] font-baloo font-bold text-[0.9vw] text-[#7F7F7F]"
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