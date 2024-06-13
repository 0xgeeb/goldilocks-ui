"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useGoldilend, useWallet } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { contracts } from "../../../utils/addressi"

export const BorrowButtonMobile = () => {

  const {
    selectedBeras,
    loanExpiration,
    loanAmount,
    setTxConfirming,
    changeActiveToggle,
    openNotification,
    findBeras,
    selectScreen,
    setSelectScreen,
    activeToggle,
    selectedPartners,
    boostMag,
    findPartners,
    userBoost
  } = useGoldilend()

  const { wallet } = useWallet()

  const {
    checkLoanAllowance,
    sendGoldilendNFTApproveTx,
    sendBorrowTx,
    checkBoostAllowance,
    sendBoostTx,
    sendWithdrawBoostTx
  } = useGoldilendTx()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const refreshInfo = () => {
    changeActiveToggle('BOOST')
    findPartners()
  }

  const checkSelected = (beraName: string): boolean => {
    for(let i = 0; i < selectedBeras.length; i++) {
      if(selectedBeras[i].name === beraName) {
        return true
      }
    }
    return false
  }

  const checkSelectedPartners = (partnerName: string): boolean => {
    for(let i = 0; i < selectedPartners.length; i++) {
      if(selectedPartners[i].name === partnerName) {
        return true
      }
    }  
    return false
  }

  const parseDate = (dateString: string): number => {
    const dateParts = dateString.split('-')
    const [month, day, year] = dateParts.map(Number);
    const parsedDate = new Date(year, month - 1, day)
    const timestamp = parsedDate.getTime()
    const currentTimestamp = Date.now()
    return Math.floor((timestamp - currentTimestamp) / 1000)
  }

  const checkDate = (dateString: String): boolean => {
    const dateParts = dateString.split('-')
    const [month, day, year] = dateParts.map(Number)
    const parsedDate = new Date(year, month - 1, day)
    const timestamp = parsedDate.getTime()
    const timestampDigits = Math.floor(timestamp / 1000)
    if(dateParts.length !== 3) {
      return false
    }
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return false
    }
    if (isNaN(parsedDate.getTime())) {
      return false
    }
    if(timestampDigits < Math.floor(Date.now() / 1000)) {
      return false
    }
    if(timestampDigits < Math.floor(Date.now() / 1000) + (86400 * 14)) {
      return false
    }
    return true
  }

  const handleButtonClick = async () => {
    const button = document.getElementById('borrow-button')
    if(activeToggle === 'BORROW') {
      if(selectScreen) {
        if(selectedBeras.length == 0) {
          button && (button.innerHTML = "no beras")
          return
        }
        button && (button.innerHTML = "create loan")
        setSelectScreen(false)
      }
      else {
        if(loanAmount == 0) {
          button && (button.innerHTML = "no loan")
          return
        }
        if(!checkDate(loanExpiration)) {
          button && (button.innerHTML = "invalid expiration")
          return
        }
        if(selectedBeras.length == 0) {
          button && (button.innerHTML = "no collateral")
          return
        }
        const [bondFlag, bandFlag] = await checkLoanAllowance(wallet)
        if((bondFlag || !checkSelected("BondBera")) && (bandFlag || !checkSelected("BandBera"))) {
          borrowTxFlow(button)
        }
        else {
          button && (button.innerHTML = "approving...")
          if(!bondFlag && checkSelected('BondBera')) {
            await sendGoldilendNFTApproveTx(contracts.bondbear.address)
          }
          if(!bandFlag && checkSelected('BandBera')) {
            await sendGoldilendNFTApproveTx(contracts.bandbear.address)
          }
          button && (button.innerHTML = "create loan")
        }
      }
    }
    else {
      if(selectScreen) {
        setSelectScreen(false)
      }
      else {
        if(selectedPartners.length == 0) {
          button && (button.innerHTML = "no boost")
          return
        }
        const [combFlag, dromeFlag] = await checkBoostAllowance(wallet)
        if((combFlag || !checkSelectedPartners("HoneyComb")) && (dromeFlag || !checkSelectedPartners("Beradrome"))) {
          boostTxFlow(button)
        }
        else {
          button && (button.innerHTML = "approving...")
          if(!combFlag && checkSelectedPartners('HoneyComb')) {
            await sendGoldilendNFTApproveTx(contracts.honeycomb.address)
          }
          if(!dromeFlag && checkSelectedPartners('Beradrome')) {
            await sendGoldilendNFTApproveTx(contracts.beradrome.address)
          }
          button && (button.innerHTML = "create boost")
        }
      }
    }
  }

  const handleWithdrawButtonClick = async () => {
    const button = document.getElementById('borrow-button-withdraw')
    if(userBoost.expiry > Math.floor(Date.now() / 1000)) {
      button && (button.innerHTML = "not expired")
      return
    }
    setTxConfirming(true)
    if(button) {
      button.innerHTML = "confirming..."
    }
    const withdrawBoostTx = await sendWithdrawBoostTx()
    if(withdrawBoostTx.substring(0, 2) === '0x') {
      setTxConfirming(false)
      openNotification(
        true,
        "You've successfully withdrew your boost",
        ``,
        withdrawBoostTx
      )
      refreshInfo()
      if(button) {
        button.innerHTML = "withdraw boost"
      }
      setTimeout(() => {
        openNotification(false, '', '', '')
      }, 10000)
    }
    else {
      if(button) {
        button.innerHTML = "withdraw boost"
      }
      setTxConfirming(false)
    }
  }

  const boostTxFlow = async (button: HTMLElement | null) => {
    setTxConfirming(true)
    if(button) {
      button.innerHTML = "confirming..."
    }
    const boostTx = await sendBoostTx(selectedPartners)
    if(boostTx.substring(0, 2) === '0x') {
      setTxConfirming(false)
      openNotification(
        true,
        "You've successfully created a boost",
        `You created a boost with a magnitude of ${formatAsString(boostMag)}`,
        boostTx
      )
      if(button) {
        button.innerHTML = "create boost"
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
        button.innerHTML = "create boost"
        button.style.backgroundColor = "#E7B941"
        button.style.color = "black"
      }
      refreshInfo()
      setTxConfirming(false)
    }
  }

  const borrowTxFlow = async (button: HTMLElement | null) => {
    setTxConfirming(true)
    if(button) {
      button.innerHTML = "confirming..."
    }
    const borrowTx = await sendBorrowTx(loanAmount, selectedBeras, parseDate(loanExpiration))
    if(borrowTx.substring(0, 2) === '0x') {
      setTxConfirming(false)
      openNotification(
        true,
        "You've successfully created a loan",
        `You borrowed ${formatAsString(loanAmount)} iBGT against your bera${selectedBeras.length > 1 ? "s" : ""}`,
        borrowTx
      )
      if(button) {
        button.innerHTML = "create loan"
        button.style.backgroundColor = "#E7B941"
        button.style.color = "black"
      }
      changeActiveToggle('BORROW')
      findBeras()
      setTimeout(() => {
        openNotification(false, '', '', '')
      }, 10000)
    }
    else {
      if(button) {
        button.innerHTML = "create loan"
        button.style.backgroundColor = "#E7B941"
        button.style.color = "black"
      }
      changeActiveToggle('BORROW')
      findBeras()
      setTxConfirming(false)
    }
  }

  const renderButton = (): string => {
    if(activeToggle === 'BORROW') {
      return 'create loan'
    }
    else {
      if(selectedPartners.length > 0) {
        return 'create boost'
      }
      else {
        return 'my boost'
      }
    }
  }

  return (
    (activeToggle === 'BOOST' && selectScreen == false && userBoost.partnerNFTs.length > 1) ?
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openChainModal,
          openConnectModal
        }) => {
          return (
            <button
              className="absolute top-[67.5%] left-[22.5%] h-[7.5%] w-[55%] bg-[#E7B941] border-2 border-black font-amaticbold text-[9vw] flex items-center justify-center hover:bg-[#C9E3B9] hover:scale-110"
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
                else if(chain?.name !== "Base Sepolia") {
                  if(button && button.innerHTML === "where base sepolia") {
                    openChainModal()
                  }
                  else {
                    button && (button.innerHTML = "where base sepolia")
                  }
                }
                else {
                  handleButtonClick()
                }
              }}
            >
              add to boost
            </button>
          )
        }}
      </ConnectButton.Custom>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openChainModal,
          openConnectModal
        }) => {
          return (
            <button
              className="absolute top-[77.5%] left-[22.5%] h-[7.5%] w-[55%] bg-[#E7B941] border-2 border-black font-amaticbold text-[9vw] flex items-center justify-center hover:bg-[#C9E3B9] hover:scale-110"
              id="borrow-button-withdraw"
              onClick={() => {
                const button = document.getElementById('borrow-button-withdraw')
                
                if(!account) {
                  if(button && button.innerHTML === "connect wallet") {
                    openConnectModal()
                  }
                  else {
                    button && (button.innerHTML = "connect wallet")
                  }
                }
                else if(chain?.name !== "Base Sepolia") {
                  if(button && button.innerHTML === "where base sepolia") {
                    openChainModal()
                  }
                  else {
                    button && (button.innerHTML = "where base sepolia")
                  }
                }
                else {
                  handleWithdrawButtonClick()
                }
              }}
            >
              withdraw boost
            </button>
          )
        }}
      </ConnectButton.Custom>
    </> :
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal
      }) => {
        return (
          <button
            className="absolute top-[67.5%] left-[22.5%] h-[7.5%] w-[55%] bg-[#E7B941] border-2 border-black font-amaticbold text-[9vw] flex items-center justify-center hover:bg-[#C9E3B9] hover:scale-110"
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
              else if(chain?.name !== "Base Sepolia") {
                if(button && button.innerHTML === "where base sepolia") {
                  openChainModal()
                }
                else {
                  button && (button.innerHTML = "where base sepolia")
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
  )
}