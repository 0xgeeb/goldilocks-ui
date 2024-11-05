"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"
import { readContract, getPublicClient } from "@wagmi/core"
import { parseEther, formatEther } from "viem"
import { useAccount } from "wagmi"
import { useDebounce } from "../../hooks"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

const INITIAL_STATE: any = {

  goldivaultInfoHoneyWbera: {
    endTime: 0,
    vaultDeposits: 0,
    vaultAccumulated: 0,
    otLiquidity: 0
  },
  goldivaultWalletInfoHoneyWbera: {
    honeyWberaLP: 0,
    honeyWberaLPAllowance: 0,
    hwbot: 0,
    hwbyt: 0,
    wbera: 0,
    wberaRouterAllowance: 0
  },
  goldivaultInfoBhoney: {
    endTime: 0,
    concludeTime: 0,
    vaultDeposits: 0,
    accumulatedIbgt: 0,
    accumulatedHoney: 0,
    historicalUnderlyingApr: 0,
    fixedApr: 0,
    ytImpliedValue: 0,
    longYieldHistorical: 0,
    longYieldCurrent: 0,
    honeyBacking: 0,
    otLiquidity: 0,
    ytLiquidity: 0
  },
  goldivaultWalletInfoBhoney: {
    honey: 0,
    honeyAllowance: 0,
    bhot: 0,
    bhyt: 0,
    bhotRouterAllowance: 0,
    bhytRouterAllowance: 0,
    honeyRouterAllowance: 0
  },
  goldivaultWalletInfoWeeth: {
    honey: 0,
    weot: 0,
    weyt: 0,
    honeyRouterAllowance: 0,
    weotRouterAllowance: 0,
    weytRouterAllowance: 0,
    honeyVaultAllowance: 0
  },
  slippage: {
    amount: 1,
    toggle: false,
    displayString: '1'
  },
  changeSlippage: (_amount: number, _displayString: string) => {},
  changeSlippageToggle: (_toggle: boolean) => {},
  checkSlippageAmount: () => {},
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
  activeToggle: 'DEPOSIT',
  changeActiveToggle: (_toggle: string) => {},
  tradeDirection: 'OUT',
  setTradeDirection: (_direction: string) => {},
  deposit: 0,
  setDeposit: (_deposit: number) => {},
  debouncedDeposit: 0,
  redeemOT: 0,
  setRedeemOT: (_redeemOT: number) => {},
  debouncedRedeemOT: 0,
  redeemYT: 0,
  setRedeemYT: (_redeemYT: number) => {},
  redeemYTAmounts: {
    ibgt: 0,
    honey: 0,
    value: 0
  },
  resetYTAmounts: () => {},
  debouncedRedeemYT: 0,
  tradeInput: 0,
  setTradeInput: (_tradeInput: number) => {},
  tradeOutput: 0,
  setTradeOutput: (_tradeOutput: number) => {},
  debouncedTradeInput: 0,
  otAmount: 0,
  setOtAmount: (_otAmount: number) => {},
  ytAmount: 0,
  setYtAmount: (_ytAmount: number) => {},
  displayString: '',
  setDisplayString: (_displayString: string) => {},
  outputTokensLoading: false,
  setOutputTokensLoading: (_loading: boolean) => {},
  infoLoading: false,
  walletInfoLoading: false,
  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {},
  allowanceButtons: false,
  setAllowanceButtons: (_allowance: boolean) => {},
  handleChange: (_input: string) => {},
  handleBalanceClick: (_vault: string) => {},
  refreshGoldivaultInfoHoneyWbera: async () => {},
  refreshGoldivaultWalletInfoHoneyWbera: async () => {},
  refreshGoldivaultInfoBhoney: async () => {},
  refreshGoldivaultWalletInfoBhoney: async () => {},
  refreshGoldivaultInfoWeeth: async () => {},
  refreshGoldivaultWalletInfoWeeth: async () => {},
  calculateDeposit: async (_vault: string) => {},
  calculateOTRedeem: async () => {},
  calculateYTRedeem: async () => {},
  quoteSwap: async () => {},
  quoteV3Swap: async () => {},
  burnPopupToggle: false,
  setBurnPopupToggle: (_bool: boolean) => {},
  expirePopupToggle: false,
  setExpirePopupToggle: (_bool: boolean) => {},
  wutPopup: false,
  setWutPopup: (_popup: boolean) => {},
  poolsPopupToggle: false,
  setPoolsPopupToggle: (_bool: boolean) => {},
  infoPopupToggle: false,
  setInfoPopupToggle: (_bool: boolean) => {},
  flipTokens: () => {},
  enableInfoPopup: (_info: string) => {},
  disableInfoPopup: (_info: string) => {},
  infoPopupText: ''
}

const GoldivaultContext = createContext(INITIAL_STATE)

