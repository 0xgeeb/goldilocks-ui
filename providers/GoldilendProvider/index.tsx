"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { readContract } from "@wagmi/core"
import { formatEther } from "viem"
import { useWallet } from "../../providers"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"
import { GoldilendInitialState, BeraInfo } from "../../utils/interfaces"

const INITIAL_STATE: GoldilendInitialState = {

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

  borrowDisplayString: '',
  loanExpiration: '',
  displayString: '',
  setDisplayString: (_displayString: string) => {},

  loanAmount: 0,
  borrowLimit: 0,

  ownedBeras: [
    {
      name: "BondBera",
      id: 1,
      imageSrc: "https://ipfs.io/ipfs/QmSaVWb15oQ1HcsUjGGkjwHQ1mxJBYeivtBCgHHHiVLt7w",
      valuation: 50,
      index: 0
    },
    {
      name: "BondBera",
      id: 2,
      imageSrc: "https://ipfs.io/ipfs/QmSaVWb15oQ1HcsUjGGkjwHQ1mxJBYeivtBCgHHHiVLt7w",
      valuation: 50,
      index: 1
    },
    {
      name: "BandBera",
      id: 1,
      imageSrc: "https://ipfs.io/ipfs/QmNWggx9vvBVEHZc6xwWkdyymoKuXCYrJ3zQwwKzocDxRt",
      valuation: 50,
      index: 2
    },
    {
      name: "BandBera",
      id: 2,
      imageSrc: "https://ipfs.io/ipfs/QmNWggx9vvBVEHZc6xwWkdyymoKuXCYrJ3zQwwKzocDxRt",
      valuation: 50,
      index: 3
    },
    {
      name: "BondBera",
      id: 3,
      imageSrc: "https://ipfs.io/ipfs/QmSaVWb15oQ1HcsUjGGkjwHQ1mxJBYeivtBCgHHHiVLt7w",
      valuation: 50,
      index: 4
    },
    {
      name: "BandBera",
      id: 3,
      imageSrc: "https://ipfs.io/ipfs/QmNWggx9vvBVEHZc6xwWkdyymoKuXCYrJ3zQwwKzocDxRt",
      valuation: 50,
      index: 5
    },
  ],
  selectedBeras: [],

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

  getOwnedBeras: () => {},
  handleBeraClick: (_bera: BeraInfo) => {},
  findSelectedBeraIdxs: () => [],
  updateBorrowLimit: () => {},
  handleBorrowChange: (_input: string) => {},
  handleLoanDateChange: (_input: string) => {},
}

const GoldilendContext = createContext(INITIAL_STATE)

