import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  useBorrow,
  useWallet
} from "../../../providers"
import { useBorrowTx } from "../../../hooks"

export const BorrowButton = () => {

  const {
    borrowInfo,
    activeToggle,
    allowanceButtons,
    borrow,
    repay,
    updateAllowance,
    setAllowanceButtons,
    setTxConfirming,
    setDisplayString,
    setBorrow,
    setRepay,
    refreshBorrowInfo,
    openNotification
  } = useBorrow()

  const { 
    wallet,
    balance,
    refreshBalances
  } = useWallet()

  const {
    checkAllowance,
    sendApproveTx,
    sendBorrowTx,
    sendRepayTx
  } = useBorrowTx()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const refreshInfo = () => {
    setDisplayString('')
    setBorrow(0)
    setRepay(0)
    refreshBalances()
    refreshBorrowInfo()
  }

  const handleButtonClick = async () => {
    const button = document.getElementById('borrow-button')
    if(activeToggle === 'BORROW') {
      borrowTxFlow(button)
    }
    if(activeToggle === 'REPAY') {
      repayTxFlow(button)
    }
  }

  const borrowTxFlow = async (button: HTMLElement | null) => {
    if(borrow == 0) {
      button && (button.innerHTML = "borrow")
      return
    }
    if(borrow > (balance.staked - balance.locked) * (borrowInfo.fsl / borrowInfo.supply)) {
      button && (button.innerHTML = "insufficient balance")
      return
    }
    else {
      setTxConfirming(true)
      if(button) {
        button.innerHTML = "confirming..."
        button.style.backgroundColor = "#634C43"
        button.style.color = "#E7B941"
      }
      const borrowTx = await sendBorrowTx(borrow)
      if(borrowTx.substring(0, 2) === '0x') {
        setTxConfirming(false)
        openNotification(
          true,
          "You've successfully borrowed $HONEY",
          `You borrowed ${formatAsString(borrow)} Honey with ${formatAsString(borrow / (borrowInfo.fsl / borrowInfo.supply))} Locks`,
          borrowTx
        )
        if(button) {
          button.innerHTML = "borrow"
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
          button.innerHTML = "borrow"
          button.style.backgroundColor = "#E7B941"
          button.style.color = "black"
        }
        refreshInfo()
        setTxConfirming(false)
      }
    }
  }

  const repayTxFlow = async (button: HTMLElement | null) => {
    if(repay == 0) {
      button && (button.innerHTML = "repay")
      return
    }
    if(repay > balance.borrowed) {
      button && (button.innerHTML = "insufficient balance")
      return
    }
    else {
      const sufficientAllowance: boolean | void = await checkAllowance(repay, wallet)
      if(sufficientAllowance) {
        setTxConfirming(true)
        if(button) {
          button.innerHTML = "confirming..."
          button.style.backgroundColor = "#634C43"
          button.style.color = "#E7B941"
        }
        const repayTx = await sendRepayTx(repay)
        if(repayTx.substring(0, 2) === '0x') {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully repaid $HONEY",
            `You repaid ${formatAsString(repay)} Honey`,
            repayTx
          )
          if(button) {
            button.innerHTML = "repay"
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
            button.innerHTML = "repay"
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

  const handleLeftButtonClick = async () => {
    const borrowButton = document.getElementById('borrow-button')
    const leftButton = document.getElementById('left-approve-button')
    const rightButton = document.getElementById('right-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#634C43"
      leftButton.style.color = "#E7B941"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#634C43"
      rightButton.style.color = "#E7B941"
    }
    await sendApproveTx(repay, false)
    updateAllowance(repay + 0.01)
    borrowButton && (borrowButton.innerHTML = "repay")
    setAllowanceButtons(false)
  }

  const handleRightButtonClick = async () => {
    const borrowButton = document.getElementById('borrow-button')
    const rightButton = document.getElementById('right-approve-button')
    const leftButton = document.getElementById('left-approve-button')
    if(leftButton) {
      leftButton.innerHTML = "approving..."
      leftButton.style.backgroundColor = "#634C43"
      leftButton.style.color = "#E7B941"
    }
    if(rightButton) {
      rightButton.innerHTML = "approving..."
      rightButton.style.backgroundColor = "#634C43"
      rightButton.style.color = "#E7B941"
    }
    await sendApproveTx(0, true)
    updateAllowance(100000000)
    borrowButton && (borrowButton.innerHTML = "repay")
    setAllowanceButtons(false)
  }

  const renderButton = () => {
    if(activeToggle === 'BORROW') {
      return 'borrow'
    }
    if(activeToggle === 'REPAY') {
      if(repay > borrowInfo.honeyBorrowAllowance) {
        return 'approve honey'
      }
      return 'repay'
    }
  }

  return (
    <>
      {
        allowanceButtons &&
        <div>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[16.6%] top-[51.8%] left-[30.9%] border-2 border-black font-amaticbold text-[1.5vw] hover:bg-[#634C43] hover:text-[#E7B941] hover:scale-110"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute bg-[#E7B941] h-[8%] w-[16.6%] top-[51.8%] left-[52.5%] border-2 border-black font-amaticbold text-[1.5vw] hover:bg-[#634C43] hover:text-[#E7B941] hover:scale-110"
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
                className="absolute h-[8%] w-[16.6%] top-[51.8%] left-[41.6%] bg-[#E7B941] font-amaticbold text-[1.9vw] border-2 border-black hover:bg-[#634C43] hover:text-[#E7B941] hover:scale-110"
                id="borrow-button"
                onClick={() => {
                  const button = document.getElementById('borrow-button')
                  
                  if(!account) {
                    if(button && button.innerHTML === "connect wallet") {
                      openConnectModal()
                    }
                    else {
                      button && (button.innerHTML = "connect wallet")
                    }
                  }
                  else if(chain?.name !== "Berachain Artio") {
                    if(button && button.innerHTML === "where tastenet") {
                      openChainModal()
                    }
                    else {
                      button && (button.innerHTML = "where tastenet")
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