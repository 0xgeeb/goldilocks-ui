"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useGoldivault } from "../../../providers"
import { useGoldivaultTx } from "../../../hooks"

export const VaultButtonMobile = () => {

  const {
    deposit,
    redeemOT,
    activeToggle,
    allowanceButtons
  } = useGoldivault()

  const {

  } = useGoldivaultTx()

  const refreshInfo = () => {

  }

  const handleButtonClick = () => {

  }

  const handleLeftButtonClick = async () => {

  }

  const handleRightButtonClick = async () => {

  }

  const renderButton = (): string => {
    if(activeToggle === 'DEPOSIT') {
      return 'deposit'
    }
    else if(activeToggle === 'REDEEMOT') {
      return 'redeem ot'
    }
    else {
      return ''
    }
  }

  return (
    <>
      {
        allowanceButtons &&
        <div>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[24%] lg:w-[16.6%] top-[73.5%] md:top-[71.5%] lg:top-[72.5%] xl:top-[72.5%] left-[24%] lg:left-[30.9%] border-2 border-black font-amaticbold text-[4vw] md:text-[2.75vw] lg:text-[2vw] xl:text-[1.75vw] 2xl:text-[1.5vw] hover:bg-[#4D0B24] hover:text-[#E7B941] hover:scale-110"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[24%] lg:w-[16.6%] top-[73.5%] md:top-[71.5%] lg:top-[72.5%] xl:top-[72.5%] left-[52%] lg:left-[52.5%] border-2 border-black font-amaticbold text-[4vw] md:text-[2.75vw] lg:text-[2vw] xl:text-[1.75vw] 2xl:text-[1.5vw] hover:bg-[#4D0B24] hover:text-[#E7B941] hover:scale-110"
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
          }) =>{
            return (
              <button
                className="absolute h-[8%] w-[54%] top-[75%] left-[23%] bg-[#E7B941] font-amaticbold flex items-center justify-center text-[9vw] border-2 border-black focus:bg-[#4D0B24] focus:text-[#E7B941] focus:scale-110"
                id="deposit-button"
                onClick={() => {
                  const button = document.getElementById('deposit-button')
                  
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
                    handleButtonClick()
                  }
                }}
              >
                { renderButton() }
              </button>
            )
          }}
        </ConnectButton.Custom>
      }
    </>
  )
}