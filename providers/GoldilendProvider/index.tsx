"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useWallet } from "../../providers"

const INITIAL_STATE = {

  activeToggle: 'BORROW',
  changeActiveToggle: (_toggle: string) => {},

  lendActiveToggle: 'LOCK',
  changeLendActiveToggle: (_toggle: string) => {},

  refreshGoldilendInfo: async () => {},

  infoLoading: true,
  setInfoLoading: (_loading: boolean) => {},
}

const GoldilendContext = createContext(INITIAL_STATE)

export const GoldilendProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet, isConnected } = useWallet()

  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)
  const [lendActiveToggleState, setLendActiveToggleState] = useState<string>(INITIAL_STATE.lendActiveToggle)

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
        infoLoading: infoLoadingState,
        setInfoLoading: setInfoLoadingState,
        refreshGoldilendInfo,
        activeToggle: activeToggleState,
        changeActiveToggle,
        lendActiveToggle: lendActiveToggleState,
        changeLendActiveToggle
      }}
    >
      { children }
    </GoldilendContext.Provider>
  )
}

export const useGoldilend = () => useContext(GoldilendContext)