"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { readContract } from "@wagmi/core"
import { formatEther } from "viem"
import { useAccount } from "wagmi"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

const INITIAL_STATE = {

  goldivaultInfo: {
    honeyWberaLP: 0,
    honeyWberaLPAllowance: 0
  },
  refreshGoldivaultInfo: async () => {}
}

const GoldivaultContext = createContext(INITIAL_STATE)

export const GoldivaultProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { address, isConnected, chain } = useAccount()

  const [goldivaultInfoState, setGoldivaultInfoState] = useState(INITIAL_STATE.goldivaultInfo)

  const refreshGoldivaultInfo = async () => {
    if(address) {
      const honeywberalpBalResult = await readContract(config, {
        address: contracts.honeywberaLP.address as `0x${string}`,
        abi: contracts.honeywberaLP.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const honeyWberaLPAllResult = await readContract(config, {
        address: contracts.honeywberaLP.address as `0x${string}`,
        abi: contracts.honeywberaLP.abi,
        functionName: 'allowance',
        args: [address, contracts.goldivault.address]
      })

      const response = {
        honeyWberaLP: parseFloat(formatEther(honeywberalpBalResult as unknown as bigint)),
        honeyWberaLPAllowance: parseFloat(formatEther(honeyWberaLPAllResult as unknown as bigint))
      }

      setGoldivaultInfoState(response)
    }
  }

  return (
    <GoldivaultContext.Provider
      value={{
        goldivaultInfo: goldivaultInfoState,
        refreshGoldivaultInfo
      }}
    >
      { children }
    </GoldivaultContext.Provider>
  )
}

export const useGoldivault = () => useContext(GoldivaultContext)