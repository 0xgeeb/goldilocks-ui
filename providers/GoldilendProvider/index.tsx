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

  activeToggle: 'BORROW',
  changeActiveToggle: (_toggle: string) => {},

  lendActiveToggle: 'LOCK',
  changeLendActiveToggle: (_toggle: string) => {},

  refreshGoldilendInfo: async () => {},

  infoLoading: true,
  setInfoLoading: (_loading: boolean) => {},

  allowanceButtons: false,
  setAllowanceButtons: (_bool: boolean) => {},
}

const GoldilendContext = createContext(INITIAL_STATE)

export const GoldilendProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet, isConnected } = useWallet()

  const [goldilendInfoState, setGoldilendInfoState] = useState(INITIAL_STATE.goldilendInfo)
  
  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)
  const [lendActiveToggleState, setLendActiveToggleState] = useState<string>(INITIAL_STATE.lendActiveToggle)

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(INITIAL_STATE.allowanceButtons)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)

  const changeActiveToggle = (toggle: string) => {
    setActiveToggleState(toggle)
  }

  const changeLendActiveToggle = (toggle: string) => {
    setLendActiveToggleState(toggle)
  }

  const refreshGoldilendInfo = async () => {

  }

  return (
    <GoldilendContext.Provider
      value={{
        goldilendInfo: goldilendInfoState,
        infoLoading: infoLoadingState,
        setInfoLoading: setInfoLoadingState,
        refreshGoldilendInfo,
        activeToggle: activeToggleState,
        changeActiveToggle,
        lendActiveToggle: lendActiveToggleState,
        changeLendActiveToggle,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
      }}
    >
      { children }
    </GoldilendContext.Provider>
  )
}

export const useGoldilend = () => useContext(GoldilendContext)