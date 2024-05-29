import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  useGoldilend,
  useWallet
} from "../../../providers"
import { useGoldilendTx } from "../../../hooks"

export const LendButton = () => {

  const {
    allowanceButtons,
    lendActiveToggle
  } = useGoldilend()

  const handleButtonClick = () => {

  }
  
  const handleLeftButtonClick = () => {

  }
  
  const handleRightButtonClick = () => {

  }

  const renderButton = () => {
    if(lendActiveToggle === 'LOCK') {
      return 'lock'
    }
    if(lendActiveToggle === 'STAKE') {
      return 'stake'
    }
    if(lendActiveToggle === 'UNSTAKE') {
      return 'unstake'
    }
  }

  return (
    <>
      {
        allowanceButtons &&
        <div>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[16.6%] top-[59%] left-[33.9%] border-2 border-black font-amaticbold text-[1.5vw] hover:bg-[#C9E3B9] hover:scale-110"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[16.6%] top-[59%] left-[55.5%] border-2 border-black font-amaticbold text-[1.5vw] hover:bg-[#C9E3B9] hover:scale-110"
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
                className="absolute h-[8%] w-[16.6%] top-[59%] left-[44.7%] bg-[#E7B941] font-amaticbold text-[1.9vw] border-2 border-black hover:bg-[#C9E3B9] hover:scale-110"
                id="lend-button"
                onClick={() => {
                  const button = document.getElementById('lend-button')
                  
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