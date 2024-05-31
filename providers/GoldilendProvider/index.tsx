"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { readContract } from "@wagmi/core"
import { formatEther } from "viem"
import { useWallet } from "../../providers"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

const INITIAL_STATE = {

  goldilendInfo: {
    ibgt: 0,
    gibgt: 0,
    staked: 0,
    claimable: 0
  },

  lock: 0,
  stake: 0,
  unstake: 0,

  setLock: (_lock: number) => {},
  setStake: (_stake: number) => {},
  setUnstake: (_unstake: number) => {},

  displayString: '',
  setDisplayString: (_displayString: string) => {},

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

  activeToggle: 'BORROW',
  changeActiveToggle: (_toggle: string) => {},

  lendActiveToggle: 'LOCK',
  changeLendActiveToggle: (_toggle: string) => {},

  refreshGoldilendInfo: async () => {},

  infoLoading: true,
  setInfoLoading: (_loading: boolean) => {},

  allowanceButtons: false,
  setAllowanceButtons: (_bool: boolean) => {},

  handlePercentageButtons: (_action: number) => {},

  handleStakeChange: (_input: string, _tab: string) => {},
  handleStakeBalance: (_tab: string) => '',

  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {},
}

const GoldilendContext = createContext(INITIAL_STATE)

export const GoldilendProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet, isConnected } = useWallet()

  const [goldilendInfoState, setGoldilendInfoState] = useState(INITIAL_STATE.goldilendInfo)
  const [notificationState, setNotificationState] = useState(INITIAL_STATE.notification)
  
  const [displayStringState, setDisplayStringState] = useState(INITIAL_STATE.displayString)
  const [lockState, setLockState] = useState<number>(INITIAL_STATE.lock)
  const [stakeState, setStakeState] = useState<number>(INITIAL_STATE.stake)
  const [unstakeState, setUnstakeState] = useState<number>(INITIAL_STATE.unstake)

  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)
  const [lendActiveToggleState, setLendActiveToggleState] = useState<string>(INITIAL_STATE.lendActiveToggle)

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(INITIAL_STATE.allowanceButtons)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(INITIAL_STATE.txConfirming)

  const changeActiveToggle = (toggle: string) => {
    setDisplayStringState('')
    setLockState(0)
    setStakeState(0)
    setUnstakeState(0)
    setActiveToggleState(toggle)
  }

  const changeLendActiveToggle = (toggle: string) => {
    setLendActiveToggleState(toggle)
  }

  const handlePercentageButtons = (action: number) => {
    if(!isConnected) return
    if(action == 1) {
      if(lendActiveToggleState === 'LOCK') {
        setDisplayStringState((balance.ibgt / 4).toFixed(4))
        setLockState(balance.ibgt / 4)
      }
      if(lendActiveToggleState === 'STAKE') {
        setDisplayStringState((balance.gibgt / 4).toFixed(4))
        setStakeState(balance.gibgt / 4)
      }
      if(lendActiveToggleState === 'UNSTAKE') {
        setDisplayStringState((balance.lendStaked / 4).toFixed(4))
        setUnstakeState(balance.lendStaked / 4)
      }
    }
    if(action == 2) {
      if(lendActiveToggleState === 'LOCK') {
        setDisplayStringState((balance.ibgt / 2).toFixed(4))
        setLockState(balance.ibgt / 2)
      }
      if(lendActiveToggleState === 'STAKE') {
        setDisplayStringState((balance.gibgt / 2).toFixed(4))
        setStakeState(balance.gibgt / 2)
      }
      if(lendActiveToggleState === 'UNSTAKE') {
        setDisplayStringState((balance.lendStaked / 2).toFixed(4))
        setUnstakeState(balance.lendStaked / 2)
      }
    }
    if(action == 3) {
      if(lendActiveToggleState === 'LOCK') {
        setDisplayStringState((balance.ibgt * 0.75).toFixed(4))
        setLockState(balance.ibgt * 0.75)
      }
      if(lendActiveToggleState === 'STAKE') {
        setDisplayStringState((balance.gibgt * 0.75).toFixed(4))
        setStakeState(balance.gibgt * 0.75)
      }
      if(lendActiveToggleState === 'UNSTAKE') {
        setDisplayStringState((balance.lendStaked * 0.75).toFixed(4))
        setUnstakeState(balance.lendStaked * 0.75)
      }
    }
    if(action == 4) {
      if(lendActiveToggleState === 'LOCK') {
        setDisplayStringState(balance.ibgt.toFixed(4))
        setLockState(balance.ibgt - 0.0001)
      }
      if(lendActiveToggleState === 'STAKE') {
        setDisplayStringState(balance.gibgt.toFixed(4))
        setStakeState(balance.gibgt - 0.0001)
      }
      if(lendActiveToggleState === 'UNSTAKE') {
        setDisplayStringState(balance.lendStaked.toFixed(4))
        setUnstakeState(balance.lendStaked - 0.0001)
      }
    }
  }

  const handleStakeChange = (input: string, tab: string) => {
    setDisplayStringState(input)
    if(tab === 'LOCK') {
      !input ? setLockState(0) : setLockState(parseFloat(input))
    }
    if(tab === 'STAKE') {
      !input ? setStakeState(0) : setStakeState(parseFloat(input))
    }
    if(tab === 'UNSTAKE') {
      !input ? setUnstakeState(0) : setUnstakeState(parseFloat(input))
    }
  }

  const handleStakeBalance = (tab: string): string => {
    if(tab === 'LOCK') {
      return balance.ibgt > 0 ? balance.ibgt.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
    if(tab === 'STAKE') {
      return balance.gibgt > 0 ? balance.gibgt.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
    if(tab === 'UNSTAKE') {
      return balance.lendStaked > 0 ? balance.lendStaked.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }

    return ''
  }

  const refreshGoldilendInfo = async () => {

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
    <GoldilendContext.Provider
      value={{
        goldilendInfo: goldilendInfoState,
        infoLoading: infoLoadingState,
        displayString: displayStringState,
        setDisplayString: setDisplayStringState,
        setInfoLoading: setInfoLoadingState,
        refreshGoldilendInfo,
        activeToggle: activeToggleState,
        changeActiveToggle,
        lendActiveToggle: lendActiveToggleState,
        changeLendActiveToggle,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
        handlePercentageButtons,
        lock: lockState,
        stake: stakeState,
        unstake: unstakeState,
        setLock: setLockState,
        setStake: setStakeState,
        setUnstake: setUnstakeState,
        handleStakeChange,
        handleStakeBalance,
        txConfirming: txConfirmingState,
        setTxConfirming: setTxConfirmingState,
        notification: notificationState,
        openNotification
      }}
    >
      { children }
    </GoldilendContext.Provider>
  )
}

export const useGoldilend = () => useContext(GoldilendContext)