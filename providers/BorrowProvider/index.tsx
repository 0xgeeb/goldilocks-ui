"use client"

import { PropsWithChildren, createContext, useContext, useState } from "react"
import { readContract } from "@wagmi/core"
import { formatEther } from "viem"
import { useWallet } from "../../providers"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

const INITIAL_STATE = {

  borrowInfo: {
    fsl: 0,
    psl: 0,
    supply: 0,
    honeyBorrowAllowance: 0,
    targetRatio: 0
  },

  notification: {
    toggle: false,
    action: '',
    result: '',
    hash: ''
  },
  openNotification: (
    _toggle: boolean,
    _action: string,
    _result: string,
    _hash: string
  ) => {},

  borrow: 0,
  repay: 0,
  setBorrow: (_borrow: number) => {},
  setRepay: (_repay: number) => {},

  displayString: '',
  setDisplayString: (_displayString: string) => {},

  allowanceButtons: false,
  setAllowanceButtons: (_bool: boolean) => {},
  updateAllowance: (_newAllowance: number) => {},

  activeToggle: 'BORROW',
  changeActiveToggle: (_toggle: string) => {},

  borrowPopupToggle: false,
  setBorrowPopupToggle: (_bool: boolean) => {},

  chartOpen: false,
  setChartOpen: (_chart: boolean) => {},

  infoLoading: true,
  setInfoLoading: (_loading: boolean) => {},

  handlePercentageButtons: (_action: number) => {},
  handleChange: (_input: string) => {},
  handleBalance: () => '',

  refreshBorrowInfo: async () => {},
  
  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {},

  balanceMobileToggle: false,
  setBalanceMobileToggle: (_toggle: boolean) => {}
}

const BorrowContext = createContext(INITIAL_STATE)

export const BorrowProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet } = useWallet()

  const [borrowInfoState, setBorrowInfoState] = useState(INITIAL_STATE.borrowInfo)
  const [notificationState, setNotificationState] = useState(INITIAL_STATE.notification)

  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)

  const [displayStringState, setDisplayStringState] = useState<string>(INITIAL_STATE.displayString)

  const [borrowState, setBorrowState] = useState<number>(INITIAL_STATE.borrow)
  const [repayState, setRepayState] = useState<number>(INITIAL_STATE.repay)

  const [borrowPopupToggleState, setBorrowPopupToggleState] = useState<boolean>(INITIAL_STATE.borrowPopupToggle)

  const [chartOpenState, setChartOpenState] = useState<boolean>(INITIAL_STATE.chartOpen)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(INITIAL_STATE.txConfirming)
  const [balanceMobileToggleState, setBalanceMobileToggleState] = useState<boolean>(INITIAL_STATE.balanceMobileToggle)

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(INITIAL_STATE.allowanceButtons)

  const changeActiveToggle = (toggle: string) => {
    setDisplayStringState('')
    setBorrowState(0)
    setRepayState(0)
    setActiveToggleState(toggle)
    setAllowanceButtonsState(false)
  }

  const handlePercentageButtons = (action: number) => {
    const borrowTemp = (balance.staked - balance.locked) * (borrowInfoState.fsl / borrowInfoState.supply)
    if(action == 1) {
      if(activeToggleState === 'BORROW') {
        setDisplayStringState((borrowTemp / 4).toFixed(4))
        setBorrowState(borrowTemp / 4)
      }
      if(activeToggleState === 'REPAY') {
        setDisplayStringState((balance.borrowed / 4).toFixed(4))
        setRepayState(balance.borrowed / 4)
      }
    }
    if(action == 2) {
      if(activeToggleState === 'BORROW') {
        setDisplayStringState((borrowTemp / 2).toFixed(4))
        setBorrowState(borrowTemp / 2)
      }
      if(activeToggleState === 'REPAY') {
        setDisplayStringState((balance.borrowed / 2).toFixed(4))
        setRepayState(balance.borrowed / 2)
      }
    }
    if(action == 3) {
      if(activeToggleState === 'BORROW') {
        setDisplayStringState((borrowTemp * 0.75).toFixed(4))
        setBorrowState(borrowTemp * 0.75)
      }
      if(activeToggleState === 'REPAY') {
        setDisplayStringState((balance.borrowed * 0.75).toFixed(4))
        setRepayState(balance.borrowed * 0.75)
      }
    }
    if(action == 4) {
      if(activeToggleState === 'BORROW') {
        setDisplayStringState(borrowTemp.toFixed(4))
        setBorrowState(borrowTemp - 0.0001)
      }
      if(activeToggleState === 'REPAY') {
        setDisplayStringState(balance.borrowed.toFixed(4))
        setRepayState(balance.borrowed)
      }
    }
  }

  const handleChange = (input: string) => {
    setDisplayStringState(input)
    if(activeToggleState === 'BORROW') {
      !input ? setBorrowState(0) : setBorrowState(parseFloat(input))
    }
    if(activeToggleState === 'REPAY') {
      !input ? setRepayState(0) : setRepayState(parseFloat(input))
      !input && setAllowanceButtonsState(false)
    }
  }

  const handleBalance = (): string => {
    if(activeToggleState === 'BORROW') {
      const borrowTemp = (balance.staked - balance.locked) * (borrowInfoState.fsl / borrowInfoState.supply)
      return borrowTemp > 0 ? borrowTemp.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
    if(activeToggleState === 'REPAY') {
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
      functionName: 'totalSupply',
    })
    const ratioResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: 'targetRatio',
    })
    let honeyBorrowAllowanceResult
    if(wallet) {
      honeyBorrowAllowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [wallet, contracts.goldilocked.address]
      })
    }

    const response = {
      fsl: parseFloat(formatEther(fslResult as unknown as bigint)),
      psl: parseFloat(formatEther(pslResult as unknown as bigint)),
      supply: parseFloat(formatEther(supplyResult as unknown as bigint)),
      honeyBorrowAllowance: wallet ? parseFloat(formatEther(honeyBorrowAllowanceResult as unknown as bigint)) : 0,
      targetRatio: parseFloat(formatEther(ratioResult as unknown as bigint))
    }

    setBorrowInfoState(response)
  }

  const updateAllowance = (newAllowance: number) => {
    setBorrowInfoState(prevState => ({
      ...prevState,
      honeyBorrowAllowance: newAllowance
    }))
  }

  const openNotification = (toggle: boolean, action: string, result: string, hash: string) => {
    setNotificationState(prevState => ({
      toggle,
      action,
      result,
      hash
    }))
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
        handleChange,
        handleBalance,
        txConfirming: txConfirmingState,
        setTxConfirming: setTxConfirmingState,
        notification: notificationState,
        openNotification,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
        updateAllowance,
        balanceMobileToggle: balanceMobileToggleState,
        setBalanceMobileToggle: setBalanceMobileToggleState
      }}
    >
      { children }
    </BorrowContext.Provider>
  )
}

export const useBorrow = () => useContext(BorrowContext)