"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useDebounce, useGoldiswapMath } from "../../hooks"

const INITIAL_STATE = {
  goldiswapInfo: {
    fsl: 0,
    psl: 0,
    supply: 0,
    targetRatio: 0,
    lastFloorRaise: 0,
    honeyAmmAllowance: 0
  },
  honeyBuy: 0,
  sellingLocks: 0,
  redeemingLocks: 0,

  debouncedHoneyBuy: 0,

  displayString: '',
  bottomDisplayString: '',

  setHoneyBuy: (_honeyBuy: number) => {},
  setSellingLocks: (_sellingLocks: number) => {},
  setRedeemingLocks: (_redeemingLocks: number) => {},
  setDisplayString: (_displayString: string) => {},

  activeToggle: 'buy',
  changeActiveToggle: (_toggle: string) => {},

  chartOpen: false,
  setChartOpen: (_chart: boolean) => {},

  handleTopChange: (_input: string) => {}
}

const GoldiswapContext = createContext(INITIAL_STATE)

export const GoldiswapProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { simulateBuyDry, simulateSellDry, floorPrice, marketPrice } = useGoldiswapMath()

  const [goldiswapInfoState, setGoldiswapInfoState] = useState(INITIAL_STATE.goldiswapInfo)

  const [honeyBuyState, setHoneyBuyState] = useState<number>(INITIAL_STATE.honeyBuy)
  const debouncedHoneyBuyState = useDebounce(honeyBuyState, 1000)
  const [sellingLocksState, setSellingLocksState] = useState<number>(INITIAL_STATE.sellingLocks)
  const [redeemingLocksState, setRedeemingLocksState] = useState<number>(INITIAL_STATE.redeemingLocks)

  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)
  const [displayStringState, setDisplayStringState] = useState<string>(INITIAL_STATE.displayString)
  const [bottomDisplayStringState, setBottomDisplayStringState] = useState<string>(INITIAL_STATE.bottomDisplayString)

  const [chartOpenState, setChartOpenState] = useState<boolean>(INITIAL_STATE.chartOpen)

  const changeActiveToggle = (toggle: string) => {
    setDisplayStringState('')
    setBottomDisplayStringState('')
    setHoneyBuyState(0)
    setSellingLocksState(0)
    setRedeemingLocksState(0)
    setActiveToggleState(toggle)
  }

  const handleTopChange = (input: string) => {
    if(activeToggleState === 'buy') {
      if(parseFloat(input) > 2000000) {
        input = ""
      }
      !input ? setHoneyBuyState(0) : setHoneyBuyState(parseFloat(input))
    }
    else if(activeToggleState === 'sell') {
      !input ? setSellingLocksState(0) : setSellingLocksState(parseFloat(input))
    }
    else {
      !input ? setRedeemingLocksState(0) : setRedeemingLocksState(parseFloat(input))
    }
    setDisplayStringState(input)
  }

  const simulateBuy = (amt: number) => {
    let _leftover = amt
    let _fsl = goldiswapInfoState.fsl
    let _psl = goldiswapInfoState.psl
    let _supply = goldiswapInfoState.supply
    let _purchasePrice = 0
    let _tax = 0
    let _market = 0
    let _floor = 0
    while(_leftover >= 1000) {
      _market = marketPrice(_fsl, _psl, _supply)
      _floor = floorPrice(_fsl, _supply)
      _purchasePrice += _market*1000
      _supply += 1000
      if(_psl / _fsl >= 0.50) {
        _fsl += _market*1000
      }
      else {
        _fsl += _floor*1000
        _psl += (_market - _floor)*1000
      }
      _leftover -= 1000
    }
    if(_leftover > 0) {
      _market = marketPrice(_fsl, _psl, _supply)
      _floor = floorPrice(_fsl, _supply)
      _purchasePrice += _market * _leftover
      _supply += _leftover
      if(_psl / _fsl >= 0.50) {
        _fsl += _market * _leftover
      }
      else {
        _psl += (_market - _floor) * _leftover
        _fsl += _floor * _leftover
      }
    }
    _tax = _purchasePrice * 0.003

    const response = {
      fsl: _fsl,
      psl: _psl,
      floor: floorPrice(_fsl + _tax, _supply),
      market: marketPrice(_fsl + _tax, _psl, _supply),
      supply: _supply,
      targetRatio: goldiswapInfoState.targetRatio,
      lastFloorRaise: goldiswapInfoState.lastFloorRaise
    }
    
    // setNewInfoState(response)
    // simulateFloorRaise(_fsl + _tax, _psl, _supply)
  }
  
  return (
    <GoldiswapContext.Provider
      value={{
        goldiswapInfo: goldiswapInfoState,
        honeyBuy: honeyBuyState,
        debouncedHoneyBuy: debouncedHoneyBuyState,
        sellingLocks: sellingLocksState,
        redeemingLocks: redeemingLocksState,
        displayString: displayStringState,
        bottomDisplayString: bottomDisplayStringState,
        setHoneyBuy: setHoneyBuyState,
        setSellingLocks: setSellingLocksState,
        setRedeemingLocks: setRedeemingLocksState,
        setDisplayString: setDisplayStringState,
        activeToggle: activeToggleState,
        changeActiveToggle,
        chartOpen: chartOpenState,
        setChartOpen: setChartOpenState,
        handleTopChange
      }}
    >
      { children }
    </GoldiswapContext.Provider>
  )
}

export const useGoldiswap = () => useContext(GoldiswapContext)