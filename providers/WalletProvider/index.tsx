"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useAccount } from "wagmi"
import { readContract } from "@wagmi/core"
import { WalletInitialState, BalanceState } from "../../utils/interfaces"

const INITIAL_STATE: WalletInitialState = {
  balance: {
    locks: 0,
    prg: 0,
    honey: 0,
    staked: 0,
    claimable: 0,
    locked: 0,
    borrowed: 0
  },
  wallet: '',
  isConnected: false,
  network: '',
  refreshBalances: async () => {}
}

const WalletContext = createContext(INITIAL_STATE)

export const WalletProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { address, isConnected, chain } = useAccount()

  const [balanceState, setBalanceState] = useState<BalanceState>(INITIAL_STATE.balance)

  const refreshBalances = async () => {
    // if(address) {
    //   const locksBalance = await gammContract.read.balanceOf([address])
    //   const porridgeBalance = await porridgeContract.read.balanceOf([address])
    //   const honeyBalance = await honeyContract.read.balanceOf([address])
    //   const staked = await porridgeContract.read.getStaked([address])
    //   const claimable = await porridgeContract.read.getClaimable([address])
    //   const locked = await borrowContract.read.getLocked([address])
    //   const borrowed = await borrowContract.read.getBorrowed([address])

    //   const response = {
    //     locks: parseFloat(formatEther(locksBalance as unknown as bigint)),
    //     prg: parseFloat(formatEther(porridgeBalance as unknown as bigint)),
    //     honey: parseFloat(formatEther(honeyBalance as unknown as bigint)),
    //     staked: parseFloat(formatEther(staked as unknown as bigint)), 
    //     claimable: parseFloat(formatEther(claimable as unknown as bigint)),
    //     locked: parseFloat(formatEther(locked as unknown as bigint)),
    //     borrowed: parseFloat(formatEther(borrowed as unknown as bigint))
    //   }

    //   setBalanceState(response)
    // }
  }

  return (
    <WalletContext.Provider
      value={{
        balance: balanceState,
        wallet: address ? address : '',
        isConnected,
        network: chain?.name ? chain.name : '',
        refreshBalances
      }}
    >
      { children }
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)