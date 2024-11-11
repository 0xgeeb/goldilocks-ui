"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useGoldivault } from "../../../../providers"
import { useGoldivaultTx } from "../../../../hooks"
import { contracts } from "../../../../utils/addressi"

export const VaultButtonWeeth = () => {

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
    otPrice
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
    if(deposit > goldivaultWalletInfoWeeth.honey) {
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
            "You've successfully deposited Honey tokens",
            `You deposited ${formatAsString(deposit)} Honey`,
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
      num = goldivaultWalletInfoWeeth.honey
      addy = contracts.honey.address
    }
    if(tradeInput > num) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkRouterV2Allowance(tradeInput, addy, address as string)
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
          pathTwo = contracts.honey.address
          tokenOne = 'weeth OT'
          tokenTwo = 'honey'
        }
        else {
          pathOne = contracts.honey.address
          pathTwo = contracts.weot.address
          tokenOne = 'honey'
          tokenTwo = 'weeth OT'
        }
        const tradeTx = await sendV3TradeTx(tradeInput, tradeOutput, pathOne, pathTwo, address as string)
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
    if(tradeDirection === 'OUT') {
      if(tradeInput > goldivaultWalletInfoWeeth.weyt) {
        button && (button.innerHTML = "not enough")
        return
      }
      else {
        const sufficientAllowance: boolean | void = await checkAllowance(tradeInput * 0.04, 'weeth', address as string)
        if(sufficientAllowance) {
          setTxConfirming(true)
          if(button) {
            button.innerHTML = "confirming..."
          }
          const sellTx = await sendSellYTTx(tradeInput, tradeOutput, otPrice)
          if(sellTx.substring(0, 2) === '0x') {
            setTxConfirming(false)
            openNotification(
              true,
              `You've successfully sold weeth yield tokens`,
              `You sold ${formatAsString(tradeInput)} YTs for ${formatAsString(tradeOutput)} Honey`,
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
      if(tradeInput > goldivaultWalletInfoWeeth.honey) {
        button && (button.innerHTML = "not enough")
        return
      }
      else {
        const sufficientAllowance: boolean | void = await checkAllowance(tradeInput * 0.04, 'weeth', address as string)
        if(sufficientAllowance) {
          setTxConfirming(true)
          if(button) {
            button.innerHTML = "confirming..."
          }
          const buyTx = await sendBuyYTTx(tradeInput, tradeOutput, otPrice)
          if(buyTx.substring(0, 2) === '0x') {
            setTxConfirming(false)
            openNotification(
              true,
              `You've successfully bought weeth yield tokens`,
              `You bought ${formatAsString(tradeInput)} YTs for ${formatAsString(tradeOutput)} Honey`,
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
        addy = contracts.honey.address
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        addy = contracts.honey.address
      }
      else {
        addy = contracts.honey.address
      }
    }
    if(activeToggle === 'TRADEOT') {
      await sendRouterV2ApproveTx(tradeInput, addy, false)
    }
    else if(activeToggle === 'TRADEYT') {
      if(tradeDirection === 'OUT') {
        await sendApproveTx(tradeInput * 0.04, 'weeth', false)
      }
      else {

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
        addy = contracts.honey.address
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        addy = contracts.honey.address
      }
      else {
        addy = contracts.honey.address
      }
    }
    if(activeToggle === 'TRADEOT') {
      await sendRouterV2ApproveTx(0, addy, true)
    }
    else if(activeToggle === 'TRADEYT') {
      if(tradeDirection === 'OUT') {
        await sendApproveTx(0, 'weeth', true)
      }
      else {
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
      if(isConnected && debouncedDeposit > goldivaultWalletInfoWeeth.honeyAllowance && goldivaultWalletInfoWeeth.honey >= debouncedDeposit && deposit > goldivaultWalletInfoWeeth.honey) {
        return 'approve weeth (honey)'
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