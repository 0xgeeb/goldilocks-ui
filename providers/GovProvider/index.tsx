"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { readContract } from "@wagmi/core"
import { formatEther } from "viem"
import { useAccount } from "wagmi"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

const INITIAL_STATE: any = {
  proposalInfo: {
    state: '',
    forVotes: 0,
    againstVotes: 0,
    abstainVotes: 0,
    eta: 0,
    cancel: false,
    queue: false,
    execute: false
  },
  proposals: [],
  govWalletInfo: {
    govlocks: 0,
    locksGovlocksAllowance: 0,
    locks: 0,
    votes: 0
  },
  title: '',
  setTitle: () => {},
  description: '',
  setDescription: () => {},
  target: '',
  setTarget: () => {},
  calldata: '',
  setCalldata: () => {},
  value: '',
  setValue: () => {},
  proposeTab: 'TITLE',
  newProposalInfo: {
    title: '',
    description: '',
    actions: []
  },
  toggleProposalHover: (_proposalNum: number, _toggle: boolean) => {},
  removeUnderlines: () => {},
  addTitle: () => {},
  addBack: () => {},
  addAction: () => {},
  enableProposeError: () => {},
  enableProposeSuccess: () => {},
  refreshProposals: (_proposalData: {}) => {},
  refreshProposalInfo: async (_proposalId: number) => {},
  refreshGovWalletInfo: async () => {},
  infoLoading: true,
  walletInfoLoading: false,
  proposalInfoLoading: false,
  proposalButtonsInfoLoading: false,
  wutPopup: false,
  setWutPopup: (_popup: boolean) => {},
  govlocksActiveToggle: 'WRAP',
  changeGovlocksActiveToggle: (_toggle: string) => {},
  govlocksDisplayString: '',
  setGovlocksDisplayString: (_input: string) => {},
  handleGovlocksBalance: () => {},
  handleGovlocksChange: (_input: string) => {},
  handleGovlocksBalanceClick: () => {},
  wrap: 0,
  unwrap: 0,
  delegate: '',
  setWrap: (_wrap: number) => {},
  setUnwrap: (_unwrap: number) => {},
  setDelegate: (_delegate: string) => {},
  govlocksAllowanceButtons: false,
  setGovlocksAllowanceButtons: (_bool: boolean) => {}
}

const GovContext = createContext(INITIAL_STATE)

