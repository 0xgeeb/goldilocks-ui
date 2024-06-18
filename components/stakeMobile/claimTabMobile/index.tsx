import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useStake, useWallet } from "../../../providers"
import { useStakeTx } from "../../../hooks"
import {
  WalletBalanceMobilePopup,
  NotificationMobile
} from "../../stakeMobile"


export const ClaimTabMobile = () => {

  const {
    txConfirming,
    notification,
    infoLoading,
    setTxConfirming,
    openNotification,
    refreshStakeInfo,
    balanceMobileToggle
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
      button && (button.innerHTML = "no claim")
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
    <div className="absolute top-[7.5%] left-[15.5%] h-[55%] w-[69%] border-2 border-black bg-[#EEDCD2] z-20">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-3 ${txConfirming ? "border-l-2 border-r-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile.png" alt="tx" /> :
          notification.toggle ? <NotificationMobile /> :
          balanceMobileToggle ? <WalletBalanceMobilePopup /> :
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
                <span>{handleInfo(balance.lendClaimable)}</span>
              </div>
            </div>
          </div>
        }
      </div>
      {
        (!txConfirming && !notification.toggle && !balanceMobileToggle) &&
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openChainModal,
            openConnectModal
          }) => {
            return (
              <button 
                className="absolute top-[67.5%] left-[20%] h-[15%] w-[60%] bg-[#E7B941] font-amaticbold text-[9vw] border-2 border-black hover:bg-[#C9E3B9] hover:scale-110 flex items-center justify-center"
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
                    if(button && button.innerHTML === "where Berachain bArtio") {
                      openChainModal()
                    }
                    else {
                      button && (button.innerHTML = "where Berachain bArtio")
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
      }
    </div>
  )
}