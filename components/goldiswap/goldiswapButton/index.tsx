import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  useGoldiswap,
  useWallet
} from "../../../providers"
import { useGoldiswapTx } from "../../../hooks"
import { buildDepositTransaction } from "viem/op-stack"

export const GoldiswapButton = () => {

  const {
    activeToggle,
    debouncedHoneyBuy,
    goldiswapInfo,
    honeyBuy,
    allowanceButtons,
    setAllowanceButtons
  } = useGoldiswap()

  const { 
    isConnected, 
    balance,
    wallet
  } = useWallet()

  const {
    checkAllowance
  } = useGoldiswapTx()

  const handleButtonClick = () => {
    const button = document.getElementById('buy-button')
    if(activeToggle === 'buy') {
      buyTxFlow(button)
    }
    if(activeToggle === 'sell') {
      sellTxFlow(button)
    }
    if(activeToggle === 'redeem') {
      redeemTxFlow(button)
    }
  }

  const buyTxFlow = async (button: HTMLElement | null) => {
    if(honeyBuy == 0) {
      button && (button.innerHTML = "buy")
      return
    }
    if(honeyBuy > balance.honey) {
      button && (button.innerHTML = "insufficient balance")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(honeyBuy, wallet)
      if(sufficientAllowance) {
        // button && (button.innerHTML = "confirming...")
        // const buyTx = await sendBuyTx(buyingLocks, honeyBuy)
        // if(buyTx === 'slippage') {
        //   button && (button.innerHTML = "slippage too low")
        // }
        // else if(buyTx.substring(0, 2) === '0x') {
        //   buyTx && openNotification({
        //     title: 'Successfully Bought $LOCKS!',
        //     hash: buyTx,
        //     direction: 'bought',
        //     amount: buyingLocks,
        //     price: honeyBuy,
        //     page: 'amm'
        //   })
        //   button && (button.innerHTML = "buy")
        //   refreshInfo()
        // }
        // else {
        //   button && (button.innerHTML = "buy")
        //   refreshInfo()
        // }
      }
      else {
        setAllowanceButtons(true)
      }
    }
  }

  const sellTxFlow = async (button: HTMLElement | null) => {

  }

  const redeemTxFlow = async (button: HTMLElement | null) => {

  }

  const handleLeftButtonClick = async () => {
    const ammButton = document.getElementById('amm-button')
    const leftButton = document.getElementById('left-approve-button')
    const rightButton = document.getElementById('right-approve-button')
    leftButton && (leftButton.innerHTML = "approving...")
    rightButton && (rightButton.innerHTML = "approving...")
    // await sendApproveTx(honeyBuy, false)
    // setTimeout(() => {
    //   updateAllowance(honeyBuy + 0.01)
    //   ammButton && (ammButton.innerHTML = "buy")
    //   setAllowanceButtons(false)
    // }, 10000)
  }

  const handleRightButtonClick = async () => {
    const ammButton = document.getElementById('amm-button')
    const rightButton = document.getElementById('right-approve-button')
    const leftButton = document.getElementById('left-approve-button')
    rightButton && (rightButton.innerHTML = "approving...")
    leftButton && (leftButton.innerHTML = "approving...")
    // await sendApproveTx(0, true)
    // setTimeout(() => {
    //   updateAllowance(100000000)
    //   ammButton && (ammButton.innerHTML = "buy")
    //   setAllowanceButtons(false)
    // }, 10000)
  }

  const renderButton = () => {
    if(activeToggle === 'buy') {
      if(isConnected && debouncedHoneyBuy > goldiswapInfo.honeySwapAllowance && balance.honey >= debouncedHoneyBuy) {
        return 'approve $honey'
      }
      return 'buy'
    }
    else if(activeToggle === 'sell') {
      return 'sell'
    }
    else {
      return 'redeem'
    }
  }


  return (
    <>
      {
        <div>
          <button
            className="absolute bg-[#E7B941]"
          >
            approve tx
          </button>
          <button
            className="absolute bg-[#E7B941]"
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
                className="absolute h-[8%] w-[16.6%] top-[64.8%] left-[41.7%] bg-[#E7B941] font-amaticbold text-[1.9vw] border-2 border-black hover:bg-[#4D0B24] hover:text-[#E7B941]"
                id="buy-button"
                onClick={() => {
                  const button = document.getElementById('buy-button')
                  
                  if(!account) {
                    if(button && button.innerHTML === "connect wallet") {
                      openConnectModal()
                    }
                    else {
                      button && (button.innerHTML = "connect wallet")
                    }
                  }
                  else if(chain?.name !== "Berachain Artio") {
                    if(button && button.innerHTML === "switch to testnet plz") {
                      openChainModal()
                    }
                    else {
                      button && (button.innerHTML = "switch to testnet plz")
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