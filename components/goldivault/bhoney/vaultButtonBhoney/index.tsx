"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useGoldivault } from "../../../../providers"
import { useGoldivaultTx } from "../../../../hooks"
import { contracts } from "../../../../utils/addressi"

export const VaultButtonBhoney = () => {

  const {
    deposit,
    redeemOT,
    redeemYT,
    tradeInput,
    tradeOutput,
    goldivaultWalletInfoBhoney,
    debouncedDeposit,
    otAmount,
    outputTokensLoading,
    setTxConfirming,
    openNotification,
    allowanceButtons,
    goldivaultInfoBhoney,
    setAllowanceButtons,
    activeToggle,
    setDisplayString,
    setDeposit,
    setRedeemOT,
    setOtAmount,
    setYtAmount,
    setOutputTokensLoading,
    refreshGoldivaultInfoBhoney,
    refreshGoldivaultWalletInfoBhoney,
    setTradeInput,
    setTradeOutput,
    tradeDirection
  } = useGoldivault()

  const {
    checkAllowance,
    checkRouterAllowance,
    sendApproveTx,
    sendRouterApproveTx,
    sendDepositTx,
    sendRedeemOTTx,
    sendRedeemYTTx,
    sendTradeTx
  } = useGoldivaultTx()

  const { address, isConnected } = useAccount()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const refreshInfo = () => {
    refreshGoldivaultInfoBhoney()
    refreshGoldivaultWalletInfoBhoney()
    setDisplayString('')
    setDeposit(0)
    setRedeemOT(0)
    setOtAmount(0)
    setYtAmount(0)
    setTradeInput(0)
    setTradeOutput(0)
    setOutputTokensLoading(false)
  }

  const handleButtonClick = () => {
    const button = document.getElementById('deposit-button')
    if(outputTokensLoading) {
      return
    }
    if(activeToggle === 'DEPOSIT') {
      depositTxFlow(button)
    }
    if(activeToggle === 'REDEEMOT') {
      redeemOTFlow(button)
    }
    if(activeToggle === 'REDEEMYT') {
      redeemYTFlow(button)
    }
    if(activeToggle === 'TRADEOT' || activeToggle === 'TRADEYT') {
      tradeFlow(button)
    }
  }

  const depositTxFlow = async (button: HTMLElement | null) => {
    button && (button.innerHTML = "vault concluded")
    return
    // if(deposit == 0) {
    //   button && (button.innerHTML = "deposit")
    //   return
    // }
    // if(deposit > goldivaultWalletInfoBhoney.honey) {
    //   button && (button.innerHTML = "not enough")
    //   return
    // }
    // else {
    //   const sufficientAllowance: boolean | void = await checkAllowance(deposit, 'bhoney', address as string)
    //   if(sufficientAllowance) {
    //     setTxConfirming(true)
    //     if(button) {
    //       button.innerHTML = "confirming..."
    //     }
    //     const depositTx = await sendDepositTx(deposit, 'bhoney')
    //     if(depositTx === 'revert') {
    //       button && (button.innerHTML = "deposit failed")
    //       setTxConfirming(false)
    //       setTimeout(() => {
    //         button && (button.innerHTML = "deposit")
    //       }, 5000)
    //     }
    //     else if(depositTx.substring(0, 2) === '0x') {
    //       setTxConfirming(false)
    //       openNotification(
    //         true,
    //         "You've successfully deposited Honey tokens",
    //         `You deposited ${formatAsString(deposit)} Honey`,
    //         depositTx
    //       )
    //       if(button) {
    //         button.innerHTML = "deposit"
    //       }
    //       refreshInfo()
    //       setTimeout(() => {
    //         openNotification(false, '', '', '')
    //       }, 10000)
    //     }
    //     else {
    //       if(button) {
    //         button.innerHTML = "deposit"
    //       }
    //       refreshInfo()
    //       setTxConfirming(false)
    //     }
    //   }
    //   else {
    //     setAllowanceButtons(true)
    //   }
    // }
  }

  const redeemOTFlow = async (button: HTMLElement | null) => {
    if(redeemOT == 0) {
      button && (button.innerHTML = "redeem ot")
      return
    }
    if(redeemOT > goldivaultWalletInfoBhoney.bhot) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
      }
      const redeemOTTx = await sendRedeemOTTx(redeemOT, 'bhoney')
      if(redeemOTTx.substring(0, 2) === '0x') {
        setTxConfirming(false)
        openNotification(
          true,
          "You've successfully redeemed your ownership tokens",
          `You redeemed ${formatAsString(redeemOT)} ownership tokens`,
          redeemOTTx
        )
        if(button) {
          button.innerHTML = "redeem ot"
        }
        refreshInfo()
        setTimeout(() => {
          openNotification(false, '', '', '')
        }, 10000)
      }
      else {
        if(button) {
          button.innerHTML = "redeem ot"
        }
        refreshInfo()
        setTxConfirming(false)
      }
    }
  }

  const redeemYTFlow = async (button: HTMLElement | null) => {
    if(redeemYT == 0) {
      button && (button.innerHTML = "redeem yt")
      return
    }
    if(redeemYT > goldivaultWalletInfoBhoney.bhyt) {
      button && (button.innerHTML = "not enough")
      return
    }
    if(goldivaultInfoBhoney.concludeTime == 0) {
      button && (button.innerHTML = "not concluded")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
      }
      const redeemYTTx = await sendRedeemYTTx(redeemYT, 'bhoney')
      if(redeemYTTx.substring(0, 2) === '0x') {
        setTxConfirming(false)
        openNotification(
          true,
          "You've successfully redeemed your yield tokens",
          `You redeemed ${formatAsString(redeemYT)} yield tokens`,
          redeemYTTx
        )
        if(button) {
          button.innerHTML = "redeem yt"
        }
        refreshInfo()
        setTimeout(() => {
          openNotification(false, '', '', '')
        }, 10000)
      }
      else {
        if(button) {
          button.innerHTML = "redeem yt"
        }
        refreshInfo()
        setTxConfirming(false)
      }
    }
  }

  const tradeFlow = async (button: HTMLElement | null) => {
    if(tradeInput == 0) {
      button && (button.innerHTML = "trade")
      return
    }
    let num
    let addy
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        num = goldivaultWalletInfoBhoney.bhot
        addy = contracts.bhot.address
      }
      else {
        num = goldivaultWalletInfoBhoney.honey
        addy = contracts.honey.address
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        num = goldivaultWalletInfoBhoney.bhyt
        addy = contracts.bhyt.address
      }
      else {
        num = goldivaultWalletInfoBhoney.honey
        addy = contracts.honey.address
      }
    }
    if(tradeInput > num) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkRouterAllowance(tradeInput, addy, address as string)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
        }
        let pathOne
        let pathTwo
        let tokenOne
        let tokenTwo
        if(activeToggle === 'TRADEOT') {
          if(tradeDirection === 'OUT') {
            pathOne = contracts.bhot.address
            pathTwo = contracts.honey.address
            tokenOne = 'bHoney OT'
            tokenTwo = 'honey'
          }
          else {
            pathOne = contracts.honey.address
            pathTwo = contracts.bhot.address
            tokenOne = 'honey'
            tokenTwo = 'bHoney OT'
          }
        }
        else {
          if(tradeDirection === 'OUT') {
            pathOne = contracts.bhyt.address
            pathTwo = contracts.honey.address
            tokenOne = 'bHoney YT'
            tokenTwo = 'honey'
          }
          else {
            pathOne = contracts.honey.address
            pathTwo = contracts.bhyt.address
            tokenOne = 'honey'
            tokenTwo = 'bHoney YT'
          }
        }
        const tradeTx = await sendTradeTx(tradeInput, tradeOutput, pathOne, pathTwo, address as string)
        if(tradeTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            `You've successfully swapped ${tokenOne}`,
            `You swapped ${formatAsString(tradeInput)} ${tokenOne} for ${formatAsString(tradeOutput)} ${tokenTwo}`,
            tradeTx
          )
          if(button) {
            button.innerHTML = "trade"
          }
          refreshInfo()
          setTimeout(() => {
            openNotification(false, '', '', '')
          }, 10000)
        }
        else {
          if(button) {
            button.innerHTML = "trade"
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

  const handleLeftButtonClick = async () => {
    const swapButton = document.getElementById('swap-button')
    const leftButton = document.getElementById('left-approve-button')
    const rightButton = document.getElementById('right-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#033E5E"
      leftButton.style.color = "#E7B941"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#033E5E"
      rightButton.style.color = "#E7B941"
    }
    let addy
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        addy = contracts.bhot.address
      }
      else {
        addy = contracts.honey.address
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        addy = contracts.bhyt.address
      }
      else {
        addy = contracts.honey.address
      }
    }
    if(activeToggle === 'TRADEOT' || activeToggle === 'TRADEYT') {
      await sendRouterApproveTx(tradeInput, addy, false)
    }
    else {
      await sendApproveTx(deposit, 'bhoney', false)
    }
    //todo: wat
    // updateAllowance(honeyBuy + 0.01)
    swapButton && (swapButton.innerHTML = "buy")
    setAllowanceButtons(false)
  }

  const handleRightButtonClick = async () => {
    const swapButton = document.getElementById('swap-button')
    const rightButton = document.getElementById('right-approve-button')
    const leftButton = document.getElementById('left-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#033E5E"
      leftButton.style.color = "#E7B941"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#033E5E"
      rightButton.style.color = "#E7B941"
    }
    let addy
    if(activeToggle === 'TRADEOT') {
      if(tradeDirection === 'OUT') {
        addy = contracts.bhot.address
      }
      else {
        addy = contracts.honey.address
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        addy = contracts.bhyt.address
      }
      else {
        addy = contracts.honey.address
      }
    }
    if(activeToggle === 'TRADEOT' || activeToggle === 'TRADEYT') {
      await sendRouterApproveTx(0, addy, true)
    }
    else {
      await sendApproveTx(0, 'bhoney', true)
    }
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "buy")
    setAllowanceButtons(false)
  }
  
  const renderButton = (): string => {
    if(activeToggle === 'DEPOSIT') {
      if(isConnected && debouncedDeposit > goldivaultWalletInfoBhoney.honeyAllowance && goldivaultWalletInfoBhoney.honey >= debouncedDeposit && deposit > goldivaultWalletInfoBhoney.honey) {
        return 'approve LP tokens'
      }
      return 'deposit'
    }
    else if(activeToggle === 'REDEEMOT') {
      return 'redeem ot'
    }
    else if(activeToggle === 'REDEEMYT') {
      return 'redeem yt'
    }
    else if(activeToggle === 'TRADEOT') {
      return 'trade ot'
    }
    else {
      return 'trade yt'
    }
  }

  return (
    <>
      {
        allowanceButtons &&
        <div>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[24%] lg:w-[16.6%] top-[73.5%] md:top-[71.5%] lg:top-[72.5%] xl:top-[72.5%] left-[24%] lg:left-[30.9%] border-2 border-black font-amaticbold text-[4vw] md:text-[2.75vw] lg:text-[2vw] xl:text-[1.75vw] 2xl:text-[1.5vw] hover:bg-[#033E5E] hover:border-[#E7B941] hover:text-[#E7B941] hover:scale-110"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[24%] lg:w-[16.6%] top-[73.5%] md:top-[71.5%] lg:top-[72.5%] xl:top-[72.5%] left-[52%] lg:left-[52.5%] border-2 border-black font-amaticbold text-[4vw] md:text-[2.75vw] lg:text-[2vw] xl:text-[1.75vw] 2xl:text-[1.5vw] hover:bg-[#033E5E] hover:border-[#E7B941] hover:text-[#E7B941] hover:scale-110"
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
                className="absolute h-[8%] w-[26%] lg:w-[16.6%] top-[70%] lg:top-[72.5%] left-[37%] lg:left-[41.6%] bg-[#E7B941] text-black border-2 border-black hover:bg-[#033E5E] hover:border-[#E7B941] hover:text-[#E7B941] hover:scale-110 font-amaticbold text-[4vw] md:text-[3vw] lg:text-[2vw] cursor-pointer"
                id="deposit-button"
                onClick={() => {
                  const button = document.getElementById('deposit-button')
                  
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