export const GoldivaultProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const { address } = useAccount()

  const [depositState, setDepositState] = useState<number>(INITIAL_STATE.deposit)
  const debouncedDepositState = useDebounce(depositState, 1000)
  const [redeemOTState, setRedeemOTState] = useState<number>(INITIAL_STATE.redeemOT)
  const debouncedRedeemOTState = useDebounce(redeemOTState, 1000)
  const [redeemYTState, setRedeemYTState] = useState<number>(INITIAL_STATE.redeemYT)
  const debouncedRedeemYTState = useDebounce(redeemYTState, 1000)
  const [redeemYTAmountsState, setRedeemYTAmountsState] = useState(INITIAL_STATE.redeemYTAmounts)
  const [tradeInputState, setTradeInputState] = useState<number>(INITIAL_STATE.tradeInput)
  const debouncedTradeInputState = useDebounce(tradeInputState, 1000)
  const [tradeOutputState, setTradeOutputState] = useState<number>(INITIAL_STATE.tradeOutput)
  const [slippageState, setSlippageState] = useState(INITIAL_STATE.slippage)
  const [goldivaultInfoHoneyWberaState, setGoldivaultInfoHoneyWberaState] = useState(INITIAL_STATE.goldivaultInfoHoneyWbera)
  const [goldivaultInfoBhoneyState, setGoldivaultInfoBhoneyState] = useState(INITIAL_STATE.goldivaultInfoBhoney)
  const [goldivaultWalletInfoHoneyWberaState, setGoldivaultWalletInfoHoneyWberaState] = useState(INITIAL_STATE.goldivaultWalletInfoHoneyWbera)
  const [goldivaultWalletInfoBhoneyState, setGoldivaultWalletInfoBhoneyState] = useState(INITIAL_STATE.goldivaultWalletInfoBhoney)
  const [goldivaultWalletInfoWeethState, setGoldivaultWalletInfoWeethState] = useState(INITIAL_STATE.goldivaultWalletInfoWeeth)
  const [notificationState, setNotificationState] = useState(INITIAL_STATE.notification)
  const [activeToggleState, setActiveToggleState] = useState<string>(INITIAL_STATE.activeToggle)
  const [tradeDirectionState, setTradeDirectionState] = useState<string>(INITIAL_STATE.tradeDirection)
  const [displayStringState, setDisplayStringState] = useState<string>(INITIAL_STATE.displayString)
  const [outputTokensLoadingState, setOutputTokensLoadingState] = useState<boolean>(INITIAL_STATE.outputTokensLoading)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(INITIAL_STATE.infoLoading)
  const [walletInfoLoadingState, setWalletInfoLoadingState] = useState<boolean>(INITIAL_STATE.walletInfoLoading)
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(INITIAL_STATE.txConfirming)
  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(INITIAL_STATE.allowanceButtons)
  const [otAmountState, setOtAmountState] = useState<number>(INITIAL_STATE.otAmount)
  const [ytAmountState, setYtAmountState] = useState<number>(INITIAL_STATE.ytAmount)
  const [burnPopupToggleState, setBurnPopupToggleState] = useState<boolean>(INITIAL_STATE.burnPopupToggle)
  const [expirePopupToggleState, setExpirePopupToggleState] = useState<boolean>(INITIAL_STATE.expirePopupToggle)
  const [poolsPopupToggleState, setPoolsPopupToggleState] = useState<boolean>(INITIAL_STATE.poolsPopupToggle)
  const [infoPopupToggleState, setInfoPopupToggleState] = useState<boolean>(INITIAL_STATE.infoPopupToggle)
  const [wutPopupState, setWutPopupState] = useState<boolean>(INITIAL_STATE.wutPopup)
  const [infoPopupTextState, setInfoPopupTextState] = useState<string>(INITIAL_STATE.infoPopupText)

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

  const refreshGoldivaultInfoHoneyWbera = async () => {
    setInfoLoadingState(true)
    const endTimeResult: any = await readContract(config, {
      address: contracts.honeywberagoldivault.address as `0x${string}`,
      abi: contracts.honeywberagoldivault.abi,
      functionName: 'endTime',
      args: []
    })
    const vaultIbgtResult = await readContract(config, {
      address: contracts.ibgt.address as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: 'balanceOf',
      args: [contracts.honeywberagoldivault.address]
    })
    const vaultStakedIbgtResult = await readContract(config, {
      address: contracts.ibgtVault.address as `0x${string}`,
      abi: contracts.ibgtVault.abi,
      functionName: 'balanceOf',
      args: [contracts.honeywberagoldivault.address]
    })
    const vaultEarnedIbgtResult = await readContract(config, {
      address: contracts.infraredVault.address as `0x${string}`,
      abi: contracts.infraredVault.abi,
      functionName: 'earned',
      args: [contracts.honeywberagoldivault.address, contracts.ibgt.address]
    })
    const vaultHoneyResult = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi,
      functionName: 'balanceOf',
      args: [contracts.honeywberagoldivault.address]
    })
    const vaultEarnedHoneyResult = await readContract(config, {
      address: contracts.ibgtVault.address as `0x${string}`,
      abi: contracts.ibgtVault.abi,
      functionName: 'earned',
      args: [contracts.honeywberagoldivault.address, contracts.honey.address]
    })
    const ibgtPriceResult: any = await readContract(config, {
      address: contracts.crocquery.address as `0x${string}`,
      abi: contracts.crocquery.abi,
      functionName: 'queryPrice',
      args: [contracts.honey.address, contracts.ibgt.address, 36000]
    })
    const two64 = 2 ** 64
    const sq = Number(ibgtPriceResult) / two64
    const ibgtPrice = sq * sq
    const ibgtValue = (parseFloat(formatEther(vaultIbgtResult as unknown as bigint)) + parseFloat(formatEther(vaultStakedIbgtResult as unknown as bigint)) + parseFloat(formatEther(vaultEarnedIbgtResult as unknown as bigint))) * ibgtPrice

    const vaultStakedBalance = await readContract(config, {
      address: contracts.infraredVault.address as `0x${string}`,
      abi: contracts.infraredVault.abi,
      functionName: 'balanceOf',
      args: [contracts.honeywberagoldivault.address]
    })
    const honeywberalpSupply = await readContract(config, {
      address: contracts.honeywberaLP.address as `0x${string}`,
      abi: contracts.honeywberaLP.abi, 
      functionName: 'totalSupply',
      args: []
    })
    const honeywberaLiquidity: any = await readContract(config, {
      address: contracts.biggayberaquery.address as `0x${string}`,
      abi: contracts.biggayberaquery.abi,
      functionName: 'queryPoolAmbientTokens',
      args: [contracts.honey.address, contracts.wbera.address, 36000]
    })
    const lpPrice = (parseFloat(formatEther(honeywberaLiquidity[1] as unknown as bigint))*2) / parseFloat(formatEther(honeywberalpSupply as unknown as bigint))
    const honeywberalpOTLiquidity = await readContract(config, {
      address: contracts.honeywberaLP.address as `0x${string}`,
      abi: contracts.honeywberaLP.abi, 
      functionName: 'balanceOf',
      args: ['0x1793d6Ca32A3b3a15f8E44265E96A1D135775dBC']
    })

    const response = {
      endTime: parseFloat(endTimeResult),
      vaultDeposits: parseFloat(formatEther(vaultStakedBalance as unknown as bigint)) * lpPrice,
      vaultAccumulated: ibgtValue + parseFloat(formatEther(vaultHoneyResult as unknown as bigint)) + parseFloat(formatEther(vaultEarnedHoneyResult as unknown as bigint)),
      otLiquidity: parseFloat(formatEther(honeywberalpOTLiquidity as unknown as bigint)) * lpPrice
    }
    setGoldivaultInfoHoneyWberaState(response)
    setInfoLoadingState(false)
  }

  const refreshGoldivaultWalletInfoHoneyWbera = async () => {
    if(address) {
      setWalletInfoLoadingState(true)
      const honeywberalpBalResult = await readContract(config, {
        address: contracts.honeywberaLP.address as `0x${string}`,
        abi: contracts.honeywberaLP.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const honeyWberaLPAllResult = await readContract(config, {
        address: contracts.honeywberaLP.address as `0x${string}`,
        abi: contracts.honeywberaLP.abi,
        functionName: 'allowance',
        args: [address, contracts.honeywberagoldivault.address]
      })
      const hwbotBalResult = await readContract(config, {
        address: contracts.hwbot.address as `0x${string}`,
        abi: contracts.hwbot.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const hwbytBalResult = await readContract(config, {
        address: contracts.hwbyt.address as `0x${string}`,
        abi: contracts.hwbyt.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const wberaBalResult = await readContract(config, {
        address: contracts.wbera.address as `0x${string}`,
        abi: contracts.wbera.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const wberaRouterAllResult = await readContract(config, {
        address: contracts.wbera.address as `0x${string}`,
        abi: contracts.wbera.abi,
        functionName: 'allowance',
        args: [address, '0xA954f73434D48df52040eC85b30209C53b560B6B']
      })

      const response = {
        honeyWberaLP: parseFloat(formatEther(honeywberalpBalResult as unknown as bigint)),
        honeyWberaLPAllowance: parseFloat(formatEther(honeyWberaLPAllResult as unknown as bigint)),
        hwbot: parseFloat(formatEther(hwbotBalResult as unknown as bigint)),
        hwbyt: parseFloat(formatEther(hwbytBalResult as unknown as bigint)),
        wbera: parseFloat(formatEther(wberaBalResult as unknown as bigint)),
        wberaRouterAllowance: parseFloat(formatEther(wberaRouterAllResult as unknown as bigint))
      }

      setGoldivaultWalletInfoHoneyWberaState(response)
      setWalletInfoLoadingState(false)
    }
  }

  const refreshGoldivaultInfoBhoney = async () => {
    setInfoLoadingState(true)
    const endTimeResult: any = await readContract(config, {
      address: contracts.bhoneygoldivault.address as `0x${string}`,
      abi: contracts.bhoneygoldivault.abi,
      functionName: 'endTime',
      args: []
    })
    const concludeTimeResult: any = await readContract(config, {
      address: contracts.bhoneygoldivault.address as `0x${string}`,
      abi: contracts.bhoneygoldivault.abi,
      functionName: 'concludeTime',
      args: []
    })
    const vaultBhoneyBal = await readContract(config, {
      address: contracts.bhoney.address as `0x${string}`,
      abi: contracts.bhoney.abi,
      functionName: 'balanceOf',
      args: [contracts.bhoneygoldivault.address]
    })
    const vaultBhoneyStakedBal = await readContract(config, {
      address: contracts.infraredBhoneyVault.address as `0x${string}`,
      abi: contracts.infraredBhoneyVault.abi,
      functionName: 'balanceOf',
      args: [contracts.bhoneygoldivault.address]
    })
    const vaultActualHoneyBal = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi,
      functionName: 'balanceOf',
      args: [contracts.bhoneygoldivault.address]
    })
    const vaultHoneyBal = await readContract(config, {
      address: contracts.bhoney.address as `0x${string}`,
      abi: contracts.bhoney.abi,
      functionName: 'convertToAssets',
      args: [parseEther(`${parseFloat(formatEther(vaultBhoneyBal as unknown as bigint)) + parseFloat(formatEther(vaultBhoneyStakedBal as unknown as bigint))}`)]
    })
    const vaultIbgtResult = await readContract(config, {
      address: contracts.ibgt.address as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: 'balanceOf',
      args: [contracts.bhoneygoldivault.address]
    })
    const vaultStakedIbgtResult = await readContract(config, {
      address: contracts.ibgtVault.address as `0x${string}`,
      abi: contracts.ibgtVault.abi,
      functionName: 'balanceOf',
      args: [contracts.bhoneygoldivault.address]
    })
    const vaultEarnedIbgtResult = await readContract(config, {
      address: contracts.infraredBhoneyVault.address as `0x${string}`,
      abi: contracts.infraredBhoneyVault.abi,
      functionName: 'earned',
      args: [contracts.bhoneygoldivault.address, contracts.ibgt.address]
    })
    const ibgtVaultEarnedHoneyResult = await readContract(config, {
      address: contracts.ibgtVault.address as `0x${string}`,
      abi: contracts.ibgtVault.abi,
      functionName: 'earned',
      args: [contracts.bhoneygoldivault.address, contracts.honey.address]
    })
    const ibgtPriceResult: any = await readContract(config, {
      address: contracts.crocquery.address as `0x${string}`,
      abi: contracts.crocquery.abi,
      functionName: 'queryPrice',
      args: [contracts.honey.address, contracts.ibgt.address, 36000]
    })
    const two64 = 2 ** 64
    const sq = Number(ibgtPriceResult) / two64
    const ibgtPrice = sq * sq
    const ibgtValue = (parseFloat(formatEther(vaultIbgtResult as unknown as bigint)) + parseFloat(formatEther(vaultStakedIbgtResult as unknown as bigint)) + parseFloat(formatEther(vaultEarnedIbgtResult as unknown as bigint))) * ibgtPrice

    const depositedTokens = await readContract(config, {
      address: contracts.bhoneygoldivault.address as `0x${string}`,
      abi: contracts.bhoneygoldivault.abi,
      functionName: 'depositTokenAmount',
      args: []
    })
    const bhoneyOTLiquidity = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi, 
      functionName: 'balanceOf',
      args: ['0x93EbA5530b64626FBE1403C07A9C7abb1af4464B']
    })
    const bhoneyYTLiquidity = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi, 
      functionName: 'balanceOf',
      args: ['0x948350e0Fe96Aa3c144C20B824bCee523D974966']
    })
    const bhotPriceResult = await readContract(config, {
      address: contracts.quoter.address as `0x${string}`,
      abi: contracts.quoter.abi,
      functionName: 'quoteExactInputSingleV2',
      args: [[contracts.bhot.address, contracts.honey.address, parseEther('1')]]
    })
    const bhytPriceResult = await readContract(config, {
      address: contracts.quoter.address as `0x${string}`,
      abi: contracts.quoter.abi,
      functionName: 'quoteExactInputSingleV2',
      args: [[contracts.bhyt.address, contracts.honey.address, parseEther('1')]]
    })
    const otTotalSupply = await readContract(config, {
      address: contracts.bhot.address as `0x${string}`,
      abi: contracts.bhot.abi,
      functionName: 'totalSupply',
      args: []
    })
    const accumulatedIbgtResponse = ibgtValue
    const accumulatedHoneyResponse = (parseFloat(formatEther(vaultHoneyBal as unknown as bigint)) + parseFloat(formatEther(vaultActualHoneyBal as unknown as bigint)) + parseFloat(formatEther(ibgtVaultEarnedHoneyResult as unknown as bigint))) - parseFloat(formatEther(depositedTokens as unknown as bigint))
    const vaultDepositsResponse = parseFloat(formatEther(vaultHoneyBal as unknown as bigint))
    const vaultAccumulatedResponse = accumulatedIbgtResponse + accumulatedHoneyResponse
    const givenDate = new Date('Oct 4, 2024 11:36:23 UTC')
    const currentDate = new Date()
    const diffInMilliseconds = currentDate.getTime() - givenDate.getTime()
    const daysDifference = diffInMilliseconds / (1000 * 60 * 60 * 24)
    const historicalUnderlyingAprResponse = ((vaultAccumulatedResponse / vaultDepositsResponse) * (365 / parseFloat(daysDifference.toFixed(2)))) * 100

    const timeDifference = (parseFloat(endTimeResult)*1000) - Date.now()
    const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24)
    const daysTil = parseFloat(fixedDaysDifference.toFixed(2))
    const fixedAprResponse = (((1 - parseFloat(formatEther(bhotPriceResult as unknown as bigint))) / 1) * 100) * (365 / daysTil)

    const ytImpliedValueResponse = (vaultAccumulatedResponse / parseFloat(formatEther(depositedTokens as unknown as bigint))) * (7 / daysDifference)
    const longYieldHistoricalResponse = (ytImpliedValueResponse - parseFloat(formatEther(bhytPriceResult as unknown as bigint))) / ytImpliedValueResponse * 100 * (365 / daysTil)
    const longYieldCurrentResponse = (0.57 - parseFloat(formatEther(bhytPriceResult as unknown as bigint))) / 0.57 * 100 * (365/ daysTil)

    const honeyBackingResponse = (parseFloat(formatEther(vaultHoneyBal as unknown as bigint)) + parseFloat(formatEther(vaultActualHoneyBal as unknown as bigint)) + parseFloat(formatEther(ibgtVaultEarnedHoneyResult as unknown as bigint))) / parseFloat(formatEther(otTotalSupply as unknown as bigint))

    const response = {
      endTime: parseFloat(endTimeResult),
      concludeTime: parseFloat(concludeTimeResult),
      vaultDeposits: vaultDepositsResponse,
      accumulatedIbgt: accumulatedIbgtResponse,
      accumulatedHoney: accumulatedHoneyResponse,
      historicalUnderlyingApr: historicalUnderlyingAprResponse,
      fixedApr: fixedAprResponse,
      ytImpliedValue: ytImpliedValueResponse,
      longYieldHistorical: longYieldHistoricalResponse,
      longYieldCurrent: longYieldCurrentResponse,
      honeyBacking: honeyBackingResponse,
      otLiquidity: parseFloat(formatEther(bhoneyOTLiquidity as unknown as bigint)),
      ytLiquidity: parseFloat(formatEther(bhoneyYTLiquidity as unknown as bigint))
    }
    setGoldivaultInfoBhoneyState(response)
    setInfoLoadingState(false)
  }
  
  const refreshGoldivaultWalletInfoBhoney = async () => {
    if(address) {
      setWalletInfoLoadingState(true)
      const honeyBalResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const honeyAllResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [address, contracts.bhoneygoldivault.address]
      })
      const bhotBalResult = await readContract(config, {
        address: contracts.bhot.address as `0x${string}`,
        abi: contracts.bhot.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const bhytBalResult = await readContract(config, {
        address: contracts.bhyt.address as `0x${string}`,
        abi: contracts.bhyt.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const bhotRouterAllResult = await readContract(config, {
        address: contracts.bhot.address as `0x${string}`,
        abi: contracts.bhot.abi,
        functionName: 'allowance',
        args: [address, contracts.router.address]
      })
      const bhytRouterAllResult = await readContract(config, {
        address: contracts.bhyt.address as `0x${string}`,
        abi: contracts.bhyt.abi,
        functionName: 'allowance',
        args: [address, contracts.router.address]
      })
      const honeyRouterAllResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [address, contracts.router.address]
      })

      const response = {
        honey: parseFloat(formatEther(honeyBalResult as unknown as bigint)),
        honeyAllowance: parseFloat(formatEther(honeyAllResult as unknown as bigint)),
        bhot: parseFloat(formatEther(bhotBalResult as unknown as bigint)),
        bhyt: parseFloat(formatEther(bhytBalResult as unknown as bigint)),
        bhotRouterAllowance: parseFloat(formatEther(bhotRouterAllResult as unknown as bigint)),
        bhytRouterAllowance: parseFloat(formatEther(bhytRouterAllResult as unknown as bigint)),
        honeyRouterAllowance: parseFloat(formatEther(honeyRouterAllResult as unknown as bigint))
      }

      setGoldivaultWalletInfoBhoneyState(response)
      setWalletInfoLoadingState(false)
    }
  }

  const refreshGoldivaultInfoWeeth = async () => {
    setInfoLoadingState(false)
  }

  const refreshGoldivaultWalletInfoWeeth = async () => {
    if(address) {
      setWalletInfoLoadingState(true)
      const honeyBalResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const weotBalResult = await readContract(config, {
        address: contracts.weot.address as `0x${string}`,
        abi: contracts.weot.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const weytBalResult = await readContract(config, {
        address: contracts.weyt.address as `0x${string}`,
        abi: contracts.weyt.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const honeyAllResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [address, contracts.routerv2.address]
      })
      const honeyVaultAllResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [address, contracts.weethVault.address]
      })
      const weotAllResult = await readContract(config, {
        address: contracts.weot.address as `0x${string}`,
        abi: contracts.weot.abi,
        functionName: 'allowance',
        args: [address, contracts.routerv2.address]
      })
      const weytAllResult = await readContract(config, {
        address: contracts.weyt.address as `0x${string}`,
        abi: contracts.weyt.abi,
        functionName: 'allowance',
        args: [address, contracts.routerv2.address]
      })

      const response = {
        honey: parseFloat(formatEther(honeyBalResult as unknown as bigint)),
        weot: parseFloat(formatEther(weotBalResult as unknown as bigint)),
        weyt: parseFloat(formatEther(weytBalResult as unknown as bigint)),
        honeyRouterAllowance: parseFloat(formatEther(honeyAllResult as unknown as bigint)),
        weotRouterAllowance: parseFloat(formatEther(weotAllResult as unknown as bigint)),
        weytRouterAllowance: parseFloat(formatEther(weytAllResult as unknown as bigint)),
        honeyVaultAllowance: parseFloat(formatEther(honeyVaultAllResult as unknown as bigint))
      }

      setGoldivaultWalletInfoWeethState(response)
      setWalletInfoLoadingState(false)
    }
  }

  const handleChange = (input: string) => {
    if(activeToggleState === 'DEPOSIT') {
      setDisplayStringState(input)
      !input ? setDepositState(0) : setDepositState(parseFloat(input))
      !input && setAllowanceButtonsState(false)
      setOutputTokensLoadingState(true)
    }
    else if(activeToggleState === 'REDEEMOT') {
      setDisplayStringState(input)
      !input ? setRedeemOTState(0) : setRedeemOTState(parseFloat(input))
      !input && setAllowanceButtonsState(false)
      setOutputTokensLoadingState(true)
    }
    else if(activeToggleState === 'REDEEMYT') {
      setDisplayStringState(input)
      !input ? setRedeemYTState(0) : setRedeemYTState(parseFloat(input))
      !input && setAllowanceButtonsState(false)
      setOutputTokensLoadingState(true)
    }
    else {
      setDisplayStringState(input)
      !input ? setTradeInputState(0) : setTradeInputState(parseFloat(input))
      !input && setAllowanceButtonsState(false)
      setOutputTokensLoadingState(true)
    }
  }

  const handleBalanceClick = (vault: string) => {
    if(vault === 'honeywbera') {
      if(activeToggleState === 'DEPOSIT') {
        setDisplayStringState(goldivaultWalletInfoHoneyWberaState.honeyWberaLP.toFixed(4))
        setDepositState(goldivaultWalletInfoHoneyWberaState.honeyWberaLP)
        setOutputTokensLoadingState(true)
      }
      else if(activeToggleState === 'REDEEMOT') {
        setDisplayStringState(goldivaultWalletInfoHoneyWberaState.hwbot.toFixed(4))
        setRedeemOTState(goldivaultWalletInfoHoneyWberaState.hwbot)
        setOutputTokensLoadingState(true)
      }
      else if(activeToggleState === 'REDEEMYT') {
        setDisplayStringState(goldivaultWalletInfoHoneyWberaState.hwbyt.toFixed(4))
        setRedeemYTState(goldivaultWalletInfoHoneyWberaState.hwbyt)
        setOutputTokensLoadingState(true)
      }
      else {
        setDisplayStringState(goldivaultWalletInfoHoneyWberaState.wbera.toFixed(4))
        setTradeInputState(goldivaultWalletInfoHoneyWberaState.wbera)
        setOutputTokensLoadingState(true)
      }
    }
    else if(vault === 'weeth') {
      if(activeToggleState === 'DEPOSIT') {
        setDisplayStringState(goldivaultWalletInfoWeethState.honey.toFixed(4))
        setDepositState(goldivaultWalletInfoWeethState.honey)
        setOutputTokensLoadingState(true)
      }
      else if(activeToggleState === 'REDEEMOT') {
        setDisplayStringState(goldivaultWalletInfoWeethState.weot.toFixed(4))
        setRedeemOTState(goldivaultWalletInfoWeethState.weot)
        setOutputTokensLoadingState(true)
      }
      else {
        let num
        if(activeToggleState === 'TRADEOT') {
          if(tradeDirectionState === 'OUT') {
            num = goldivaultWalletInfoWeethState.weot
          }
          else {
            num = goldivaultWalletInfoWeethState.honey
          }
        }
        else {
          if(tradeDirectionState === 'OUT') {
            num = goldivaultWalletInfoWeethState.weyt
          }
          else {
            num = goldivaultWalletInfoWeethState.honey
          }
        }
        setDisplayStringState(num.toFixed(4))
        setTradeInputState(num)
        setOutputTokensLoadingState(true)
      }
    }
    else {
      if(activeToggleState === 'DEPOSIT') {
        setDisplayStringState(goldivaultWalletInfoBhoneyState.honey.toFixed(4))
        setDepositState(goldivaultWalletInfoBhoneyState.honey)
        setOutputTokensLoadingState(true)
      }
      else if(activeToggleState === 'REDEEMOT') {
        setDisplayStringState(goldivaultWalletInfoBhoneyState.bhot.toFixed(4))
        setRedeemOTState(goldivaultWalletInfoBhoneyState.bhot)
        setOutputTokensLoadingState(true)
      }
      else if(activeToggleState === 'REDEEMYT') {
        setDisplayStringState(goldivaultWalletInfoBhoneyState.bhyt.toFixed(4))
        setRedeemYTState(goldivaultWalletInfoBhoneyState.bhyt)
        setOutputTokensLoadingState(true)
      }
      else {
        let num
        if(activeToggleState === 'TRADEOT') {
          if(tradeDirectionState === 'OUT') {
            num = goldivaultWalletInfoBhoneyState.bhot
          }
          else {
            num = goldivaultWalletInfoBhoneyState.honey
          }
        }
        else {
          if(tradeDirectionState === 'OUT') {
            num = goldivaultWalletInfoBhoneyState.bhyt
          }
          else {
            num = goldivaultWalletInfoBhoneyState.honey
          }
        }
        setDisplayStringState(num.toFixed(4))
        setTradeInputState(num)
        setOutputTokensLoadingState(true)
      }
    }
  }

  const flipTokens = () => {
    setDisplayStringState('')
    setTradeInputState(0)
    setTradeOutputState(0)
    setAllowanceButtonsState(false)
    if(tradeDirectionState === 'OUT') {
      setTradeDirectionState('IN')
    }
    else {
      setTradeDirectionState('OUT')
    }
  }

  const calculateDeposit = async (vault: string) => {
    let depositResult
    if(vault === 'honeywbera') {
      depositResult = await readContract(config, {
        address: contracts.honeywberagoldivault.address as `0x${string}`,
        abi: contracts.honeywberagoldivault.abi,
        functionName: 'calculateDeposit',
        args: [parseEther(`${debouncedDepositState}`)]
      })
    }
    if(vault === 'weeth') {
      depositResult = await readContract(config, {
        address: contracts.weethVault.address as `0x${string}`,
        abi: contracts.weethVault.abi,
        functionName: 'calculateDeposit',
        args: [parseEther(`${debouncedDepositState}`)]
      })
    }
    else {
      depositResult = await readContract(config, {
        address: contracts.bhoneygoldivault.address as `0x${string}`,
        abi: contracts.bhoneygoldivault.abi,
        functionName: 'calculateDeposit',
        args: [parseEther(`${debouncedDepositState}`)]
      })
    }
    setOtAmountState(depositState)
    setYtAmountState(parseFloat(formatEther(depositResult as unknown as bigint)))
    setOutputTokensLoadingState(false)
  }

  const calculateOTRedeem = async () => {
    const redeemResult = await readContract(config, {
      address: contracts.honeywberagoldivault.address as `0x${string}`,
      abi: contracts.honeywberagoldivault.abi,
      functionName: 'calculateDeposit',
      args: [parseEther(`${debouncedRedeemOTState}`)]
    })
    const client = getPublicClient(config)
    const block: any = await client.getBlock()
    if(parseInt(block.timestamp.toString(), 16) < parseInt(goldivaultInfoHoneyWberaState.endTime.toString(), 16)) {
      setOtAmountState(debouncedRedeemOTState * 0.97)
    }
    else {
      setOtAmountState(debouncedRedeemOTState)
    }
    setYtAmountState(parseFloat(formatEther(redeemResult as unknown as bigint)))
    setOutputTokensLoadingState(false)
  }

  const calculateYTRedeem = async () => {
    const ytTotalSupply = await readContract(config, {
      address: contracts.bhyt.address as `0x${string}`,
      abi: contracts.bhyt.abi,
      functionName: 'totalSupply',
      args: []
    })

    const ibgtResponse = goldivaultInfoBhoneyState.accumulatedIbgt * (debouncedRedeemYTState / parseFloat(formatEther(ytTotalSupply as unknown as bigint)))
    const honeyResponse = goldivaultInfoBhoneyState.accumulatedHoney * (debouncedRedeemYTState / parseFloat(formatEther(ytTotalSupply as unknown as bigint)))
    const response = {
      ibgt: ibgtResponse,
      honey: honeyResponse,
      value: ibgtResponse + honeyResponse
    }
    setRedeemYTAmountsState(response)
    setOutputTokensLoadingState(false)
  }

  const resetYTAmounts = () => {
    const response = {
      ibgt: 0,
      honey: 0,
      value: 0
    }

    setRedeemYTAmountsState(response)
  }

  const quoteSwap = async () => {
    let pathOne
    let pathTwo
    if(activeToggleState === 'TRADEOT') {
      if(tradeDirectionState === 'OUT') {
        pathOne = contracts.bhot.address
        pathTwo = contracts.honey.address
      }
      else {
        pathOne = contracts.honey.address
        pathTwo = contracts.bhot.address
      }
    }
    else {
      if(tradeDirectionState === 'OUT') {
        pathOne = contracts.bhyt.address
        pathTwo = contracts.honey.address
      }
      else {
        pathOne = contracts.honey.address
        pathTwo = contracts.bhyt.address
      }
    }
    const bhotPriceResult = await readContract(config, {
      address: contracts.quoter.address as `0x${string}`,
      abi: contracts.quoter.abi,
      functionName: 'quoteExactInputSingleV2',
      args: [[pathOne, pathTwo, parseEther(tradeInputState.toString())]]
    })

    setTradeOutputState(parseFloat(formatEther(bhotPriceResult as unknown as bigint)))
    setOutputTokensLoadingState(false)
  }

  const quoteV3Swap = async () => {
    if(activeToggleState === 'TRADEOT') {
      let quoteResult: any
      if(tradeDirectionState === 'OUT') {
        quoteResult = await readContract(config, {
          address: contracts.quoterv2.address as `0x${string}`,
          abi: contracts.quoterv2.abi,
          functionName: 'quoteExactInputSingle',
          args: [[
            contracts.weot.address,
            contracts.honey.address,
            parseEther(tradeInputState.toString()),
            3000,
            0
          ]]
        })
      }
      else {
        quoteResult = await readContract(config, {
          address: contracts.quoterv2.address as `0x${string}`,
          abi: contracts.quoterv2.abi,
          functionName: 'quoteExactInputSingle',
          args: [[
            contracts.honey.address,
            contracts.weot.address,
            parseEther(tradeInputState.toString()),
            3000,
            0
          ]]
        })
      }

      setTradeOutputState(parseFloat(formatEther(quoteResult[0] as unknown as bigint)))
      setOutputTokensLoadingState(false)
    }
    else {
      const client = getPublicClient(config)
      const blockResult: any = await client.getBlock()
      const timestamp = parseFloat(blockResult.timestamp)
      const endTimeResult: any = await readContract(config, {
        address: contracts.weethVault.address as `0x${string}`,
        abi: contracts.weethVault.abi,
        functionName: 'endTime',
        args: []
      })
      const endTime = parseFloat(endTimeResult)
      const durationResult: any = await readContract(config, {
        address: contracts.weethVault.address as `0x${string}`,
        abi: contracts.weethVault.abi,
        functionName: 'duration',
        args: []
      })
      const duration = parseFloat(durationResult)
      const remainingTime = timestamp > endTime ? 0 : endTime - timestamp
      const ratio = remainingTime / duration
      const quoteResult: any = await readContract(config, {
        address: contracts.quoterv2.address as `0x${string}`,
        abi: contracts.quoterv2.abi,
        functionName: 'quoteExactInputSingle',
        args: [[
          contracts.weot.address,
          contracts.honey.address,
          parseEther('1'),
          3000,
          0
        ]]
      })
      const otPrice = parseFloat(formatEther(quoteResult[0] as unknown as bigint))
      const ytPrice = (1 - otPrice) / ratio
      if(tradeDirectionState === 'OUT') {
        setTradeOutputState(tradeInputState * ytPrice)
      }
      else {
        setTradeOutputState(tradeInputState / ytPrice)
      }
      setOutputTokensLoadingState(false)
    }
  }

  const openNotification = (toggle: boolean, action: string, result: string, hash: string) => {
    setNotificationState((prevState: any) => ({
      toggle,
      action,
      result,
      hash
    }))
  }

  const changeActiveToggle = (toggle: string) => {
    setDisplayStringState('')
    setDepositState(0)
    setRedeemOTState(0)
    setOtAmountState(0)
    setYtAmountState(0)
    setTradeInputState(0)
    setTradeOutputState(0)
    const response = {
      ibgt: 0,
      honey: 0,
      value: 0
    }
    setRedeemYTAmountsState(response)
    setAllowanceButtonsState(false)
    setOutputTokensLoadingState(false)
    setActiveToggleState(toggle)
  }

  const enableInfoPopup = (info: string) => {
    if(info === 'tvl') {
      setInfoPopupTextState('Total value of all assets deposited to vault and the yield it has accumulated so far')
      setInfoPopupToggleState(true)
    }
    if(info === 'yield') {
      setInfoPopupTextState('Total yield accumulated by this vault over its lifetime')
      setInfoPopupToggleState(true)
    }
    if(info === 'historicalapr') {
      setInfoPopupTextState('Estimate of APR of underlying protocol based on yield since beginning of vault')
      setInfoPopupToggleState(true)
    }
    if(info === 'currentapr') {
      setInfoPopupTextState("Underlying protocol's current estimate of its APR")
      setInfoPopupToggleState(true)
    }
    if(info === 'fixedapr') {
      setInfoPopupTextState('Guaranteed annualized APR for buying OT and holding until expiry, assuming positive yield')
      setInfoPopupToggleState(true)
    }
    if(info === 'ytimpliedvaluehistorical') {
      setInfoPopupTextState('Estimate of value of one YT based on yield accrued by vault over its lifetime')
      setInfoPopupToggleState(true)
    }
    if(info === 'ytimpliedvaluecurrent') {
      setInfoPopupTextState('Estimate of value of one YT based on the underlying protocol estimated yield')
      setInfoPopupToggleState(true)
    }
    if(info === 'longyieldhistorical') {
      setInfoPopupTextState('Estimated annualized return of buying YT at current market price, given YT historical implied value')
      setInfoPopupToggleState(true)
    }
    if(info === 'longyieldaprcurrent') {
      setInfoPopupTextState('Estimated annualized return of buying YT at current market price, given YT current implied value')
      setInfoPopupToggleState(true)
    }
    if(info === 'otlpapr') {
      setInfoPopupTextState('Current APR for LPing the OT/Honey pair and staking LP token on Beradrome')
      setInfoPopupToggleState(true)
    }
    if(info === 'ytlpapr') {
      setInfoPopupTextState('Current APR for LPing the YT/Honey pair and staking LP token on Beradrome')
      setInfoPopupToggleState(true)
    }
    if(info === 'pointsmultiplier') {
      setInfoPopupTextState('Boosted Etherfi points multiplier given to YT holders')
      setInfoPopupToggleState(true)
    }
    if(info === 'pointsperyt') {
      setInfoPopupTextState('Amount of Etherfi points assigned to 1 YT at expiration of the vault')
      setInfoPopupToggleState(true)
    }
    if(info === 'pointsleverage') {
      setInfoPopupTextState('Effective Etherfi points leverage achieved by holding 1 YT')
      setInfoPopupToggleState(true)
    }
  }

  const disableInfoPopup = (info: string) => {
    setInfoPopupTextState('')
    setInfoPopupToggleState(false)
  }

  return (
    <GoldivaultContext.Provider
      value={{
        goldivaultInfoHoneyWbera: goldivaultInfoHoneyWberaState,
        goldivaultWalletInfoHoneyWbera: goldivaultWalletInfoHoneyWberaState,
        goldivaultInfoBhoney: goldivaultInfoBhoneyState,
        goldivaultWalletInfoBhoney: goldivaultWalletInfoBhoneyState,
        goldivaultWalletInfoWeeth: goldivaultWalletInfoWeethState,
        slippage: slippageState,
        refreshGoldivaultInfoHoneyWbera,
        refreshGoldivaultWalletInfoHoneyWbera,
        refreshGoldivaultInfoBhoney,
        refreshGoldivaultWalletInfoBhoney,
        refreshGoldivaultInfoWeeth,
        refreshGoldivaultWalletInfoWeeth,
        deposit: depositState,
        setDeposit: setDepositState,
        debouncedDeposit: debouncedDepositState,
        redeemOT: redeemOTState,
        setRedeemOT: setRedeemOTState,
        debouncedRedeemOT: debouncedRedeemOTState,
        redeemYT: redeemYTState,
        setRedeemYT: setRedeemYTState,
        debouncedRedeemYT: debouncedRedeemYTState,
        redeemYTAmounts: redeemYTAmountsState,
        resetYTAmounts,
        tradeInput: tradeInputState,
        setTradeInput: setTradeInputState,
        debouncedTradeInput: debouncedTradeInputState,
        tradeOutput: tradeOutputState,
        setTradeOutput: setTradeOutputState,
        changeSlippage,
        changeSlippageToggle,
        checkSlippageAmount,
        notification: notificationState,
        openNotification,
        activeToggle: activeToggleState,
        changeActiveToggle,
        tradeDirection: tradeDirectionState,
        setTradeDirection: setTradeDirectionState,
        otAmount: otAmountState,
        setOtAmount: setOtAmountState,
        ytAmount: ytAmountState,
        setYtAmount: setYtAmountState,
        displayString: displayStringState,
        setDisplayString: setDisplayStringState,
        outputTokensLoading: outputTokensLoadingState,
        setOutputTokensLoading: setOutputTokensLoadingState,
        infoLoading: infoLoadingState,
        walletInfoLoading: walletInfoLoadingState,
        txConfirming: txConfirmingState,
        setTxConfirming: setTxConfirmingState,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
        handleChange,
        handleBalanceClick,
        calculateDeposit,
        calculateOTRedeem,
        calculateYTRedeem,
        quoteSwap,
        quoteV3Swap,
        burnPopupToggle: burnPopupToggleState,
        setBurnPopupToggle: setBurnPopupToggleState,
        expirePopupToggle: expirePopupToggleState,
        setExpirePopupToggle: setExpirePopupToggleState,
        poolsPopupToggle: poolsPopupToggleState,
        setPoolsPopupToggle: setPoolsPopupToggleState,
        infoPopupToggle: infoPopupToggleState,
        setInfoPopupToggle: setInfoPopupToggleState,
        wutPopup: wutPopupState,
        setWutPopup: setWutPopupState,
        flipTokens,
        enableInfoPopup,
        disableInfoPopup,
        infoPopupText: infoPopupTextState
      }}
    >
      { children }
    </GoldivaultContext.Provider>
  )
}

export const useGoldivault = () => useContext(GoldivaultContext)