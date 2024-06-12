"use client"

import { useState, useEffect } from "react"
import { useGoldilend, useWallet } from "../../../providers"
import { LendNotificationMobile } from "../../goldilendMobile"

export const BorrowTabMobile = () => {

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const {
    ownedBeras,
    handleBeraClick,
    infoLoading,
    setInfoLoading,
    findSelectedBeraIdxs,
    selectedBeras,
    borrowLimit,
    updateBorrowLimit,
    borrowDisplayString,
    handleBorrowChange,
    loanExpiration,
    handleLoanDateChange,
    loanAmount,
    txConfirming,
    notification,
    findBeras,
    selectScreen,
    setSelectScreen
  } = useGoldilend()

  const { refreshBalances, isConnected } = useWallet()

  useEffect(() => {
    refreshBalances()
    findBeras(),
    setInfoLoading(false)
  }, [isConnected])

  useEffect(() => {
    updateBorrowLimit()
  }, [selectedBeras])

  const loadingElement = () => {
    return <span className="loader-small mx-auto"></span>
  }

  const nextImages = () => {
    if(currentIndex + 4 < selectedBeras.length) {
      setCurrentIndex(currentIndex + 4)
    }
  }

  const prevImages = () => {
    if(currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4)
    }
  }

  return (
    <>
      {
        selectScreen &&
        <div className="h-[100%] w-[100%] flex flex-col items-center">
          <h1 className="font-amaticbold text-[10vw] mt-[5%]">select collateral</h1>
          <div className="flex flex-wrap overflow-y-auto w-[95%] h-[80%]" id="hide-scrollbar">
            {
                infoLoading ? loadingElement() :
                ownedBeras.map((bera, index) => (
                  <div key={index} className="h-[45%] w-[50%] py-2">
                    <img
                      className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedBeraIdxs().includes(bera.index) ? "border-4 border-black" : "opacity-75"}`}
                      onClick={() => handleBeraClick(bera)}
                      src={bera.imageSrc}
                      alt="bera"
                    />
                  </div>
                ))
              }
            </div>
        </div>
      }
      {
        !selectScreen &&
        (
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile.png" alt="tx" /> :
          notification.toggle ? <LendNotificationMobile /> :
          <div className="h-[100%] w-[100%] flex flex-col items-center justify-between py-[3%] relative">
            <div
              className="absolute top-[3%] right-[3%] w-[10%] h-[8%] border-2 border-black text-black bg-[#E7B941] flex items-center justify-center text-[5.5vw]"
              onClick={() => setSelectScreen(true)}
              >
                &#8634;
              </div>
            <h1 className="font-amaticbold text-[10vw]">create loan</h1>
            <div className="w-[95%] h-[20%] flex flex-row items-start justify-between relative">
              <span className="absolute top-[-20%] left-[3%] font-baloo font-semibold text-[3vw]">Collateral:</span>
              <div className="text-[6vw] cursor-pointer hover:scale-125" onClick={() => prevImages()}>&lt;</div>
              {
                selectedBeras.slice(currentIndex, currentIndex + 4).map((bera, index) => (
                  <img
                    className="h-[70%] w-[20%] border-2 border-black"
                    onClick={() => handleBeraClick(bera)}
                    src={bera.imageSrc}
                    alt="selectedbera"
                    key={index}
                  />
                ))
              }
              <div className="text-[6vw] cursor-pointer hover:scale-125" onClick={() => nextImages()}>&gt;</div>
              <div className="absolute text-[3vw] w-[80%] bottom-[0%] left-[10%] flex flex-row items-center justify-between font-baloo font-semibold">
                <span>borrow limit:</span>
                <span>{borrowLimit > 0 ? borrowLimit : "0.00"} iBGT</span>
              </div>
            </div>
            <div className="w-[95%] text-[3.5vw] flex flex-row items-center justify-between font-baloo font-semibold">
              <span>Loan Amount:</span>
              <input
                className="w-[55%] pl-2 focus:outline-none border-2 border-black bg-white"
                type="number"
                id="number-input"
                placeholder="0.00"
                value={borrowDisplayString}
                onChange={(e) => handleBorrowChange(e.target.value)}
              />
            </div>
            <div className="w-[95%] text-[3.5vw] flex flex-row items-center justify-between font-baloo font-semibold">
              <span>Repay Deadline:</span>
              <input
                className="w-[55%] pl-2 focus:outline-none border-2 border-black bg-white"
                type="text"
                id="number-input"
                placeholder="mm-dd-yyyy"
                value={loanExpiration}
                onChange={(e) => handleLoanDateChange(e.target.value)}
              />
            </div>
            <div className="w-[95%] text-[3.5vw] flex flex-row items-center justify-between font-baloo font-semibold">
              <span>Interest Rate:</span>
              <span>69%</span>
            </div>
            <div className="w-[95%] text-[3.5vw] flex flex-row items-center justify-between font-baloo font-semibold">
              <span>Total Interest Due:</span>
              <span>69</span>
            </div>
            <div className="w-[90%] text-[3vw] px-2 flex flex-row items-center justify-between font-baloo font-semibold bg-[#EFD9CA]">
              <span>Total Amount to Repay:</span>
              <span>{loanAmount} iBGT</span>
            </div>
          </div>
        )
      }
    </>
  )
}