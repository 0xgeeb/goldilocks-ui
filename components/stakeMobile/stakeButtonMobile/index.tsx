import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  useStake,
  useWallet
} from "../../../providers"
import { useStakeTx } from "../../../hooks"

export const StakeButtonMobile = () => {

  const {
    stakeInfo,
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
    setTxConfirming,
    openNotification
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
      button && (button.innerHTML = "balance too low")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(stake, 'locks', wallet)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
          button.style.backgroundColor = "#B35227"
          button.style.color = "#E7B941"
        }
        const stakeTx = await sendStakeTx(stake)
        if(stakeTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully staked $LOCKS",
            `You staked ${formatAsString(stake)} Locks`,
            stakeTx
          )
          if(button) {
            button.innerHTML = "stake"
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
            button.innerHTML = "stake"
            button.style.backgroundColor = "#E7B941"
            button.style.color = "black"
          }
          refreshInfo()
          setTxConfirming(false)
        }
      }
      else {
        setAllowanceButtons(true)
      }
    }
  }

  const unstakeTxFlow = async (button: HTMLElement | null) => {
    if(unstake == 0) {
      button && (button.innerHTML = "unstake")
      return
    }
    if(unstake > balance.staked - balance.locked) {
      button && (button.innerHTML = "balance too low")
      return
    }
    if(unstake > balance.staked) {
      button && (button.innerHTML = "balance too low")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
        button.style.backgroundColor = "#B35227"
        button.style.color = "#E7B941"
      }
      const unstakeTx = await sendUnstakeTx(unstake)
      if(unstakeTx.substring(0, 2) === '0x') {
        setTxConfirming(false)
        openNotification(
          true,
          "You've successfully unstaked $LOCKS",
          `You unstaked ${formatAsString(unstake)} Locks`,
          unstakeTx
        )
        if(button) {
          button.innerHTML = "unstake"
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
          button.innerHTML = "unstake"
          button.style.backgroundColor = "#E7B941"
          button.style.color = "black"
        }
        refreshInfo()
        setTxConfirming(false)
      }
    }
  }

  const stirTxFlow = async (button: HTMLElement | null) => {
    if(stir == 0) {
      button && (button.innerHTML = "stir")
      return
    }
    if(stir > balance.prg) {
      button && (button.innerHTML = "balance too low")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(stir * (stakeInfo.fsl / stakeInfo.supply), 'honey', wallet)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
          button.style.backgroundColor = "#B35227"
          button.style.color = "#E7B941"
        }
        const stirTx = await sendStirTx(stir)
        if(stirTx === 'balance') {
          button && (button.innerHTML = "need more honey")
          setTimeout(() => {
            button && (button.innerHTML = "stir")
          }, 10000)
        }
        else if(stirTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully stirred $PRG",
            `You stirred ${formatAsString(stir)} Porridge with ${formatAsString(stir * (stakeInfo.fsl / stakeInfo.supply))} Honey`,
            stirTx
          )
          if(button) {
            button.innerHTML = "stir"
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
            button.innerHTML = "stir"
            button.style.backgroundColor = "#E7B941"
            button.style.color = "black"
          }
          refreshInfo()
          setTxConfirming(false)
        }
      }
      else {
        setAllowanceButtons(true)
      }
    }
  }

  const claimTxFlow = async (button: HTMLElement | null) => {
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
          className="absolute bg-[#E7B941] h-[8%] w-[23%] top-[39.8%] left-[23%] border-2 border-black font-amaticbold text-[5vw] focus:bg-[#4D0B24] focus:text-[#E7B941] focus:scale-110"
          id="left-approve-button"
          onClick={() => handleLeftButtonClick()}
        >
          approve tx
        </button>
        <button
          className="absolute bg-[#E7B941] h-[8%] w-[23%] top-[39.8%] left-[54%] border-2 border-black font-amaticbold text-[5vw] focus:bg-[#4D0B24] focus:text-[#E7B941] focus:scale-110"
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
              className="absolute h-[8%] w-[54%] top-[39.8%] left-[23%] bg-[#E7B941] font-amaticbold flex items-center justify-center text-[9vw] border-2 border-black focus:bg-[#4D0B24] focus:text-[#E7B941] focus:scale-110"
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