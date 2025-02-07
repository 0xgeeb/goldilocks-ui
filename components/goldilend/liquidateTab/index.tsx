"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useGoldilend } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { BorrowNotification } from "../../goldilend"
import { contracts } from "../../../utils/addressi"

export const LiquidateTab = () => {

  const {
    infoLoading,
    liquidatableLoans,
    findLiquidatableLoans,
    allowanceButtons,
    setAllowanceButtons,
    txConfirming,
    setTxConfirming,
    notification,
    openNotification,
    goldilendWalletInfo
  } = useGoldilend()

  const {
    checkRepayAllowance,
    sendiBGTApproveTx,
    sendLiquidateTx
  } = useGoldilendTx()

  const { address } = useAccount()

  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false)

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

  const handleButtonClick = async (loanId: number, amt: number) => {
    const button = document.getElementById('liquidate-button')
    if(amt == 0) {
      button && (button.innerHTML = "no amount")
      return
    }
    if(amt > goldilendWalletInfo.ibgt) {
      button && (button.innerHTML = "no balance")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkRepayAllowance(amt, address as `0x${string}`)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
          setButtonLoadingColor(true)
        }
        const liquidateTx = await sendLiquidateTx('', loanId)
        if(liquidateTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully liquidated a loan",
            `You liquidated loan ${loanId}`,
            liquidateTx
          )
          if(button) {
            button.innerHTML = "LIQUIDATE"
            setButtonLoadingColor(false)
          }
          setTimeout(() => {
            openNotification(false, '', '', '')
          }, 10000)
        }
        else {
          if(button) {
            button.innerHTML = "LIQUIDATE"
            setButtonLoadingColor(false)
          }
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
    const swapButton = document.getElementById('liquidate-button')
    const leftButton = document.getElementById('left-approve-button')
    const rightButton = document.getElementById('right-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#C9E3B9"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#C9E3B9"
    }
    await sendiBGTApproveTx(amt, false)
    // updateAllowance(honeyBuy + 0.01)
    swapButton && (swapButton.innerHTML = "LIQUIDATE")
    setAllowanceButtons(false)
  }
  
  const handleRightButtonClick = async () => {
    const swapButton = document.getElementById('liquidate-button')
    const rightButton = document.getElementById('right-approve-button')
    const leftButton = document.getElementById('left-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#C9E3B9"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#C9E3B9"
    }
    await sendiBGTApproveTx(0, true)
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "LIQUIDATE")
    setAllowanceButtons(false)
  }

  return (
    <div className="absolute top-[14%] left-[10%] xl:left-[30%] h-[70%] w-[80%] xl:w-[52%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-4 left-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-4 right-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-8 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
          notification.toggle ? <BorrowNotification /> :
          <div className="h-[100%] w-[100%] flex flex-col overflow-y-auto" id="hide-scrollbar">
            <div className="w-[100%] h-[15%] border-b-2 border-black">
              <h1 className="font-amaticbold ml-[4%] text-[5vw] xl:text-[2.3vw]">liquidate loans</h1>
            </div>
            {
              infoLoading ?
              loadingElement() :
              liquidatableLoans.map((loan, index) => (
                <div className="w-[100%] py-[2%] font-baloo font-semibold border-b-2 border-black flex flex-row items-center relative" key={index}>
                  <h1 className="absolute text-[1.5vw] xl:text-[1vw] top-[2%] left-[1%]">Loan {loan.loanId}</h1>
                  <div className="h-[50%] w-[40%] px-[3%] flex flex-col justify-center text-[1.5vw] xl:text-[0.8vw] ml-[7%]">
                    <div className="w-[100%] flex flex-row items-center justify-between">
                      <span>liquidation price:</span>
                      <span>{formatNum(loan.borrowedAmount)} iBGT</span>
                    </div>
                    <div className="w-[100%] flex flex-row items-center justify-between">
                      <span>liquidate by:</span>
                      <span>{formatDate(loan.endDate + (86400*7))}</span>
                    </div>
                    <div className="w-[100%] flex flex-row items-center justify-between">
                      <span>expiration date:</span>
                      <span>{formatDate(loan.endDate)}</span>
                    </div>
                  </div>
                  <div className="h-[100%] w-[30%] flex flex-col items-center">
                    <h1 className="text-[#9C4924] text-[1.2vw] xl:text-[0.8vw]">Collateral</h1>
                    <div className="w-[90%] h-[65%] overflow-x-auto flex flex-row items-center justify-around" id="hide-scrollbar">
                      {
                        loan.collateralNFTs.map((nft, index) => (
                          <img
                            className="h-[100%] w-[30%] mr-[5%]  border-2 border-black"
                            src={nft === contracts.bondbear.address ? '/images/icon-bondbear.png' : '/images/icon-bandbear.png'}
                            alt="collateral"
                            key={index}
                          />
                        ))
                      }
                    </div>
                  </div>
                  <div className="h-[100%] w-[28%] flex flex-col relative items-center justify-center">
                    {
                      allowanceButtons &&
                      <div className="w-[100%] h-[100%] flex flex-row items-center justify-center">
                        <button
                          className="h-[50%] w-[45%] mr-[5%] border-2 border-black bg-[#E7B941] hover:bg-[#C9E3B9] text-[1.2vw] xl:text-[0.7vw] hover:scale-110"
                          id="left-approve-button"
                          onClick={() => handleLeftButtonClick(loan.borrowedAmount)}
                        >
                          approve tx
                        </button>
                        <button
                          className="h-[50%] w-[45%] border-2 border-black bg-[#E7B941] hover:bg-[#C9E3B9] text-[1.2vw] xl:text-[0.7vw] hover:scale-110"
                          id="right-approve-button"
                          onClick={() => handleRightButtonClick()}
                        >
                          approve infinite
                        </button>
                      </div>
                    }
                    {
                      !allowanceButtons &&
                      <ConnectButton.Custom>
                        {({
                          account,
                          chain,
                          openChainModal,
                          openConnectModal
                        }) => {
                          return (
                            <button
                              className={`h-[50%] w-[80%] border-2 border-black ${buttonLoadingColor ? "bg-[#C9E3B9] text-black" : "bg-[#E7B941] text-black"} hover:bg-[#C9E3B9] hover:text-black text-[2vw] xl:text-[1.1vw] hover:scale-110`}
                              id="liquidate-button"
                              onClick={() => {
                                const button = document.getElementById('repay-button')
                                
                                if(!account) {
                                  if(button && button.innerHTML === "connect wallet") {
                                    openConnectModal()
                                  }
                                  else {
                                    button && (button.innerHTML = "connect wallet")
                                  }
                                }
                                else if(chain?.name !== "Berachain") {
                                  if(button && button.innerHTML === "where berachain") {
                                    openChainModal()
                                  }
                                  else {
                                    button && (button.innerHTML = "where berachain")
                                  }
                                }
                                else {
                                  handleButtonClick(loan.loanId, loan.borrowedAmount)
                                }
                              }}
                            >
                              LIQUIDATE
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
        }
      </div>
    </div>
  )
}