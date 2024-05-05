"use client"

import { PropsWithChildren, createContext, useContext, useState } from "react"
import { readContract } from "@wagmi/core"
import { formatEther } from "viem"
import { useDebounce, useGoldiswapMath } from "../../hooks"
import { useWallet } from "../../providers"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

const INITIAL_STATE = {

  borrowInfo: {
    fsl: 0,
    psl: 0,
    supply: 0,
    honeyBorrowAllowance: 0
  },

  activeToggle: 'borrow',
  changeActiveToggle: (_toggle: string) => {},

  borrowPopupToggle: false,
  setBorrowPopupToggle: (_bool: boolean) => {},

  chartOpen: false,
  setChartOpen: (_chart: boolean) => {},

  infoLoading: true,
  setInfoLoading: (_loading: boolean) => {},

  refreshBorrowInfo: async () => {}
}

const BorrowContext = createContext(INITIAL_STATE)

export const BorrowProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet, isConnected } = useWallet()

  const [borrowInfoState, setBorrowInfoState] = useState(INITIAL_STATE.borrowInfo)
  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)

  const [borrowPopupToggleState, setBorrowPopupToggleState] = useState<boolean>(INITIAL_STATE.borrowPopupToggle)

  const [chartOpenState, setChartOpenState] = useState<boolean>(INITIAL_STATE.chartOpen)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)

  const changeActiveToggle = (toggle: string) => {
    // setDisplayStringState('')
    // setBorrowState(0)
    // setRepayState(0)
    setActiveToggleState(toggle)
    // setAllowanceButtonsState(false)
  }

  const refreshBorrowInfo = async () => {
    const fslResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: 'fsl',
    })
    const pslResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: 'psl',
    })
    const supplyResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: 'supply',
    })
    let honeyBorrowAllowanceResult
    if(wallet) {
      honeyBorrowAllowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [wallet, contracts.borrow.address]
      })
    }

    const response = {
      fsl: parseFloat(formatEther(fslResult as unknown as bigint)),
      psl: parseFloat(formatEther(pslResult as unknown as bigint)),
      supply: parseFloat(formatEther(supplyResult as unknown as bigint)),
      honeyBorrowAllowance: wallet ? parseFloat(formatEther(honeyBorrowAllowanceResult as unknown as bigint)) : 0
    }

    setBorrowInfoState(response)
  }

  return (
    <BorrowContext.Provider
      value={{
        borrowInfo: borrowInfoState,
        activeToggle: activeToggleState,
        changeActiveToggle,
        chartOpen: chartOpenState,
        setChartOpen: setChartOpenState,
        infoLoading: infoLoadingState,
        setInfoLoading: setInfoLoadingState,
        refreshBorrowInfo,
        borrowPopupToggle: borrowPopupToggleState,
        setBorrowPopupToggle: setBorrowPopupToggleState
      }}
    >
      { children }
    </BorrowContext.Provider>
  )
}

export const useBorrow = () => useContext(BorrowContext)