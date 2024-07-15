"use client"

import { useState, useEffect } from "react"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { useGoldilend, useDesktop } from "../../../providers"
import { GoldilendPageMobile } from "../../goldilendMobile"
import {
  Toggles,
  BorrowBox,
  BorrowFetcher
} from "../"
import {
  NavBar,
  Footer,
  Loading,
  ChangeChain
} from "../../utils"

export const GoldilendPage = () => {

  const [pageLoading, setPageLoading] = useState<boolean>(true)

  const {
    activeToggle
  } = useGoldilend()

  const { isDesktop } = useDesktop()

  useEffect(() => {
    setPageLoading(false)
  }, [])

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GHOST_GRAPH_URL,
    cache: new InMemoryCache(),
    headers: {
      "X-GHOST-KEY": process.env.NEXT_PUBLIC_GHOST_GRAPH_KEY!
    }
  })

  return (
    <ApolloProvider client={client}>
      {
        pageLoading ?
        <Loading /> :
        isDesktop ?
          <main className="w-screen h-screen">
            <NavBar />
            <div className="w-[100%] h-[89%] xl:h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldilend.png')] relative">
              <Toggles />
              <h1 className="absolute top-[1.5%] lg:top-[0%] xl:top-[15%] right-[70%] lg:right-[73%] text-[#D9C6BA] text-[9vw] lg:text-[7.5vw] font-amaticbold" id="page-title">GOLDILEND</h1>
              <h1 className={`absolute top-[3%] lg:top-[1%] xl:top-[36%] ${activeToggle === 'BORROW' ? "right-[52.5%] lg:right-[58%] xl:right-[78%]" : "right-[57.5%] lg:right-[60%] xl:right-[80%]"} text-[#E7B941] text-[7vw] lg:text-[6vw] font-amaticbold`} id="page-title">{activeToggle}</h1>
              <BorrowBox />
              <BorrowFetcher />
              <Footer />
              <ChangeChain />
            </div>
          </main> :
        <GoldilendPageMobile />
      }
    </ApolloProvider>
  )
}