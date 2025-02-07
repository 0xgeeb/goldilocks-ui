"use client"

import { useState, useEffect } from "react"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { useGov, useDesktop, useGeo } from "../../../providers"
import { ProposalsPageMobile } from "../../govMobile"
import {
  NavBar,
  Footer,
  Loading,
  ChangeChain,
  TAndCs
} from "../../utils"
import { ProposalsBox, ProposalsFetcher } from ".."

export const ProposalsPage = () => {

  const [pageLoading, setPageLoading] = useState<boolean>(true)

  const {
    wutPopup,
    setWutPopup
  } = useGov()

  const { isDesktop } = useDesktop()

  const { signed } = useGeo()

  useEffect(() => {
    setPageLoading(false)
  }, [])

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GHOST_GRAPH_PROPOSALS_URL,
    cache: new InMemoryCache(),
    headers: {
      "X-GHOST-KEY": process.env.NEXT_PUBLIC_GHOST_GRAPH_KEY!
    }
  })

  const handlePopups = (e: any) => {
    if(wutPopup) {
      setWutPopup(false)
    }
  }

  return (
    <ApolloProvider client={client}>
      {
        pageLoading ?
        <Loading /> :
        isDesktop ?
        (
          signed !== 'TRUE' ?
          <TAndCs /> :
          <main className="w-screen h-screen" onClick={(e) => handlePopups(e)}>
            <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
            <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
              <h1 className="absolute top-[-0.5%] lg:top-[16%] 2xl:top-[12.16%] left-[2.5%] xl:left-[5%] 2xl:left-[7.5%] text-[#D9C6BA] text-[7.5vw] lg:text-[6vw] tall:text-[10vw] tall:md:text-[7.5vw] tall:lg:text-[6vw] font-amaticbold" id="page-title">GoldiGovernance</h1>
              <a href="/goldigovernance/propose">
                <div className="absolute h-[8%] w-[20%] lg:w-[16.6%] top-[2.25%] lg:top-[40%] right-[23%] lg:left-[15%] bg-[#E7B941] text-black hover:bg-[#4D0B24] hover:text-[#E7B941] font-amaticbold flex items-center justify-center text-[3.5vw] lg:text-[1.9vw] border-2 border-black hover:scale-110">
                  new proposal
                </div>
              </a>
              <a href="/goldigovernance/govlocks">
                <div className="absolute h-[8%] w-[20%] lg:w-[16.6%] top-[2.25%] lg:top-[50%] right-[1.5%] lg:left-[15%] bg-[#E7B941] text-black hover:bg-[#4D0B24] hover:text-[#E7B941] font-amaticbold flex items-center justify-center text-[3.5vw] lg:text-[1.9vw] border-2 border-black hover:scale-110">
                  get $govLOCKS
                </div>
              </a>
              <ProposalsBox />
              <Footer />
              <ProposalsFetcher />
              <ChangeChain />
            </div>
          </main>
        ) :
        <ProposalsPageMobile />
      }
    </ApolloProvider>
  )
}