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
    findLoans,
    setInfoLoading,
    getGoldilendBorrowInfo
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
    findLoans()
    getGoldilendBorrowInfo()
  }, [wallet, isConnected])

  return null
}