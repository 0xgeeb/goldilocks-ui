"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { readContract } from "@wagmi/core"
import { formatEther } from "viem"
import { useWallet } from "../../providers"
import { useDebounce } from "../../hooks"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"
import {
  GoldilendInitialState,
  BeraInfo,
  PartnerInfo,
  LoanInfo,
  LoanData,
  BoostData,
  BoostInfo
} from "../../utils/interfaces"

const INITIAL_STATE: GoldilendInitialState = {
  goldilendInfo: {
    stakedGibgt: 0
  },
  lock: 0,
  stake: 0,
  unstake: 0,
  setLock: (_lock: number) => {},
  setStake: (_stake: number) => {},
  setUnstake: (_unstake: number) => {},
  borrowDisplayString: '',
  loanExpiration: '',
  debouncedLoanExpiration: '',
  displayString: '',
  setDisplayString: (_displayString: string) => {},
  loanAmount: 0,
  debouncedLoanAmount: 0,
  borrowLimit: 0,
  boostMag: 0,
  loanInterest: 0,
  loanInterestRate: 0,
  setLoanInterest: (_interest: number) => {},
  setLoanInterestRate: (_interestRate: number) => {},
  ownedBeras: [],
  selectedBeras: [],
  userLoans: [],
  ownedPartners: [],
  selectedPartners: [],
  userBoost: {
    partnerNFTs: [],
    partnerNFTIds: [],
    boostMagnitude: 0,
    expiry: 0
  },
  liquidatableLoans: [],
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
  loansLoading: true,
  setLoansLoading: (_loading: boolean) => {},
  allowanceButtons: false,
  setAllowanceButtons: (_bool: boolean) => {},
  handlePercentageButtons: (_action: number) => {},
  handleStakeChange: (_input: string, _tab: string) => {},
  handleStakeBalance: (_tab: string) => '',
  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {},
  selectScreen: true,
  setSelectScreen: (_screen: boolean) => {},
  chartOpen: false,
  setChartOpen: (_open: boolean) => {},
  balanceMobileToggle: false,
  setBalanceMobileToggle: (_toggle: boolean) => {},
  handleBeraClick: (_bera: BeraInfo) => {},
  handlePartnerClick: (_partner: PartnerInfo) => {},
  findSelectedBeraIdxs: () => [],
  findSelectedPartnerIdxs: () => [],
  findBeras: (_beras: any) => {},
  findLoans: () => {},
  findBoost: () => {},
  findLiquidatableLoans: () => {},
  findPartners: (_partners: any) => {},
  updateBorrowLimit: () => {},
  updateBoostMag: () => {},
  handleBorrowChange: (_input: string) => {},
  handleLoanDateChange: (_input: string) => {},
  getInterestRate: () => {},
  updateOwnedBeras: (_nfts: BeraInfo | BeraInfo[]) => {},
  updateOwnedPartners: (_nfts: PartnerInfo | PartnerInfo[]) => {}
}

const GoldilendContext = createContext(INITIAL_STATE)

