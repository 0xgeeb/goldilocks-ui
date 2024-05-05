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

  activeToggle: 'STAKE',
  changeActiveToggle: (_toggle: string) => {},

  infoLoading: true,
  setInfoLoading: (_loading: boolean) => {},

  chartOpen: false,
  setChartOpen: (_chart: boolean) => {},

  stirPopupToggle: false,
  setStirPopupToggle: (_bool: boolean) => {},

  refreshStakeInfo: async () => {}
}

const StakeContext = createContext(INITIAL_STATE)

export const StakeProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const [stakeInfoState, setStakeInfoState] = useState(INITIAL_STATE.stakeInfo)

  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)

  const [chartOpenState, setChartOpenState] = useState<boolean>(INITIAL_STATE.chartOpen)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)
  const [stirPopupToggleState, setStirPopupToggleState] = useState<boolean>(INITIAL_STATE.stirPopupToggle)

  const changeActiveToggle = (toggle: string) => {
    // setDisplayStringState('')
    // setStakeState(0)
    // setUnstakeState(0)
    // setStirState(0)
    setActiveToggleState(toggle)
    // setAllowanceButtonsState(false)
  }

  const refreshStakeInfo = async () => {

  }

  return (
    <StakeContext.Provider
      value={{
        stakeInfo: stakeInfoState,
        infoLoading: infoLoadingState,
        setInfoLoading: setInfoLoadingState,
        refreshStakeInfo,
        chartOpen: chartOpenState,
        setChartOpen: setChartOpenState,
        stirPopupToggle: stirPopupToggleState,
        setStirPopupToggle: setStirPopupToggleState,
        activeToggle: activeToggleState,
        changeActiveToggle
      }}
    >
      { children }
    </StakeContext.Provider>
  )
}

export const useStake = () => useContext(StakeContext)