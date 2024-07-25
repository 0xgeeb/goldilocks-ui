"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  useStake,
  useWallet
} from "../../../providers"
import { useStakeTx } from "../../../hooks"

export const StakeButton = () => {

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

  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false)

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
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(stake, 'locks', wallet)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
          setButtonLoadingColor(true)
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
            setButtonLoadingColor(false)
          }
          refreshInfo()
          setTimeout(() => {
            openNotification(false, '', '', '')
          }, 10000)
        }
        else {
          if(button) {
            button.innerHTML = "stake"
            setButtonLoadingColor(false)
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
      button && (button.innerHTML = "not enough")
      return
    }
    if(unstake > balance.staked) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
        setButtonLoadingColor(true)
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
          setButtonLoadingColor(false)
        }
        refreshInfo()
        setTimeout(() => {
          openNotification(false, '', '', '')
        }, 10000)
      }
      else {
        if(button) {
          button.innerHTML = "unstake"
          setButtonLoadingColor(false)
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
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(stir * (stakeInfo.fsl / stakeInfo.supply), 'honey', wallet)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
          setButtonLoadingColor(true)
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
            setButtonLoadingColor(false)
          }
          refreshInfo()
          setTimeout(() => {
            openNotification(false, '', '', '')
          }, 10000)
        }
        else {
          if(button) {
            button.innerHTML = "stir"
            setButtonLoadingColor(false)
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
        setButtonLoadingColor(true)
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
          setButtonLoadingColor(false)
        }
        refreshInfo()
        setTimeout(() => {
          openNotification(false, '', '', '')
        }, 10000)
      }
      else {
        if(button) {
          button.innerHTML = "claim"
          setButtonLoadingColor(false)
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
      if(isConnected && stake > balance.locksPrgAllowance && balance.locks >= stake) {
        return 'approve locks'
      }
      return 'stake'
    }
    if(activeToggle === 'UNSTAKE') {
      return 'unstake'
    }
    if(activeToggle === 'STIR') {
      if(isConnected && stir * (stakeInfo.fsl / stakeInfo.supply) > balance.honeyPrgAllowance && balance.prg >= stir) {
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
            className="absolute bg-[#E7B941] h-[8%] w-[24%] lg:w-[16.6%] top-[60%] lg:top-[54.8%] 2xl:top-[55%] left-[24%] lg:left-[30.9%] border-2 border-black font-amaticbold text-[4vw] md:text-[2.75vw] lg:text-[2vw] xl:text-[1.5vw] hover:bg-[#B35227] hover:text-[#E7B941] hover:scale-110"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[24%] lg:w-[16.6%] top-[60%] lg:top-[54.8%] 2xl:top-[55%] left-[52%] lg:left-[52.5%] border-2 border-black font-amaticbold text-[4vw] md:text-[2.75vw] lg:text-[2vw] xl:text-[1.5vw] hover:bg-[#B35227] hover:text-[#E7B941] hover:scale-110"
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
                className={`absolute h-[8%] w-[36%] md:w-[26%] lg:w-[16.6%] top-[60%] lg:top-[54.8%] 2xl:top-[55%] left-[32%] md:left-[37%] lg:left-[41.6%] ${buttonLoadingColor ? "bg-[#B35227] text-[#E7B941]" : "bg-[#E7B941] text-black"} hover:bg-[#B35227] hover:text-[#E7B941] font-amaticbold text-[5vw] md:text-[4vw] lg:text-[3vw] xl:text-[2.25vw] 2xl:text-[1.9vw] tall:text-[6vw] tall:md:text-[4vw] tall:lg:text-[3vw] tall:xl:text-[2.5vw] tall:2xl:text-[1.9vw] border-2 border-black hover:scale-110`}
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