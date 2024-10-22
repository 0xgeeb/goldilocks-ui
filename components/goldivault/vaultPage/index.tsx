"use client"

import { notFound } from "next/navigation"
import { useState, useEffect } from "react"
import { useGoldivault, useDesktop } from "../../../providers"
import { VaultPageMobile } from "../../goldivaultMobile"
import {
  PoolsPopup,
  Toggles,
  BurnPopup,
  ExpirePopup,
  InfoPopup
} from "../"
import {
  VaultBoxBhoney,
  VaultButtonBhoney,
  VaultInfoBhoney,
} from "../bhoney"
import {
  VaultBoxWeeth,
  VaultButtonWeeth,
  VaultInfoWeeth,
  TogglesWeeth
} from "../weeth"
import {
  VaultBoxHoneyWbera,
  VaultButtonHoneyWbera,
  VaultInfoHoneyWbera,
} from "../honeyWbera"
import {
  NavBar,
  Footer,
  Loading,
  ChangeChain
} from "../../utils"

type Props = {
  params: {
    address: string;
  }
}

export const VaultPage = ({ params }: Props) => {

  const [pageLoading, setPageLoading] = useState<boolean>(true)

  const {
    burnPopupToggle,
    setBurnPopupToggle,
    poolsPopupToggle,
    setPoolsPopupToggle,
    wutPopup,
    setWutPopup,
    expirePopupToggle,
    setExpirePopupToggle,
    infoPopupToggle,
    setInfoPopupToggle,
    activeToggle
  } = useGoldivault()

  const { isDesktop } = useDesktop()

  useEffect(() => {
    setPageLoading(false)
  }, [])

  // if(params.address !== '0x35EF111B092d5faeF321A1aC7e048E378c63DCCc' && params.address !== '0xCfeC57e0a0c8a428E335a4222B1558e30A1F4517') {
  //   notFound()
  // }
  if(params.address !== '0x541C4aCA915ccC83B1bf48b510D1653cba61115F') {
    notFound()
  }

  const insidePools = (e: any): boolean => {
    let slipLeft
    let slipRight
    let slipUp
    let slipDown

    if(window.innerWidth < 768) {
      slipLeft = 0.10
      slipRight = 0.90
      slipUp = 0.26
      slipDown = 0.78
    }
    else if(window.innerWidth >= 768 && window.innerWidth < 1024) {
      slipLeft = 0.15
      slipRight = 0.85
      slipUp = 0.26
      slipDown = 0.78
    }
    else if(window.innerWidth >= 1024 && window.innerWidth < 1280) {
      slipLeft = 0.29
      slipRight = 0.71
      slipUp = 0.26
      slipDown = 0.78
    }
    else {
      slipLeft = 0.29
      slipRight = 0.71
      slipUp = 0.30
      slipDown = 0.82
    }

    if(e.clientX > (window.innerWidth * slipLeft) && e.clientX < (window.innerWidth * slipRight) && e.clientY > (window.innerHeight * slipUp) && e.clientY < (window.innerHeight * slipDown)) {
      return true
    }
    else {
      return false
    }
  }

  const handlePopups = (e: any) => {
    if(poolsPopupToggle && !insidePools(e)) {
      setPoolsPopupToggle(false)
    }
    if(burnPopupToggle) {
      setBurnPopupToggle(false)
    }
    if(wutPopup) {
      setWutPopup(false)
    }
    if(expirePopupToggle) {
      setExpirePopupToggle(false)
    }
    if(infoPopupToggle) {
      setInfoPopupToggle(false)
    }
  }

  return (
    pageLoading ?
    <Loading /> :
    isDesktop ?
    <main className="w-screen h-screen" onClick={(e) => handlePopups(e)}>
      <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldivault.png')] relative">
        <a className="absolute top-[3%] lg:top-[15%] right-[80%] lg:right-[77%] h-[6%] lg:h-[7.5%] w-[15%] lg:w-[12.5%]" href="/goldivault/vaults">
          <div className="w-[100%] h-[100%] hover:scale-110 cursor-pointer border-2 border-[#FFCD00] bg-[#542E07] flex justify-center items-center">
            <span className="text-white font-baloo font-semibold text-[1.5vw] lg:text-[0.9vw] text-center">BACK TO VAULTS</span>
          </div>
        </a>
        { burnPopupToggle && <BurnPopup /> }
        { expirePopupToggle && <ExpirePopup /> }
        { infoPopupToggle && <InfoPopup /> }
        <h1 className="absolute right-[45%] md:right-[47.5%] lg:right-[78.5%] top-[1%] md:top-[0%] lg:top-[42%] font-amaticbold text-[#FFCD00] text-[8vw] md:text-[7vw] lg:text-[6vw] font-medium" id="page-title">VAULT</h1>
        <PoolsPopup />
        {
        //   params.address === '0x35EF111B092d5faeF321A1aC7e048E378c63DCCc' ?
        //   <>
        //     <h1 className="absolute right-[72.5%] top-[25%] font-amaticbold text-[#FFCD00] text-[6vw] font-medium" id="page-title">HONEY-WBERA</h1>
        //     <VaultBoxHoneyWbera />
        //     <VaultButtonHoneyWbera />
        //     <VaultInfoHoneyWbera />
        //   </> :
          params.address === '0x541C4aCA915ccC83B1bf48b510D1653cba61115F' ?
          <>
            <h1 className="absolute right-[60%] lg:right-[77.5%] top-[1%] md:top-[0%] lg:top-[25%] font-amaticbold text-[#FFCD00] text-[8vw] md:text-[7vw] lg:text-[6vw] font-medium" id="page-title">bHONEY</h1>
            <VaultBoxBhoney />
            <VaultButtonBhoney />
            <VaultInfoBhoney />
            <Toggles />
            {
              activeToggle === 'REDEEMOT' &&
              <div className="z-50 absolute w-[30%] xl:w-[25%] 2xl:w-[15%] font-baloo font-semibold text-center px-2 text-[2vw] xl:text-[1.5vw] 2xl:text-[1vw] h-[20%] lg:h-[22%] bottom-[1%] left-[1%] bg-[#FFE59F] border-2 border-black flex items-center justify-center">
                <span>Early withdrawals unavailable on bHONEY vault. OTs can be redeemed for underlying HONEY at maturation</span>
              </div>
            }
            {
              activeToggle === 'REDEEMYT' &&
              <div className="z-50 absolute w-[30%] xl:w-[25%] 2xl:w-[15%] font-baloo font-semibold text-center px-2 text-[2vw] xl:text-[1.5vw] 2xl:text-[1vw] h-[14%] lg:h-[16%] bottom-[1%] left-[1%] bg-[#FFE59F] border-2 border-black flex items-center justify-center">
                <span>YTs can be redeemed for the accumulated yield of one OT at maturation</span>
              </div>
            }
          </> :
          <>
            <h1 className="absolute right-[60%] lg:right-[78.25%] top-[1%] md:top-[0%] lg:top-[25%] font-amaticbold text-[#FFCD00] text-[8vw] md:text-[7vw] lg:text-[6vw] font-medium" id="page-title">weETH</h1>
            <VaultBoxWeeth />
            <VaultButtonWeeth />
            <VaultInfoWeeth />
            <TogglesWeeth />
          </>
        }
        <Footer />
        <ChangeChain />
      </div>
    </main> :
    // <VaultPageMobile />
    <div>henlo. sorry napzilla didnt finish the mobile view yet</div>
  )
}