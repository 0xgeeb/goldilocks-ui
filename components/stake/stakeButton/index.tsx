import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  useStake,
  useWallet
} from "../../../providers"
import { useStakeTx } from "../../../hooks"

export const StakeButton = () => {

  const {
    stakeInfo,
    displayString,
    setStake,
    setUnstake,
    setStir,
    setDisplayString,
    refreshStakeInfo,
    updateAllowance,
    setAllowanceButtons,
    allowanceButtons,
    activeToggle,
    stake,
    unstake,
    stir
  } = useStake()

  const {
    wallet,
    balance,
    refreshBalances,
    isConnected
  } = useWallet()

  const {
    checkAllowance,
    sendApproveTx,
    sendStakeTx,
    sendUnstakeTx,
    sendStirTx,
    sendClaimTx
  } = useStakeTx()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const refreshInfo = () => {
    setDisplayString('')
    setStake(0)
    setUnstake(0)
    setStir(0)
    refreshBalances()
    refreshStakeInfo()
  }

  const handleButtonClick = async () => {

  }

  const stakeTxFlow = async (button: HTMLElement | null) => {

  }

  const unstakeTxFlow = async (button: HTMLElement | null) => {
    
  }

  const stirTxFlow = async (button: HTMLElement | null) => {
    
  }

  const claimTxFlow = async (button: HTMLElement | null) => {
    
  }


  const handleLeftButtonClick = async () => {
    const stakeButton = document.getElementById('stake-button')
    const leftButton = document.getElementById('left-approve-button')
    const rightButton = document.getElementById('right-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#B35227"
      leftButton.style.color = "#E7B941"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#B35227"
      rightButton.style.color = "#E7B941"
    }
    // await sendApproveTx(repay, false)
    // updateAllowance(repay + 0.01)
    // stakeButton && (stakeButton.innerHTML = "repay")
    // setAllowanceButtons(false)
  }

  const handleRightButtonClick = async () => {
    const stakeButton = document.getElementById('stake-button')
    const rightButton = document.getElementById('right-approve-button')
    const leftButton = document.getElementById('left-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#B35227"
      leftButton.style.color = "#E7B941"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#B35227"
      rightButton.style.color = "#E7B941"
    }
    // await sendApproveTx(0, true)
    // updateAllowance(100000000)
    // stakeButton && (stakeButton.innerHTML = "repay")
    // setAllowanceButtons(false)
  }

  const renderButton = () => {
    if(activeToggle === 'STAKE') {
      if(isConnected && stake > stakeInfo.locksPrgAllowance && balance.locks >= stake) {
        return 'approve use of $locks'
      }
      return 'stake'
    }
    if(activeToggle === 'UNSTAKE') {
      return 'unstake'
    }
    if(activeToggle === 'STIR') {
      if(isConnected && stir * (stakeInfo.fsl / stakeInfo.supply) > stakeInfo.honeyPrgAllowance && balance.prg >= stir) {
        return 'approve use of $honey'
      }
      return 'stir'
    }
    if(activeToggle === 'CLAIM') {
      return 'claim'
    }
  }

  return (
    <>
      {
        allowanceButtons &&
        <div></div>
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
                className="absolute h-[8%] w-[16.6%] top-[51.8%] left-[41.6%] bg-[#E7B941] font-amaticbold text-[1.9vw] border-2 border-black hover:bg-[#B35227] hover:text-[#E7B941] hover:scale-110"
                id="stake-button"
                onClick={() => {
                  const button = document.getElementById('stake-button')
                  
                  if(!account) {
                    if(button && button.innerHTML === "connect wallet") {
                      openConnectModal()
                    }
                    else {
                      button && (button.innerHTML = "connect wallet")
                    }
                  }
                  else if(chain?.name !== "Berachain Artio") {
                    if(button && button.innerHTML === "where tastenet") {
                      openChainModal()
                    }
                    else {
                      button && (button.innerHTML = "where tastenet")
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