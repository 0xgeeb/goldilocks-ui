"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useGoldilend } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import {
  NavBar,
  Footer,
  Loading
} from "../../utils"

export const GoldilendMintPage = () => {
  
  const [pageLoading, setPageLoading] = useState<boolean>(true)

  const { wutPopup, setWutPopup } = useGoldilend()
  const { chain, address, isConnected } = useAccount()
  const { sendMintNFTTx } = useGoldilendTx()

  useEffect(() => {
    setPageLoading(false)
  }, [])

  const handleButtonClick = async (nft: string) => {
    if(nft === 'bond') {
      const text = document.getElementById('bond-text')
      if(!isConnected) {
        text && (text.innerHTML = "no wallet")
        return
      }
      if(chain?.name !== "Berachain") {
        text && (text.innerHTML = "no berachain")
        return
      }
      text && (text.innerHTML = "minting...")
      const mintTx = await sendMintNFTTx(nft, address as `0x${string}`)
      if(mintTx.substring(0, 2) === '0x') {
        text && (text.innerHTML = "minted :)")
      }
      else {
        text && (text.innerHTML = "mint 1 bond bera")
      }
    }
    if(nft === 'band') {
      const text = document.getElementById('band-text')
      if(!isConnected) {
        text && (text.innerHTML = "no wallet")
        return
      }
      if(chain?.name !== "Berachain") {
        text && (text.innerHTML = "no berachain")
        return
      }
      text && (text.innerHTML = "minting...")
      const mintTx = await sendMintNFTTx(nft, address as `0x${string}`)
      if(mintTx.substring(0, 2) === '0x') {
        text && (text.innerHTML = "minted :)")
      }
      else {
        text && (text.innerHTML = "mint 1 band bera")
      }
    }
    if(nft === 'honeycomb') {
      const text = document.getElementById('honeycomb-text')
      if(!isConnected) {
        text && (text.innerHTML = "no wallet")
        return
      }
      if(chain?.name !== "Berachain") {
        text && (text.innerHTML = "no berachain")
        return
      }
      text && (text.innerHTML = "minting...")
      const mintTx = await sendMintNFTTx(nft, address as `0x${string}`)
      if(mintTx.substring(0, 2) === '0x') {
        text && (text.innerHTML = "minted :)")
      }
      else {
        text && (text.innerHTML = "mint 1 honeycomb")
      }
    }
    if(nft === 'beradrome') {
      const text = document.getElementById('beradrome-text')
      if(!isConnected) {
        text && (text.innerHTML = "no wallet")
        return
      }
      if(chain?.name !== "Berachain") {
        text && (text.innerHTML = "no berachain")
        return
      }
      text && (text.innerHTML = "minting...")
      const mintTx = await sendMintNFTTx(nft, address as `0x${string}`)
      if(mintTx.substring(0, 2) === '0x') {
        text && (text.innerHTML = "minted :)")
      }
      else {
        text && (text.innerHTML = "mint 1 beradrome")
      }
    }
  }

  const handlePopups = () => {
    if(wutPopup) {
      setWutPopup(false)
    }
  }

  return (
    pageLoading ?
    <Loading /> :
    <main className="w-screen h-screen" onClick={() => handlePopups()}>
      <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldilend.png')] relative">
        <h1 className="absolute top-[1.5%] lg:top-[0%] xl:top-[15%] right-[70%] lg:right-[73%] text-[#D9C6BA] text-[9vw] lg:text-[7.5vw] font-amaticbold" id="page-title">GOLDILEND</h1>
        <h1 className="absolute top-[3%] lg:top-[1%] xl:top-[36%] right-[57.5%] lg:right-[60%] xl:right-[80%] text-[#E7B941] text-[7vw] lg:text-[6vw] font-amaticbold" id="page-title">MINT</h1>
        <div className="absolute top-[30%] xl:top-[20%] left-[10%] xl:left-[35%] w-[80%] xl:w-[55%] h-[45%]">
          <div className="relative w-[100%] h-[100%]">
            <div className="absolute top-0 left-0 w-[47.5%] h-[47.5%] border-2 border-black bg-[#EEDCD2] cursor-pointer hover:scale-110" onClick={() => handleButtonClick('bond')}>
              <div className="absolute top-1 left-0 w-2 skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute top-1 right-0 w-2 -skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute inset-2 border-2 border-black bg-[#D9C6BA] flex items-center justify-center">
                <h1 className="font-amaticbold font-medium text-[5vw] lg:text-[3vw] text-center" id="bond-text">mint 1 bond bera</h1>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-[47.5%] h-[47.5%] border-2 border-black bg-[#EEDCD2] cursor-pointer hover:scale-110" onClick={() => handleButtonClick('band')}>
              <div className="absolute top-1 left-0 w-2 skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute top-1 right-0 w-2 -skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute inset-2 border-2 border-black bg-[#D9C6BA] flex items-center justify-center">
                <h1 className="font-amaticbold font-medium text-[5vw] lg:text-[3vw] text-center" id="band-text">mint 1 band bera</h1>
              </div>
            </div>
            <div className="absolute bottom-0 left-[26.25%] w-[47.5%] h-[47.5%] border-2 border-black bg-[#EEDCD2] cursor-pointer hover:scale-110" onClick={() => handleButtonClick('honeycomb')}>
              <div className="absolute top-1 left-0 w-2 skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute top-1 right-0 w-2 -skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-black"></div>
              <div className="absolute inset-2 border-2 border-black bg-[#D9C6BA] flex items-center justify-center">
                <h1 className="font-amaticbold font-medium text-[5vw] lg:text-[3vw] text-center" id="honeycomb-text">mint 1 honeycomb</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="z-50 absolute w-[30%] xl:w-[25%] 2xl:w-[15%] font-baloo font-semibold text-center px-2 text-[2vw] xl:text-[1.5vw] 2xl:text-[1vw] h-[6%] lg:h-[8%] bottom-[1%] left-[1%] bg-[#FFE59F] border-2 border-black flex items-center justify-center">
          <span>these NFTs are FAKE</span>
        </div>
        <Footer />
      </div>
    </main>
  )
}