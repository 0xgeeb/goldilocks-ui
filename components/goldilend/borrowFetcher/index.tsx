"use client"

import { useState, useEffect } from "react"
import { useGoldilendNfTsOwnedQuery } from "../../../src/graphql/generated/queries"
import { useWallet, useGoldilend } from "../../../providers"

export const BorrowFetcher = () => {

  const [skip, setSkip] = useState<boolean>(false)

  const {
    findBeras,
    findPartners,
    findBoost,
    setInfoLoading
  } = useGoldilend()

  const { wallet, isConnected } = useWallet()
  
  const { data, loading } = useGoldilendNfTsOwnedQuery({
    variables: {
      owner: wallet
    },
    skip
  })

  useEffect(() => {
    if(!loading && !!data) {
      findBeras(data)
      findPartners(data)
      setSkip(true)
      setInfoLoading(false)
    }
  }, [data, loading])

  useEffect(() => {
    findBoost()
  }, [wallet, isConnected])

  return null
}