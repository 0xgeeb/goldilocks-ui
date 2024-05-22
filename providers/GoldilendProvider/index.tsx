"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useWallet } from "../../providers"

const INITIAL_STATE = {

  refreshGoldilendInfo: async () => {},

  infoLoading: true,
  setInfoLoading: (_loading: boolean) => {},
}

const GoldilendContext = createContext(INITIAL_STATE)

export const GoldilendProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet, isConnected } = useWallet()

  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)

  const refreshGoldilendInfo = async () => {

  }

  return (
    <GoldilendContext.Provider
      value={{
        infoLoading: infoLoadingState,
        setInfoLoading: setInfoLoadingState,
        refreshGoldilendInfo
      }}
    >
      { children }
    </GoldilendContext.Provider>
  )
}

export const useGoldilend = () => useContext(GoldilendContext)