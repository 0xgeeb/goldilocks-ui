"use client"

import { useState, useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useGoldilend, useWallet } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { BorrowNotification } from "../../goldilend"
import { contracts } from "../../../utils/addressi"

export const BoostTab = () => {

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [boostedPartners, setBoostedPartners] = useState<boolean>(true)
  const [currentBoostIndex, setCurrentBoostIndex] = useState<number>(0)

  const {
    infoLoading,
    findBoost,
    findPartners,
    setInfoLoading,
    ownedPartners,
    selectedPartners,
    findSelectedPartnerIdxs,
    handlePartnerClick,
    updateBoostMag,
    boostMag,
    notification,
    txConfirming,
    setTxConfirming,
    openNotification,
    changeActiveToggle,
    userBoost
  } = useGoldilend()

  const {
    checkBoostAllowance,
    sendGoldilendNFTApproveTx,
    sendBoostTx,
    sendWithdrawBoostTx
  } = useGoldilendTx()

  const { wallet, isConnected, refreshBalances } = useWallet()

  useEffect(() => {
    findPartners()
    findBoost()
    refreshBalances()
    setInfoLoading(false)
  }, [isConnected])

  useEffect(() => {
    updateBoostMag()
  }, [selectedPartners])

  const loadingElement = () => {
    return <span className="loader-small mx-auto"></span>
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const nextImages = () => {
    if(currentIndex + 4 < selectedPartners.length) {
      setCurrentIndex(currentIndex + 4)
    }
  }

  const prevImages = () => {
    if(currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4)
    }
  }

  const nextBoostImages = () => {
    if(currentBoostIndex + 4 < userBoost.partnerNFTs.length) {
      setCurrentBoostIndex(currentBoostIndex + 4)
    }
  }

  const prevBoostImages = () => {
    if(currentBoostIndex - 4 >= 0) {
      setCurrentBoostIndex(currentBoostIndex - 4)
    }
  }

  const checkSelected = (partnerName: string): boolean => {
    for(let i = 0; i < selectedPartners.length; i++) {
      if(selectedPartners[i].name === partnerName) {
        return true
      }
    }
    
    return false
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear())
    return `${month}-${day}-${year}`
  }

  const refreshInfo = () => {
    changeActiveToggle('BOOST')
    findPartners()
  }

  const handleButtonClick = async () => {
    const button = document.getElementById('boost-button')
    if(selectedPartners.length == 0) {
      button && (button.innerHTML = "no boost")
      return
    }
    const [combFlag, dromeFlag] = await checkBoostAllowance(wallet)
    if((combFlag || !checkSelected("HoneyComb")) && (dromeFlag || !checkSelected("Beradrome"))) {
      boostTxFlow(button)
    }
    else {
      button && (button.innerHTML = "approving...")
      if(!combFlag && checkSelected('HoneyComb')) {
        await sendGoldilendNFTApproveTx(contracts.honeycomb.address)
      }
      if(!dromeFlag && checkSelected('Beradrome')) {
        await sendGoldilendNFTApproveTx(contracts.beradrome.address)
      }
      button && (button.innerHTML = "create boost")
    }
  }

  const handleWithdrawButtonClick = async () => {
    const button = document.getElementById('boost-button-withdraw')
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

  return (
    txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
    notification.toggle ? <BorrowNotification /> :
    <div className="w-[100%] h-[100%] flex flex-row">
      <div className="h-[100%] w-[100%] px-[0%] border-r-2 border-black flex flex-col items-center">
        <h1 className="font-amaticbold text-[3vw] mt-[2%]">select partner nfts</h1>
        <div className="flex flex-wrap overflow-y-auto w-[85%] h-[80%]" id="hide-scrollbar">
        {
            infoLoading ? loadingElement() :
            ownedPartners.map((partner, index) => (
              <div key={index} className="h-[45%] w-[50%] py-2">
                {
                  partner.name === 'Beradrome' ?
                  <img
                    className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedPartnerIdxs().includes(partner.index) ? "border-4 border-black" : "opacity-75"}`}
                    onClick={() => {
                      setBoostedPartners(false)
                      handlePartnerClick(partner)
                    }}
                    src={partner.imageSrc}
                    alt="partner"
                  /> :
                  <video
                    className={`ml-[5%] h-[100%] w-[90%] hover:scale-110 hover:cursor-pointer ${findSelectedPartnerIdxs().includes(partner.index) ? "border-4 border-black" : "opacity-75"}`}
                    onClick={() => {
                      setBoostedPartners(false)
                      handlePartnerClick(partner)
                    }}
                    autoPlay
                    loop
                    muted
                  >
                    <source src={partner.imageSrc} type="video/mp4" />
                  </video>
                }
              </div>
            ))
          }
        </div>
      </div>
      <div className="h-[100%] w-[100%] flex flex-col items-center">
        {
          infoLoading ? loadingElement() :
          userBoost.partnerNFTs.length > 0 ?
          <>
            <h1 className="font-amaticbold text-[4vw] my-[4%]">my boost</h1>
            <div className="w-[90%] h-[25%] flex flex-row items-start justify-between relative">
              <span
                className="absolute top-[-20%] left-[3%] font-baloo font-semibold cursor-pointer hover:scale-125"
                onClick={() => setBoostedPartners(!boostedPartners)}
              >
                {boostedPartners ? "Currently Boosted NFTs:" : "Selected Partner NFTs:"}
              </span>
              {
                boostedPartners ?
                <>
                  <div className="text-[2vw] cursor-pointer hover:scale-125" onClick={() => prevBoostImages()}>&lt;</div>
                  {
                    userBoost.partnerNFTs.slice(currentBoostIndex, currentBoostIndex + 4).map((partner, index) => (
                      partner === contracts.beradrome.address ?
                      <img
                        className="h-[70%] w-[20%] border-2 border-black"
                        src="https://ipfs.io/ipfs/QmYhKPJVDZDRDpJAJ2TyCXK981B4pvtPcjrKgN256U4Cok/73.png"
                        alt="selectedpartner"
                        key={index}
                        /> :
                        <video
                        className="h-[70%] w-[20%] border-2 border-black"
                        key={index}
                        autoPlay
                        loop
                        muted
                      >
                        <source src="https://ipfs.io/ipfs/QmTffyDuYgSyFAgispVjuVaTsKnC5vVs7FFq1YkGde4ZX5" type="video/mp4" />
                      </video>
                    ))
                  }
                  <div className="text-[2vw] cursor-pointer hover:scale-125" onClick={() => nextBoostImages()}>&gt;</div>
                </> :
                <>
                  <div className="text-[2vw] cursor-pointer hover:scale-125" onClick={() => prevImages()}>&lt;</div>
                  {
                    selectedPartners.slice(currentIndex, currentIndex + 4).map((partner, index) => (
                      partner.name === 'Beradrome' ?
                      <img
                        className="h-[70%] w-[20%] border-2 border-black"
                        onClick={() => handlePartnerClick(partner)}
                        src={partner.imageSrc}
                        alt="selectedpartner"
                        key={index}
                        /> :
                        <video
                        className="h-[70%] w-[20%] border-2 border-black"
                        onClick={() => handlePartnerClick(partner)}
                        key={index}
                        autoPlay
                        loop
                        muted
                      >
                        <source src={partner.imageSrc} type="video/mp4" />
                      </video>
                    ))
                  }
                  <div className="text-[2vw] cursor-pointer hover:scale-125" onClick={() => nextImages()}>&gt;</div>
                </>
              }
            </div>
            <h1 className="text-[1.3vw] font-baloo font-semibold text-[#9C4924]">{selectedPartners.length > 0 && "New"} Boost Amount: {userBoost.boostMagnitude + boostMag}%</h1>
            <h1 className="text-[1.3vw] font-baloo font-semibold text-[#9C4924]">Expiry: {formatDate(userBoost.expiry)}</h1>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openChainModal,
                openConnectModal
              }) => {
                return (
                  <button
                    className="h-[10%] w-[50%] border-2 border-black bg-[#E7B941] mt-[4%] font-amaticbold text-[1.5vw] hover:scale-110"
                    id="boost-button-add"
                    onClick={() => {
                      const button = document.getElementById('boost-button-add')
                      
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
                    className="h-[10%] w-[50%] border-2 border-black text-[#E7B941] bg-[#9C4924] mt-[4%] font-amaticbold text-[1.5vw] hover:scale-110"
                    id="boost-button-withdraw"
                    onClick={() => {
                      const button = document.getElementById('boost-button-withdraw')
                      
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
          <>
            <h1 className="font-amaticbold text-[5vw] my-[8%]">create boost</h1>
            <div className="w-[90%] h-[25%] flex flex-row items-start justify-between relative">
              <span className="absolute top-[-20%] left-[3%] font-baloo font-semibold">Selected Partner NFTs:</span>
              <div className="text-[2vw] cursor-pointer hover:scale-125" onClick={() => prevImages()}>&lt;</div>
              {
                selectedPartners.slice(currentIndex, currentIndex + 4).map((partner, index) => (
                  partner.name === 'Beradrome' ?
                  <img
                    className="h-[70%] w-[20%] border-2 border-black"
                    onClick={() => handlePartnerClick(partner)}
                    src={partner.imageSrc}
                    alt="selectedpartner"
                    key={index}
                  /> :
                  <video
                    className="h-[70%] w-[20%] border-2 border-black"
                    onClick={() => handlePartnerClick(partner)}
                    key={index}
                    autoPlay
                    loop
                    muted
                  >
                    <source src={partner.imageSrc} type="video/mp4" />
                  </video>
                ))
              }
              <div className="text-[2vw] cursor-pointer hover:scale-125" onClick={() => nextImages()}>&gt;</div>
            </div>
            <h1 className="text-[1.7vw] font-baloo font-semibold text-[#9C4924]">Boost Amount: {boostMag}%</h1>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openChainModal,
                openConnectModal
              }) => {
                return (
                  <button
                    className="h-[12.5%] w-[45%] border-2 border-black bg-[#E7B941] mt-[4%] font-amaticbold text-[1.5vw] hover:scale-110"
                    id="boost-button"
                    onClick={() => {
                      const button = document.getElementById('boost-button')
                      
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
                    create boost
                  </button>
                )
              }}
            </ConnectButton.Custom>
          </>
        }
      </div>
    </div>
  )
}