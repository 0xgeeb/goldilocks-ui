"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useGoldilend } from "../../../providers"
import { LendNotification } from "../../goldilend"
import { useGoldilendTx } from "../../../hooks"

export const ClaimTab = () => {

  const {
    txConfirming,
    setTxConfirming,
    notification,
    openNotification,
    walletInfoLoading,
    userBoost,
    refreshGoldilendWalletInfo,
    goldilendWalletInfo
  } = useGoldilend()

  const { sendClaimTx } = useGoldilendTx()

  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false)

  const loadingElement = () => {
    return <span className="loader-small ml-3 mt-2"></span>
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const formatAsClaimableString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 6 })
  }

  const handleInfoClaimable = (num: number) => {
    if(walletInfoLoading) {
      return loadingElement()
    }
    else if(num > 0) {
      if(userBoost.partnerNFTs.length > 0) {
        const prgBoost = userBoost.boostMagnitude < 500 ? userBoost.boostMagnitude : 500
        let boostedNum = num * (1000 + prgBoost) / 1000
        return formatAsClaimableString(boostedNum)
      }
      else {
        return formatAsClaimableString(num)
      }
    }
    else {
      return "-"
    }
  }

  const claimTxFlow = async () => {
    const button = document.getElementById('claim-button')
    if(goldilendWalletInfo.lendClaimable == 0) {
      button && (button.innerHTML = "claim yield")
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
          `You claimed ${formatAsString(goldilendWalletInfo.lendClaimable)} Porridge and ${formatAsString(goldilendWalletInfo.lendInfraredClaimable)} Honey`,
          claimTx
        )
        if(button) {
          button.innerHTML = "claim yield"
          setButtonLoadingColor(false)
        }
        refreshGoldilendWalletInfo()
        setTimeout(() => {
          openNotification(false, '', '', '')
        }, 10000)
      }
      else {
        if(button) {
          button.innerHTML = "claim yield"
          setButtonLoadingColor(false)
        }
        setTxConfirming(false)  
      }
    }
  }

  return (
    <div className="absolute top-[14%] left-[20%] xl:left-[39%] h-[65%] xl:h-[70%] w-[60%] xl:w-[28%] border-2 border-black bg-[#EEDCD2] z-20">
      <div className="absolute top-4 left-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-4 right-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-8 ${txConfirming ? "border-l-2 border-r-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
          notification.toggle ? <LendNotification /> :
          <div className="relative w-[100%] h-[100%] text-[2vw] lg:text-[1.5vw] xl:text-[1vw] flex flex-col items-center font-baloo font-semibold">
            <h1 className="font-amaticbold text-[8vw] lg:text-[6vw] xl:text-[4vw]">claim yield</h1>
            <div className="w-[80%] flex flex-col justify-between">
              <span className="text-[#9C4924]">Porridge Yield</span>
              {/* <div className="w-[100%] flex flex-row justify-between">
                <span>Current Porridge Balance:</span>
                <span>{handleInfo(goldilendWalletInfo.prg)}</span>
              </div> */}
              <div className="w-[100%] flex flex-row justify-between">
                <span>Available Porridge to Claim:</span>
                <span>{handleInfoClaimable(goldilendWalletInfo.lendClaimable)}</span>
              </div>
            </div>
            <div className="w-[80%] mt-[2%] flex flex-col justify-between">
              <span className="text-[#9C4924]">Infrared iBGT Staking Yield</span>
              <div className="w-[100%] flex flex-row justify-between">
                <span>Available Honey to Claim:</span>
                <span>{handleInfoClaimable(goldilendWalletInfo.lendInfraredClaimable)}</span>
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
                    className={`mt-[7%] h-[12%] w-[40%] xl:w-[60%] ${buttonLoadingColor ? "bg-[#C9E3B9] text-black" : "bg-[#E7B941] text-black"} hover:bg-[#C9E3B9] hover:text-black font-amaticbold text-[4vw] xl:text-[1.9vw] border-2 border-black hover:scale-110 flex items-center justify-center`}
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
                      else if(chain?.name !== "Berachain") {
                        if(button && button.innerHTML === "where berachain") {
                          openChainModal()
                        }
                        else {
                          button && (button.innerHTML = "where berachain")
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