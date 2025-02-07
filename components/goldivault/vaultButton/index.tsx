"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useGoldivault } from "../../../providers"
import { useGoldivaultTx } from "../../../hooks"
import { contracts } from "../../../utils/addressi"

type VaultButtonProps = {
  params: {
    vaultToken: string;
    dt: string;
    ot: string;
    yt: string;
  }
}

export const VaultButton = ({ params }: VaultButtonProps) => {

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
    refreshGoldivaultInfoBhoney,
    refreshGoldivaultWalletInfoBhoney,
    refreshGoldivaultInfoSolvbtc,
    refreshGoldivaultWalletInfoSolvbtc,
    goldivaultWalletInfoSolvbtc,
    refreshGoldivaultInfoUnibtc,
    refreshGoldivaultWalletInfoUnibtc,
    goldivaultWalletInfoUnibtc,
    goldivaultWalletInfoBhoney,
    vaultSwapTxAmount,
    honeyApprovalAmount,
    otApprovalAmount,
    checkVaultLiquidity,
    slippage,
    priceImpact,
    calledDtAmountMin
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

  const vaultOT =
    params.vaultToken === 'weeth' ? goldivaultWalletInfoWeeth.weot :
    params.vaultToken === 'bhoney' ? goldivaultWalletInfoBhoney.bhot :
    params.vaultToken === 'solvbtc' ? goldivaultWalletInfoSolvbtc.solvbtcot :
    params.vaultToken === 'unibtc' ? goldivaultWalletInfoUnibtc.unibtcot : {}

  const vaultYT = 
    params.vaultToken === 'weeth' ? goldivaultWalletInfoWeeth.weyt :
    params.vaultToken === 'bhoney' ? goldivaultWalletInfoBhoney.bhyt :
    params.vaultToken === 'solvbtc' ? goldivaultWalletInfoSolvbtc.solvbtcyt :
    params.vaultToken === 'unibtc' ? goldivaultWalletInfoUnibtc.unibtcyt : {}

  const vaultDT = 
    params.vaultToken === 'weeth' ? goldivaultWalletInfoWeeth.weeth :
    params.vaultToken === 'bhoney' ? goldivaultWalletInfoBhoney.honey :
    params.vaultToken === 'solvbtc' ? goldivaultWalletInfoSolvbtc.solvbtc :
    params.vaultToken === 'unibtc' ? goldivaultWalletInfoUnibtc.unibtc : {}

  const vaultOTaddy = 
    params.vaultToken === 'weeth' ? contracts.weot.address :
    params.vaultToken === 'bhoney' ? contracts.bhot.address :
    params.vaultToken === 'solvbtc' ? contracts.solvbtcot.address :
    params.vaultToken === 'unibtc' ? contracts.unibtcot.address : ''

  const vaultDTaddy = 
    params.vaultToken === 'weeth' ? contracts.weeth.address :
    params.vaultToken === 'bhoney' ? contracts.honey.address :
    params.vaultToken === 'solvbtc' ? contracts.solvbtc.address :
    params.vaultToken === 'unibtc' ? contracts.unibtc.address : ''

  const vaultDTAllowance = 
    params.vaultToken === 'weeth' ? goldivaultWalletInfoWeeth.weethVaultAllowance :
    params.vaultToken === 'bhoney' ? goldivaultWalletInfoBhoney.honeyAllowance :
    params.vaultToken === 'solvbtc' ? goldivaultWalletInfoSolvbtc.solvbtcAllowance :
    params.vaultToken === 'unibtc' ? goldivaultWalletInfoUnibtc.unibtcAllowance : 0

  const refreshInfo = () => {
    if(params.vaultToken === 'weeth') {
      refreshGoldivaultInfoWeeth()
      refreshGoldivaultWalletInfoWeeth()
    }
    else if(params.vaultToken === 'bhoney') {
      refreshGoldivaultInfoBhoney()
      refreshGoldivaultWalletInfoBhoney()
    }
    else if(params.vaultToken === 'solvbtc') {
      refreshGoldivaultInfoSolvbtc()
      refreshGoldivaultWalletInfoSolvbtc()
    }
    else {
      refreshGoldivaultInfoUnibtc()
      refreshGoldivaultWalletInfoUnibtc()
    }
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
    if(deposit > vaultDT) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(deposit, params.vaultToken, address as string)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
        }
        const depositTx = await sendDepositTx(deposit, params.vaultToken)
        if(depositTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            `You've successfully deposited ${params.dt} tokens`,
            `You deposited ${formatAsString(deposit)} ${params.dt}`,
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
    if(redeemOT > vaultOT) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
      }
      const redeemOTTx = await sendRedeemOTTx(redeemOT, params.vaultToken)
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
      num = vaultOT
      addy = vaultOTaddy
    }
    else {
      num = vaultDT
      addy = vaultDTaddy
    }
    if(tradeInput > num) {
      button && (button.innerHTML = "not enough")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkRouterV2Allowance(tradeInput, addy, address as string, getVaultType(params.vaultToken))
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
          pathOne = vaultOTaddy
          pathTwo = vaultDTaddy
          tokenOne = params.ot
          tokenTwo = params.dt
        }
        else {
          pathOne = vaultDTaddy
          pathTwo = vaultOTaddy
          tokenOne = params.dt
          tokenTwo = params.ot
        }
        const tradeTx = await sendV3TradeTx(tradeInput, tradeOutput, pathOne, pathTwo, address as string, getVaultType(params.vaultToken))
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

  const getVaultType = (vault: string): string => {
    if(vault === 'weeth') {
      return 'eth'
    }
    else if(vault === 'rseth') {
      return 'eth'
    }
    else if(vault === 'ebtc') {
      return 'btc'
    }
    else if (vault === 'unibtc') {
      return 'btc'
    }
    else {
      return 'eth'
    }
  }

  const tradeYTFlow = async (button: HTMLElement | null) => {
    if(tradeInput == 0) {
      button && (button.innerHTML = "trade yt")
      return
    }
    if(!checkVaultLiquidity(params.vaultToken, getVaultType(params.vaultToken))) {
      button && (button.innerHTML = "not enuf liq")
      return
    }
    if(priceImpact > slippage.amount) {
      button && (button.innerHTML = "price impacted")
      return
    }
    if(tradeDirection === 'OUT') {
      if(tradeInput > vaultYT) {
        button && (button.innerHTML = "not enough")
        return
      }
      else {
        const sufficientAllowance: boolean | void = await checkAllowance(honeyApprovalAmount, params.vaultToken, address as string)
        if(sufficientAllowance) {
          setTxConfirming(true)
          if(button) {
            button.innerHTML = "confirming..."
          }
          const [sellTx, afterBalance] = await sendSellYTTx(tradeInput, calledDtAmountMin, vaultSwapTxAmount, address as string, getVaultType(params.vaultToken))
          if(sellTx.substring(0, 2) === '0x') {
            setTxConfirming(false)
            openNotification(
              true,
              `You've successfully sold ${params.dt} yield tokens`,
              `You sold ${formatAsString(tradeInput)} YTs for ${formatAsString(afterBalance - goldivaultWalletInfoWeeth.weeth)} ${params.dt}`,
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
      if(tradeInput > vaultDT) {
        button && (button.innerHTML = "not enough")
        return
      }
      else {
        const sufficientAllowanceHoney: boolean | void = await checkAllowance(honeyApprovalAmount, params.vaultToken, address as string)
        if(sufficientAllowanceHoney) {
          setHoneyApproved(true)
          const sufficientAllowanceOT: boolean | void = await checkAllowance(otApprovalAmount, params.ot, address as string)
          if(sufficientAllowanceOT) {
            setTxConfirming(true)
            if(button) {
              button.innerHTML = "confirming..."
            }
            const [buyTx, afterBalance] = await sendBuyYTTx(calledDtAmountMin, tradeInput, vaultSwapTxAmount, address as string, getVaultType(params.vaultToken))
            if(buyTx.substring(0, 2) === '0x') {
              setTxConfirming(false)
              openNotification(
                true,
                `You've successfully bought ${params.dt} yield tokens`,
                `You bought ${formatAsString(calledDtAmountMin)} YTs for ${formatAsString(goldivaultWalletInfoWeeth.weeth - afterBalance)} ${params.dt}`,
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
        addy = vaultOTaddy
      }
      else {
        addy = vaultDTaddy
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        addy = vaultDTaddy
      }
      else {
        addy = vaultDTaddy
      }
    }
    if(activeToggle === 'TRADEOT') {
      await sendRouterV2ApproveTx(tradeInput, addy, false, getVaultType(params.vaultToken))
    }
    else if(activeToggle === 'TRADEYT') {
      if(tradeDirection === 'OUT') {
        await sendApproveTx(honeyApprovalAmount, params.vaultToken, false)
      }
      else {
        if(honeyApproved) {
          await sendApproveTx(otApprovalAmount, params.ot, false)
        }
        else {
          await sendApproveTx(honeyApprovalAmount, params.vaultToken, false)
        }
      }
    }
    else {
      await sendApproveTx(deposit, params.vaultToken, false)
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
        addy = vaultOTaddy
      }
      else {
        addy = vaultDTaddy
      }
    }
    else {
      if(tradeDirection === 'OUT') {
        addy = vaultDTaddy
      }
      else {
        addy = vaultDTaddy
      }
    }
    if(activeToggle === 'TRADEOT') {
      await sendRouterV2ApproveTx(0, addy, true, getVaultType(params.vaultToken))
    }
    else if(activeToggle === 'TRADEYT') {
      if(tradeDirection === 'OUT') {
        await sendApproveTx(0, params.vaultToken, true)
      }
      else {
        if(honeyApproved) {
          await sendApproveTx(0, params.ot, true)
        }
        else {
          await sendApproveTx(0, params.vaultToken, true)
        }
      }
    }
    else {
      await sendApproveTx(0, params.vaultToken, true)
    }
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "deposit")
    setAllowanceButtons(false)
  }
  
  const renderButton = (): string => {
    if(activeToggle === 'DEPOSIT') {
      if(isConnected && debouncedDeposit > vaultDTAllowance && vaultDT >= debouncedDeposit && deposit > vaultDT) {
        return `approve ${params.vaultToken}`
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