export const GoldilendProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet, isConnected } = useWallet()

  const [goldilendInfoState, setGoldilendInfoState] = useState(INITIAL_STATE.goldilendInfo)
  const [notificationState, setNotificationState] = useState(INITIAL_STATE.notification)
  
  const [displayStringState, setDisplayStringState] = useState(INITIAL_STATE.displayString)
  const [borrowDisplayStringState, setBorrowDisplayStringState] = useState(INITIAL_STATE.borrowDisplayString)
  const [loanExpirationState, setLoanExpirationState] = useState(INITIAL_STATE.loanExpiration)
  const [lockState, setLockState] = useState<number>(INITIAL_STATE.lock)
  const [stakeState, setStakeState] = useState<number>(INITIAL_STATE.stake)
  const [unstakeState, setUnstakeState] = useState<number>(INITIAL_STATE.unstake)
  const [ownedBerasState, setOwnedBerasState] = useState<BeraInfo[]>(INITIAL_STATE.ownedBeras)
  const [selectedBerasState, setSelectedBerasState] = useState<BeraInfo[]>([])
  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)
  const [lendActiveToggleState, setLendActiveToggleState] = useState<string>(INITIAL_STATE.lendActiveToggle)
  const [loanAmountState, setLoanAmountState] = useState<number>(INITIAL_STATE.loanAmount)
  const [borrowLimitState, setBorrowLimitState] = useState<number>(INITIAL_STATE.borrowLimit)

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(INITIAL_STATE.allowanceButtons)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(INITIAL_STATE.txConfirming)

  const changeActiveToggle = (toggle: string) => {
    setSelectedBerasState([])
    setBorrowDisplayStringState('')
    setLoanExpirationState('')
    setLoanAmountState(0)
    setActiveToggleState(toggle)
  }

  const changeLendActiveToggle = (toggle: string) => {
    setDisplayStringState('')
    setLockState(0)
    setStakeState(0)
    setUnstakeState(0)
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

  const handleBorrowChange = (input: string) => {
    if(!input) {
      setLoanAmountState(0)
      setBorrowDisplayStringState(input)
    }
    else {
      if(parseFloat(input) > borrowLimitState) {
        setBorrowDisplayStringState(borrowLimitState.toString())
        setLoanAmountState(borrowLimitState)
      }
      else {
        setLoanAmountState(parseFloat(input))
        setBorrowDisplayStringState(input)
      }
    }
  }

  const updateBorrowLimit = () => {
    let limit = 0
    selectedBerasState.forEach((bera) => {
      limit += bera.valuation
    })
    setBorrowLimitState(limit)
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

  const handleBeraClick = (bera: BeraInfo) => {
    const idxArray: number[] = findSelectedBeraIdxs()
    if(idxArray.includes(bera.index)) {
      setSelectedBerasState(prev => prev.filter(beraf => beraf.index !== bera.index))
    }
    else {
      setSelectedBerasState(prev => [...prev, bera])
    }
  }

  const findSelectedBeraIdxs = (): number[] => {
    let idxArray: number[] = []
    selectedBerasState.forEach((selectedBera) => {
      idxArray.push(selectedBera.index)
    })
    return idxArray
  }

  const getOwnedBeras = async () => {
    // console.log('boutta fetch')
    // const options = { method: 'GET', headers: {accept: 'application/json'} }
    // const response = await fetch('https://base-sepolia.g.alchemy.com/nft/v3/XgNYMjOtB41dpMK9FvXg9seQVdFIzqsA/getNFTsForOwner?owner=0x895614c89beC7D11454312f740854d08CbF57A78&withMetadata=true&pageSize=100', options)
    // const data = await response.json()
    // console.log(data)

    // let beraIndex = 0
    // for(const nft of data.ownedNfts) {
    //   if(nft.contract.address === '0x8172BDB659837F321bF7Da8941d8E12a62a72d6a') {
    //     const bondInfo  = {
    //       name: "BondBera",
    //       id: nft.tokenId,
    //       imageSrc: "https://ipfs.io/ipfs/QmSaVWb15oQ1HcsUjGGkjwHQ1mxJBYeivtBCgHHHiVLt7w",
    //       valuation: 50,
    //       index: beraIndex
    //     }
    //     setOwnedBerasState(curr => [...curr, bondInfo])
    //     beraIndex++
    //   }
    //   if(nft.contract.address === '0xB1195a6cdB7ef8fB22671bd8321727dBB6DDDe03') {
    //     const bandInfo  = {
    //       name: "BandBera",
    //       id: nft.tokenId,
    //       imageSrc: "https://ipfs.io/ipfs/QmNWggx9vvBVEHZc6xwWkdyymoKuXCYrJ3zQwwKzocDxRt",
    //       valuation: 50,
    //       index: beraIndex
    //     }
    //     setOwnedBerasState(curr => [...curr, bandInfo])
    //     beraIndex++
    //   }
    // }

    // console.log('done')
  }

  const handleLoanDateChange = (input: string) => {
    setLoanExpirationState(input)
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
        openNotification,
        selectedBeras: selectedBerasState,
        ownedBeras: ownedBerasState,
        getOwnedBeras,
        handleBeraClick,
        findSelectedBeraIdxs,
        borrowLimit: borrowLimitState,
        loanAmount: loanAmountState,
        updateBorrowLimit,
        borrowDisplayString: borrowDisplayStringState,
        handleBorrowChange,
        handleLoanDateChange,
        loanExpiration: loanExpirationState
      }}
    >
      { children }
    </GoldilendContext.Provider>
  )
}

export const useGoldilend = () => useContext(GoldilendContext)