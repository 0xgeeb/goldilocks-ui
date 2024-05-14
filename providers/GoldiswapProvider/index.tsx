"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { readContract } from "@wagmi/core"
import { formatEther } from "viem"
import { useDebounce, useGoldiswapMath } from "../../hooks"
import { useWallet } from "../../providers"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

const INITIAL_STATE = {
  
  goldiswapInfo: {
    fsl: 0,
    psl: 0,
    supply: 0,
    targetRatio: 0,
    honeySwapAllowance: 0
  },

  simInfo: {
    toggle: false,
    fsl: 0,
    psl: 0,
    supply: 0
  },
  setSimInfo: (
    _toggle: boolean,
    _fsl: number,
    _psl: number,
    _supply: number
  ) => {},

  slippage: {
    amount: 0.5,
    toggle: false,
    displayString: '0.5'
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

  honeyBuy: 0,
  sellingLocks: 0,
  redeemingLocks: 0,

  buyingLocks: 0,
  gettingHoney: 0,
  redeemingHoney: 0,
  
  debouncedHoneyBuy: 0,
  debouncedGettingHoney: 0,
  
  displayString: '',
  bottomDisplayString: '',

  allowanceButtons: false,
  setAllowanceButtons: (_bool: boolean) => {},
  updateAllowance: (_newAllowance: number) => {},
  
  setHoneyBuy: (_honeyBuy: number) => {},
  setBuyingLocks: (_buyingLocks: number) => {},
  setGettingHoney: (_gettingHoney: number) => {},
  setRedeemingHoney: (_redeemingHoney: number) => {},
  setSellingLocks: (_sellingLocks: number) => {},
  setRedeemingLocks: (_redeemingLocks: number) => {},
  setDisplayString: (_displayString: string) => {},
  setBottomDisplayString: (_displayString: string) => {},

  activeToggle: 'BUY',
  changeActiveToggle: (_toggle: string) => {},

  handlePercentageButtons: (_action: number) => {},
  flipTokens: () => {},

  chartOpen: false,
  setChartOpen: (_chart: boolean) => {},

  topInputFlag: false,
  bottomInputFlag: false,
  setTopInputFlag: (_bool: boolean) => {},
  setBottomInputFlag: (_bool: boolean) => {},

  changeSlippage: (_amount: number, _displayString: string) => {},
  changeSlippageToggle: (_toggle: boolean) => {},
  checkSlippageAmount: () => {},

  redeemPopupToggle: false,
  setRedeemPopupToggle: (_bool: boolean) => {},

  simulateBuy: (_amt: number) => {},
  simulateSell: (_amt: number) => {},
  simulateRedeem: (_amt: number) => {},

  findLocksBuyAmount: (_debouncedValue: number) => 0,
  findLocksSellAmount: (_debouncedValue: number) => 0,

  handleTopBalance: (): string => "0.00",
  handleBottomBalance: (): string => "0.00",

  handleTopChange: (_input: string) => {},
  handleBottomChange: (_input: string) => {},

  refreshGoldiswapInfo: async() => {},

  infoLoading: true,
  setInfoLoading: (_loading: boolean) => {},

  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {},

  balanceMobileToggle: false,
  setBalanceMobileToggle: (_toggle: boolean) => {}
}

const GoldiswapContext = createContext(INITIAL_STATE)

export const GoldiswapProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet, isConnected } = useWallet()

  const { simulateBuyDry, simulateSellDry, floorPrice, marketPrice } = useGoldiswapMath()

  const [goldiswapInfoState, setGoldiswapInfoState] = useState(INITIAL_STATE.goldiswapInfo)
  const [slippageState, setSlippageState] = useState(INITIAL_STATE.slippage)
  const [notificationState, setNotificationState] = useState(INITIAL_STATE.notification)

  const [honeyBuyState, setHoneyBuyState] = useState<number>(INITIAL_STATE.honeyBuy)
  const debouncedHoneyBuyState = useDebounce(honeyBuyState, 1000)
  const [sellingLocksState, setSellingLocksState] = useState<number>(INITIAL_STATE.sellingLocks)
  const [redeemingLocksState, setRedeemingLocksState] = useState<number>(INITIAL_STATE.redeemingLocks)

  const [buyingLocksState, setBuyingLocksState] = useState<number>(INITIAL_STATE.buyingLocks)
  const [gettingHoneyState, setGettingHoneyState] = useState<number>(INITIAL_STATE.gettingHoney)
  const debouncedGettingHoneyState = useDebounce(gettingHoneyState, 1000)
  const [redeemingHoneyState, setRedeemingHoneyState] = useState<number>(INITIAL_STATE.redeemingHoney)

  const [topInputFlagState, setTopInputFlagState] = useState<boolean>(INITIAL_STATE.topInputFlag)
  const [bottomInputFlagState, setBottomInputFlagState] = useState<boolean>(INITIAL_STATE.bottomInputFlag)

  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)
  const [displayStringState, setDisplayStringState] = useState<string>(INITIAL_STATE.displayString)
  const [bottomDisplayStringState, setBottomDisplayStringState] = useState<string>(INITIAL_STATE.bottomDisplayString)

  const [chartOpenState, setChartOpenState] = useState<boolean>(INITIAL_STATE.chartOpen)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(INITIAL_STATE.txConfirming)
  const [balanceMobileToggleState, setBalanceMobileToggleState] = useState<boolean>(INITIAL_STATE.balanceMobileToggle)

  const [redeemPopupToggleState, setRedeemPopupToggleState] = useState<boolean>(INITIAL_STATE.redeemPopupToggle)

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(INITIAL_STATE.allowanceButtons)
  const [simInfoState, setSimInfoState] = useState(INITIAL_STATE.simInfo)

  const changeSlippage = (amount: number, displayString: string) => {
    const updatedState = { ...slippageState }
    updatedState.amount = amount
    updatedState.displayString = displayString
    setSlippageState(updatedState)
    localStorage.setItem('slippageAmount', amount.toString())
  }

  const changeSlippageToggle = (toggle: boolean) => {
    const updatedState = { ...slippageState }
    updatedState.toggle = toggle
    setSlippageState(updatedState)
  }

  const checkSlippageAmount = () => {
    const storedSlippageAmount = localStorage.getItem('slippageAmount')
    if(storedSlippageAmount !== null) {
      changeSlippage(parseFloat(storedSlippageAmount), storedSlippageAmount)
    }
  }

  const changeActiveToggle = (toggle: string) => {
    setDisplayStringState('')
    setBottomDisplayStringState('')
    setHoneyBuyState(0)
    setBuyingLocksState(0)
    setSellingLocksState(0)
    setGettingHoneyState(0)
    setRedeemingLocksState(0)
    setRedeemingHoneyState(0)
    setActiveToggleState(toggle)
    setAllowanceButtonsState(false)
  }

  const flipTokens = () => {
    if(activeToggleState === "REDEEM") {
      return
    }
    setDisplayStringState('')
    setBottomDisplayStringState('')
    setHoneyBuyState(0)
    setBuyingLocksState(0)
    setSellingLocksState(0)
    setGettingHoneyState(0)
    setAllowanceButtonsState(false)
    if(activeToggleState === 'BUY') {
      setActiveToggleState('SELL')
    }
    else if(activeToggleState === 'SELL') {
      setActiveToggleState('BUY')
    }
  }

  const handlePercentageButtons = (action: number) => {
    if(!isConnected) return
    if(action == 1) {
      if(activeToggleState === 'BUY') {
        setDisplayStringState((balance.honey / 4).toFixed(4))
        setHoneyBuyState(balance.honey / 4)
      }
      if(activeToggleState === 'SELL') {
        setDisplayStringState((balance.locks / 4).toFixed(4))
        setSellingLocksState(balance.locks / 4)
      }
      if(activeToggleState === 'REDEEM') {
        setDisplayStringState((balance.locks / 4).toFixed(4))
        setRedeemingLocksState(balance.locks / 4)
      }
    }
    if(action == 2) {
      if(activeToggleState === 'BUY') {
        setDisplayStringState((balance.honey / 2).toFixed(4))
        setHoneyBuyState(balance.honey / 2)
      }
      if(activeToggleState === 'SELL') {
        setDisplayStringState((balance.locks / 2).toFixed(4))
        setSellingLocksState(balance.locks / 2)
      }
      if(activeToggleState === 'REDEEM') {
        setDisplayStringState((balance.locks / 2).toFixed(4))
        setRedeemingLocksState(balance.locks / 2)
      }
    }
    if(action == 3) {
      if(activeToggleState === 'BUY') {
        setDisplayStringState((balance.honey * 0.75).toFixed(4))
        setHoneyBuyState(balance.honey * 0.75)
      }
      if(activeToggleState === 'SELL') {
        setDisplayStringState((balance.locks * 0.75).toFixed(4))
        setSellingLocksState(balance.locks * 0.75)
      }
      if(activeToggleState === 'REDEEM') {
        setDisplayStringState((balance.locks * 0.75).toFixed(4))
        setRedeemingLocksState(balance.locks * 0.75)
      }
    }
    if(action == 4) {
      if(activeToggleState === 'BUY') {
        setDisplayStringState(balance.honey.toFixed(4))
        setHoneyBuyState(balance.honey - 0.0001)
      }
      if(activeToggleState === 'SELL') {
        setDisplayStringState(balance.locks.toFixed(4))
        setSellingLocksState(balance.locks - 0.0001)
      }
      if(activeToggleState === 'REDEEM') {
        setDisplayStringState(balance.locks.toFixed(4))
        setRedeemingLocksState(balance.locks - 0.0001)
      }
    }
  }

  const findLocksBuyAmount = (debouncedValue: number) => {
    const currentMarket: number = marketPrice(goldiswapInfoState.fsl, goldiswapInfoState.psl, goldiswapInfoState.supply)
    const honey: number = debouncedValue
    let locks: number = honey / currentMarket
    // console.log("initial locks: ", locks)
    let temp: number = 0
    while(parseFloat(temp.toFixed(2)) !== parseFloat(honey.toFixed(2))) {
      temp = simulateBuyDry(locks, goldiswapInfoState.fsl, goldiswapInfoState.psl, goldiswapInfoState.supply)
      // console.log("temp: ", temp)
      if(parseFloat(temp.toFixed(2)) > parseFloat(honey.toFixed(2))) {
        const diff = temp - honey
        if(diff > 10000) {
          locks -= (10000 * 0.90) / currentMarket
        }
        else if(diff > 1000) {
          locks -= (1000 * 0.90) / currentMarket
        }
        else if(diff > 100) {
          locks -= (100 * 0.90) / currentMarket
        }
        else if(diff > 10) {
          locks -= (10 * 0.90) / currentMarket
        }
        else if(diff > 1) {
          locks -= (1 * 0.90) / currentMarket
        }
        else if(diff > 0.1) {
          locks -= (0.1 * 0.90) / currentMarket
        }
        else if(diff > 0.01) {
          locks -= (0.01 * 0.90) / currentMarket
        }
        else {
          locks -= 0.05
        }
      }
      else if(parseFloat(temp.toFixed(2)) < parseFloat(honey.toFixed(2))) {
        const diff = honey - temp
        if(diff > 10000) {
          locks += (10000 * 0.90) / currentMarket
        }
        else if(diff > 1000) {
          locks += (1000 * 0.90) / currentMarket
        }
        else if(diff > 100) {
          locks += (100 * 0.90) / currentMarket
        }
        else if(diff > 10) {
          locks += (10 * 0.90) / currentMarket
        }
        else if(diff > 1) {
          locks += (1 * 0.90) / currentMarket
        }
        else if(diff > 0.1) {
          locks += (0.1 * 0.90) / currentMarket
        }
        else if(diff > 0.01) {
          locks += (0.01 * 0.90) / currentMarket
        }
        else {
          locks += 0.05
        }
      }
      else {
        const locksWithSlippage: number = locks * (1 - (slippageState.amount / 100))
        setBuyingLocksState(locksWithSlippage)
        setBottomDisplayStringState(locksWithSlippage.toFixed(4))
        // console.log('found it: ', parseFloat(temp.toFixed(2)))
        // console.log('locks: ', locks)
        // console.log('with slippage: ', locksWithSlippage)
      }
    }
    return locks * (1 - (slippageState.amount / 100))
  }

  //todo: use optimal algo here
  const findLocksSellAmount = (debouncedValue: number) => {
    const honey: number = debouncedValue
    let locks: number = honey / marketPrice(goldiswapInfoState.fsl, goldiswapInfoState.psl, goldiswapInfoState.supply)
    let temp: number = 0
    while(parseFloat(temp.toFixed(2)) !== parseFloat(honey.toFixed(2))) {
      temp = simulateSellDry(locks, goldiswapInfoState.fsl, goldiswapInfoState.psl, goldiswapInfoState.supply)
      if(parseFloat(temp.toFixed(2)) > parseFloat(honey.toFixed(2))) {
        const diff = temp - honey
        if(diff > 10000) {
          locks -= 50000
        }
        else if(diff > 1000) {
          locks -= 25000
        }
        else if(diff > 100) {
          locks -= 5000
        }
        else if(diff > 10) {
          locks -= 300
        }
        else if(diff > 1) {
          locks -= 25
        }
        else if(diff > 0.1) {
          locks -= 5
        }
        else if(diff > 0.01) {
          locks -= 0.1
        }
        else {
          locks -= 0.05
        }
      }
      else if(parseFloat(temp.toFixed(2)) < parseFloat(honey.toFixed(2))) {
        const diff = honey - temp
        if(diff > 10000) {
          locks += 50000
        }
        else if(diff > 1000) {
          locks += 25000
        }
        else if(diff > 100) {
          locks += 5000
        }
        else if(diff > 10) {
          locks += 300
        }
        else if(diff > 1) {
          locks += 25
        }
        else if(diff > 0.1) {
          locks += 5
        }
        else if(diff > 0.01) {
          locks += 0.1
        }
        else {
          locks += 0.05
        }
      }
    }
    return locks
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
      toggle: true,
      fsl: _fsl,
      psl: _psl,
      supply: _supply,
    }
    
    setSimInfoState(response)
    simulateFloorRaise(_fsl + _tax, _psl, _supply)
  }

  const simulateSell = (amt: number) => {
    let _leftover = amt
    let _fsl = goldiswapInfoState.fsl
    let _psl = goldiswapInfoState.psl
    let _supply = goldiswapInfoState.supply
    let _salePrice = 0
    let _tax = 0
    let _market = 0
    let _floor = 0
    while(_leftover >= 1000) {
      _market = marketPrice(_fsl, _psl, _supply)
      _floor = floorPrice(_fsl, _supply) 
      _salePrice += _market*1000
      _supply -= 1000
      _leftover -= 1000
      _fsl -= _floor*1000
      _psl -= (_market - _floor)*1000
    }
    if(_leftover > 0) {
      _market = marketPrice(_fsl, _psl, _supply)
      _floor = floorPrice(_fsl, _supply)
      _salePrice += _market * _leftover
      _psl -= (_market - _floor) * _leftover
      _fsl -= _floor * _leftover
      _supply -= _leftover
    }
    _tax = _salePrice * 0.053

    const response = {
      toggle: true,
      fsl: _fsl + _tax,
      psl: _psl,
      supply: _supply,
    }
    
    setSimInfoState(response)
  }

  const simulateRedeem = (amt: number) => {
    let rawTotal: number = amt * floorPrice(goldiswapInfoState.fsl, goldiswapInfoState.supply)

    const response = {
      toggle: true,
      fsl: goldiswapInfoState.fsl - rawTotal,
      psl: goldiswapInfoState.psl,
      supply: goldiswapInfoState.supply - redeemingLocksState
    }

    setSimInfoState(response)
    simulateFloorRaise(goldiswapInfoState.fsl - rawTotal, goldiswapInfoState.psl, goldiswapInfoState.supply - redeemingLocksState)
  }

  const simulateFloorRaise = (_fsl: number, _psl: number, _supply: number) => {
    if(_psl / _fsl >= goldiswapInfoState.targetRatio) {
      const raiseAmount: number = (_psl / _fsl) * (_psl / 32)
      const newFsl = _fsl + raiseAmount
      const newPsl = _psl - raiseAmount

      const response = {
        toggle: true,
        fsl: newFsl,
        psl: newPsl,
        supply: _supply
      }

      setSimInfoState(response)
    }
  }

  const handleTopBalance = (): string => {
    if(activeToggleState === 'BUY') {
      return balance.honey > 0 ? balance.honey.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"      
    }
    else {
      return balance.locks > 0 ? balance.locks.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
  }

  const handleBottomBalance = (): string => {
    if(activeToggleState === 'BUY') {
      return balance.locks > 0 ? balance.locks.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
    else {
      return balance.honey > 0 ? balance.honey.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"      
    }
  }

  const handleTopChange = (input: string) => {
    if(activeToggleState === 'BUY') {
      if(parseFloat(input) > 2000000) {
        input = ""
      }
      setDisplayStringState(input)
      setBottomInputFlagState(false)
      !input ? setHoneyBuyState(0) : setHoneyBuyState(parseFloat(input))
      !input && setAllowanceButtonsState(false)
    }
    else if(activeToggleState === 'SELL') {
      setDisplayStringState(input)
      setBottomInputFlagState(false)
      !input ? setSellingLocksState(0) : setSellingLocksState(parseFloat(input))
    }
    else {
      setDisplayStringState(input)
      setBottomInputFlagState(false)
      !input ? setRedeemingLocksState(0) : setRedeemingLocksState(parseFloat(input))
    }
  }

  const handleBottomChange = (input: string) => {
    if(activeToggleState === 'BUY') {
      setBottomDisplayStringState(input)
      setTopInputFlagState(false)
      !input ? setBuyingLocksState(0) : setBuyingLocksState(parseFloat(input))
    }
    else if(activeToggleState === 'SELL') {
      if(parseFloat(input) > 2000000) {
        input = ""
      }
      setBottomDisplayStringState(input)
      setTopInputFlagState(false)
      !input ? setGettingHoneyState(0) : setGettingHoneyState(parseFloat(input))
    }
    else {
      setBottomDisplayStringState(input)
      setTopInputFlagState(false)
      !input ? setRedeemingHoneyState(0) : setRedeemingHoneyState(parseFloat(input))
    }
  }

  const refreshGoldiswapInfo = async () => {
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
    const ratioResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: 'targetRatio',
    })
    let honeySwapAllowanceResult
    if(wallet) {
      honeySwapAllowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [wallet, contracts.goldiswap.address]
      })
    }

    const response = {
      fsl: parseFloat(formatEther(fslResult as unknown as bigint)),
      psl: parseFloat(formatEther(pslResult as unknown as bigint)),
      supply: parseFloat(formatEther(supplyResult as unknown as bigint)),
      targetRatio: parseFloat(formatEther(ratioResult as unknown as bigint)),
      honeySwapAllowance: wallet ? parseFloat(formatEther(honeySwapAllowanceResult as unknown as bigint)) : 0
    }

    const simResponse = {
      toggle: false,
      fsl: parseFloat(formatEther(fslResult as unknown as bigint)),
      psl: parseFloat(formatEther(pslResult as unknown as bigint)),
      supply: parseFloat(formatEther(supplyResult as unknown as bigint)),
    }

    setGoldiswapInfoState(response)
    setSimInfoState(simResponse)
  }

  const setSimInfo = (toggle: boolean, fsl: number, psl: number, supply: number) => {
    setSimInfoState({ toggle, fsl, psl, supply })
  }

  const updateAllowance = (newAllowance: number) => {
    setGoldiswapInfoState(prevState => ({
      ...prevState,
      honeySwapAllowance: newAllowance
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
    <GoldiswapContext.Provider
      value={{
        goldiswapInfo: goldiswapInfoState,
        slippage: slippageState,
        honeyBuy: honeyBuyState,
        debouncedHoneyBuy: debouncedHoneyBuyState,
        sellingLocks: sellingLocksState,
        redeemingLocks: redeemingLocksState,
        buyingLocks: buyingLocksState,
        displayString: displayStringState,
        bottomDisplayString: bottomDisplayStringState,
        setHoneyBuy: setHoneyBuyState,
        setSellingLocks: setSellingLocksState,
        setRedeemingLocks: setRedeemingLocksState,
        setDisplayString: setDisplayStringState,
        setBottomDisplayString: setBottomDisplayStringState,
        activeToggle: activeToggleState,
        changeActiveToggle,
        handlePercentageButtons,
        flipTokens,
        chartOpen: chartOpenState,
        setChartOpen: setChartOpenState,
        simulateBuy,
        simulateSell,
        simulateRedeem,
        findLocksBuyAmount,
        findLocksSellAmount,
        handleTopBalance,
        handleBottomBalance,
        handleTopChange,
        refreshGoldiswapInfo,
        infoLoading: infoLoadingState,
        setInfoLoading: setInfoLoadingState,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
        simInfo: simInfoState,
        setSimInfo,
        updateAllowance,
        txConfirming: txConfirmingState,
        setTxConfirming: setTxConfirmingState,
        notification: notificationState,
        openNotification,
        gettingHoney: gettingHoneyState,
        setGettingHoney: setGettingHoneyState,
        redeemingHoney: redeemingHoneyState,
        setRedeemingHoney: setRedeemingHoneyState,
        changeSlippage,
        changeSlippageToggle,
        checkSlippageAmount,
        redeemPopupToggle: redeemPopupToggleState,
        setRedeemPopupToggle: setRedeemPopupToggleState,
        setBuyingLocks: setBuyingLocksState,
        topInputFlag: topInputFlagState,
        setTopInputFlag: setTopInputFlagState,
        bottomInputFlag: bottomInputFlagState,
        setBottomInputFlag: setBottomInputFlagState,
        handleBottomChange,
        debouncedGettingHoney: debouncedGettingHoneyState,
        balanceMobileToggle: balanceMobileToggleState,
        setBalanceMobileToggle: setBalanceMobileToggleState
      }}
    >
      { children }
    </GoldiswapContext.Provider>
  )
}

export const useGoldiswap = () => useContext(GoldiswapContext)