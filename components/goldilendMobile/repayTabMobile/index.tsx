"use client"

import { useState, useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { LendNotificationMobile } from "../../goldilendMobile"
import { useGoldilend, useWallet } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { BorrowNotification } from "../../goldilend"
import { contracts } from "../../../utils/addressi"

type InputValuesType = {
  [key: number]: string;
}

export const RepayTabMobile = () => {

  const [inputValues, setInputValues] = useState<InputValuesType>({})

  const {
    infoLoading,
    userLoans,
    findLoans,
    setInfoLoading,
    allowanceButtons,
    setAllowanceButtons,
    txConfirming,
    setTxConfirming,
    notification,
    openNotification
  } = useGoldilend()

  const {
    checkRepayAllowance,
    sendRepayTx,
    sendiBGTApproveTx
  } = useGoldilendTx()

  const { wallet, balance, refreshBalances, isConnected } = useWallet()

  useEffect(() => {
    findLoans()
    refreshBalances()
    setInfoLoading(false)
  }, [isConnected])

  const loadingElement = () => {
    return <span className="loader-small mx-auto my-auto"></span>
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear())
    return `${month}-${day}-${year}`
  }

  const formatNum = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const handleInputChange = (loanId: number, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [loanId]: value
    }))
  }

  const handleMaxClick = (loanId: number, amt: number) => {
    setInputValues(prev => ({
      ...prev,
      [loanId]: amt.toString()
    }))
  }

  const refreshInfo = () => {
    const newValues: InputValuesType = {}
    Object.keys(inputValues).forEach(key => {
      newValues[parseInt(key)] = '0'
    })
    setInputValues(newValues)
    findLoans()
  }

  const handleButtonClick = async (loanId: number, amt: number, borrowedAmt: number) => {
    const button = document.getElementById('repay-button')
    if(amt == 0) {
      button && (button.innerHTML = "no amount")
      return
    }
    if(amt > balance.ibgt) {
      button && (button.innerHTML = "no balance")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkRepayAllowance(amt, wallet)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
        }
        const repayTx = await sendRepayTx(amt, loanId, amt == borrowedAmt, wallet)
        if(repayTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully repaid your loan",
            `You repaid ${formatAsString(amt)} iBGT`,
            repayTx
          )
          if(button) {
            button.innerHTML = "REPAY LOAN"
            button.style.backgroundColor = "#E7B941"
            button.style.color = "black"
          }
          refreshInfo()
          setTimeout(() => {
            openNotification(false, '', '', '')
          }, 10000)
        }
        else {
          if(button) {
            button.innerHTML = "REPAY LOAN"
            button.style.backgroundColor = "#E7B941"
            button.style.color = "black"
          }
          refreshInfo()
          setTxConfirming(false)
        }
      }
      else {
        setAllowanceButtons(true)
      }
    }
  }

  //todo: fix update allowance here
  const handleLeftButtonClick = async (amt: number) => {
    const swapButton = document.getElementById('repay-button')
    const leftButton = document.getElementById('left-approve-button')
    const rightButton = document.getElementById('right-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#E7B941"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#E7B941"
    }
    await sendiBGTApproveTx(amt, false)
    // updateAllowance(honeyBuy + 0.01)
    swapButton && (swapButton.innerHTML = "REPAY LOAN")
    setAllowanceButtons(false)
  }
  
  const handleRightButtonClick = async () => {
    const swapButton = document.getElementById('repay-button')
    const rightButton = document.getElementById('right-approve-button')
    const leftButton = document.getElementById('left-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#E7B941"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#E7B941"
    }
    await sendiBGTApproveTx(0, true)
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "REPAY LOAN")
    setAllowanceButtons(false)
  }

  return (
    <div className="absolute top-[7.5%] left-[15.5%] h-[70%] w-[69%] border-2 border-black bg-[#EEDCD2] z-20">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-3 ${txConfirming ? "border-l-2 border-r-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile.png" alt="tx" /> :
          notification.toggle ? <LendNotificationMobile /> :
          <div className="h-[100%] w-[100%] overflow-y-auto flex flex-wrap" id="hide-scrollbar">
            <div className="w-[100%] h-[10%] border-b-2 border-black">
              <h1 className="font-amaticbold ml-[4%] text-[7vw]">my loans</h1>
            </div>
            {
              infoLoading ? loadingElement() :
              userLoans.map((loan, index) => (
                <div
                  className="w-[100%] h-[70%] border-b-2 border-black flex flex-row items-center relative"
                  key={index}
                >
                  <h1 className="w-[100%] h-[100%]">hello</h1>
                </div>
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}