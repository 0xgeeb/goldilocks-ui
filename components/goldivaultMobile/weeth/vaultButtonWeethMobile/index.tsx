"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useGoldivault } from "../../../../providers"
import { useGoldivaultTx } from "../../../../hooks"
import { contracts } from "../../../../utils/addressi"

export const VaultButtonWeethMobile = () => {

  const [honeyApproved, setHoneyApproved] = useState<boolean>(false)

  const {
    deposit,
    redeemOT,
    tradeInput,
    tradeOutput,
    debouncedDeposit,
    outputTokensLoading,
    setTxConfirming,
    openNotification,
    allowanceButtons,
    setAllowanceButtons,
    activeToggle,
    setDisplayString,
    setDeposit,
    setRedeemOT,
    setOtAmount,
    setYtAmount,
    setOutputTokensLoading,
    setTradeInput,
    setTradeOutput,
    tradeDirection,
    refreshGoldivaultInfoWeeth,
    refreshGoldivaultWalletInfoWeeth,
    goldivaultWalletInfoWeeth,
    vaultSwapTxAmount,
    honeyApprovalAmount,
    otApprovalAmount,
    checkVaultLiquidity,
    slippage,
    priceImpact    
  } = useGoldivault()

  const {
    checkAllowance,
    checkRouterV2Allowance,
    sendApproveTx,
    sendRouterV2ApproveTx,
    sendDepositTx,
    sendRedeemOTTx,
    sendV3TradeTx,
    sendBuyYTTx,
    sendSellYTTx
  } = useGoldivaultTx()

  const { address, isConnected } = useAccount()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const refreshInfo = () => {
    refreshGoldivaultInfoWeeth()
    refreshGoldivaultWalletInfoWeeth()
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
    if(activeToggle === 'TRADEOT') {
      tradeOTFlow(button)
    }
    if(activeToggle === 'TRADEYT') {
      tradeYTFlow(button)
    }
  }

  const depositTxFlow = async (button: HTMLElement | null) => {
    if(deposit == 0) {
      button && (button.innerHTML = "deposit")
      return
    }
    if(deposit > goldivaultWalletInfoWeeth.weeth) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(deposit, 'weeth', address as string)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
        }
        const depositTx = await sendDepositTx(deposit, 'weeth')
        if(depositTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully deposited weETH tokens",
            `You deposited ${formatAsString(deposit)} weETH`,
            depositTx
          )
          if(button) {
            button.innerHTML = "deposit"
          }
          refreshInfo()
          setTimeout(() => {
            openNotification(false, '', '', '')
          }, 10000)
        }
        else {
          if(button) {
            button.innerHTML = "deposit"
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

  const redeemOTFlow = async (button: HTMLElement | null) => {
    if(redeemOT == 0) {
      button && (button.innerHTML = "redeem ot")
      return
    }
    if(redeemOT > goldivaultWalletInfoWeeth.weot) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
      }
      const redeemOTTx = await sendRedeemOTTx(redeemOT, 'weeth')
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

  const tradeOTFlow = async (button: HTMLElement | null) => {
    if(tradeInput == 0) {
      button && (button.innerHTML = "trade ot")
      return
    }
    let num
    let addy
    if(tradeDirection === 'OUT') {
      num = goldivaultWalletInfoWeeth.weot
      addy = contracts.weot.address
    }
    else {
      num = goldivaultWalletInfoWeeth.weeth
      addy = contracts.weeth.address
    }
    if(tradeInput > num) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkRouterV2Allowance(tradeInput, addy, address as string, 'todo')
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
        }
        let pathOne
        let pathTwo
        let tokenOne
        let tokenTwo
        if(tradeDirection === 'OUT') {
          pathOne = contracts.weot.address
          pathTwo = contracts.weeth.address
          tokenOne = 'weeth OT'
          tokenTwo = 'weeth'
        }
        else {
          pathOne = contracts.weeth.address
          pathTwo = contracts.weot.address
          tokenOne = 'weeth'
          tokenTwo = 'weeth OT'
        }
        const tradeTx = await sendV3TradeTx(tradeInput, tradeOutput, pathOne, pathTwo, address as string, 'todo')
        if(tradeTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            `You've successfully swapped ${tokenOne}`,
            `You swapped ${formatAsString(tradeInput)} ${tokenOne} for ${formatAsString(tradeOutput)} ${tokenTwo}`,
            tradeTx
          )
          if(button) {
            button.innerHTML = "trade ot"
          }
          refreshInfo()
          setTimeout(() => {
            openNotification(false, '', '', '')
          }, 10000)
        }
        else {
          if(button) {
            button.innerHTML = "trade ot"
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

  const tradeYTFlow = async (button: HTMLElement | null) => {
    if(tradeInput == 0) {
      button && (button.innerHTML = "trade yt")
      return
    }
    if(!checkVaultLiquidity()) {
      button && (button.innerHTML = "not enuf liq")
      return
    }
    if(priceImpact > slippage.amount) {
      button && (button.innerHTML = "price impacted")
      return
    }
    if(tradeDirection === 'OUT') {
      if(tradeInput > goldivaultWalletInfoWeeth.weyt) {
        button && (button.innerHTML = "not enough")
        return
      }
      else {
        const sufficientAllowance: boolean | void = await checkAllowance(honeyApprovalAmount, 'weeth', address as string)
        if(sufficientAllowance) {
          setTxConfirming(true)
          if(button) {
            button.innerHTML = "confirming..."
          }
          const [sellTx, afterBalance] = await sendSellYTTx(tradeInput, tradeOutput, vaultSwapTxAmount, address as string, 'todo')
          if(sellTx.substring(0, 2) === '0x') {
            setTxConfirming(false)
            openNotification(
              true,
              `You've successfully sold weeth yield tokens`,
              `You sold ${formatAsString(tradeInput)} YTs for ${formatAsString(afterBalance - goldivaultWalletInfoWeeth.weeth)} weETH`,
              sellTx
            )
            if(button) {
              button.innerHTML = "trade yt"
            }
            refreshInfo()
            setTimeout(() => {
              openNotification(false, '', '', '')
            }, 10000)
          }
          else {
            if(button) {
              button.innerHTML = "trade yt"
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
    else {
      if(tradeInput > goldivaultWalletInfoWeeth.weeth) {
        button && (button.innerHTML = "not enough")
        return
      }
      else {
        const sufficientAllowanceHoney: boolean | void = await checkAllowance(honeyApprovalAmount, 'weeth', address as string)
        if(sufficientAllowanceHoney) {
          setHoneyApproved(true)
          const sufficientAllowanceOT: boolean | void = await checkAllowance(otApprovalAmount, 'weot', address as string)
          if(sufficientAllowanceOT) {
            setTxConfirming(true)
            if(button) {
              button.innerHTML = "confirming..."
            }
            const [buyTx, afterBalance] = await sendBuyYTTx(tradeOutput, tradeInput, vaultSwapTxAmount, address as string, 'todo')
            if(buyTx.substring(0, 2) === '0x') {
              setTxConfirming(false)
              openNotification(
                true,
                `You've successfully bought weeth yield tokens`,
                `You bought ${formatAsString(tradeOutput)} YTs for ${formatAsString(goldivaultWalletInfoWeeth.weeth - afterBalance)} weETH`,
                buyTx
              )
              if(button) {
                button.innerHTML = "trade yt"
              }
              refreshInfo()
              setTimeout(() => {
                openNotification(false, '', '', '')
              }, 10000)
            }
            else {
              if(button) {
                button.innerHTML = "trade yt"
              }
              refreshInfo()
              setTxConfirming(false)
            }
          }
          else {
            setAllowanceButtons(true)
          }
        }
        else {
          setAllowanceButtons(true)
        }
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
        addy = contracts.weot.address
      }
      else {
        addy = contracts.weeth.address
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        addy = contracts.weeth.address
      }
      else {
        addy = contracts.weeth.address
      }
    }
    if(activeToggle === 'TRADEOT') {
      await sendRouterV2ApproveTx(tradeInput, addy, false, 'todo')
    }
    else if(activeToggle === 'TRADEYT') {
      if(tradeDirection === 'OUT') {
        await sendApproveTx(honeyApprovalAmount, 'weeth', false)
      }
      else {
        if(honeyApproved) {
          await sendApproveTx(otApprovalAmount, 'weot', false)
        }
        else {
          await sendApproveTx(honeyApprovalAmount, 'weeth', false)
        }
      }
    }
    else {
      await sendApproveTx(deposit, 'weeth', false)
    }
    //todo: wat
    // updateAllowance(honeyBuy + 0.01)
    swapButton && (swapButton.innerHTML = "deposit")
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
        addy = contracts.weot.address
      }
      else {
        addy = contracts.weeth.address
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        addy = contracts.weeth.address
      }
      else {
        addy = contracts.weeth.address
      }
    }
    if(activeToggle === 'TRADEOT') {
      await sendRouterV2ApproveTx(0, addy, true, 'todo')
    }
    else if(activeToggle === 'TRADEYT') {
      if(tradeDirection === 'OUT') {
        await sendApproveTx(0, 'weeth', true)
      }
      else {
        if(honeyApproved) {
          await sendApproveTx(0, 'weot', true)
        }
        else {
          await sendApproveTx(0, 'weeth', true)
        }
      }
    }
    else {
      await sendApproveTx(0, 'weeth', true)
    }
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "deposit")
    setAllowanceButtons(false)
  }
  
  const renderButton = (): string => {
    if(activeToggle === 'DEPOSIT') {
      if(isConnected && debouncedDeposit > goldivaultWalletInfoWeeth.weethVaultAllowance && goldivaultWalletInfoWeeth.weeth >= debouncedDeposit && deposit > goldivaultWalletInfoWeeth.weeth) {
        return 'approve weeth'
      }
      return 'deposit'
    }
    else if(activeToggle === 'REDEEMOT') {
      return 'redeem ot'
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
        (allowanceButtons && activeToggle !== 'INFO' && activeToggle !== 'POOLS') &&
        <div>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[28%] top-[76%] left-[18%] border-2 border-black font-amaticbold text-[5vw]"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[28%] top-[76%] left-[58%] border-2 border-black font-amaticbold text-[5vw]"
            id="right-approve-button"
            onClick={() => handleRightButtonClick()}
          >
            approve infinite
          </button>
        </div>
      }
      {
        (!allowanceButtons && activeToggle !== 'INFO' && activeToggle !== 'POOLS') &&
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openChainModal,
            openConnectModal
          }) => {
            return (
              <button
                className="absolute h-[9%] w-[42%] top-[76%] left-[29%] bg-[#E7B941] text-black border-2 border-black font-amaticbold text-[6vw]"
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