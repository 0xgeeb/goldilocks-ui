import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  useGoldiswap,
  useWallet
} from "../../../providers"
import { useGoldiswapTx } from "../../../hooks"

export const GoldiswapButtonMobile = () => {

  const {
    activeToggle,
    debouncedHoneyBuy,
    goldiswapInfo,
    honeyBuy,
    allowanceButtons,
    setAllowanceButtons,
    updateAllowance,
    buyingLocks,
    refreshGoldiswapInfo,
    setTxConfirming,
    sellingLocks,
    openNotification,
    setDisplayString,
    setBottomDisplayString,
    setHoneyBuy,
    setSellingLocks,
    setRedeemingLocks,
    gettingHoney,
    redeemingLocks,
    redeemingHoney,
    setBuyingLocks,
    setGettingHoney,
    setRedeemingHoney
  } = useGoldiswap()

  const { 
    isConnected, 
    balance,
    wallet,
    refreshBalances
  } = useWallet()

  const {
    checkAllowance,
    sendApproveTx,
    sendBuyTx,
    sendSellTx,
    sendRedeemTx
  } = useGoldiswapTx()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const refreshInfo = () => {
    setDisplayString('')
    setBottomDisplayString('')
    setHoneyBuy(0)
    setBuyingLocks(0)
    setSellingLocks(0)
    setGettingHoney(0)  
    setRedeemingLocks(0)
    setRedeemingHoney(0)
    refreshBalances()
    refreshGoldiswapInfo()
  }

  const handleButtonClick = () => {
    const button = document.getElementById('swap-button')
    if(activeToggle === 'BUY') {
      buyTxFlow(button)
    }
    if(activeToggle === 'SELL') {
      sellTxFlow(button)
    }
    if(activeToggle === 'REDEEM') {
      redeemTxFlow(button)
    }
  }

  const buyTxFlow = async (button: HTMLElement | null) => {
    if(honeyBuy == 0) {
      button && (button.innerHTML = "buy")
      return
    }
    if(honeyBuy > balance.honey) {
      button && (button.innerHTML = "balance too low")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(honeyBuy, wallet)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
          button.style.backgroundColor = "#4D0B24"
          button.style.color = "#E7B941"
        }
        const buyTx = await sendBuyTx(buyingLocks, honeyBuy)
        if(buyTx === 'slippage') {
          button && (button.innerHTML = "slippage too low")
          setTxConfirming(false)
          setTimeout(() => {
            if(button) {
              button.innerHTML = "buy"
              button.style.backgroundColor = "#E7B941"
              button.style.color = "black"
            }
          }, 3000)
        }
        else if(buyTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully bought $LOCKS",
            `You bought ${formatAsString(buyingLocks)} Locks with ${formatAsString(honeyBuy)} Honey`,
            buyTx
          )
          if(button) {
            button.innerHTML = "buy"
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
            button.innerHTML = "buy"
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

  const sellTxFlow = async (button: HTMLElement | null) => {
    if(sellingLocks == 0) {
      button && (button.innerHTML = "sell")
      return
    }
    if(sellingLocks > balance.locks) {
      button && (button.innerHTML = "balance too low")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
        button.style.backgroundColor = "#4D0B24"
        button.style.color = "#E7B941"
      }
      const sellTx = await sendSellTx(sellingLocks, gettingHoney)
      if(sellTx === 'slippage') {
        button && (button.innerHTML = "slippage too low")
        setTxConfirming(false)
        setTimeout(() => {
          if(button) {
            button.innerHTML = "sell"
            button.style.backgroundColor = "#E7B941"
            button.style.color = "black"
          }
        }, 3000)
      }
      else if(sellTx.substring(0, 2) === '0x') {
        setTxConfirming(false)
        openNotification(
          true,
          "You've successfully sold $LOCKS",
          `You sold ${formatAsString(sellingLocks)} Locks for ${formatAsString(gettingHoney)} Honey`,
          sellTx
        )
        if(button) {
          button.innerHTML = "sell"
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
          button.innerHTML = "sell"
          button.style.backgroundColor = "#E7B941"
          button.style.color = "black"
        }
        refreshInfo()
        setTxConfirming(false)
      }
    }
  }

  const redeemTxFlow = async (button: HTMLElement | null) => {
    if(redeemingLocks == 0) {
      button && (button.innerHTML = "redeem")
      return
    }
    if(redeemingLocks > balance.locks) {
      button && (button.innerHTML = "balance too low")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
        button.style.backgroundColor = "#4D0B24"
        button.style.color = "#E7B941"
      }
      const redeemTx = await sendRedeemTx(redeemingLocks)
      if(redeemTx.substring(0, 2) === '0x') {
        setTxConfirming(false)
        openNotification(
          true,
          "You've successfully redeemed $LOCKS",
          `You redeemed ${formatAsString(redeemingLocks)} Locks for ${formatAsString(redeemingHoney)} Honey`,
          redeemTx
        )
        if(button) {
          button.innerHTML = "redeem"
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
          button.innerHTML = "redeem"
          button.style.backgroundColor = "#E7B941"
          button.style.color = "black"
        }
        refreshInfo()
        setTxConfirming(false)
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
    await sendApproveTx(honeyBuy, false)
    updateAllowance(honeyBuy + 0.01)
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
    await sendApproveTx(0, true)
    updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "buy")
    setAllowanceButtons(false)
  }

  const renderButton = () => {
    if(activeToggle === 'BUY') {
      if(isConnected && debouncedHoneyBuy > balance.honeySwapAllowance && balance.honey >= debouncedHoneyBuy && honeyBuy > balance.honeySwapAllowance) {
        return 'approve honey'
      }
      return 'buy'
    }
    else if(activeToggle === 'SELL') {
      return 'sell'
    }
    else {
      return 'redeem'
    }
  }
  
  return (
    <>
    {
      allowanceButtons &&
      <div>
        <button
          className="absolute bg-[#E7B941] h-[8%] w-[23%] top-[62%] left-[23%] border-2 border-black font-amaticbold text-[5vw] focus:bg-[#4D0B24] focus:text-[#E7B941] focus:scale-110"
          id="left-approve-button"
          onClick={() => handleLeftButtonClick()}
        >
          approve tx
        </button>
        <button
          className="absolute bg-[#E7B941] h-[8%] w-[23%] top-[62%] left-[54%] border-2 border-black font-amaticbold text-[5vw] focus:bg-[#4D0B24] focus:text-[#E7B941] focus:scale-110"
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
              className="absolute h-[8%] w-[54%] top-[62%] left-[23%] bg-[#E7B941] font-amaticbold flex items-center justify-center text-[9vw] border-2 border-black focus:bg-[#4D0B24] focus:text-[#E7B941] focus:scale-110"
              id="swap-button"
              onClick={() => {
                const button = document.getElementById('swap-button')
                
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