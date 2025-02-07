"use client"

import { useState, useEffect } from "react"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { useGov, useDesktop, useGeo } from "../../../providers"
import { ProposalPageMobile } from "../../govMobile"
import {
  ProposalBox,
  VoteBox,
  ProposalsFetcher,
  ProposalButtons
} from "../../gov"
import {
  NavBar,
  Footer,
  Loading,
  ChangeChain,
  TAndCs
} from "../../utils"

type Props = {
  params: {
    number: string;
  }
}

export const ProposalPage = ({ params }: Props) => {

  const [pageLoading, setPageLoading] = useState<boolean>(true)

  const { wutPopup, setWutPopup } = useGov()

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
              <h1 className="absolute top-[-0.5%] left-[5%] text-[#D9C6BA] text-[7.5vw] lg:text-[6vw] font-amaticbold" id="page-title">Proposal #{params.number}</h1>
              <ProposalBox number={params.number} />
              <VoteBox number={params.number} />
              <ProposalButtons number={params.number} />
              <Footer />
              <ProposalsFetcher />
              <ChangeChain />
            </div>
          </main>
        ) :
        <ProposalPageMobile number={params.number} />
      }
    </ApolloProvider>
  )
}