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

  borrow: 0,
  repay: 0,
  setBorrow: (_borrow: number) => {},
  setRepay: (_repay: number) => {},

  displayString: '',
  setDisplayString: (_displayString: string) => {},

  activeToggle: 'borrow',
  changeActiveToggle: (_toggle: string) => {},

  borrowPopupToggle: false,
  setBorrowPopupToggle: (_bool: boolean) => {},

  chartOpen: false,
  setChartOpen: (_chart: boolean) => {},

  infoLoading: true,
  setInfoLoading: (_loading: boolean) => {},

  handlePercentageButtons: (_action: number) => {},
  flipTokens: () => {},
  handleChange: (_input: string) => {},
  handleBalance: () => '',

  refreshBorrowInfo: async () => {}
}

const BorrowContext = createContext(INITIAL_STATE)

export const BorrowProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet, isConnected } = useWallet()

  const [borrowInfoState, setBorrowInfoState] = useState(INITIAL_STATE.borrowInfo)
  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)

  const [displayStringState, setDisplayStringState] = useState<string>(INITIAL_STATE.displayString)

  const [borrowState, setBorrowState] = useState<number>(INITIAL_STATE.borrow)
  const [repayState, setRepayState] = useState<number>(INITIAL_STATE.repay)

  const [borrowPopupToggleState, setBorrowPopupToggleState] = useState<boolean>(INITIAL_STATE.borrowPopupToggle)

  const [chartOpenState, setChartOpenState] = useState<boolean>(INITIAL_STATE.chartOpen)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)

  const changeActiveToggle = (toggle: string) => {
    setDisplayStringState('')
    setBorrowState(0)
    setRepayState(0)
    setActiveToggleState(toggle)
    // setAllowanceButtonsState(false)
  }

  const flipTokens = () => {
    setDisplayStringState('')
    setBorrowState(0)
    setRepayState(0)
    if(activeToggleState === 'borrow') {
      setActiveToggleState('repay')
    }
    else if(activeToggleState === 'repay') {
      setActiveToggleState('borrow')
    }
  }

  const handlePercentageButtons = (action: number) => {
    const borrowTemp = (balance.staked - balance.locked) * (borrowInfoState.fsl / borrowInfoState.supply)
    if(action == 1) {
      if(activeToggleState === 'borrow') {
        setDisplayStringState((borrowTemp / 4).toFixed(2))
        setBorrowState(borrowTemp / 4)
      }
      if(activeToggleState === 'repay') {
        setDisplayStringState((balance.borrowed / 4).toFixed(2))
        setRepayState(balance.borrowed / 4)
      }
    }
    if(action == 2) {
      if(activeToggleState === 'borrow') {
        setDisplayStringState((borrowTemp / 2).toFixed(2))
        setBorrowState(borrowTemp / 2)
      }
      if(activeToggleState === 'repay') {
        setDisplayStringState((balance.borrowed / 2).toFixed(2))
        setRepayState(balance.borrowed / 2)
      }
    }
    if(action == 3) {
      if(activeToggleState === 'borrow') {
        setDisplayStringState((borrowTemp * 0.75).toFixed(2))
        setBorrowState(borrowTemp * 0.75)
      }
      if(activeToggleState === 'repay') {
        setDisplayStringState((balance.borrowed * 0.75).toFixed(2))
        setRepayState(balance.borrowed * 0.75)
      }
    }
    if(action == 4) {
      if(activeToggleState === 'borrow') {
        setDisplayStringState(borrowTemp.toFixed(2))
        setBorrowState(borrowTemp - 0.0001)
      }
      if(activeToggleState === 'repay') {
        setDisplayStringState(balance.borrowed.toFixed(2))
        setRepayState(balance.borrowed)
      }
    }
  }

  const handleChange = (input: string) => {
    setDisplayStringState(input)
    if(activeToggleState === 'borrow') {
      !input ? setBorrowState(0) : setBorrowState(parseFloat(input))
    }
    if(activeToggleState === 'repay') {
      !input ? setRepayState(0) : setRepayState(parseFloat(input))
      // !input && setAllowanceButtonsState(false)
    }
  }

  const handleBalance = (): string => {
    if(activeToggleState === 'borrow') {
      const borrowTemp = (balance.staked - balance.locked) * (borrowInfoState.fsl / borrowInfoState.supply)
      return borrowTemp > 0 ? borrowTemp.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
    if(activeToggleState === 'repay') {
      return balance.borrowed > 0 ? balance.borrowed.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }

    return ''
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
        setBorrowPopupToggle: setBorrowPopupToggleState,
        handlePercentageButtons,
        borrow: borrowState,
        repay: repayState,
        setBorrow: setBorrowState,
        setRepay: setRepayState,
        displayString: displayStringState,
        setDisplayString: setDisplayStringState,
        flipTokens,
        handleChange,
        handleBalance
      }}
    >
      { children }
    </BorrowContext.Provider>
  )
}

export const useBorrow = () => useContext(BorrowContext)