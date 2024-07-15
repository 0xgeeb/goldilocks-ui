"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useStake, useWallet } from "../../../providers"
import { useStakeTx } from "../../../hooks"
import { Notification, Chart } from "../../stake"

export const ClaimTab = () => {

  const {
    txConfirming,
    notification,
    infoLoading,
    setTxConfirming,
    openNotification,
    refreshStakeInfo
  } = useStake()

  const { balance, refreshBalances } = useWallet()
  const { sendClaimTx } = useStakeTx()

  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false)

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const handleInfo = (num: number) => {
    if(infoLoading) {
      return loadingElement()
    }
    else if(num > 0) {
      return formatAsString(num)
    }
    else {
      return "-"
    }
  }

  const refreshInfo = () => {
    refreshBalances()
    refreshStakeInfo()
  }

  const claimTxFlow = async () => {
    const button = document.getElementById('claim-button')

    if(balance.claimable == 0) {
      button && (button.innerHTML = "claim")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
        setButtonLoadingColor(true)
      }
      const claimTx = await sendClaimTx()
      if(claimTx.substring(0, 2) === '0x') {
        setTxConfirming(false)
        openNotification(
          true,
          "You've successfully claimed $PRG",
          `You claimed ${formatAsString(balance.claimable)} Porridge`,
          claimTx
        )
        if(button) {
          button.innerHTML = "claim"
          setButtonLoadingColor(false)
        }
        refreshInfo()
        setTimeout(() => {
          openNotification(false, '', '', '')
        }, 10000)
      }
      else {
        if(button) {
          button.innerHTML = "claim"
          setButtonLoadingColor(false)
        }
        refreshInfo()
        setTxConfirming(false)
      }
    }
  }

  return (
    <div className="absolute top-[15%] md:top-[14%] lg:top-[12%] xl:top-[11%] left-[10%] md:left-[15%] lg:left-[25%] xl:left-[30%] w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] h-[60%] border-2 border-black bg-[#EEDCD2] z-20">
      <div className="absolute top-4 left-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-4 right-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-8 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          // chartOpen ? <Chart /> :
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
          notification.toggle ? <Notification /> :
          <div className="relative w-[100%] h-[100%] text-[2.5vw] lg:text-[1.5vw] xl:text-[1vw] flex flex-col justify-around items-center font-baloo font-semibold">
            <div className="w-[70%] md:w-[80%] flex flex-col justify-between">
              <h1 className="text-center font-amaticbold text-[10vw] lg:text-[7vw] xl:text-[4vw]">claim yield</h1>
              <span className="text-[#9C4924] text-[3vw] lg:text-[2vw] xl:text-[1.5vw] mt-[2%]">Porridge Yield</span>
              <div className="w-[100%] flex flex-row justify-between">
                <span>Current Porridge Balance:</span>
                <span>{handleInfo(balance.prg)}</span>
              </div>
              <div className="w-[100%] flex flex-row justify-between">
                <span>Available Porridge to Claim:</span>
                <span>{handleInfo(balance.claimable)}</span>
              </div>
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
                    className={`h-[20%] w-[40%] font-amaticbold text-[5vw] lg:text-[4vw] xl:text-[2vw] ${buttonLoadingColor ? "bg-[#B35227] text-[#E7B941]" : "bg-[#E7B941] text-black"} hover:bg-[#B35227] hover:text-[#E7B941] border-2 border-black hover:scale-110 flex items-center justify-center`}
                    id="claim-button"
                    onClick={() => {
                      const button = document.getElementById('claim-button')
                      
                      if(!account) {
                        if(button && button.innerHTML === "connect wallet") {
                          openConnectModal()
                        }
                        else {
                          button && (button.innerHTML = "connect wallet")
                        }
                      }
                      else if(chain?.name !== "Berachain bArtio") {
                        if(button && button.innerHTML === "where bArtio") {
                          openChainModal()
                        }
                        else {
                          button && (button.innerHTML = "where bArtio")
                        }
                      }
                      else {
                        claimTxFlow()
                      }
                    }}
                  >
                    claim yield
                  </button>
                )
              }}
            </ConnectButton.Custom>
          </div>
        }
      </div>
    </div>
  )
}