"use client"

import { useState, useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useGoldilend, useWallet } from "../../../providers"
import { LendNotificationMobile } from "../../goldilendMobile"
import { useGoldilendTx } from "../../../hooks"
import { BorrowNotification } from "../../goldilend"
import { contracts } from "../../../utils/addressi"

type CollateralFlagsType = {
  [key: number]: boolean;
}

type AllowanceFlagsType = {
  [key: number]: boolean;
}

export const LiquidateTabMobile = () => {

  const [collateralFlags, setCollateralFlags] = useState<CollateralFlagsType>({})
  const [allowanceFlags, setAllowanceFlags] = useState<AllowanceFlagsType>({})

  const {
    infoLoading,
    liquidatableLoans,
    findLiquidatableLoans,
    setInfoLoading,
    txConfirming,
    setTxConfirming,
    notification,
    openNotification
  } = useGoldilend()

  const {
    checkRepayAllowance,
    sendiBGTApproveTx,
    sendLiquidateTx
  } = useGoldilendTx()

  const { wallet, balance, refreshBalances, isConnected } = useWallet()

  useEffect(() => {
    findLiquidatableLoans()
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

  const handleFlagChange = (loanId: number, flag: boolean) => {
    setCollateralFlags(prev => ({
      ...prev,
      [loanId]: flag
    }))
  }

  const handleAllowanceChange = (loanId: number, flag: boolean) => {
    setAllowanceFlags(prev => ({
      ...prev,
      [loanId]: flag
    }))
  }

  const handleButtonClick = async (loanId: number, amt: number) => {
    const button = document.getElementById('liquidate-button' + loanId)
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
            button.style.backgroundColor = "#E7B941"
            button.style.color = "black"
          }
          setTimeout(() => {
            openNotification(false, '', '', '')
          }, 10000)
        }
        else {
          if(button) {
            button.innerHTML = "LIQUIDATE"
            button.style.backgroundColor = "#E7B941"
            button.style.color = "black"
          }
          setTxConfirming(false)
        }
      }
      else {
        handleAllowanceChange(loanId, true)
      }
    }
  }

  //todo: fix update allowance here
  const handleLeftButtonClick = async (amt: number, loanId: number) => {
    const swapButton = document.getElementById('liquidate-button' + loanId)
    const leftButton = document.getElementById('left-approve-button' + loanId)
    const rightButton = document.getElementById('right-approve-button' + loanId)
    if(leftButton) {
      leftButton.innerHTML = "approving..."
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
    }
    await sendiBGTApproveTx(amt, false)
    // updateAllowance(honeyBuy + 0.01)
    swapButton && (swapButton.innerHTML = "LIQUIDATE")
    // setAllowanceButtons(false)
    handleAllowanceChange(loanId, false)
  }
  
  const handleRightButtonClick = async (loanId: number) => {
    const swapButton = document.getElementById('liquidate-button' + loanId)
    const leftButton = document.getElementById('left-approve-button' + loanId)
    const rightButton = document.getElementById('right-approve-button' + loanId)
    if(leftButton) {
      leftButton.innerHTML = "approving..."
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
    }
    await sendiBGTApproveTx(0, true)
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "LIQUIDATE")
    // setAllowanceButtons(false)
    handleAllowanceChange(loanId, false)
  }

  return (
    <div className="absolute p-[3%] top-[7.5%] left-[15.5%] h-[70%] w-[69%] border-2 border-black bg-[#EEDCD2] z-20">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-3 ${txConfirming ? "border-l-2 border-r-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}></div>
        {
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile.png" alt="tx" /> :
          notification.toggle ? <LendNotificationMobile /> :
          <div className="h-[100%] w-[100%] overflow-y-auto flex flex-wrap" id="hide-scrollbar">
            {
              infoLoading ? loadingElement() :
              liquidatableLoans.map((loan, index) => (
                collateralFlags[loan.loanId] ?
                <div className="w-[100%] h-[40%] p-[3%] font-baloo font-semibold border-b-2 border-black flex flex-col relative" key={index}>
                  <div className="w-[100%] h-[10%] flex flex-row items-center justify-between">
                    <h1 className="text-[5.5vw]">Loan {loan.loanId}</h1>
                    <h1
                      className="text-[#9C4924] text-[4vw]"
                      onClick={() => handleFlagChange(loan.loanId, false)}
                    >
                      Go Back
                    </h1>
                  </div>
                  <div className="w-[100%] h-[90%] flex flex-wrap overflow-y-auto" id="hide-scrollbar">
                    {
                      loan.collateralNFTs.map((nft, index) => (
                        <div key={index} className="h-[45%] ml-[5%] w-[45%] py-2">
                        <img
                          className="ml-[5%] h-[100%] w-[90%] border-2 border-black"
                          src={nft === contracts.bondbear.address ? 'https://ipfs.io/ipfs/QmSaVWb15oQ1HcsUjGGkjwHQ1mxJBYeivtBCgHHHiVLt7w' : 'https://ipfs.io/ipfs/QmNWggx9vvBVEHZc6xwWkdyymoKuXCYrJ3zQwwKzocDxRt'}
                          alt="bera"
                        />
                      </div>
                      ))
                    }
                  </div>
                </div> :
                <div className="w-[100%] h-[40%] p-[3%] font-baloo font-semibold border-b-2 border-black flex flex-col relative" key={index}>
                  {
                    loan.borrowedAmount == 0 &&
                    <div className="rotate-[26deg] text-[8vw] absolute top-[35%] right-[5%] w-[90%] h-[15%] bg-[#79AF45] border-2 border-black flex items-center justify-center z-30">
                      REPAID
                    </div>
                  }
                  {
                    loan.endDate < Math.floor(Date.now() / 1000) &&
                    <div className="rotate-[26deg] text-[8vw] absolute top-[35%] right-[5%] w-[90%] h-[15%] bg-[#CC7E16] border-2 border-black flex items-center justify-center z-30">
                      EXPIRED
                    </div>
                  }
                  {
                    loan.liquidated &&
                    <div className="rotate-[26deg] text-[8vw] absolute top-[35%] right-[5%] w-[90%] h-[15%] bg-[#B11614] border-2 border-black flex items-center justify-center z-30">
                      LIQUIDATED
                    </div>
                  }
                  <div className="w-[100%] flex flex-row items-center justify-between">
                    <h1 className="text-[5.5vw]">Loan {loan.loanId}</h1>
                    <h1
                      className="text-[#9C4924] text-[4vw]"
                      onClick={() => handleFlagChange(loan.loanId, true)}
                    >
                      View Collateral
                    </h1>
                  </div>
                  <div className="w-[100%] my-[8%] text-[4vw] flex flex-col">
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
                  <div className="w-[100%] h-[20%] relative">
                    {
                      allowanceFlags[loan.loanId] &&
                      <div>
                        <button
                          className="left-[0%] h-[100%] w-[42%] absolute border-2 border-black bg-[#E7B941] text-[3vw]"
                          id={`left-approve-button${loan.loanId}`}
                          onClick={() => handleLeftButtonClick(loan.borrowedAmount, loan.loanId)}
                        >
                          approve tx
                        </button>
                        <button
                          className="left-[58%] h-[100%] w-[42%] absolute border-2 border-black bg-[#E7B941] text-[3vw]"
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
                              className="left-[19%] h-[100%] w-[62%] absolute border-2 border-black bg-[#E7B941] text-[4vw]"
                              id={`liquidate-button${loan.loanId}`}
                              onClick={() => {
                                const button = document.getElementById('liquidate-button' + loan.loanId)
                                
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
  )
}