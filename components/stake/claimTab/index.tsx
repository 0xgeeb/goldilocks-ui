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
        button.style.backgroundColor = "#B35227"
        button.style.color = "#E7B941"
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
          button.innerHTML = "claim"
          button.style.backgroundColor = "#E7B941"
          button.style.color = "black"
        }
        refreshInfo()
        setTxConfirming(false)
      }
    }
  }

  return (
    <div className="absolute top-[10.12%] left-[30%] h-[60%] w-[40%] border-2 border-black bg-[#EEDCD2] z-20">
      <div className="absolute top-4 left-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-4 right-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-8 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          // chartOpen ? <Chart /> :
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
          notification.toggle ? <Notification /> :
          <div className="relative w-[100%] h-[100%] text-[2vw] xl:text-[1vw] flex flex-col items-center font-baloo font-semibold">
            <h1 className="font-amaticbold text-[8vw] xl:text-[4vw] mt-[2%]">claim yield</h1>
            <div className="w-[70%] flex flex-col justify-between mt-[2%]">
              <span className="text-[#9C4924]">Porridge Yield</span>
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
                    className="mt-[7%] h-[20%] w-[40%] bg-[#E7B941] font-amaticbold text-[4vw] xl:text-[2vw] border-2 border-black hover:bg-[#C9E3B9] hover:scale-110 flex items-center justify-center"
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