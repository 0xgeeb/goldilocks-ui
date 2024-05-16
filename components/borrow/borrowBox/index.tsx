"use client"

import { useBorrow, useWallet } from "../../../providers"
import { Notification, Chart } from "../../borrow"

export const BorrowBox = () => {

  const {
    chartOpen,
    handlePercentageButtons,
    activeToggle,
    displayString,
    handleChange,
    handleBalance,
    txConfirming,
    notification,
  } = useBorrow()

  const { balancesLoading } = useWallet()

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>
  }

  return (
    <div className="absolute top-[16%] lg:top-[12.167%] left-[20%] lg:left-[25%] 2xl:left-[28.125%] w-[60%] lg:w-[50%] 2xl:w-[43.75%] h-[35.87%] border-2 border-black bg-[#EEDCD2]">
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
            <div className="flex flex-row absolute top-0 right-0 w-[40%] lg:w-[33.61%] h-[14.9%] font-baloo font-semibold border-b-2 border-l-2 border-black">
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
            <div className="absolute flex flex-row top-[37%] left-[3%] items-center">
              <img className="h-8 w-8" src="/images/logo-honey.png" alt="coinlogo" />
              <h1 className="font-baloo font-semibold text-[2.4vw] lg:text-[1.4vw] ml-2 lg:ml-3">HONEY</h1>
            </div>
            <div className="absolute h-[35%] lg:h-[32%] w-[60%] lg:w-[55.6%] top-[30%] left-[26%] lg:left-[22%] border-2 border-black bg-white">
              <div className="relative h-[100%] w-[100%]">
                <input
                  className="absolute top-[15%] lg:top-[17%] left-[5%] w-[90%] focus:outline-none border-none bg-transparent font-bold font-baloo text-[3.5vw] lg:text-[1.6vw]"
                  type="number"
                  id="number-input"
                  placeholder="0.00"
                  value={displayString}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <span className="absolute bottom-0 right-[3%] font-baloo font-bold text-[1.5vw] lg:text-[0.9vw] text-[#7F7F7F]">{activeToggle === "BORROW" ? "borrow limit" : "borrowed honey"}: {balancesLoading ? loadingElement() : handleBalance()}</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}