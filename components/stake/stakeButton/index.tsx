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
    stir,
    setTxConfirming
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
    const button = document.getElementById('stake-button')
    if(activeToggle === 'STAKE') {
      stakeTxFlow(button)
    }
    if(activeToggle === 'UNSTAKE') {
      unstakeTxFlow(button)
    }
    if(activeToggle === 'STIR') {
      stirTxFlow(button)
    }
    if(activeToggle === 'CLAIM') {
      claimTxFlow(button)
    }
  }

  const stakeTxFlow = async (button: HTMLElement | null) => {
    if(stake == 0) {
      button && (button.innerHTML = "stake")
      return
    }
    if(stake > balance.locks) {
      button && (button.innerHTML = "insufficient balance")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(stake, 'locks', wallet)
      if(sufficientAllowance) {
        setTxConfirming(true)
      }
      else {
        setAllowanceButtons(true)
      }
    }
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
    if(activeToggle === "STAKE") {
      await sendApproveTx(stake, 'locks', false)
      updateAllowance('locks', stake + 0.01)
      stakeButton && (stakeButton.innerHTML = "stake")
      setAllowanceButtons(false)
    }
    else {
      await sendApproveTx(stir * (stakeInfo.fsl / stakeInfo.supply), 'honey', false)
      updateAllowance('honey', (stir * (stakeInfo.fsl / stakeInfo.supply)) + 0.01)
      stakeButton && (stakeButton.innerHTML = "stake")
      setAllowanceButtons(false)
    }
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
    if(activeToggle === "STAKE") {
      await sendApproveTx(0, 'locks', true)
      updateAllowance('locks', 100000000)
      stakeButton && (stakeButton.innerHTML = "repay")
      setAllowanceButtons(false)
    }
    else {
      await sendApproveTx(0, 'honey', true)
      updateAllowance('honey', 100000000)
      stakeButton && (stakeButton.innerHTML = "repay")
      setAllowanceButtons(false)
    }
  }

  const renderButton = () => {
    if(activeToggle === 'STAKE') {
      if(isConnected && stake > stakeInfo.locksPrgAllowance && balance.locks >= stake) {
        return 'approve locks'
      }
      return 'stake'
    }
    if(activeToggle === 'UNSTAKE') {
      return 'unstake'
    }
    if(activeToggle === 'STIR') {
      if(isConnected && stir * (stakeInfo.fsl / stakeInfo.supply) > stakeInfo.honeyPrgAllowance && balance.prg >= stir) {
        return 'approve honey'
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
        <div>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[16.6%] top-[51.8%] left-[30.9%] border-2 border-black font-amaticbold text-[1.5vw] hover:bg-[#B35227] hover:text-[#E7B941] hover:scale-110"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[16.6%] top-[51.8%] left-[52.5%] border-2 border-black font-amaticbold text-[1.5vw] hover:bg-[#B35227] hover:text-[#E7B941] hover:scale-110"
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