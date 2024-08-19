"use client"

import { notFound } from "next/navigation"
import { useState, useEffect } from "react"
import { useGoldivault, useDesktop } from "../../../providers"
import {
  VaultBox,
  VaultButton,
  VaultInfo
} from "../"
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

  const { isDesktop } = useDesktop()

  useEffect(() => {
    setPageLoading(false)
  }, [])

  if(params.address === 'otheraddy') {
    notFound()
  }

  return (
    pageLoading ?
    <Loading /> :
    isDesktop ?
    <main className="w-screen h-screen">
      <NavBar />
      <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldivault.png')] relative">
        <a className="absolute top-[15%] right-[77%] h-[7.5%] w-[12.5%]" href="/goldivault/vaults">
          <div className="w-[100%] h-[100%] hover:scale-110 cursor-pointer border-2 border-[#FFCD00] bg-[#542E07] flex justify-center items-center">
            <span className="text-white font-baloo font-semibold text-[0.9vw] text-center">BACK TO VAULTS</span>
          </div>
        </a>
        <h1 className="absolute right-[72.5%] top-[25%] font-amaticbold text-[#FFCD00] text-[6vw] font-medium" id="page-title">HONEY-WBERA</h1>
        <h1 className="absolute right-[78.5%] top-[42%] font-amaticbold text-[#FFCD00] text-[6vw] font-medium" id="page-title">VAULT</h1>
        <VaultBox />
        <VaultButton />
        <VaultInfo />
        <Footer />
        <ChangeChain />
      </div>
    </main>:
    <div>mobile</div>
  )
}