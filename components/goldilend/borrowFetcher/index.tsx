"use client"

import { useState, useEffect } from "react"
import { useBerasOwnedQuery, usePartnerNfTsOwnedQuery } from "../../../src/graphql/generated/queries"
import { useWallet, useGoldilend } from "../../../providers"

export const BorrowFetcher = () => {

  const [skip, setSkip] = useState<boolean>(false)
  const [partnerSkip, setPartnerSkip] = useState<boolean>(false)

  const {
    findBeras,
    findPartners,
    findBoost,
    setInfoLoading
  } = useGoldilend()

  const { wallet, isConnected } = useWallet()
  
  const { data, loading } = useBerasOwnedQuery({
    variables: {
      owner: wallet
    },
    skip
  })

  // const { data: partnerData, loading: partnerLoading } = usePartnerNfTsOwnedQuery({
  //   variables: {
  //     owner: wallet
  //   },
  //   skip: partnerSkip
  // })

  useEffect(() => {
    if(!loading && !!data) {
      console.log('finding beras', data)
      findBeras(data)
      setSkip(true)
      setInfoLoading(false)
    }
  }, [data, loading])

  // useEffect(() => {
  //   if(!partnerLoading && !!partnerData) {
  //     console.log('finding partners', partnerData)
  //     findPartners(partnerData)
  //     setPartnerSkip(true)
  //     setInfoLoading(false)
  //   }
  // }, [partnerData, partnerLoading])

  useEffect(() => {
    findBoost()
  }, [wallet, isConnected])

  return null
}