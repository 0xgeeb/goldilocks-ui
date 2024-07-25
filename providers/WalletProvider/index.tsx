"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useAccount } from "wagmi"
import { formatEther } from "viem"
import { readContract } from "@wagmi/core"
import { WalletInitialState, BalanceState } from "../../utils/interfaces"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

const INITIAL_STATE: WalletInitialState = {
  balance: {
    locks: 0,
    prg: 0,
    honey: 0,
    staked: 0,
    claimable: 0,
    locked: 0,
    borrowed: 0,
    ibgt: 0,
    gibgt: 0,
    lendStaked: 0,
    lendClaimable: 0,
    locksPrgAllowance: 0,
    honeyPrgAllowance: 0,
    honeyBorrowAllowance: 0,
    honeySwapAllowance: 0
  },
  wallet: '',
  isConnected: false,
  network: '',
  refreshBalances: async () => {},
  balancesLoading: true
}

const WalletContext = createContext(INITIAL_STATE)

export const WalletProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { address, isConnected, chain } = useAccount()

  const [balanceState, setBalanceState] = useState<BalanceState>(INITIAL_STATE.balance)
  const [balancesLoadingState, setBalancesLoadingState] = useState<boolean>(INITIAL_STATE.balancesLoading)

  const refreshBalances = async () => {
    if(address) {
      const locksBalance = await readContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.goldiswap.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const porridgeBalance = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const honeyBalance = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const stakedBalance = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: 'userStakedLocks',
        args: [address]
      })
      const claimableBalance = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: 'userClaimablePrg',
        args: [address]
      })
      const lockedBalance = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: 'userLockedLocks',
        args: [address]
      })
      const borrowedBalance = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: 'userBorrowedHoney',
        args: [address]
      })
      const ibgtResult = await readContract(config, {
        address: contracts.ibgt.address as `0x${string}`,
        abi: contracts.ibgt.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const gibgtResult = await readContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const stakedResult = await readContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: 'stakedGiBGT',
        args: [address]
      })
      const claimableResult = await readContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: 'userClaimablePrg',
        args: [address]
      })
      const locksPrgAllowanceResult = await readContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.goldiswap.abi,
        functionName: 'allowance',
        args: [address, contracts.goldilocked.address]
      })
      const honeyPrgAllowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [address, contracts.goldilocked.address]
      })
      const honeyBorrowAllowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [address, contracts.goldilocked.address]
      })
      const honeySwapAllowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [address, contracts.goldiswap.address]
      })

      const response = {
        locks: parseFloat(formatEther(locksBalance as unknown as bigint)),
        prg: parseFloat(formatEther(porridgeBalance as unknown as bigint)),
        honey: parseFloat(formatEther(honeyBalance as unknown as bigint)),
        staked: parseFloat(formatEther(stakedBalance as unknown as bigint)), 
        claimable: parseFloat(formatEther(claimableBalance as unknown as bigint)),
        locked: parseFloat(formatEther(lockedBalance as unknown as bigint)),
        borrowed: parseFloat(formatEther(borrowedBalance as unknown as bigint)),
        ibgt: parseFloat(formatEther(ibgtResult as unknown as bigint)),
        gibgt: parseFloat(formatEther(gibgtResult as unknown as bigint)),
        lendStaked: parseFloat(formatEther(stakedResult as unknown as bigint)),
        lendClaimable: parseFloat(formatEther(claimableResult as unknown as bigint)),
        locksPrgAllowance: parseFloat(formatEther(locksPrgAllowanceResult as unknown as bigint)),
        honeyPrgAllowance: parseFloat(formatEther(honeyPrgAllowanceResult as unknown as bigint)),
        honeyBorrowAllowance: parseFloat(formatEther(honeyBorrowAllowanceResult as unknown as bigint)),
        honeySwapAllowance: parseFloat(formatEther(honeySwapAllowanceResult as unknown as bigint))
      }

      setBalanceState(response)
    }
    setBalancesLoadingState(false)
  }

  return (
    <WalletContext.Provider
      value={{
        balance: balanceState,
        wallet: address ? address : '',
        isConnected,
        network: chain?.name ? chain.name : '',
        refreshBalances,
        balancesLoading: balancesLoadingState
      }}
    >
      { children }
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)