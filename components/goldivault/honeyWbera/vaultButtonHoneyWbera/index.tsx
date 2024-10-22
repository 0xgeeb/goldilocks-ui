"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useGoldivault } from "../../../../providers"
import { useGoldivaultTx } from "../../../../hooks"
import { contracts } from "../../../../utils/addressi"

export const VaultButtonHoneyWbera = () => {

  const {
    deposit,
    redeemOT,
    redeemYT,
    tradeInput,
    tradeOutput,
    goldivaultWalletInfoHoneyWbera,
    debouncedDeposit,
    otAmount,
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
    refreshGoldivaultInfoHoneyWbera,
    refreshGoldivaultWalletInfoHoneyWbera,
    // sendTradeTx,
    setTradeInput,
    setTradeOutput
  } = useGoldivault()

  const {
    checkAllowance,
    checkRouterAllowance,
    sendApproveTx,
    sendRouterApproveTx,
    sendDepositTx,
    sendRedeemOTTx,
    sendRedeemYTTx
  } = useGoldivaultTx()

  const { address, isConnected } = useAccount()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const refreshInfo = () => {
    refreshGoldivaultInfoHoneyWbera()
    refreshGoldivaultWalletInfoHoneyWbera()
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
      if(otAmount == 0) {
        return
      }
      redeemOTFlow(button)
    }
    if(activeToggle === 'REDEEMYT') {
      redeemYTFlow(button)
    }
    if(activeToggle === 'TRADE') {
      tradeFlow(button)
    }
  }

  const depositTxFlow = async (button: HTMLElement | null) => {
    if(deposit == 0) {
      button && (button.innerHTML = "deposit")
      return
    }
    if(deposit > goldivaultWalletInfoHoneyWbera.honeyWberaLP) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(deposit, 'honeywbera', address as string)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
        }
        const depositTx = await sendDepositTx(deposit, 'honeywbera')
        if(depositTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully deposited HoneyWBera LP tokens",
            `You deposited ${formatAsString(deposit)} HoneyWBera LP tokens`,
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
    if(redeemOT > goldivaultWalletInfoHoneyWbera.hwbot) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
      }
      const redeemOTTx = await sendRedeemOTTx(redeemOT, 'honeywbera')
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
    if(redeemYT > goldivaultWalletInfoHoneyWbera.hwbyt) {
      button && (button.innerHTML = "not enough")
      return
    }
    //todo: add a check here or in a new calculate redeem yield function to see if the vault is expired yet and if not say "not expired" on button
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
      }
      const redeemYTTx = await sendRedeemYTTx(redeemYT, 'honeywbera')
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
    if(tradeInput > goldivaultWalletInfoHoneyWbera.wbera) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkRouterAllowance(tradeInput, contracts.wbera.address, address as string)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
        }
        // const tradeTx = await sendTradeTx()
        const tradeTx = ''
        if(tradeTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully swapped wbera",
            `You swapped ${formatAsString(tradeInput)} wbera for ${formatAsString(tradeOutput)} honey`,
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
      leftButton.style.backgroundColor = "#4D0B24"
      leftButton.style.color = "#E7B941"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#4D0B24"
      rightButton.style.color = "#E7B941"
    }
    if(activeToggle === 'TRADE') {
      await sendRouterApproveTx(tradeInput, contracts.wbera.address, false)
    }
    else {
      await sendApproveTx(deposit, 'honeywbera', false)
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
      leftButton.style.backgroundColor = "#4D0B24"
      leftButton.style.color = "#E7B941"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#4D0B24"
      rightButton.style.color = "#E7B941"
    }
    if(activeToggle === 'TRADE') {
      await sendRouterApproveTx(0, contracts.wbera.address, true)
    }
    else {
      await sendApproveTx(0, 'honeywbera', true)
    }
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "buy")
    setAllowanceButtons(false)
  }
  
  const renderButton = (): string => {
    if(activeToggle === 'DEPOSIT') {
      if(isConnected && debouncedDeposit > goldivaultWalletInfoHoneyWbera.honeyWberaLPAllowance && goldivaultWalletInfoHoneyWbera.honeyWberaLP >= debouncedDeposit && deposit > goldivaultWalletInfoHoneyWbera.honeyWberaLP) {
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
    else {
      return 'trade'
    }
  }

  return (
    <>
      {
        allowanceButtons &&
        <div>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[24%] lg:w-[16.6%] top-[73.5%] md:top-[71.5%] lg:top-[72.5%] xl:top-[72.5%] left-[24%] lg:left-[30.9%] border-2 border-black font-amaticbold text-[4vw] md:text-[2.75vw] lg:text-[2vw] xl:text-[1.75vw] 2xl:text-[1.5vw] hover:bg-[#4D0B24] hover:text-[#E7B941] hover:scale-110"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[24%] lg:w-[16.6%] top-[73.5%] md:top-[71.5%] lg:top-[72.5%] xl:top-[72.5%] left-[52%] lg:left-[52.5%] border-2 border-black font-amaticbold text-[4vw] md:text-[2.75vw] lg:text-[2vw] xl:text-[1.75vw] 2xl:text-[1.5vw] hover:bg-[#4D0B24] hover:text-[#E7B941] hover:scale-110"
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
                className="absolute h-[8%] w-[16.6%] top-[72.5%] left-[41.6%] bg-[#E7B941] text-black border-2 border-black hover:scale-110 font-amaticbold text-[2vw] cursor-pointer"
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