export const GoldilendProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { balance, wallet, isConnected, refreshBalances } = useWallet()

  const [goldilendInfoState, setGoldilendInfoState] = useState(INITIAL_STATE.goldilendInfo)
  const [notificationState, setNotificationState] = useState(INITIAL_STATE.notification)
  
  const [displayStringState, setDisplayStringState] = useState(INITIAL_STATE.displayString)
  const [borrowDisplayStringState, setBorrowDisplayStringState] = useState(INITIAL_STATE.borrowDisplayString)
  const [loanExpirationState, setLoanExpirationState] = useState(INITIAL_STATE.loanExpiration)
  const [loanInterestState, setLoanInterestState] = useState(INITIAL_STATE.loanInterest)
  const [loanInterestRateState, setLoanInterestRateState] = useState(INITIAL_STATE.loanInterestRate)
  const debouncedLoanExpirationState = useDebounce(loanExpirationState, 1000)
  const [lockState, setLockState] = useState<number>(INITIAL_STATE.lock)
  const [stakeState, setStakeState] = useState<number>(INITIAL_STATE.stake)
  const [unstakeState, setUnstakeState] = useState<number>(INITIAL_STATE.unstake)
  const [ownedBerasState, setOwnedBerasState] = useState<BeraInfo[]>(INITIAL_STATE.ownedBeras)
  const [selectedBerasState, setSelectedBerasState] = useState<BeraInfo[]>([])
  const [ownedPartnersState, setOwnedPartnersState] = useState<PartnerInfo[]>(INITIAL_STATE.ownedPartners)
  const [selectedPartnersState, setSelectedPartnersState] = useState<PartnerInfo[]>([])
  const [userLoansState, setUserLoansState] = useState<LoanInfo[]>(INITIAL_STATE.userLoans)
  const [liquidatableLoansState, setLiquidatableLoansState] = useState<LoanInfo[]>(INITIAL_STATE.liquidatableLoans)
  const [userBoostState, setUserBoostState] = useState<BoostInfo>(INITIAL_STATE.userBoost)
  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)
  const [lendActiveToggleState, setLendActiveToggleState] = useState<string>(INITIAL_STATE.lendActiveToggle)
  const [loanAmountState, setLoanAmountState] = useState<number>(INITIAL_STATE.loanAmount)
  const debouncedLoanAmountState = useDebounce(loanAmountState, 1000)
  const [borrowLimitState, setBorrowLimitState] = useState<number>(INITIAL_STATE.borrowLimit)
  const [boostMagState, setBoostMagState] = useState<number>(INITIAL_STATE.boostMag)

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(INITIAL_STATE.allowanceButtons)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)
  const [loansLoadingState, setLoansLoadingState] = useState<boolean>(INITIAL_STATE.loansLoading)
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(INITIAL_STATE.txConfirming)
  const [chartOpenState, setChartOpenState] = useState<boolean>(INITIAL_STATE.chartOpen)
  const [balanceMobileToggleState, setBalanceMobileToggleState] = useState<boolean>(INITIAL_STATE.balanceMobileToggle)
  const [selectScreenState, setSelectScreenState] = useState<boolean>(INITIAL_STATE.selectScreen)

  const changeActiveToggle = (toggle: string) => {
    setSelectedBerasState([])
    setSelectedPartnersState([])
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
    setAllowanceButtonsState(false)
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

  const updateBoostMag = () => {
    let mag = 0
    selectedPartnersState.forEach((partner) => {
      mag += partner.boost
    })
    setBoostMagState(mag)
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

  const findSelectedPartnerIdxs = (): number[] => {
    let idxArray: number[] = []
    selectedPartnersState.forEach((selectedPartner) => {
      idxArray.push(selectedPartner.index)
    })
    return idxArray
  }

  const findSelectedBeraIdxs = (): number[] => {
    let idxArray: number[] = []
    selectedBerasState.forEach((selectedBera) => {
      idxArray.push(selectedBera.index)
    })
    return idxArray
  }

  const handlePartnerClick = (partner: PartnerInfo) => {
    const idxArray: number[] = findSelectedPartnerIdxs()
    if(idxArray.includes(partner.index)) {
      setSelectedPartnersState(prev => prev.filter(partnerf => partnerf.index !== partner.index))
    }
    else {
      setSelectedPartnersState(prev => [...prev, partner])
    }
  }

  const handleLoanDateChange = (input: string) => {
    setLoanExpirationState(input)
  }

  const findBeras = async (beras: any) => {
    let beraIndex = 0
    for(const bondbera of beras.bondBeras.items) {
      const bondInfo  = {
        name: "BondBera",
        id: bondbera.id,
        valuation: 50,
        index: beraIndex
      }
      setOwnedBerasState(curr => [...curr, bondInfo])
      beraIndex++
    }
    for(const bandbera of beras.bandBeras.items) {
      const bandInfo  = {
        name: "BandBera",
        id: bandbera.id,
        valuation: 50,
        index: beraIndex
      }
      setOwnedBerasState(curr => [...curr, bandInfo])
      beraIndex++
    }
  }

  const findPartners = async (partners: any) => {
    let partnerIndex = 0
    for(const drome of partners.beradromes.items) {
      const dromeInfo  = {
        name: "Beradrome",
        id: drome.id,
        boost: 9,
        index: partnerIndex
      }
      setOwnedPartnersState(curr => [...curr, dromeInfo])
      partnerIndex++
    }
    for(const honeycomb of partners.honeycombs.items) {
      const combInfo  = {
        name: "HoneyComb",
        id: honeycomb.id,
        boost: 6,
        index: partnerIndex
      }
      setOwnedPartnersState(curr => [...curr, combInfo])
      partnerIndex++
    }
  }

  //todo: caps out at 20 loans
  const findLoans = async () => {
    if(wallet) {
      const userLoans: LoanInfo[] = []
      for(let i = 1; i < 20; i++) {
        const loan = await readContract(config, {
          address: contracts.goldilend.address as `0x${string}`,
          abi: contracts.goldilend.abi,
          functionName: 'lookupLoan',
          args: [wallet, i]
        })
        const loanData = loan as unknown as LoanData
        if(loanData.collateralNFTIds.length == 0) {
          continue
        }
        const userLoan = {
          collateralNFTs: loanData.collateralNFTs,
          collateralNFTIds: loanData.collateralNFTIds.map(id => parseInt(id.toString(), 16)),
          borrowedAmount: parseFloat(formatEther(loanData.borrowedAmount)),
          interest: parseFloat(formatEther(loanData.interest)),
          duration: Number(loanData.duration),
          endDate: Number(loanData.endDate),
          loanId: parseInt(loanData.loanId.toString(), 16),
          liquidated: loanData.liquidated
        }
        userLoans.push(userLoan)
      }
      setUserLoansState(userLoans)
    }
  }

  const findBoost = async () => {
    if(wallet) {
      const boost = await readContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: 'lookupBoost',
        args: [wallet]
      })
      const boostData = boost as unknown as BoostData
      const userBoost = {
        partnerNFTs: boostData.partnerNFTs,
        partnerNFTIds: boostData.partnerNFTIds.map(id => parseInt(id.toString(), 16)),
        boostMagnitude: parseInt(boostData.boostMagnitude.toString(), 16),
        expiry: Number(boostData.expiry)
      }

      setUserBoostState(userBoost)
    }
  }

  //todo: need indexer for this
  const findLiquidatableLoans = () => {

  }

  const refreshGoldilendInfo = async () => {
    const stakedGibgtResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: 'balanceOf',
      args: [contracts.goldilend.address]
    })

    const response = {
      stakedGibgt: parseFloat(formatEther(stakedGibgtResult as unknown as bigint))
    }

    setGoldilendInfoState(response)
  }

  const openNotification = (toggle: boolean, action: string, result: string, hash: string) => {
    setNotificationState(prevState => ({
      toggle,
      action,
      result,
      hash
    }))
  }

  const getInterestRate = async () => {
    console.log(userBoostState)
    const dateParts = loanExpirationState.split('-')
    const [month, day, year] = dateParts.map(Number);
    const parsedDate = new Date(year, month - 1, day)
    const timestamp = parsedDate.getTime()
    const currentTimestamp = Date.now()
    const loanDuration = Math.floor((timestamp - currentTimestamp) / 1000)
    const debtResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: 'outstandingDebt',
      args: []
    })
    const debt: number = parseFloat(formatEther(debtResult as unknown as bigint))
    const poolSizeResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: 'poolSize',
      args: []
    })
    const poolSize: number = parseFloat(formatEther(poolSizeResult as unknown as bigint))
    const yearSeconds = 31536000
    const rate = 10
    const ratio = ((debt + loanAmountState) / poolSize) + 0.50
    const interestRate = rate + ((10 * rate) * (ratio * (loanDuration / yearSeconds)))
    const interestAdjusted = (interestRate * loanAmountState) * (loanDuration / yearSeconds)
    if(userBoostState.partnerNFTs.length > 0) {
      let discount = 500
      if(userBoostState.boostMagnitude < discount) {
        discount = 1000 - userBoostState.boostMagnitude
      }
      const interest = interestAdjusted * discount / 1000
      setLoanInterestState(interest / 100)
    }
    else {
      setLoanInterestState(interestAdjusted / 100)
    }
    
    const calculatedRate = 10 + ((10 * 10 * (loanDuration / yearSeconds)) * (0.5 + (debt / poolSize)))
    setLoanInterestRateState(calculatedRate)
  }

  const updateOwnedBeras = (nfts: BeraInfo | BeraInfo[]) => {
    if(Array.isArray(nfts)) {
      setOwnedBerasState(prevState => prevState.filter(bera => !nfts.includes(bera)))
    }
    else {
      setOwnedBerasState(prevState => prevState.filter(bera => bera !== nfts))
    }
  }

  const updateOwnedPartners = (nfts: PartnerInfo | PartnerInfo[]) => {
    if(Array.isArray(nfts)) {
      setOwnedPartnersState(prevState => prevState.filter(partner => !nfts.includes(partner)))
    }
    else {
      setOwnedPartnersState(prevState => prevState.filter(partner => partner !== nfts))
    }
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
        selectScreen: selectScreenState,
        setSelectScreen: setSelectScreenState,
        notification: notificationState,
        openNotification,
        selectedBeras: selectedBerasState,
        ownedBeras: ownedBerasState,
        userLoans: userLoansState,
        handleBeraClick,
        findSelectedBeraIdxs,
        borrowLimit: borrowLimitState,
        boostMag: boostMagState,
        loanInterest: loanInterestState,
        setLoanInterest: setLoanInterestState,
        loanInterestRate: loanInterestRateState,
        setLoanInterestRate: setLoanInterestRateState,
        loanAmount: loanAmountState,
        updateBorrowLimit,
        updateBoostMag,
        borrowDisplayString: borrowDisplayStringState,
        handleBorrowChange,
        handleLoanDateChange,
        loanExpiration: loanExpirationState,
        loansLoading: loansLoadingState,
        setLoansLoading: setLoansLoadingState,
        findLoans,
        findBeras,
        findBoost,
        findLiquidatableLoans,
        findPartners,
        userBoost: userBoostState,
        selectedPartners: selectedPartnersState,
        ownedPartners: ownedPartnersState,
        findSelectedPartnerIdxs,
        handlePartnerClick,
        liquidatableLoans: liquidatableLoansState,
        chartOpen: chartOpenState,
        setChartOpen: setChartOpenState,
        balanceMobileToggle: balanceMobileToggleState,
        setBalanceMobileToggle: setBalanceMobileToggleState,
        getInterestRate,
        debouncedLoanAmount: debouncedLoanAmountState,
        debouncedLoanExpiration: debouncedLoanExpirationState,
        updateOwnedBeras,
        updateOwnedPartners
      }}
    >
      { children }
    </GoldilendContext.Provider>
  )
}

export const useGoldilend = () => useContext(GoldilendContext)