export const GovProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props
  
  const { address } = useAccount()

  const [proposalInfoState, setProposalInfoState] = useState(INITIAL_STATE.proposalInfo)
  const [proposalsState, setProposalsState] = useState(INITIAL_STATE.proposals)
  const [titleState, setTitleState] = useState(INITIAL_STATE.title)
  const [descriptionState, setDescriptionState] = useState(INITIAL_STATE.description)
  const [targetState, setTargetState] = useState(INITIAL_STATE.target)
  const [calldataState, setCalldataState] = useState(INITIAL_STATE.calldata)
  const [valueState, setValueState] = useState(INITIAL_STATE.value)
  const [proposeTabState, setProposeTabState] = useState(INITIAL_STATE.proposeTab)
  const [newProposalInfoState, setNewProposalInfoState] = useState(INITIAL_STATE.newProposalInfo)
  const [govWalletInfoState, setGovWalletInfoState] = useState(INITIAL_STATE.govWalletInfo)
  const [govlocksDisplayStringState, setGovlocksDisplayStringState] = useState(INITIAL_STATE.govlocksDisplayString)
  const [govlocksActiveToggleState, setGovlocksActiveToggleState] = useState(INITIAL_STATE.govlocksActiveToggle)
  const [wrapState, setWrapState] = useState(INITIAL_STATE.wrap)
  const [unwrapState, setUnwrapState] = useState(INITIAL_STATE.unwrap)
  const [delegateState, setDelegateState] = useState(INITIAL_STATE.delegate)
  const [govlocksAllowanceButtonsState, setGovlocksAllowanceButtonsState] = useState<boolean>(INITIAL_STATE.govlocksAllowanceButtons)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)
  const [walletInfoLoadingState, setWalletInfoLoadingState] = useState<boolean>(INITIAL_STATE.walletInfoLoading)
  const [proposalInfoLoadingState, setProposalInfoLoadingState] = useState<boolean>(INITIAL_STATE.proposalInfoLoading)
  const [wutPopupState, setWutPopupState] = useState<boolean>(INITIAL_STATE.wutPopup)

  const toggleProposalHover = (proposalNum: number, toggle: boolean) => {
    const updatedProposals = proposalsState.map((proposal: any) => (
      proposal.proposalId === proposalNum ? { ...proposal, hover: toggle } : proposal
    ))
    setProposalsState(updatedProposals)
  }

  const removeUnderlines = () => {
    const updatedProposals = proposalsState.map((proposal: any) => ({
      ...proposal,
      hover: false
    }))
    setProposalsState(updatedProposals)
  }

  const addTitle = () => {
    if(!titleState || !descriptionState) {
      return
    }
    setNewProposalInfoState((prev: any) => ({
      ...prev,
      title: titleState,
      description: descriptionState
    }))
    setProposeTabState('ACTION')
  }

  const addBack = () => {
    setProposeTabState('TITLE')
  }

  const addAction = () => {
    if(!targetState || !calldataState || !valueState) {
      return
    }
    const newAction = {
      target: targetState,
      calldata: calldataState,
      value: valueState
    }

    setNewProposalInfoState((prev: any) => ({
      ...prev,
      actions: [...prev.actions, newAction]
    }))

    setTargetState('')
    setCalldataState('')
    setValueState('')
    setProposeTabState('ACTION')
  }

  const enableProposeError = () => {
    setProposeTabState('ERROR')
    setTimeout(() => {
      setProposeTabState('ACTION')
    }, 5000)
  }

  const enableProposeSuccess = () => {
    setProposeTabState('SUCCESS')
    setTitleState('')
    setDescriptionState('')
    setTargetState('')
    setCalldataState('')
    setValueState('')
    const successAction = {
      title: '',
      description: '',
      actions: []
    }
    setNewProposalInfoState(successAction)

    setTimeout(() => {
      setProposeTabState('TITLE')
    }, 5000)
  }

  const changeGovlocksActiveToggle = (toggle: string) => {
    setGovlocksActiveToggleState(toggle)
    setGovlocksDisplayStringState('')
    setWrapState(0)
    setUnwrapState(0)
    setDelegateState('')
  }

  const handleGovlocksChange = (input: string) => {
    setGovlocksDisplayStringState(input)
    if(govlocksActiveToggleState === 'WRAP') {
      !input ? setWrapState(0) : setWrapState(parseFloat(input))
      !input && setGovlocksAllowanceButtonsState(false)
    }
    if(govlocksActiveToggleState === 'UNWRAP') {
      !input ? setUnwrapState(0) : setUnwrapState(parseFloat(input))
    }
    if(govlocksActiveToggleState === 'DELEGATE') {
      !input ? setDelegateState('') : setDelegateState(input)
      !input && setGovlocksAllowanceButtonsState(false)
    }
  }

  const handleGovlocksBalance = () => {
    if(govlocksActiveToggleState === 'WRAP') {
      return govWalletInfoState.locks > 0 ? govWalletInfoState.locks.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
    if(govlocksActiveToggleState === 'UNWRAP') {
      return govWalletInfoState.govlocks > 0 ? govWalletInfoState.govlocks.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
    if(govlocksActiveToggleState === 'DELEGATE') {
      return govWalletInfoState.votes > 0 ? govWalletInfoState.votes.toLocaleString('en-US', { maximumFractionDigits: 4 }) : "0.00"
    }
  }

  const handleGovlocksBalanceClick = () => {
    if(govlocksActiveToggleState === 'WRAP') {
      setGovlocksDisplayStringState(govWalletInfoState.locks.toFixed(4))
      setWrapState(govWalletInfoState.locks)
    }
    if(govlocksActiveToggleState === 'UNWRAP') {
      setGovlocksDisplayStringState(govWalletInfoState.govlocks.toFixed(4))
      setUnwrapState(govWalletInfoState.govlocks)
    }
  }


  const refreshProposals = async (proposalData: any) => {
    const processedProposals = proposalData.proposals.items.map((proposal: any) => {
      const colonIndex = proposal.description.indexOf(':')
      const title = colonIndex !== -1 ? proposal.description.slice(0, colonIndex).trim() : ""
      const description = colonIndex !== -1 ? proposal.description.slice(colonIndex + 1).trim() : proposal.description

      return {
        hover: false,
        title,
        description,
        proposalId: proposal.proposalId,
        proposer: proposal.proposer,
        startBlock: proposal.startBlock,
        endBlock: proposal.endBlock,
        actions: proposal.actions.items.map((action: any) => ({
          target: action.target,
          calldata: action.calldatas,
          signature: action.signature,
          value: action.value
        }))
      }
    })

    setProposalsState(processedProposals)
    setInfoLoadingState(false)
  }

  const refreshProposalInfo = async (proposalId: number) => {
    setProposalInfoLoadingState(true)
    const stateResult = await readContract(config, {
      address: contracts.goldigov.address as `0x${string}`,
      abi: contracts.goldigov.abi,
      functionName: 'state',
      args: [proposalId]
    })
    const proposalResult: any = await readContract(config, {
      address: contracts.goldigov.address as `0x${string}`,
      abi: contracts.goldigov.abi,
      functionName: 'proposals',
      args: [proposalId]
    })
    const thresholdResult: any = await readContract(config, {
      address: contracts.goldigov.address as `0x${string}`,
      abi: contracts.goldigov.abi,
      functionName: 'proposalThreshold',
      args: []
    })
    const proposerVotesResult = await readContract(config, {
      address: contracts.govlocks.address as `0x${string}`,
      abi: contracts.govlocks.abi,
      functionName: 'getVotes',
      args: [proposalResult[0]]
    })
    const threshold = parseFloat(formatEther(thresholdResult as unknown as bigint))
    const proposerVotes = parseFloat(formatEther(proposerVotesResult as unknown as bigint))

    const cancelResult = getProposalStateString(parseFloat(stateResult as unknown as string)) !== 'EXECUTED' && (proposalResult[0] === address || proposerVotes < threshold)
    const queueResult = getProposalStateString(parseFloat(stateResult as unknown as string)) === 'SUCCEEDED'
    const executeResult = getProposalStateString(parseFloat(stateResult as unknown as string)) === 'QUEUED'

    const response = {
      state: getProposalStateString(parseFloat(stateResult as unknown as string)),
      forVotes: parseFloat(formatEther(proposalResult[5] as unknown as bigint)),
      againstVotes: parseFloat(formatEther(proposalResult[6] as unknown as bigint)),
      abstainVotes: parseFloat(formatEther(proposalResult[7] as unknown as bigint)),
      eta: parseFloat(proposalResult[2]),
      cancel: cancelResult,
      queue: queueResult,
      execute: executeResult
    }

    setProposalInfoState(response)
    setProposalInfoLoadingState(false)
  }

  const getProposalStateString = (state: number): string => {
    if(state == 0) {
      return 'PENDING'
    }
    else if(state == 1) {
      return 'ACTIVE'
    }
    else if(state == 2) {
      return 'CANCELED'
    }
    else if(state == 3) {
      return 'DEFEATED'
    }
    else if(state == 4) {
      return 'SUCCEEDED'
    }
    else if(state == 5) {
      return 'QUEUED'
    }
    else if(state == 6) {
      return 'EXPIRED'
    }
    else {
      return 'EXECUTED'
    }
  }

  const refreshGovWalletInfo = async () => {
    if(address) {
      setWalletInfoLoadingState(true)
      const votesResult = await readContract(config, {
        address: contracts.govlocks.address as `0x${string}`,
        abi: contracts.govlocks.abi,
        functionName: 'getVotes',
        args: [address]
      })
      const balanceResult = await readContract(config, {
        address: contracts.govlocks.address as `0x${string}`,
        abi: contracts.govlocks.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const allowanceResult = await readContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.govlocks.abi,
        functionName: 'allowance',
        args: [address, contracts.govlocks.address]
      })
      const locksResult = await readContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.govlocks.abi,
        functionName: 'balanceOf',
        args: [address]
      })
  
      const response = {
        govlocks: parseFloat(formatEther(balanceResult as unknown as bigint)),
        locksGovlocksAllowance: parseFloat(formatEther(allowanceResult as unknown as bigint)),
        locks: parseFloat(formatEther(locksResult as unknown as bigint)),
        votes: parseFloat(formatEther(votesResult as unknown as bigint))
      }
      setGovWalletInfoState(response)
      setWalletInfoLoadingState(false)
    }
  }

  return (
    <GovContext.Provider
      value={{
        proposalInfo: proposalInfoState,
        proposals: proposalsState,
        title: titleState,
        setTitle: setTitleState,
        description: descriptionState,
        setDescription: setDescriptionState,
        target: targetState,
        setTarget: setTargetState,
        calldata: calldataState,
        setCalldata: setCalldataState,
        value: valueState,
        setValue: setValueState,
        proposeTab: proposeTabState,
        newProposalInfo: newProposalInfoState,
        govWalletInfo: govWalletInfoState,
        govlocksActiveToggle: govlocksActiveToggleState,
        changeGovlocksActiveToggle,
        govlocksDisplayString: govlocksDisplayStringState,
        setGovlocksDisplayString: setGovlocksDisplayStringState,
        handleGovlocksChange,
        handleGovlocksBalance,
        handleGovlocksBalanceClick,
        wrap: wrapState,
        unwrap: unwrapState,
        delegate: delegateState,
        setWrap: setWrapState,
        setUnwrap: setUnwrapState,
        setDelegate: setDelegateState,
        govlocksAllowanceButtons: govlocksAllowanceButtonsState,
        setGovlocksAllowanceButtons: setGovlocksAllowanceButtonsState,
        toggleProposalHover,
        removeUnderlines,
        addTitle,
        addAction,
        addBack,
        enableProposeError,
        enableProposeSuccess,
        refreshProposals,
        refreshProposalInfo,
        refreshGovWalletInfo,
        infoLoading: infoLoadingState,
        walletInfoLoading: walletInfoLoadingState,
        proposalInfoLoading: proposalInfoLoadingState,
        wutPopup: wutPopupState,
        setWutPopup: setWutPopupState
      }}
    >
      { children }
    </GovContext.Provider>
  )
}

export const useGov = () => useContext(GovContext)