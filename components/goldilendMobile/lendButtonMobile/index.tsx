"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useGoldilend } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"

export const LendButtonMobile = () => {

  const {
    allowanceButtons,
    lendActiveToggle,
    lock,
    stake,
    unstake,
    setAllowanceButtons,
    setTxConfirming,
    refreshGoldilendInfo,
    setDisplayString,
    setLock,
    setStake,
    setUnstake,
    openNotification,
    goldilendWalletInfo,
    refreshGoldilendWalletInfo
  } = useGoldilend()

  const {
    checkLockAllowance,
    checkStakeAllowance,
    sendiBGTApproveTx,
    sendGiBGTApproveTx,
    sendLockTx,
    sendStakeTx,
    sendUnstakeTx
  } = useGoldilendTx()

  const { address } = useAccount()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const refreshInfo = () => {
    setDisplayString('')
    setLock(0)
    setStake(0)
    setUnstake(0)
    refreshGoldilendWalletInfo()
    refreshGoldilendInfo()
  }

  const handleButtonClick = () => {
    const button = document.getElementById('lend-button')
    if(lendActiveToggle === 'LOCK') {
      lockTxFlow(button)
    }
    if(lendActiveToggle === 'STAKE') {
      stakeTxFlow(button)
    }
    if(lendActiveToggle === 'UNSTAKE') {
      unstakeTxFlow(button)
    }
  }

  const lockTxFlow = async (button: HTMLElement | null) => {
    if(lock == 0) {
      button && (button.innerHTML = "lock")
      return
    }
    if(lock > goldilendWalletInfo.ibgt) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkLockAllowance(lock, address as `0x${string}`)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
          button.style.backgroundColor = "#C9E3B9"
        }
        const lockTx = await sendLockTx(lock)
        if(lockTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully locked $iBGT",
            `You locked ${formatAsString(lock)} iBGT`,
            lockTx
          )
          if(button) {
            button.innerHTML = "lock"
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
            button.innerHTML = "lock"
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

  const stakeTxFlow = async (button: HTMLElement | null) => {
    if(stake == 0) {
      button && (button.innerHTML = "stake")
      return
    }
    if(stake > goldilendWalletInfo.gibgt) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkStakeAllowance(stake, address as `0x${string}`)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
          button.style.backgroundColor = "#C9E3B9"
        }
        const stakeTx = await sendStakeTx(stake)
        if(stakeTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully staked $GiBGT",
            `You staked ${formatAsString(stake)} GiBGT`,
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
    if(unstake > goldilendWalletInfo.lendStaked) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
        button.style.backgroundColor = "#C9E3B9"
      }
      const unstakeTx = await sendUnstakeTx(unstake)
      if(unstakeTx.substring(0, 2) === '0x') {
        setTxConfirming(false)
        openNotification(
          true,
          "You've successfully unstaked $GiBGT",
          `You unstaked ${formatAsString(unstake)} GiBGT`,
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


  //todo: fix update allowances here
  const handleLeftButtonClick = async () => {
    const swapButton = document.getElementById('lend-button')
    const leftButton = document.getElementById('left-approve-button')
    const rightButton = document.getElementById('right-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#C9E3B9"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#C9E3B9"
    }
    if(lendActiveToggle === 'LOCK') {
      await sendiBGTApproveTx(lock, false)
      // updateAllowance(honeyBuy + 0.01)
      swapButton && (swapButton.innerHTML = "lock")
      setAllowanceButtons(false)
    }
    else {
      await sendGiBGTApproveTx(stake, false)
      // updateAllowance(honeyBuy + 0.01)
      swapButton && (swapButton.innerHTML = "stake")
      setAllowanceButtons(false)
    }
  }
  
  const handleRightButtonClick = async () => {
    const swapButton = document.getElementById('lend-button')
    const rightButton = document.getElementById('right-approve-button')
    const leftButton = document.getElementById('left-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#C9E3B9"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#C9E3B9"
    }
    if(lendActiveToggle === 'LOCK') {
      await sendiBGTApproveTx(0, true)
      // updateAllowance(100000000)
      swapButton && (swapButton.innerHTML = "lock")
      setAllowanceButtons(false)
    }
    else {
      await sendGiBGTApproveTx(0, true)
      // updateAllowance(100000000)
      swapButton && (swapButton.innerHTML = "stake")
      setAllowanceButtons(false)
    }
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
            className="absolute bg-[#E7B941] h-[8%] w-[23%] top-[50%] left-[23%] border-2 border-black font-amaticbold text-[5vw] focus:bg-[#4D0B24] focus:text-[#E7B941] focus:scale-110"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[23%] top-[50%] left-[54%] border-2 border-black font-amaticbold text-[5vw] focus:bg-[#4D0B24] focus:text-[#E7B941] focus:scale-110"
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
                className="absolute h-[8%] w-[54%] top-[50%] left-[23%] bg-[#E7B941] font-amaticbold flex items-center justify-center text-[9vw] border-2 border-black focus:bg-[#4D0B24] focus:text-[#E7B941] focus:scale-110"
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
                  else if(chain?.name !== "Berachain") {
                    if(button && button.innerHTML === "where berachain") {
                      openChainModal()
                    }
                    else {
                      button && (button.innerHTML = "where berachain")
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