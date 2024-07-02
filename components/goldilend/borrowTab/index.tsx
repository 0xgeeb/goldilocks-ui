"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useState, useEffect } from "react"
import { useGoldilend, useWallet } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { BorrowNotification } from "../../goldilend"
import { contracts } from "../../../utils/addressi"

export const BorrowTab = () => {

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [daysTilExpiration, setDaysTilExpiration] = useState<number>(14)

  const {
    ownedBeras,
    handleBeraClick,
    infoLoading,
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
    setTxConfirming,
    notification,
    changeActiveToggle,
    openNotification,
    getInterestRate,
    debouncedLoanAmount,
    debouncedLoanExpiration,
    loanInterest,
    setLoanInterest,
    loanInterestRate,
    setLoanInterestRate,
    updateOwnedBeras
  } = useGoldilend()

  const {
    checkLoanAllowance,
    sendGoldilendNFTApproveTx,
    sendBorrowTx
  } = useGoldilendTx()

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

  const loadingElement = () => {
    return <span className="loader-small mx-auto mt-[10%]"></span>
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
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
    const currentTimestamp = Date.now()
    return Math.floor((timestamp - currentTimestamp) / 1000)
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
      button && (button.innerHTML = "no loan")
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
      borrowTxFlow(button)
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

  const borrowTxFlow = async (button: HTMLElement | null) => {
    setTxConfirming(true)
    if(button) {
      button.innerHTML = "confirming..."
    }
    const borrowTx = await sendBorrowTx(loanAmount, selectedBeras, parseDate(loanExpiration))
    if(borrowTx.substring(0, 2) === '0x') {
      setTxConfirming(false)
      openNotification(
        true,
        "You've successfully created a loan",
        `You borrowed ${formatAsString(loanAmount)} iBGT against your bera${selectedBeras.length > 1 ? "s" : ""}`,
        borrowTx
      )
      button && (button.innerHTML = "create loan")
      updateOwnedBeras(selectedBeras)
      changeActiveToggle('BORROW')
      setDaysTilExpiration(14)
      setTimeout(() => {
        openNotification(false, '', '', '')
      }, 10000)
    }
    else {
      button && (button.innerHTML = "create loan")
      changeActiveToggle('BORROW')
      setDaysTilExpiration(14)
      setTxConfirming(false)
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
    txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
    notification.toggle ? <BorrowNotification /> :
    <div className="w-[100%] h-[100%] flex flex-row">
      <div className="h-[100%] w-[100%] px-[0%] border-r-2 border-black flex flex-col items-center">
        <h1 className="font-amaticbold text-[5vw] xl:text-[3vw] mt-[2%]">select collateral</h1>
        <div className="flex flex-wrap overflow-y-auto w-[85%] h-[80%] py-[2%]" id="hide-scrollbar">
          {
            (!isConnected || ownedBeras.length == 0) ? 
            <div className="w-[100%] h-[100%] flex flex-col items-center opacity-50">
              <img className="w-[70%] my-[5%]" src="/images/icon-not-found.png" alt="not-found" />
              <h1 className="font-amaticbold text-[3vw]">no beras</h1>
            </div> :
            infoLoading ? loadingElement() :
            ownedBeras.map((bera, index) => (
              <div key={index} className="h-[40%] xl:h-[45%] w-[50%] py-2">
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
      <div className="h-[100%] w-[100%] flex flex-col items-center justify-between py-[1%]">
        <h1 className="font-amaticbold text-[5vw] xl:text-[2.5vw]">create loan</h1>
        <div className="w-[90%] h-[25%] flex flex-row items-start justify-between relative">
          <span className="text-[2vw] xl:text-[0.8vw] absolute top-[-20%] left-[3%] font-baloo font-semibold">Collateral:</span>
          <div className="text-[4vw] xl:text-[2vw] cursor-pointer hover:scale-125 mt-[3%]" onClick={() => prevImages()}>&lt;</div>
          {
            selectedBeras.slice(currentIndex, currentIndex + 4).map((bera, index) => (
              <img
                className="mt-[2.5%] xl:mt-0 h-[50%] xl:h-[70%] w-[20%] border-2 border-black"
                onClick={() => handleBeraClick(bera)}
                src={bera.name === 'BondBera' ? "/images/icon-bondbear.png" : "/images/icon-bandbear.png"}
                alt="selectedbera"
                key={index}
              />
            ))
          }
          <div className="text-[4vw] xl:text-[2vw] cursor-pointer hover:scale-125 mt-[3%]" onClick={() => nextImages()}>&gt;</div>
          <div className="text-[2vw] xl:text-[0.8vw] absolute w-[60%] bottom-[5%] left-[20%] flex flex-row items-center justify-between font-baloo font-semibold">
            <span>borrow limit:</span>
            <span>{borrowLimit > 0 ? borrowLimit : "0.00"} iBGT</span>
          </div>
        </div>
        <div className="w-[90%] flex flex-row items-center justify-between font-baloo font-semibold text-[1.8vw] xl:text-[1vw]">
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
        <div className="w-[90%] flex flex-row items-center justify-between font-baloo font-semibold text-[1.8vw] xl:text-[1vw]">
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
        <div className="w-[90%] my-[1%] flex flex-row items-center justify-between font-baloo font-semibold text-[1.8vw] xl:text-[1vw]">
          <div className="h-[100%] w-[70%] bg-[#C09D87] p-2 flex items-center justify-center">
            <input
              className="h-[100%] w-[100%] bg-black hover:cursor-pointer"
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
        <div className="w-[90%] flex flex-row items-center justify-between font-baloo font-semibold text-[1.8vw] xl:text-[1vw]">
          <span>Interest Rate:</span>
          <span>{formatAsString(loanInterestRate)}%</span>
        </div>
        <div className="w-[90%] flex flex-row items-center justify-between font-baloo font-semibold text-[1.8vw] xl:text-[1vw]">
          <span>Total Interest Due:</span>
          <span>{formatAsString(loanInterest)}</span>
        </div>
        <div className="w-[85%] px-2 flex flex-row items-center justify-between font-baloo font-semibold text-[1.6vw] xl:text-[0.8vw] bg-[#EFD9CA]">
          <span>Total Amount to Repay:</span>
          <span>{formatAsString(loanAmount + loanInterest)} iBGT</span>
        </div>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openChainModal,
            openConnectModal
          }) => {
            return (
              <button
                className="w-[48%] h-[12%] bg-[#E7B941] border-2 border-black font-amaticbold text-[4vw] xl:text-[1.7vw] flex items-center justify-center hover:bg-[#C9E3B9] hover:scale-110"
                id="borrow-button"
                onClick={() => {
                  const button = document.getElementById('borrow-button')
                  
                  if(!account) {
                    if(button && button.innerHTML === "connect wallet") {
                      openConnectModal()
                    }
                    else {
                      button && (button.innerHTML = "connect wallet")
                    }
                  }
                  else if(chain?.name !== "Berachain bArtio") {
                    if(button && button.innerHTML === "where Berachain bArtio") {
                      openChainModal()
                    }
                    else {
                      button && (button.innerHTML = "where Berachain bArtio")
                    }
                  }
                  else {
                    handleButtonClick()
                  }
                }}
              >
                create loan
              </button>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  )
}