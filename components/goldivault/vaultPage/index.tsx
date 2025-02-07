"use client"

import { notFound } from "next/navigation"
import { useState, useEffect } from "react"
import { useGoldivault, useDesktop, useGeo } from "../../../providers"
import { VaultPageMobile } from "../../goldivaultMobile"
import {
  PoolsPopup,
  Toggles,
  BurnPopup,
  ExpirePopup,
  InfoPopup,
  SlippagePopup,
  VaultInfo,
  VaultBox,
  VaultButton
} from "../"
import {
  VaultBoxBhoney,
  VaultButtonBhoney,
  VaultInfoBhoney,
} from "../bhoney"
import {
  VaultBoxHoneyWbera,
  VaultButtonHoneyWbera,
  VaultInfoHoneyWbera,
} from "../honeyWbera"
import {
  NavBar,
  Footer,
  Loading,
  ChangeChain,
  TAndCs
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
    checkSlippageAmount,
    slippage,
    changeSlippageToggle
  } = useGoldivault()

  const { isDesktop } = useDesktop()

  const { signed } = useGeo()

  useEffect(() => {
    checkSlippageAmount()
    setPageLoading(false)
  }, [])

  if(params.address !== '0x281F698b0969904Df5476CC4031B4C886dE86323' && params.address !== 'rseth' && params.address !== 'ebtc' && params.address !== '0xEfBfEC4ab23BeB740D6463Ba046f2d7B66E9e314' && params.address !== '0x0ed996697ABDe35eD6C3E61C562D37366ba06d88') {
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

  const insideSlippage = (e: any): boolean => {
    let slipLeft = 0.45
    let slipRight = 0.64
    let slipUp = 0.32
    let slipDown = 0.54

    if(window.innerWidth > 1024) {
      slipLeft = 0.45
      slipRight = 0.64
      slipUp = 0.32
      slipDown = 0.54
    }
    else {
      slipLeft = 0.33
      slipRight = 0.70
      slipUp = 0.33
      slipDown = 0.53
    }

    if(e.clientX > (window.innerWidth * slipLeft) && e.clientX < (window.innerWidth * slipRight) && e.clientY > (window.innerHeight * slipUp) && e.clientY < (window.innerHeight * slipDown)) {
      return true
    }
    else {
      return false
    }
  }

  const handlePopups = (e: any) => {
    if(slippage.toggle && !insideSlippage(e)) {
      changeSlippageToggle(false)
    }
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
    (
      signed !== 'TRUE' ?
      <TAndCs /> :
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
          <Toggles />
          { slippage.toggle && <SlippagePopup /> }
          {
          //   params.address === '0x35EF111B092d5faeF321A1aC7e048E378c63DCCc' ?
          //   <>
          //     <h1 className="absolute right-[72.5%] top-[25%] font-amaticbold text-[#FFCD00] text-[6vw] font-medium" id="page-title">HONEY-WBERA</h1>
          //     <VaultBoxHoneyWbera />
          //     <VaultButtonHoneyWbera />
          //     <VaultInfoHoneyWbera />
          //     <PoolsPopup />
          //   </> :
            // params.address === '0x541C4aCA915ccC83B1bf48b510D1653cba61115F' ?
            // <>
            //   <h1 className="absolute right-[60%] lg:right-[77.5%] top-[1%] md:top-[0%] lg:top-[25%] font-amaticbold text-[#FFCD00] text-[8vw] md:text-[7vw] lg:text-[6vw] font-medium" id="page-title">bHONEY</h1>
            //   <VaultBoxBhoney />
            //   <VaultButtonBhoney />
            //   <VaultInfoBhoney />
            //   {/* <PoolsPopup /> */}
            //   <Toggles />
            //   {
            //     activeToggle === 'REDEEMOT' &&
            //     <div className="z-50 absolute w-[30%] xl:w-[25%] 2xl:w-[15%] font-baloo font-semibold text-center px-2 text-[2vw] xl:text-[1.5vw] 2xl:text-[1vw] h-[20%] lg:h-[22%] bottom-[1%] left-[1%] bg-[#FFE59F] border-2 border-black flex items-center justify-center">
            //       <span>Early withdrawals unavailable on bHONEY vault. OTs can be redeemed for underlying HONEY at maturation</span>
            //     </div>
            //   }
            //   {
            //     activeToggle === 'REDEEMYT' &&
            //     <div className="z-50 absolute w-[30%] xl:w-[25%] 2xl:w-[15%] font-baloo font-semibold text-center px-2 text-[2vw] xl:text-[1.5vw] 2xl:text-[1vw] h-[14%] lg:h-[16%] bottom-[1%] left-[1%] bg-[#FFE59F] border-2 border-black flex items-center justify-center">
            //       <span>YTs can be redeemed for the accumulated yield of one OT at maturation</span>
            //     </div>
            //   }
            // </> :
            params.address === 'rseth' ?
            <>
              <h1 className="absolute right-[60%] lg:right-[78.25%] top-[1%] md:top-[0%] lg:top-[25%] font-amaticbold text-[#FFCD00] text-[8vw] md:text-[7vw] lg:text-[6vw] font-medium" id="page-title">rsETH</h1>
              <VaultBox
                params={{
                  vaultToken: "rseth",
                  dt: "rsETH",
                  ot: "rsETH-OT",
                  yt: "rsETH-YT"
                }}
              />
              <VaultButton
                params={{
                  vaultToken: "rseth",
                  dt: "rsETH",
                  ot: "rsETH-OT",
                  yt: "rsETH-YT"
                }}
              />
              <VaultInfo
                params={{
                  vaultToken: "rseth",
                  protocolUrl: "https://www.kelpdao.xyz/",
                  dexLink: "https://dexscreener.com/"
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "rseth",
                  poolUrl: "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                  poolName: "rsETH / rsETH OT LP"
                }}
              />
            </> :
            params.address === 'ebtc' ?
            <>
              <h1 className="absolute right-[60%] lg:right-[78.25%] top-[1%] md:top-[0%] lg:top-[25%] font-amaticbold text-[#FFCD00] text-[8vw] md:text-[7vw] lg:text-[6vw] font-medium" id="page-title">eBTC</h1>
              <VaultBox
                params={{
                  vaultToken: "ebtc",
                  dt: "eBTC",
                  ot: "eBTC-OT",
                  yt: "eBTC-YT"
                }}
              />
              <VaultButton
                params={{
                  vaultToken: "ebtc",
                  dt: "eBTC",
                  ot: "eBTC-OT",
                  yt: "eBTC-YT"
                }}
              />
              <VaultInfo
                params={{
                  vaultToken: "ebtc",
                  protocolUrl: "https://app.ether.fi/ebtc",
                  dexLink: "https://dexscreener.com/"
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "ebtc",
                  poolUrl: "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                  poolName: "eBTC / eBTC OT LP"
                }}
              />
            </> :
            params.address === '0xEfBfEC4ab23BeB740D6463Ba046f2d7B66E9e314' ?
            <>
              <h1 className="absolute right-[60%] lg:right-[78.25%] top-[1%] md:top-[0%] lg:top-[25%] font-amaticbold text-[#FFCD00] text-[8vw] md:text-[7vw] lg:text-[6vw] font-medium" id="page-title">uniBTC</h1>
              <VaultBox
                params={{
                  vaultToken: "unibtc",
                  dt: "uniBTC",
                  ot: "uniBTC-OT",
                  yt: "uniBTC-YT"
                }}
              />
              <VaultButton
                params={{
                  vaultToken: "unibtc",
                  dt: "uniBTC",
                  ot: "uniBTC-OT",
                  yt: "uniBTC-YT"
                }}
              />
              <VaultInfo
                params={{
                  vaultToken: "unibtc",
                  protocolUrl: "https://app.bedrock.technology/",
                  dexLink: "https://dexscreener.com/"
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "unibtc",
                  poolUrl: "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                  poolName: "uniBTC / uniBTC OT LP"
                }}
              />
            </> :
            params.address === '0x0ed996697ABDe35eD6C3E61C562D37366ba06d88' ?
            <>
              <h1 className="absolute right-[60%] lg:right-[78.25%] top-[1%] md:top-[0%] lg:top-[25%] font-amaticbold text-[#FFCD00] text-[7.5vw] md:text-[6.5vw] lg:text-[5.5vw] font-medium" id="page-title">solvBTC.BBN</h1>
              <VaultBox
                params={{
                  vaultToken: "solvbtc",
                  dt: "solvBTC.BBN",
                  ot: "solvBTC.BBN-OT",
                  yt: "solvBTC.BBN-YT"
                }}
              />
              <VaultButton
                params={{
                  vaultToken: "solvbtc",
                  dt: "solvBTC.BBN",
                  ot: "solvBTC.BBN-OT",
                  yt: "solvBTC.BBN-YT"
                }}
              />
              <VaultInfo
                params={{
                  vaultToken: "solvbtc",
                  protocolUrl: "https://app.solv.finance/solvbtc?network=ethereum",
                  dexLink: "https://dexscreener.com/"
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "solvbtc",
                  poolUrl: "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                  poolName: "solvBTC.BBN / solvBTC.BBN OT LP"
                }}
              />
            </> :
            <>
              <h1 className="absolute right-[60%] lg:right-[78.25%] top-[1%] md:top-[0%] lg:top-[25%] font-amaticbold text-[#FFCD00] text-[8vw] md:text-[7vw] lg:text-[6vw] font-medium" id="page-title">weETH</h1>
              <VaultBox
                params={{
                  vaultToken: "weeth",
                  dt: "weETH",
                  ot: "weETH-OT",
                  yt: "weETH-YT"
                }}
              />
              <VaultButton
                params={{
                  vaultToken: "weeth",
                  dt: "weETH",
                  ot: "weETH-OT",
                  yt: "weETH-YT"
                }}
              />
              <VaultInfo
                params={{
                  vaultToken: "weeth",
                  protocolUrl: "https://app.ether.fi/weeth",
                  dexLink: "https://dexscreener.com/"
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "weeth",
                  poolUrl: "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                  poolName: "weETH / weETH OT LP"
                }}
              />
            </>
          }
          <Footer />
          <ChangeChain />
        </div>
      </main>
    ) :
    <VaultPageMobile address={params.address} />
  )
}