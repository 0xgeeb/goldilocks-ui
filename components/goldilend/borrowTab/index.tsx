"use client"

import { useState, useEffect } from "react"
import { useGoldilend, useWallet } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { contracts } from "../../../utils/addressi"

export const BorrowTab = () => {

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const {
    getOwnedBeras,
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
    loanAmount
  } = useGoldilend()

  const {
    checkLoanAllowance,
    sendGoldilendNFTApproveTx,
    sendBorrowTx
  } = useGoldilendTx()

  const { wallet, isConnected } = useWallet()

  useEffect(() => {
    getOwnedBeras()
    setInfoLoading(false)
  }, [isConnected])

  useEffect(() => {
    updateBorrowLimit()
  }, [selectedBeras])

  const loadingElement = () => {
    return <span className="loader-small mx-auto"></span>
  }

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

  const parseDate = (dateString: string): number => {
    const dateParts = dateString.split('-')
    const [month, day, year] = dateParts.map(Number);
    const parsedDate = new Date(year, month - 1, day)
    const timestamp = parsedDate.getTime()
    const timestampDigits = Math.floor(timestamp / 1000)
    return timestampDigits
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

  const checkSelected = (beraName: string): boolean => {
    for(let i = 0; i < selectedBeras.length; i++) {
      if(selectedBeras[i].name === beraName) {
        return true
      }
    }
    
    return false
  }

  const handleButtonClick = async () => {
    const button = document.getElementById('borrow-button')
    if(loanAmount == 0) {
      button && (button.innerHTML = "no loan amount")
      return
    }
    if(!checkDate(loanExpiration)) {
      button && (button.innerHTML = "invalid expiration")
      return
    }
    if(selectedBeras.length == 0) {
      button && (button.innerHTML = "no collateral")
      return
    }
    const [bondFlag, bandFlag] = await checkLoanAllowance(wallet)
    if((bondFlag || !checkSelected("BondBera")) && (bandFlag || !checkSelected("BandBera"))) {
      button && (button.innerHTML = "create loan")
    }
    else {
      button && (button.innerHTML = "approving...")
      if(!bondFlag && checkSelected('BondBera')) {
        await sendGoldilendNFTApproveTx(contracts.bondbear.address)
      }
      if(!bandFlag && checkSelected('BandBera')) {
        await sendGoldilendNFTApproveTx(contracts.bandbear.address)
      }
      button && (button.innerHTML = "create loan")
    }
  }

  return (
    <div className="w-[100%] h-[100%] flex flex-row">
      <div className="h-[100%] w-[100%] px-[0%] border-r-2 border-black flex flex-col items-center">
        <h1 className="font-amaticbold text-[3vw] mt-[2%]">select collateral</h1>
        <div className="flex flex-wrap overflow-y-auto w-[85%] h-[80%]" id="hide-scrollbar">
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
      <div className="h-[100%] w-[100%] flex flex-col items-center justify-between py-[1%]">
        <h1 className="font-amaticbold text-[2.5vw]">create loan</h1>
        <div className="w-[90%] h-[25%] flex flex-row items-start justify-between relative">
          <span className="absolute top-[-20%] left-[3%] font-baloo font-semibold">Collateral:</span>
          <div className="text-[2vw] cursor-pointer hover:scale-125" onClick={() => prevImages()}>&lt;</div>
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
          <div className="text-[2vw] cursor-pointer hover:scale-125" onClick={() => nextImages()}>&gt;</div>
          <div className="absolute w-[60%] bottom-[5%] left-[20%] flex flex-row items-center justify-between font-baloo font-semibold">
            <span>borrow limit:</span>
            <span>{borrowLimit > 0 ? borrowLimit : "0.00"} iBGT</span>
          </div>
        </div>
        <div className="w-[65%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <span>Loan Amount:</span>
          <input
            className="w-[50%] pl-2 focus:outline-none border-2 border-black bg-white"
            type="number"
            id="number-input"
            placeholder="0.00"
            value={borrowDisplayString}
            onChange={(e) => handleBorrowChange(e.target.value)}
          />
        </div>
        <div className="w-[65%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <span>Repay Deadline:</span>
          <input
            className="w-[50%] pl-2 focus:outline-none border-2 border-black bg-white"
            type="text"
            id="number-input"
            placeholder="mm-dd-yyyy"
            value={loanExpiration}
            onChange={(e) => handleLoanDateChange(e.target.value)}
          />
        </div>
        <div className="w-[65%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <span>Interest Rate:</span>
          <span>69%</span>
        </div>
        <div className="w-[65%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <span>Total Interest Due:</span>
          <span>69</span>
        </div>
        <div className="w-[60%] px-2 flex flex-row items-center justify-between font-baloo font-semibold text-[0.8vw] bg-[#EFD9CA]">
          <span>Total Amount to Repay:</span>
          <span>{loanAmount} iBGT</span>
        </div>
        <button
          className="w-[48%] h-[12%] bg-[#E7B941] border-2 border-black font-amaticbold text-[1.7vw] flex items-center justify-center hover:bg-[#C9E3B9] hover:scale-110"
          id="borrow-button"
          onClick={() => handleButtonClick()}
        >
          create loan
        </button>
      </div>
    </div>
  )
}