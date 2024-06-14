"use client"

import { useState, useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useGoldilend, useWallet } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { BorrowNotification } from "../../goldilend"
import { contracts } from "../../../utils/addressi"

type InputValuesType = {
  [key: number]: string;
}

type AllowanceFlagsType = {
  [key: number]: boolean;
}

export const RepayTab = () => {

  const [inputValues, setInputValues] = useState<InputValuesType>({})
  const [allowanceFlags, setAllowanceFlags] = useState<AllowanceFlagsType>({})

  const {
    infoLoading,
    userLoans,
    findLoans,
    setInfoLoading,
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

  const handleAllowanceChange = (loanId: number, flag: boolean) => {
    setAllowanceFlags(prev => ({
      ...prev,
      [loanId]: flag
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
    const button = document.getElementById('repay-button' + loanId)
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
        // setAllowanceButtons(true)
        handleAllowanceChange(loanId, true)
      }
    }
  }

  //todo: fix update allowance here
  const handleLeftButtonClick = async (amt: number, loanId: number) => {
    const swapButton = document.getElementById('repay-button' + loanId)
    const leftButton = document.getElementById('left-approve-button' + loanId)
    const rightButton = document.getElementById('right-approve-button' + loanId)
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
    // setAllowanceButtons(false)
    handleAllowanceChange(loanId, false)
  }
  
  const handleRightButtonClick = async (loanId: number) => {
    const swapButton = document.getElementById('repay-button' + loanId)
    const leftButton = document.getElementById('left-approve-button' + loanId)
    const rightButton = document.getElementById('right-approve-button' + loanId)
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
    // setAllowanceButtons(false)
    handleAllowanceChange(loanId, false)
  }

  return (
    txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
    notification.toggle ? <BorrowNotification /> :
    <div className="h-[100%] w-[100%] flex flex-col overflow-y-auto" id="hide-scrollbar">
      <div className="w-[100%] h-[15%] border-b-2 border-black">
        <h1 className="font-amaticbold ml-[4%] text-[5vw] xl:text-[2.3vw]">my loans</h1>
      </div>
      {
        infoLoading ?
        loadingElement() :
        userLoans.map((loan, index) => (
          <div className="w-[100%] h-[28%] font-baloo font-semibold border-b-2 border-black flex flex-row items-center relative" key={index}>
            {
              loan.borrowedAmount == 0 &&
              <div className="rotate-[16deg] absolute right-0 w-[30%] h-[25%] bg-[#79AF45] border-2 border-black flex items-center justify-center text-[2vw] xl:text-[1.1vw] z-30">
                REPAID
              </div>
            }
            {
              loan.endDate < Math.floor(Date.now() / 1000) &&
              <div className="rotate-[16deg] absolute right-0 w-[30%] h-[25%] bg-[#CC7E16] border-2 border-black flex items-center justify-center text-[2vw] xl:text-[1.1vw] z-30">
                EXPIRED
              </div>
            }
            {
              loan.liquidated &&
              <div className="rotate-[16deg] absolute right-0 w-[30%] h-[25%] bg-[#B11614] border-2 border-black flex items-center justify-center text-[2vw] xl:text-[1.1vw] z-30">
                LIQUIDATED
              </div>
            }
            <h1 className="absolute text-[2vw] xl:text-[1vw] top-[2%] left-[1%]">Loan {loan.loanId}</h1>
            <div className="h-[50%] w-[35%] px-[3%] flex flex-col justify-center text-[1.5vw] xl:text-[0.8vw] ml-[7%]">
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>total amount to repay:</span>
                <span>{formatNum(loan.borrowedAmount)} iBGT</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>amount repaid:</span>
                <span>0 iBGT</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>amount outstanding:</span>
                <span>{formatNum(loan.borrowedAmount)} iBGT</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>expiration date:</span>
                <span>{formatDate(loan.endDate)}</span>
              </div>
            </div>
            <div className="h-[100%] w-[35%] flex flex-col items-center">
              <h1 className="text-[#9C4924] text-[1.2vw] xl:text-[0.8vw] my-[2%]">Collateral</h1>
              <div className="w-[90%] h-[65%] overflow-x-auto flex flex-row items-center justify-around" id="hide-scrollbar">
                {
                  loan.collateralNFTs.map((nft, index) => (
                    <img
                      className="h-[100%] w-[30%] mr-[5%]  border-2 border-black"
                      src={nft === contracts.bondbear.address ? 'https://ipfs.io/ipfs/QmSaVWb15oQ1HcsUjGGkjwHQ1mxJBYeivtBCgHHHiVLt7w' : 'https://ipfs.io/ipfs/QmNWggx9vvBVEHZc6xwWkdyymoKuXCYrJ3zQwwKzocDxRt'}
                      alt="collateral"
                      key={index}
                    />
                  ))
                }
              </div>
            </div>
            <div className="h-[100%] w-[23%] flex flex-col relative">
              <div
                className="bg-[#CC8634] absolute top-[20%] left-[1%] h-[30%] w-[25%] cursor-pointer hover:scale-110 text-[2vw] xl:text-[0.9vw] border-t-2 border-b-2 border-l-2 border-black flex items-center justify-center"
                onClick={() => handleMaxClick(loan.loanId, loan.borrowedAmount)}
              >
                MAX
              </div>
              <div className="top-[20%] left-[26%] h-[30%] w-[69%] absolute bg-white border-2 border-black flex flex-row items-center justify-between">
                <input
                  className="h-[100%] w-[70%] pl-[5%] text-[2.2vw] xl:text-[1.3vw] focus:outline-none"
                  type="text"
                  id="number-input"
                  placeholder="0.00"
                  value={inputValues[loan.loanId] || ''}
                  onChange={(e) => handleInputChange(loan.loanId, e.target.value)}
                />
                <span className="text-[1.5vw] xl:text-[0.8vw] text-[#7B7876] mr-[1%]">iBGT</span>
              </div>
              {
                allowanceFlags[loan.loanId] &&
                <div>
                  <button
                    className="top-[60%] left-[1%] h-[30%] w-[42%] absolute border-2 border-black bg-[#E7B941] text-[1.2vw] xl:text-[0.7vw] hover:scale-110"
                    id={`left-approve-button${loan.loanId}`}
                    onClick={() => handleLeftButtonClick(parseFloat(inputValues[loan.loanId]), loan.loanId)}
                  >
                    approve tx
                  </button>
                  <button
                    className="top-[60%] left-[53%] h-[30%] w-[42%] absolute border-2 border-black bg-[#E7B941] text-[1.2vw] xl:text-[0.7vw] hover:scale-110"
                    id={`right-approve-button${loan.loanId}`}
                    onClick={() => handleRightButtonClick(loan.loanId)}
                  >
                    approve infinite
                  </button>
                </div>
              }
              {
                !allowanceFlags[loan.loanId] &&
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openChainModal,
                    openConnectModal
                  }) => {
                    return (
                      <button
                        className="top-[60%] left-[30%] h-[30%] w-[65%] absolute border-2 border-black bg-[#E7B941] text-[1.8vw] xl:text-[0.9vw] hover:scale-110"
                        id={`repay-button${loan.loanId}`}
                        onClick={() => {
                          const button = document.getElementById('repay-button' + loan.loanId)
                          
                          if(!account) {
                            if(button && button.innerHTML === "connect wallet") {
                              openConnectModal()
                            }
                            else {
                              button && (button.innerHTML = "connect wallet")
                            }
                          }
                          else if(chain?.name !== "Base Sepolia") {
                            if(button && button.innerHTML === "where base sepolia") {
                              openChainModal()
                            }
                            else {
                              button && (button.innerHTML = "where base sepolia")
                            }
                          }
                          else {
                            handleButtonClick(loan.loanId, parseFloat(inputValues[loan.loanId]), loan.borrowedAmount)
                          }
                        }}
                      >
                        REPAY LOAN
                      </button>
                    )
                  }}
                </ConnectButton.Custom>
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}