"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

export const VaultButton = () => {

  return (
    <>
      {
        // allowanceButtons &&
        // <div>
        //   <button
        //     className="absolute bg-[#E7B941] h-[8%] w-[24%] lg:w-[16.6%] top-[70%] md:top-[68%] lg:top-[69%] xl:top-[69%] left-[24%] lg:left-[30.9%] border-2 border-black font-amaticbold text-[4vw] md:text-[2.75vw] lg:text-[2vw] xl:text-[1.75vw] 2xl:text-[1.5vw] hover:bg-[#4D0B24] hover:text-[#E7B941] hover:scale-110"
        //     id="left-approve-button"
        //     onClick={() => handleLeftButtonClick()}
        //   >
        //     approve tx
        //   </button>
        //   <button
        //     className="absolute bg-[#E7B941] h-[8%] w-[24%] lg:w-[16.6%] top-[70%] md:top-[68%] lg:top-[69%] xl:top-[69%] left-[52%] lg:left-[52.5%] border-2 border-black font-amaticbold text-[4vw] md:text-[2.75vw] lg:text-[2vw] xl:text-[1.75vw] 2xl:text-[1.5vw] hover:bg-[#4D0B24] hover:text-[#E7B941] hover:scale-110"
        //     id="right-approve-button"
        //     onClick={() => handleRightButtonClick()}
        //   >
        //     approve infinite
        //   </button>
        // </div>
      }
      {
        // !allowanceButtons &&
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openChainModal,
            openConnectModal
          }) => {
            return (
              <button
                className="absolute h-[8%] w-[16.6%] top-[72.5%] left-[41.6%] bg-[#E7B941] text-black border-2 border-black hover:scale-110 font-amaticbold text-[2vw] cursor-pointer"
                id="deposit-button"
                onClick={() => {
                  const button = document.getElementById('swap-button')
                  
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
                    // handleButtonClick()
                  }
                }}
              >
                DEPOSIT
              </button>
            )
          }}
        </ConnectButton.Custom>
      }
    </>
  )
}