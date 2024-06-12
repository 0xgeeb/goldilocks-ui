import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  useGoldilend,
  useWallet
} from "../../../providers"
import { LendNotificationMobile } from "../"
import { useGoldilendTx } from "../../../hooks"

export const ClaimTabMobile = () => {

  const {
    txConfirming,
    setTxConfirming,
    notification,
    openNotification,
    infoLoading
  } = useGoldilend()

  const { balance, refreshBalances } = useWallet()
  const { sendClaimTx } = useGoldilendTx()

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
    <div className="absolute top-[7.5%] left-[15.5%] h-[70%] w-[69%] border-2 border-black bg-[#EEDCD2] z-20">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-3 ${txConfirming ? "border-l-2 border-r-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile.png" alt="tx" /> :
          notification.toggle ? <LendNotificationMobile /> :
          <div className="relative w-[100%] h-[100%] flex flex-col items-center font-baloo font-semibold">
            <h1 className="font-amaticbold text-[4vw] mt-[4%]">claim yield</h1>
            <div className="w-[70%] h-[15%] mt-[5%] flex flex-col justify-between">
              <span className="text-[#9C4924]">Porridge Yield</span>
              <div className="w-[100%] flex flex-row justify-between">
                <span>Current Porridge Balance:</span>
                <span>{handleInfo(balance.prg)}</span>
              </div>
              <div className="w-[100%] flex flex-row justify-between">
                <span>Available Porridge to Claim:</span>
                <span>{handleInfo(balance.lendClaimable)}</span>
              </div>
            </div>
            <div className="w-[70%] mt-[8%] flex flex-col justify-between">
              <span className="text-[#9C4924]">Infrared iBGT Staking Yield</span>
              <div className="w-[100%] flex flex-row justify-between">
                <span>wif:</span>
                <span>69.00</span>
              </div>
              <div className="w-[100%] flex flex-row justify-between">
                <span>boden:</span>
                <span>69.00</span>
              </div>
              <div className="w-[100%] flex flex-row justify-between">
                <span>jenner:</span>
                <span>69.00</span>
              </div>
              <div className="w-[100%] flex flex-row justify-between">
                <span>bera:</span>
                <span>69.00</span>
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
                    className="mt-[7%] h-[12%] w-[60%] bg-[#E7B941] font-amaticbold text-[1.9vw] border-2 border-black hover:bg-[#C9E3B9] hover:scale-110 flex items-center justify-center"
                    id="claim-button"
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