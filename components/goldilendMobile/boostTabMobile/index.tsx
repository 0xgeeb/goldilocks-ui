"use client"

import { useState, useEffect } from "react"
import { useGoldilend, useWallet } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { LendNotificationMobile } from "../../goldilendMobile"
import { contracts } from "../../../utils/addressi"

export const BoostTabMobile = () => {

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
    userBoost,
    selectScreen
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
    <>
      {
        selectScreen &&
        <div className="h-[100%] w-[100%] flex flex-col items-center">
          <h1 className="font-amaticbold text-[10vw] mt-[5%]">select partner nfts</h1>
          <div className="flex flex-wrap overflow-y-auto w-[95%] h-[80%]" id="hide-scrollbar">
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
      }
      {
        !selectScreen &&
        (
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile.png" alt="tx" /> :
          notification.toggle ? <LendNotificationMobile /> :
          <div className="h-[100%] w-[100%] flex flex-col items-center justify-between py-[3%] relative">
            {
              infoLoading ? loadingElement() :
              userBoost.partnerNFTs.length > 0 ?
              <></> :
              <></>
            }
          </div>
        )
      }
    </>
  )
}