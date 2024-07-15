"use client"

import { useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  useGoldilend,
  useWallet
} from "../../../providers"
import { LendNotificationMobile } from "../"
import { useGoldilendTx } from "../../../hooks"
import { LendWalletBalanceMobilePopup } from "../../utils"

export const ClaimTabMobile = () => {

  const {
    txConfirming,
    setTxConfirming,
    notification,
    openNotification,
    infoLoading,
    balanceMobileToggle,
    findBoost,
    userBoost
  } = useGoldilend()

  const { balance, refreshBalances, isConnected } = useWallet()
  const { sendClaimTx } = useGoldilendTx()

  useEffect(() => {
    findBoost()
  }, [isConnected])

  const loadingElement = () => {
    return <span className="loader-small ml-3 mt-2"></span>
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

  const handleInfoClaimable = (num: number) => {
    if(infoLoading) {
      return loadingElement()
    }
    else if(num > 0) {
      if(userBoost.partnerNFTs.length > 0) {
        const prgBoost = userBoost.boostMagnitude < 500 ? userBoost.boostMagnitude : 500
        let boostedNum = num * (1000 + prgBoost) / 1000
        return formatAsString(boostedNum)
      }
      else {
        return formatAsString(num)
      }
    }
    else {
      return "-"
    }
  }

  const claimTxFlow = async () => {
    const button = document.getElementById('claim-button')
    if(balance.lendClaimable == 0) {
      button && (button.innerHTML = "claim yield")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
        button.style.backgroundColor = "#C9E3B9"
      }
      const claimTx = await sendClaimTx()
      if(claimTx.substring(0, 2) === '0x') {
        setTxConfirming(false)
        openNotification(
          true,
          "You've successfully claimed $PRG",
          `You claimed ${formatAsString(balance.lendClaimable)} Porridge`,
          claimTx
        )
        if(button) {
          button.innerHTML = "claim yield"
          button.style.backgroundColor = "#E7B941"
          button.style.color = "black"
        }
        refreshBalances()
        setTimeout(() => {
          openNotification(false, '', '', '')
        }, 10000)
      }
      else {
        if(button) {
          button.innerHTML = "claim yield"
          button.style.backgroundColor = "#E7B941"
          button.style.color = "black"
        }
        setTxConfirming(false)  
      }
    }
  }

  return (
    <>
      <div className="absolute top-[7.5%] left-[15.5%] h-[55%] w-[69%] border-2 border-black bg-[#EEDCD2] z-20">
        <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
        <div className={`absolute inset-3 ${txConfirming ? "border-l-2 border-r-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}>
          {
            txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile.png" alt="tx" /> :
            notification.toggle ? <LendNotificationMobile /> :
            balanceMobileToggle ? <LendWalletBalanceMobilePopup /> :
            <div className="relative w-[100%] h-[100%] px-[4%] flex flex-col items-center font-baloo font-semibold">
              <h1 className="font-amaticbold text-[14vw]">claim yield</h1>
              <div className="flex flex-col justify-between w-[100%] mt-[10%]">
                <span className="text-[#9C4924] text-[4.5vw]">Porridge Yield</span>
                <div className="w-[100%] flex flex-row justify-between text-[3.5vw] mt-[2%]">
                  <span>$PRG balance:</span>
                  <span>{handleInfo(balance.prg)}</span>
                </div>
                <div className="w-[100%] flex flex-row justify-between text-[3.5vw]">
                  <span>claimable $PRG:</span>
                  <span>{handleInfoClaimable(balance.lendClaimable)}</span>
                </div>
              </div>
              <div className="flex flex-col justify-between w-[100%] mt-[15%]">
                <span className="text-[#9C4924] text-[4.5vw]">Infrared iBGT Staking Yield</span>
                <div className="w-[100%] flex flex-row justify-between text-[3.5vw]">
                  <span>wif:</span>
                  <span>69.00</span>
                </div>
                <div className="w-[100%] flex flex-row justify-between text-[3.5vw]">
                  <span>boden:</span>
                  <span>69.00</span>
                </div>
                <div className="w-[100%] flex flex-row justify-between text-[3.5vw]">
                  <span>bera:</span>
                  <span>69.00</span>
                </div>
              </div>
            </div>
          }
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
              className="absolute top-[67.5%] left-[22.5%] h-[7.5%] w-[55%] bg-[#E7B941] font-amaticbold text-[9vw] border-2 border-black hover:bg-[#C9E3B9] hover:scale-110 flex items-center justify-center"
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
    </>
  )
}