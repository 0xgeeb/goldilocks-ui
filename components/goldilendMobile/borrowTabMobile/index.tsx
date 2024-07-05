"use client"

import { useState, useEffect } from "react"
import { useGoldilend, useWallet } from "../../../providers"
import { LendNotificationMobile } from "../../goldilendMobile"

export const BorrowTabMobile = () => {

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [daysTilExpiration, setDaysTilExpiration] = useState<number>(14)

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
    selectScreen,
    setSelectScreen,
    getInterestRate,
    debouncedLoanAmount,
    debouncedLoanExpiration,
    loanInterest,
    setLoanInterest,
    loanInterestRate,
    setLoanInterestRate
  } = useGoldilend()

  const { wallet, isConnected } = useWallet()

  useEffect(() => {
    updateBorrowLimit()
  }, [selectedBeras])

  useEffect(() => {
    if(selectedBeras.length > 0 && debouncedLoanAmount > 0 && checkDate(debouncedLoanExpiration)) {
      getInterestRate()
    }
    else {
      setLoanInterest(0)
      setLoanInterestRate(0)
    }
  }, [selectedBeras, debouncedLoanAmount, debouncedLoanExpiration])

  useEffect(() => {
    if(checkDate(debouncedLoanExpiration)) {
      const [month, day, year] = debouncedLoanExpiration.split('-').map(Number)
      const inputDate = new Date(year, month - 1, day)
      const currentDate = new Date()
      const timeDifference = inputDate.getTime() - currentDate.getTime()
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
      if(daysDifference >= 7 && daysDifference <= 365) {
        setDaysTilExpiration(daysDifference)
      }
    }
  }, [debouncedLoanExpiration])

  const checkDate = (dateString: String): boolean => {
    const dateParts = dateString.split('-')
    const [month, day, year] = dateParts.map(Number)
    const parsedDate = new Date(year, month - 1, day)
    const timestamp = parsedDate.getTime()
    const timestampDigits = Math.floor(timestamp / 1000)
    if(dateParts.length !== 3) {
      return false
    }
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return false
    }
    if (isNaN(parsedDate.getTime())) {
      return false
    }
    if(timestampDigits < Math.floor(Date.now() / 1000)) {
      return false
    }
    if(timestampDigits < Math.floor(Date.now() / 1000) + (86400 * 14)) {
      return false
    }
    return true
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const loadingElement = () => {
    return <span className="loader-small mx-auto mt-[10%]"></span>
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

  const sliderValue = ((daysTilExpiration - 7) / (365 - 7)) * 100

  const handleSliderChange = (days: string) => {
    const daysNum = parseFloat(days)
    setDaysTilExpiration(daysNum)
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + daysNum)
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    const year = currentDate.getFullYear().toString()
    handleLoanDateChange(`${month}-${day}-${year}`)
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
              (!isConnected || ownedBeras.length == 0) ? 
              <div className="w-[100%] h-[100%] flex flex-col items-center opacity-50">
                <img className="w-[70%] my-[10%]" src="/images/icon-not-found.png" alt="not-found" />
                <h1 className="font-amaticbold text-[8vw]">no beras</h1>
              </div> :
              ownedBeras.map((bera, index) => (
                <div key={index} className="h-[45%] w-[50%] py-2">
                  <img
                    className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedBeraIdxs().includes(bera.index) ? "border-4 border-black" : "opacity-75"}`}
                    onClick={() => handleBeraClick(bera)}
                    src={bera.name === 'BondBera' ? "/images/icon-bondbear.png" : "/images/icon-bandbear.png"}
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
                    src={bera.name === 'BondBera' ? "/images/icon-bondbear.png" : "/images/icon-bandbear.png"}
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
            <div className="w-[95%] my-[1%] text-[3.5vw] flex flex-row items-center justify-between font-baloo font-semibold">
              <div className="h-[100%] w-[70%] bg-[#C09D87] p-2 flex items-center justify-center">
                <input
                  className="h-[100%] w-[100%] bg-black"
                  id="date-slider"
                  type="range"
                  min="7"
                  max="365"
                  value={daysTilExpiration}
                  onChange={(e) => handleSliderChange(e.target.value)}
                  style={{background: `linear-gradient(to right, black ${sliderValue}%, #C09D87 ${sliderValue}%)`}}
                />
              </div>
              <span>{daysTilExpiration} days</span>
            </div>
            <div className="w-[95%] text-[3.5vw] flex flex-row items-center justify-between font-baloo font-semibold">
              <span>Interest Rate:</span>
              <span>{formatAsString(loanInterestRate)}%</span>
            </div>
            <div className="w-[95%] text-[3.5vw] flex flex-row items-center justify-between font-baloo font-semibold">
              <span>Total Interest Due:</span>
              <span>{formatAsString(loanInterest)}</span>
            </div>
            <div className="w-[90%] text-[3vw] px-2 flex flex-row items-center justify-between font-baloo font-semibold bg-[#EFD9CA]">
              <span>Total Amount to Repay:</span>
              <span>{formatAsString(loanAmount + loanInterest)} iBGT</span>
            </div>
          </div>
        )
      }
    </>
  )
}