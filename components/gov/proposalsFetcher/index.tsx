"use client"

import { useState, useEffect } from "react"
import { useGoldiGovProposalsQuery } from "../../../src/graphql/generated/queries"
import { useGov } from "../../../providers"

export const ProposalsFetcher = () => {

  const [skip, setSkip] = useState<boolean>(false)

  const { refreshProposals } = useGov()

  const { data, loading } = useGoldiGovProposalsQuery({
    variables: {},
    skip
  })

  useEffect(() => {
    if(!loading && !!data) {
      refreshProposals(data)
      setSkip(true)
    }
  }, [data, loading])

  return null
}