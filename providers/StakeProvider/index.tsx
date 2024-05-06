"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { readContract } from "@wagmi/core"
import { formatEther } from "viem"
import { useWallet } from "../../providers"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

const INITIAL_STATE = {

  stakeInfo: {
    fsl: 0,
    psl: 0,
    supply: 0,
    locksPrgAllowance: 0,
    honeyPrgAllowance: 0
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

  stake: 0,
  unstake: 0,
  stir: 0,

  setStake: (_stake: number) => {},
  setUnstake: (_unstake: number) => {},
  setStir: (_realize: number) => {},

  displayString: '',
  setDisplayString: (_displayString: string) => {},

  activeToggle: 'STAKE',
  changeActiveToggle: (_toggle: string) => {},

  infoLoading: true,
  setInfoLoading: (_loading: boolean) => {},

  chartOpen: false,
  setChartOpen: (_chart: boolean) => {},

  stirPopupToggle: false,
  setStirPopupToggle: (_bool: boolean) => {},

  allowanceButtons: false,
  setAllowanceButtons: (_bool: boolean) => {},
  updateAllowance: (_token: string, _newAllowance: number) => {},

  handleBalance: () => '',
  handleBalanceLabel: () => '',
  handlePercentageButtons: (_action: number) => {},
  handleChange: (_input: string) => {},

  refreshStakeInfo: async () => {},

  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {}
}

const StakeContext = createContext(INITIAL_STATE)

export const StakeProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet } = useWallet()

  const [stakeInfoState, setStakeInfoState] = useState(INITIAL_STATE.stakeInfo)
  const [notificationState, setNotificationState] = useState(INITIAL_STATE.notification)

  const [stakeState, setStakeState] = useState<number>(INITIAL_STATE.stake)
  const [unstakeState, setUnstakeState] = useState<number>(INITIAL_STATE.unstake)
  const [stirState, setStirState] = useState<number>(INITIAL_STATE.stir)

  const [displayStringState, setDisplayStringState] = useState<string>(INITIAL_STATE.displayString)

  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)
  
  const [stirPopupToggleState, setStirPopupToggleState] = useState<boolean>(INITIAL_STATE.stirPopupToggle)

  const [chartOpenState, setChartOpenState] = useState<boolean>(INITIAL_STATE.chartOpen)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(INITIAL_STATE.txConfirming)

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(INITIAL_STATE.allowanceButtons)

  const changeActiveToggle = (toggle: string) => {
    setDisplayStringState('')
    setStakeState(0)
    setUnstakeState(0)
    setStirState(0)
    setActiveToggleState(toggle)
    setAllowanceButtonsState(false)
  }

  const handlePercentageButtons = (action: number) => {
    if(action == 1) {
      if(activeToggleState === 'STAKE') {
        setDisplayStringState((balance.locks / 4).toFixed(4))
        setStakeState(balance.locks / 4)
      }
      if(activeToggleState === 'UNSTAKE') {
        setDisplayStringState((balance.staked / 4).toFixed(4))
        setUnstakeState(balance.staked / 4)
      }
      if(activeToggleState === 'realize') {
        setDisplayStringState((balance.prg / 4).toFixed(4))
        setStirState(balance.prg / 4)
      }
    }
    if(action == 2) {
      if(activeToggleState === 'STAKE') {
        setDisplayStringState((balance.locks / 2).toFixed(4))
        setStakeState(balance.locks / 2)
      }
      if(activeToggleState === 'UNSTAKE') {
        setDisplayStringState((balance.staked / 2).toFixed(4))
        setUnstakeState(balance.staked / 2)
      }
      if(activeToggleState === 'STIR') {
        setDisplayStringState((balance.prg / 2).toFixed(4))
        setStirState(balance.prg / 2)
      }
    }
    if(action == 3) {
      if(activeToggleState === 'STAKE') {
        setDisplayStringState((balance.locks * 0.75).toFixed(4))
        setStakeState(balance.locks * 0.75)
      }
      if(activeToggleState === 'UNSTAKE') {
        setDisplayStringState((balance.staked * 0.75).toFixed(4))
        setUnstakeState(balance.staked * 0.75)
      }
      if(activeToggleState === 'STIR') {
        setDisplayStringState((balance.prg * 0.75).toFixed(4))
        setStirState(balance.prg * 0.75)
      }
    }
    if(action == 4) {
      if(activeToggleState === 'STAKE') {
        setDisplayStringState(balance.locks.toFixed(4))
        setStakeState(balance.locks - 0.0001)
      }
      if(activeToggleState === 'UNSTAKE') {
        setDisplayStringState(balance.staked.toFixed(4))
        setUnstakeState(balance.staked - 0.0001)
      }
      if(activeToggleState === 'STIR') {
        setDisplayStringState(balance.prg.toFixed(4))
        setStirState(balance.prg - 0.0001)
      }
    }
  }

  const handleChange = (input: string) => {
    setDisplayStringState(input)
    if(activeToggleState === "STAKE") {
      !input ? setStakeState(0) : setStakeState(parseFloat(input))
      !input && setAllowanceButtonsState(false)
    }
    if(activeToggleState === "UNSTAKE") {
      !input ? setUnstakeState(0) : setUnstakeState(parseFloat(input))
    }
    if(activeToggleState === "STIR") {
      !input ? setStirState(0) : setStirState(parseFloat(input))
      !input && setAllowanceButtonsState(false)
    }
  }

  const handleBalance = (): string => {
    if(activeToggleState === "STAKE") {
      return balance.locks > 0 ? balance.locks.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
    if(activeToggleState === "UNSTAKE") {
      return balance.staked > 0 ? balance.staked.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
    if(activeToggleState === "STIR") {
      return balance.prg > 0 ? balance.prg.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
    if(activeToggleState === "CLAIM") {
      return balance.claimable > 0 ? balance.claimable.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }

    return ''
  }

  const handleBalanceLabel = (): string => {
    if(activeToggleState === "STAKE") {
      return 'balance'
    }
    if(activeToggleState === "UNSTAKE") {
      return 'staked locks'
    }
    if(activeToggleState === "STIR") {
      return 'balance'
    }
    if(activeToggleState === "CLAIM") {
      return 'claimable porridge'
    }

    return ''
  }

  const refreshStakeInfo = async () => {
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
    let locksPrgAllowanceResult
    let honeyPrgAllowanceResult
    if(wallet) {
      locksPrgAllowanceResult = await readContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.goldiswap.abi,
        functionName: 'allowance',
        args: [wallet, contracts.porridge.address]
      })
      honeyPrgAllowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [wallet, contracts.porridge.address]
      })
    }

    const response = {
      fsl: parseFloat(formatEther(fslResult as unknown as bigint)),
      psl: parseFloat(formatEther(pslResult as unknown as bigint)),
      supply: parseFloat(formatEther(supplyResult as unknown as bigint)),
      locksPrgAllowance: wallet ? parseFloat(formatEther(locksPrgAllowanceResult as unknown as bigint)) : 0,
      honeyPrgAllowance: wallet ? parseFloat(formatEther(honeyPrgAllowanceResult as unknown as bigint)) : 0
    }

    setStakeInfoState(response)
  }

  const openNotification = (toggle: boolean, action: string, result: string, hash: string) => {
    setNotificationState(prevState => ({
      toggle,
      action,
      result,
      hash
    }))
  }

  const updateAllowance = (token: string, newAllowance: number) => {
    if(token === 'locks') {
      setStakeInfoState(prevState => ({
        ...prevState,
        locksPrgAllowance: newAllowance
      }))
    }
    else {
      setStakeInfoState(prevState => ({
        ...prevState,
        honeyPrgAllowance: newAllowance
      }))
    }
  }

  return (
    <StakeContext.Provider
      value={{
        stake: stakeState,
        unstake: unstakeState,
        stir: stirState,
        setStake: setStakeState,
        setUnstake: setUnstakeState,
        setStir: setStirState,
        displayString: displayStringState,
        setDisplayString: setDisplayStringState,
        stakeInfo: stakeInfoState,
        infoLoading: infoLoadingState,
        setInfoLoading: setInfoLoadingState,
        refreshStakeInfo,
        chartOpen: chartOpenState,
        setChartOpen: setChartOpenState,
        stirPopupToggle: stirPopupToggleState,
        setStirPopupToggle: setStirPopupToggleState,
        activeToggle: activeToggleState,
        changeActiveToggle,
        txConfirming: txConfirmingState,
        setTxConfirming: setTxConfirmingState,
        notification: notificationState,
        openNotification,
        handlePercentageButtons,
        handleChange,
        handleBalance,
        handleBalanceLabel,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
        updateAllowance
      }}
    >
      { children }
    </StakeContext.Provider>
  )
}

export const useStake = () => useContext(StakeContext)