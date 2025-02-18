"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { readContract, getPublicClient } from "@wagmi/core";
import { parseEther, formatEther, parseUnits, formatUnits } from "viem";
import { useAccount } from "wagmi";
import { useDebounce } from "../../hooks";
import { config } from "../../providers/WagmiProvider";
import { contracts } from "../../utils/addressi";
import { EtherfiAPIResponse } from "../../utils/interfaces";

const INITIAL_STATE: any = {
  goldivaultInfoHoneyWbera: {
    endTime: 0,
    vaultDeposits: 0,
    vaultAccumulated: 0,
    otLiquidity: 0,
  },
  goldivaultWalletInfoHoneyWbera: {
    honeyWberaLP: 0,
    honeyWberaLPAllowance: 0,
    hwbot: 0,
    hwbyt: 0,
    wbera: 0,
    wberaRouterAllowance: 0,
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
    ytLiquidity: 0,
  },
  goldivaultWalletInfoBhoney: {
    honey: 0,
    honeyAllowance: 0,
    bhot: 0,
    bhyt: 0,
    bhotRouterAllowance: 0,
    bhytRouterAllowance: 0,
    honeyRouterAllowance: 0,
  },
  goldivaultInfoWeeth: {
    endTime: 0,
    vaultDeposits: 0,
    fixedApr: 0,
    impliedYield: 0,
    leverage: 0,
    otLiquidity: 0,
    durationRatio: 0,
    restakingYield: 0,
  },
  goldivaultWalletInfoWeeth: {
    weeth: 0,
    weot: 0,
    weyt: 0,
    weethRouterAllowance: 0,
    weotRouterAllowance: 0,
    weytRouterAllowance: 0,
    weethVaultAllowance: 0,
  },
  goldivaultInfoSolvbtc: {
    endTime: 0,
    fixedApr: 0,
    otLiquidity: 0,
  },
  goldivaultWalletInfoSolvbtc: {
    solvbtc: 0,
    solvbtcAllowance: 0,
    solvbtcot: 0,
    solvbtcyt: 0,
  },
  goldivaultInfoUnibtc: {
    endTime: 0,
    fixedApr: 0,
    otLiquidity: 0,
    bedrockLeverage: 0,
    babylonLeverage: 0,
    restakingYield: 0,
  },
  goldivaultWalletInfoUnibtc: {
    unibtc: 0,
    unibtcAllowance: 0,
    unibtcot: 0,
    unibtcyt: 0,
  },
  goldivaultInfoRusd: {
    endTime: 0,
    fixedApr: 0,
    otLiquidity: 0,
    reservoirLeverage: 0,
  },
  goldivaultWalletInfoRusd: {
    rusd: 0,
    rusdAllowance: 0,
    rusdot: 0,
    rusdyt: 0,
  },
  vaultDisplayInfo: {
    weeth: {
      fixedApr: 0,
      daysTil: "",
      liquidity: 0,
      ytPrice: 0,
    },
    rseth: {
      fixedApr: 0,
      daysTil: "",
      liquidity: 0,
      ytPrice: 0,
    },
    ebtc: {
      fixedApr: 0,
      daysTil: "",
      liquidity: 0,
      ytPrice: 0,
    },
    unibtc: {
      fixedApr: 0,
      daysTil: "",
      liquidity: 0,
      ytPrice: 0,
    },
    solvbtc: {
      fixedApr: 0,
      daysTil: "",
      liquidity: 0,
      ytPrice: 0,
    },
    rusd: {
      fixedApr: 0,
      daysTil: "",
      liquidity: 0,
      ytPrice: 0,
    },
  },
  slippage: {
    amount: 1,
    toggle: false,
    displayString: "1",
  },
  debouncedSlippage: 0,
  changeSlippage: (_amount: number, _displayString: string) => {},
  changeSlippageToggle: (_toggle: boolean) => {},
  checkSlippageAmount: () => {},
  notification: {
    toggle: false,
    action: "",
    result: "",
    hash: "",
  },
  openNotification: (
    _toggle: boolean,
    _action: string,
    _result: string,
    _hash: string,
  ) => {},
  activeToggle: "DEPOSIT",
  changeActiveToggle: (_toggle: string) => {},
  tradeDirection: "OUT",
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
    value: 0,
  },
  resetYTAmounts: () => {},
  debouncedRedeemYT: 0,
  tradeInput: 0,
  setTradeInput: (_tradeInput: number) => {},
  tradeOutput: 0,
  setTradeOutput: (_tradeOutput: number) => {},
  debouncedTradeInput: 0,
  vaultSwapTxAmount: 0,
  calledDtAmountMin: 0,
  priceImpact: 0,
  impliedApr: 0,
  honeyApprovalAmount: 0,
  otApprovalAmount: 0,
  otAmount: 0,
  setOtAmount: (_otAmount: number) => {},
  ytAmount: 0,
  setYtAmount: (_ytAmount: number) => {},
  displayString: "",
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
  refreshGoldivaultInfoSolvbtc: async () => {},
  refreshGoldivaultWalletInfoSolvbtc: async () => {},
  refreshGoldivaultInfoUnibtc: async () => {},
  refreshGoldivaultWalletInfoUnibtc: async () => {},
  refreshGoldivaultInfoRusd: async () => {},
  refreshGoldivaultWalletInfoRusd: async () => {},
  refreshVaultDisplayInfo: async () => {},
  calculateDeposit: async (_vault: string) => {},
  calculateOTRedeem: async (_vault: string) => {},
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
  infoPopupText: "",
  checkVaultLiquidity: async () => false,
};

const GoldivaultContext = createContext(INITIAL_STATE);

export const GoldivaultProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const { address } = useAccount();

  const [depositState, setDepositState] = useState<number>(
    INITIAL_STATE.deposit,
  );
  const debouncedDepositState = useDebounce(depositState, 1000);
  const [redeemOTState, setRedeemOTState] = useState<number>(
    INITIAL_STATE.redeemOT,
  );
  const debouncedRedeemOTState = useDebounce(redeemOTState, 1000);
  const [redeemYTState, setRedeemYTState] = useState<number>(
    INITIAL_STATE.redeemYT,
  );
  const debouncedRedeemYTState = useDebounce(redeemYTState, 1000);
  const [redeemYTAmountsState, setRedeemYTAmountsState] = useState(
    INITIAL_STATE.redeemYTAmounts,
  );
  const [tradeInputState, setTradeInputState] = useState<number>(
    INITIAL_STATE.tradeInput,
  );
  const debouncedTradeInputState = useDebounce(tradeInputState, 1000);
  const [tradeOutputState, setTradeOutputState] = useState<number>(
    INITIAL_STATE.tradeOutput,
  );
  const [vaultSwapTxAmountState, setVaultSwapTxAmountState] = useState<number>(
    INITIAL_STATE.vaultSwapTxAmount,
  );
  const [calledDtAmountMinState, setCalledDtAmountMin] = useState<number>(
    INITIAL_STATE.calledDtAmountMin,
  );
  const [priceImpactState, setPriceImpactState] = useState<number>(
    INITIAL_STATE.priceImpact,
  );
  const [impliedAprState, setImpliedAprState] = useState<number>(
    INITIAL_STATE.impliedApr,
  );
  const [honeyApprovalAmountState, setHoneyApprovalAmountState] =
    useState<number>(INITIAL_STATE.honeyApprovalAmount);
  const [otApprovalAmountState, setOtApprovalAmountState] = useState<number>(
    INITIAL_STATE.otApprovalAmount,
  );
  const [slippageState, setSlippageState] = useState(INITIAL_STATE.slippage);
  const debouncedSlippageState = useDebounce(slippageState.amount, 1000);
  const [goldivaultInfoHoneyWberaState, setGoldivaultInfoHoneyWberaState] =
    useState(INITIAL_STATE.goldivaultInfoHoneyWbera);
  const [goldivaultInfoBhoneyState, setGoldivaultInfoBhoneyState] = useState(
    INITIAL_STATE.goldivaultInfoBhoney,
  );
  const [goldivaultInfoWeethState, setGoldivaultInfoWeethState] = useState(
    INITIAL_STATE.goldivaultInfoWeeth,
  );
  const [
    goldivaultWalletInfoHoneyWberaState,
    setGoldivaultWalletInfoHoneyWberaState,
  ] = useState(INITIAL_STATE.goldivaultWalletInfoHoneyWbera);
  const [goldivaultWalletInfoBhoneyState, setGoldivaultWalletInfoBhoneyState] =
    useState(INITIAL_STATE.goldivaultWalletInfoBhoney);
  const [goldivaultWalletInfoWeethState, setGoldivaultWalletInfoWeethState] =
    useState(INITIAL_STATE.goldivaultWalletInfoWeeth);
  const [goldivaultInfoSolvbtcState, setGoldivaultInfoSolvbtcState] = useState(
    INITIAL_STATE.goldivaultInfoSolvbtc,
  );
  const [
    goldivaultWalletInfoSolvbtcState,
    setGoldivaultWalletInfoSolvbtcState,
  ] = useState(INITIAL_STATE.goldivaultWalletInfoSolvbtc);
  const [goldivaultInfoUnibtcState, setGoldivaultInfoUnibtcState] = useState(
    INITIAL_STATE.goldivaultInfoUnibtc,
  );
  const [goldivaultWalletInfoUnibtcState, setGoldivaultWalletInfoUnibtcState] =
    useState(INITIAL_STATE.goldivaultWalletInfoUnibtc);
  const [goldivaultInfoRusdState, setGoldivaultInfoRusdState] = useState(
    INITIAL_STATE.goldivaultInfoRusd,
  );
  const [goldivaultWalletInfoRusdState, setGoldivaultWalletInfoRusdState] =
    useState(INITIAL_STATE.goldivaultWalletInfoRusd);
  const [vaultDisplayInfoState, setVaultDisplayInfoState] = useState(
    INITIAL_STATE.vaultDisplayInfo,
  );
  const [notificationState, setNotificationState] = useState(
    INITIAL_STATE.notification,
  );
  const [activeToggleState, setActiveToggleState] = useState<string>(
    INITIAL_STATE.activeToggle,
  );
  const [tradeDirectionState, setTradeDirectionState] = useState<string>(
    INITIAL_STATE.tradeDirection,
  );
  const [displayStringState, setDisplayStringState] = useState<string>(
    INITIAL_STATE.displayString,
  );
  const [outputTokensLoadingState, setOutputTokensLoadingState] =
    useState<boolean>(INITIAL_STATE.outputTokensLoading);
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(
    INITIAL_STATE.infoLoading,
  );
  const [walletInfoLoadingState, setWalletInfoLoadingState] = useState<boolean>(
    INITIAL_STATE.walletInfoLoading,
  );
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(
    INITIAL_STATE.txConfirming,
  );
  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(
    INITIAL_STATE.allowanceButtons,
  );
  const [otAmountState, setOtAmountState] = useState<number>(
    INITIAL_STATE.otAmount,
  );
  const [ytAmountState, setYtAmountState] = useState<number>(
    INITIAL_STATE.ytAmount,
  );
  const [burnPopupToggleState, setBurnPopupToggleState] = useState<boolean>(
    INITIAL_STATE.burnPopupToggle,
  );
  const [expirePopupToggleState, setExpirePopupToggleState] = useState<boolean>(
    INITIAL_STATE.expirePopupToggle,
  );
  const [poolsPopupToggleState, setPoolsPopupToggleState] = useState<boolean>(
    INITIAL_STATE.poolsPopupToggle,
  );
  const [infoPopupToggleState, setInfoPopupToggleState] = useState<boolean>(
    INITIAL_STATE.infoPopupToggle,
  );
  const [wutPopupState, setWutPopupState] = useState<boolean>(
    INITIAL_STATE.wutPopup,
  );
  const [infoPopupTextState, setInfoPopupTextState] = useState<string>(
    INITIAL_STATE.infoPopupText,
  );

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${month}-${day}-${year}`;
  };

  const getRelativeDate = (timestamp: number): string => {
    const now = Date.now();
    const diffInMilliseconds = timestamp * 1000 - now;
    const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "today";
    } else if (diffInDays > 0) {
      return `${Math.abs(diffInDays)} day${diffInDays === 1 ? "" : "s"}`;
    } else {
      return `${Math.abs(diffInDays)} day${diffInDays === -1 ? "" : "s"} ago`;
    }
  };

  const changeSlippage = (amount: number, displayString: string) => {
    const updatedState = { ...slippageState };
    if(amount > 100) {
      updatedState.amount = 100
      updatedState.displayString = '100'
    }
    else {
      updatedState.amount = amount;
      updatedState.displayString = displayString;
    }
    setOutputTokensLoadingState(true);
    setSlippageState(updatedState);
    localStorage.setItem("slippageAmount", amount.toString());
  };

  const changeSlippageToggle = (toggle: boolean) => {
    const updatedState = { ...slippageState };
    updatedState.toggle = toggle;
    setSlippageState(updatedState);
  };

  const checkSlippageAmount = () => {
    const storedSlippageAmount = localStorage.getItem("slippageAmount");
    if (storedSlippageAmount !== null) {
      changeSlippage(parseFloat(storedSlippageAmount), storedSlippageAmount);
    }
  };

  const refreshGoldivaultInfoHoneyWbera = async () => {
    setInfoLoadingState(true);
    const endTimeResult: any = await readContract(config, {
      address: contracts.honeywberagoldivault.address as `0x${string}`,
      abi: contracts.honeywberagoldivault.abi,
      functionName: "endTime",
      args: [],
    });
    const vaultIbgtResult = await readContract(config, {
      address: contracts.ibgt.address as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: "balanceOf",
      args: [contracts.honeywberagoldivault.address],
    });
    const vaultStakedIbgtResult = await readContract(config, {
      address: contracts.ibgtVault.address as `0x${string}`,
      abi: contracts.ibgtVault.abi,
      functionName: "balanceOf",
      args: [contracts.honeywberagoldivault.address],
    });
    const vaultEarnedIbgtResult = await readContract(config, {
      address: contracts.infraredVault.address as `0x${string}`,
      abi: contracts.infraredVault.abi,
      functionName: "earned",
      args: [contracts.honeywberagoldivault.address, contracts.ibgt.address],
    });
    const vaultHoneyResult = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi,
      functionName: "balanceOf",
      args: [contracts.honeywberagoldivault.address],
    });
    const vaultEarnedHoneyResult = await readContract(config, {
      address: contracts.ibgtVault.address as `0x${string}`,
      abi: contracts.ibgtVault.abi,
      functionName: "earned",
      args: [contracts.honeywberagoldivault.address, contracts.honey.address],
    });
    const ibgtPriceResult: any = await readContract(config, {
      address: contracts.crocquery.address as `0x${string}`,
      abi: contracts.crocquery.abi,
      functionName: "queryPrice",
      args: [contracts.honey.address, contracts.ibgt.address, 36000],
    });
    const two64 = 2 ** 64;
    const sq = Number(ibgtPriceResult) / two64;
    const ibgtPrice = sq * sq;
    const ibgtValue =
      (parseFloat(formatEther(vaultIbgtResult as unknown as bigint)) +
        parseFloat(formatEther(vaultStakedIbgtResult as unknown as bigint)) +
        parseFloat(formatEther(vaultEarnedIbgtResult as unknown as bigint))) *
      ibgtPrice;

    const vaultStakedBalance = await readContract(config, {
      address: contracts.infraredVault.address as `0x${string}`,
      abi: contracts.infraredVault.abi,
      functionName: "balanceOf",
      args: [contracts.honeywberagoldivault.address],
    });
    const honeywberalpSupply = await readContract(config, {
      address: contracts.honeywberaLP.address as `0x${string}`,
      abi: contracts.honeywberaLP.abi,
      functionName: "totalSupply",
      args: [],
    });
    const honeywberaLiquidity: any = await readContract(config, {
      address: contracts.biggayberaquery.address as `0x${string}`,
      abi: contracts.biggayberaquery.abi,
      functionName: "queryPoolAmbientTokens",
      args: [contracts.honey.address, contracts.wbera.address, 36000],
    });
    const lpPrice =
      (parseFloat(formatEther(honeywberaLiquidity[1] as unknown as bigint)) *
        2) /
      parseFloat(formatEther(honeywberalpSupply as unknown as bigint));
    const honeywberalpOTLiquidity = await readContract(config, {
      address: contracts.honeywberaLP.address as `0x${string}`,
      abi: contracts.honeywberaLP.abi,
      functionName: "balanceOf",
      args: ["0x1793d6Ca32A3b3a15f8E44265E96A1D135775dBC"],
    });

    const response = {
      endTime: parseFloat(endTimeResult),
      vaultDeposits:
        parseFloat(formatEther(vaultStakedBalance as unknown as bigint)) *
        lpPrice,
      vaultAccumulated:
        ibgtValue +
        parseFloat(formatEther(vaultHoneyResult as unknown as bigint)) +
        parseFloat(formatEther(vaultEarnedHoneyResult as unknown as bigint)),
      otLiquidity:
        parseFloat(formatEther(honeywberalpOTLiquidity as unknown as bigint)) *
        lpPrice,
    };
    setGoldivaultInfoHoneyWberaState(response);
    setInfoLoadingState(false);
  };

  const refreshGoldivaultWalletInfoHoneyWbera = async () => {
    if (address) {
      setWalletInfoLoadingState(true);
      const honeywberalpBalResult = await readContract(config, {
        address: contracts.honeywberaLP.address as `0x${string}`,
        abi: contracts.honeywberaLP.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const honeyWberaLPAllResult = await readContract(config, {
        address: contracts.honeywberaLP.address as `0x${string}`,
        abi: contracts.honeywberaLP.abi,
        functionName: "allowance",
        args: [address, contracts.honeywberagoldivault.address],
      });
      const hwbotBalResult = await readContract(config, {
        address: contracts.hwbot.address as `0x${string}`,
        abi: contracts.hwbot.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const hwbytBalResult = await readContract(config, {
        address: contracts.hwbyt.address as `0x${string}`,
        abi: contracts.hwbyt.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const wberaBalResult = await readContract(config, {
        address: contracts.wbera.address as `0x${string}`,
        abi: contracts.wbera.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const wberaRouterAllResult = await readContract(config, {
        address: contracts.wbera.address as `0x${string}`,
        abi: contracts.wbera.abi,
        functionName: "allowance",
        args: [address, "0xA954f73434D48df52040eC85b30209C53b560B6B"],
      });

      const response = {
        honeyWberaLP: parseFloat(
          formatEther(honeywberalpBalResult as unknown as bigint),
        ),
        honeyWberaLPAllowance: parseFloat(
          formatEther(honeyWberaLPAllResult as unknown as bigint),
        ),
        hwbot: parseFloat(formatEther(hwbotBalResult as unknown as bigint)),
        hwbyt: parseFloat(formatEther(hwbytBalResult as unknown as bigint)),
        wbera: parseFloat(formatEther(wberaBalResult as unknown as bigint)),
        wberaRouterAllowance: parseFloat(
          formatEther(wberaRouterAllResult as unknown as bigint),
        ),
      };

      setGoldivaultWalletInfoHoneyWberaState(response);
      setWalletInfoLoadingState(false);
    }
  };

  const refreshGoldivaultInfoBhoney = async () => {
    setInfoLoadingState(true);
    const endTimeResult: any = await readContract(config, {
      address: contracts.bhoneygoldivault.address as `0x${string}`,
      abi: contracts.bhoneygoldivault.abi,
      functionName: "endTime",
      args: [],
    });
    const concludeTimeResult: any = await readContract(config, {
      address: contracts.bhoneygoldivault.address as `0x${string}`,
      abi: contracts.bhoneygoldivault.abi,
      functionName: "concludeTime",
      args: [],
    });
    const vaultBhoneyBal = await readContract(config, {
      address: contracts.bhoney.address as `0x${string}`,
      abi: contracts.bhoney.abi,
      functionName: "balanceOf",
      args: [contracts.bhoneygoldivault.address],
    });
    const vaultCompleteBhoneyBal = await readContract(config, {
      address: contracts.bhoney.address as `0x${string}`,
      abi: contracts.bhoney.abi,
      functionName: "completeBalanceOf",
      args: [contracts.bhoneygoldivault.address],
    });
    const vaultBhoneyStakedBal = await readContract(config, {
      address: contracts.infraredBhoneyVault.address as `0x${string}`,
      abi: contracts.infraredBhoneyVault.abi,
      functionName: "balanceOf",
      args: [contracts.bhoneygoldivault.address],
    });
    const vaultActualHoneyBal = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi,
      functionName: "balanceOf",
      args: [contracts.bhoneygoldivault.address],
    });
    const vaultHoneyBal = await readContract(config, {
      address: contracts.bhoney.address as `0x${string}`,
      abi: contracts.bhoney.abi,
      functionName: "convertToAssets",
      args: [
        parseEther(
          `${parseFloat(formatEther(vaultBhoneyBal as unknown as bigint)) + parseFloat(formatEther(vaultCompleteBhoneyBal as unknown as bigint)) + parseFloat(formatEther(vaultBhoneyStakedBal as unknown as bigint))}`,
        ),
      ],
    });
    const vaultIbgtResult = await readContract(config, {
      address: contracts.ibgt.address as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: "balanceOf",
      args: [contracts.bhoneygoldivault.address],
    });
    const vaultStakedIbgtResult = await readContract(config, {
      address: contracts.ibgtVault.address as `0x${string}`,
      abi: contracts.ibgtVault.abi,
      functionName: "balanceOf",
      args: [contracts.bhoneygoldivault.address],
    });
    const vaultEarnedIbgtResult = await readContract(config, {
      address: contracts.infraredBhoneyVault.address as `0x${string}`,
      abi: contracts.infraredBhoneyVault.abi,
      functionName: "earned",
      args: [contracts.bhoneygoldivault.address, contracts.ibgt.address],
    });
    const ibgtVaultEarnedHoneyResult = await readContract(config, {
      address: contracts.ibgtVault.address as `0x${string}`,
      abi: contracts.ibgtVault.abi,
      functionName: "earned",
      args: [contracts.bhoneygoldivault.address, contracts.honey.address],
    });
    const ibgtPriceResult: any = await readContract(config, {
      address: contracts.crocquery.address as `0x${string}`,
      abi: contracts.crocquery.abi,
      functionName: "queryPrice",
      args: [contracts.honey.address, contracts.ibgt.address, 36000],
    });
    const two64 = 2 ** 64;
    const sq = Number(ibgtPriceResult) / two64;
    const ibgtPrice = sq * sq;
    const ibgtValue =
      (parseFloat(formatEther(vaultIbgtResult as unknown as bigint)) +
        parseFloat(formatEther(vaultStakedIbgtResult as unknown as bigint)) +
        parseFloat(formatEther(vaultEarnedIbgtResult as unknown as bigint))) *
      ibgtPrice;

    const depositedTokens = await readContract(config, {
      address: contracts.bhoneygoldivault.address as `0x${string}`,
      abi: contracts.bhoneygoldivault.abi,
      functionName: "depositTokenAmount",
      args: [],
    });
    const bhoneyOTLiquidity = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi,
      functionName: "balanceOf",
      args: ["0x93EbA5530b64626FBE1403C07A9C7abb1af4464B"],
    });
    const bhoneyYTLiquidity = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi,
      functionName: "balanceOf",
      args: ["0x948350e0Fe96Aa3c144C20B824bCee523D974966"],
    });
    const bhotPriceResult = await readContract(config, {
      address: contracts.quoter.address as `0x${string}`,
      abi: contracts.quoter.abi,
      functionName: "quoteExactInputSingleV2",
      args: [
        [contracts.bhot.address, contracts.honey.address, parseEther("1")],
      ],
    });
    const bhytPriceResult = await readContract(config, {
      address: contracts.quoter.address as `0x${string}`,
      abi: contracts.quoter.abi,
      functionName: "quoteExactInputSingleV2",
      args: [
        [contracts.bhyt.address, contracts.honey.address, parseEther("1")],
      ],
    });
    const otTotalSupply = await readContract(config, {
      address: contracts.bhot.address as `0x${string}`,
      abi: contracts.bhot.abi,
      functionName: "totalSupply",
      args: [],
    });
    const accumulatedIbgtResponse = ibgtValue;
    const accumulatedHoneyResponse =
      parseFloat(formatEther(vaultHoneyBal as unknown as bigint)) +
      parseFloat(formatEther(vaultActualHoneyBal as unknown as bigint)) +
      parseFloat(formatEther(ibgtVaultEarnedHoneyResult as unknown as bigint)) -
      parseFloat(formatEther(depositedTokens as unknown as bigint));
    const vaultDepositsResponse = parseFloat(
      formatEther(vaultHoneyBal as unknown as bigint),
    );
    const vaultAccumulatedResponse =
      accumulatedIbgtResponse + accumulatedHoneyResponse;
    const givenDate = new Date("Oct 4, 2024 11:36:23 UTC");
    const currentDate = new Date();
    const diffInMilliseconds = currentDate.getTime() - givenDate.getTime();
    const daysDifference = diffInMilliseconds / (1000 * 60 * 60 * 24);
    const historicalUnderlyingAprResponse =
      (vaultAccumulatedResponse / vaultDepositsResponse) *
      (365 / parseFloat(daysDifference.toFixed(2))) *
      100;

    const timeDifference = parseFloat(endTimeResult) * 1000 - Date.now();
    const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const daysTil = parseFloat(fixedDaysDifference.toFixed(2));
    const fixedAprResponse =
      ((1 - parseFloat(formatEther(bhotPriceResult as unknown as bigint))) /
        1) *
      100 *
      (365 / daysTil);

    const ytImpliedValueResponse =
      (vaultAccumulatedResponse /
        parseFloat(formatEther(depositedTokens as unknown as bigint))) *
      (7 / daysDifference);
    const longYieldHistoricalResponse =
      ((ytImpliedValueResponse -
        parseFloat(formatEther(bhytPriceResult as unknown as bigint))) /
        ytImpliedValueResponse) *
      100 *
      (365 / daysTil);
    const longYieldCurrentResponse =
      ((0.57 - parseFloat(formatEther(bhytPriceResult as unknown as bigint))) /
        0.57) *
      100 *
      (365 / daysTil);

    const honeyBackingResponse =
      (parseFloat(formatEther(vaultHoneyBal as unknown as bigint)) +
        parseFloat(formatEther(vaultActualHoneyBal as unknown as bigint)) +
        parseFloat(
          formatEther(ibgtVaultEarnedHoneyResult as unknown as bigint),
        )) /
      parseFloat(formatEther(otTotalSupply as unknown as bigint));

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
      otLiquidity: parseFloat(
        formatEther(bhoneyOTLiquidity as unknown as bigint),
      ),
      ytLiquidity: parseFloat(
        formatEther(bhoneyYTLiquidity as unknown as bigint),
      ),
    };
    setGoldivaultInfoBhoneyState(response);
    setInfoLoadingState(false);
  };

  const refreshGoldivaultWalletInfoBhoney = async () => {
    if (address) {
      setWalletInfoLoadingState(true);
      const honeyBalResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const honeyAllResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: "allowance",
        args: [address, contracts.bhoneygoldivault.address],
      });
      const bhotBalResult = await readContract(config, {
        address: contracts.bhot.address as `0x${string}`,
        abi: contracts.bhot.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const bhytBalResult = await readContract(config, {
        address: contracts.bhyt.address as `0x${string}`,
        abi: contracts.bhyt.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const bhotRouterAllResult = await readContract(config, {
        address: contracts.bhot.address as `0x${string}`,
        abi: contracts.bhot.abi,
        functionName: "allowance",
        args: [address, contracts.router.address],
      });
      const bhytRouterAllResult = await readContract(config, {
        address: contracts.bhyt.address as `0x${string}`,
        abi: contracts.bhyt.abi,
        functionName: "allowance",
        args: [address, contracts.router.address],
      });
      const honeyRouterAllResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: "allowance",
        args: [address, contracts.router.address],
      });

      const response = {
        honey: parseFloat(formatEther(honeyBalResult as unknown as bigint)),
        honeyAllowance: parseFloat(
          formatEther(honeyAllResult as unknown as bigint),
        ),
        bhot: parseFloat(formatEther(bhotBalResult as unknown as bigint)),
        bhyt: parseFloat(formatEther(bhytBalResult as unknown as bigint)),
        bhotRouterAllowance: parseFloat(
          formatEther(bhotRouterAllResult as unknown as bigint),
        ),
        bhytRouterAllowance: parseFloat(
          formatEther(bhytRouterAllResult as unknown as bigint),
        ),
        honeyRouterAllowance: parseFloat(
          formatEther(honeyRouterAllResult as unknown as bigint),
        ),
      };

      setGoldivaultWalletInfoBhoneyState(response);
      setWalletInfoLoadingState(false);
    }
  };

  const refreshGoldivaultInfoWeeth = async () => {
    setInfoLoadingState(true);
    const client = getPublicClient(config);
    const blockResult: any = await client.getBlock();
    const timestamp = parseFloat(blockResult.timestamp);
    const endTimeResult: any = await readContract(config, {
      address: contracts.weethVault.address as `0x${string}`,
      abi: contracts.weethVault.abi,
      functionName: "endTime",
      args: [],
    });
    const endTime = parseFloat(endTimeResult);
    const durationResult: any = await readContract(config, {
      address: contracts.weethVault.address as `0x${string}`,
      abi: contracts.weethVault.abi,
      functionName: "duration",
      args: [],
    });
    const duration = parseFloat(durationResult);
    const remainingTime = timestamp > endTime ? 0 : endTime - timestamp;
    const ratio = remainingTime / duration;

    const buyingOTQuoteResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.weeth.address,
          contracts.weot.address,
          parseEther(`1`),
          500,
          0,
        ],
      ],
    });
    const buyingOTPrice = parseFloat(
      formatEther(buyingOTQuoteResult[0] as unknown as bigint),
    );
    const impliedYieldResult =
      (1 - buyingOTPrice) * (31536000 / duration) * 100;

    const weethVaultBalanceResult = await readContract(config, {
      address: contracts.weeth.address as `0x${string}`,
      abi: contracts.weeth.abi,
      functionName: "balanceOf",
      args: [contracts.weethVault.address],
    });
    const vaultDepositsResult =
      parseFloat(formatEther(weethVaultBalanceResult as unknown as bigint)) *
      4000;

    const timeDifference = parseFloat(endTimeResult) * 1000 - Date.now();
    const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const daysTil = parseFloat(fixedDaysDifference.toFixed(2));
    const fixedAprResponse = ((1 - buyingOTPrice) / 1) * 100 * (365 / daysTil);

    const currentYtPrice = 1 - buyingOTPrice;
    const leverageResult = (1 / currentYtPrice) * 4;

    const weethOTLiquidity = await readContract(config, {
      address: contracts.weeth.address as `0x${string}`,
      abi: contracts.weeth.abi,
      functionName: "balanceOf",
      args: ["0xD26503C0447bEF83e978e7b872cb2d6b9B35262c"],
    });
    const weethLiquidity = await readContract(config, {
      address: contracts.weot.address as `0x${string}`,
      abi: contracts.weot.abi,
      functionName: "balanceOf",
      args: ["0xD26503C0447bEF83e978e7b872cb2d6b9B35262c"],
    });
    // const weethPriceResult: any = await readContract(config, {
    //   address: contracts.quoterv2.address as `0x${string}`,
    //   abi: contracts.quoterv2.abi,
    //   functionName: 'quoteExactOutputSingle',
    //   args: [[
    //     '0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03',
    //     '0xE28AfD8c634946833e89ee3F122C06d7C537E8A8',
    //     parseEther(`1`),
    //     3000,
    //     0
    //   ]]
    // })
    // const weethPrice = parseFloat(formatEther(weethPriceResult[0] as unknown as bigint))
    const liquidityResult =
      (parseFloat(formatEther(weethOTLiquidity as unknown as bigint)) +
        parseFloat(formatEther(weethLiquidity as unknown as bigint))) *
      3100;
    const etherfiResult = await getEtherfiData();

    const response = {
      endTime: parseFloat(endTimeResult),
      vaultDeposits: vaultDepositsResult,
      fixedApr: fixedAprResponse,
      impliedYield: impliedYieldResult,
      leverage: leverageResult,
      otLiquidity: liquidityResult,
      durationRatio: ratio,
      restakingYield: etherfiResult
        ? etherfiResult["7_day_restaking_apr"] / 0.9
        : 0,
    };

    setGoldivaultInfoWeethState(response);
    setInfoLoadingState(false);
  };

  const getEtherfiData = async (): Promise<EtherfiAPIResponse | null> => {
    // let rsethResponse: any | null = null
    // try {
    //   const response = await fetch("/api/kelpdao")
    //   rsethResponse = await response.json()
    //   console.log(rsethResponse)
    //   console.log(rsethResponse.data[rsethResponse.data.length - 1].apy)
    // }
    // catch {
    //   console.log('rseth api error')
    // }
    let etherfiResponse: EtherfiAPIResponse | null = null;
    try {
      const response = await fetch("/api/etherfi");
      etherfiResponse = await response.json();
    } catch (e) {
      console.log("error getting apr:", e);
    }

    return etherfiResponse;
  };

  const refreshGoldivaultWalletInfoWeeth = async () => {
    if (address) {
      // todo: timeout for slow rpc
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setWalletInfoLoadingState(true);
      const weethBalResult = await readContract(config, {
        address: contracts.weeth.address as `0x${string}`,
        abi: contracts.weeth.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const weotBalResult = await readContract(config, {
        address: contracts.weot.address as `0x${string}`,
        abi: contracts.weot.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const weytBalResult = await readContract(config, {
        address: contracts.weyt.address as `0x${string}`,
        abi: contracts.weyt.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const weethAllResult = await readContract(config, {
        address: contracts.weeth.address as `0x${string}`,
        abi: contracts.weeth.abi,
        functionName: "allowance",
        args: [address, contracts.routerv2.address],
      });
      const weethVaultAllResult = await readContract(config, {
        address: contracts.weeth.address as `0x${string}`,
        abi: contracts.weeth.abi,
        functionName: "allowance",
        args: [address, contracts.weethVault.address],
      });
      const weotAllResult = await readContract(config, {
        address: contracts.weot.address as `0x${string}`,
        abi: contracts.weot.abi,
        functionName: "allowance",
        args: [address, contracts.routerv2.address],
      });
      const weytAllResult = await readContract(config, {
        address: contracts.weyt.address as `0x${string}`,
        abi: contracts.weyt.abi,
        functionName: "allowance",
        args: [address, contracts.routerv2.address],
      });

      const response = {
        weeth: parseFloat(formatEther(weethBalResult as unknown as bigint)),
        weot: parseFloat(formatEther(weotBalResult as unknown as bigint)),
        weyt: parseFloat(formatEther(weytBalResult as unknown as bigint)),
        weethRouterAllowance: parseFloat(
          formatEther(weethAllResult as unknown as bigint),
        ),
        weotRouterAllowance: parseFloat(
          formatEther(weotAllResult as unknown as bigint),
        ),
        weytRouterAllowance: parseFloat(
          formatEther(weytAllResult as unknown as bigint),
        ),
        weethVaultAllowance: parseFloat(
          formatEther(weethVaultAllResult as unknown as bigint),
        ),
      };

      setGoldivaultWalletInfoWeethState(response);
      setWalletInfoLoadingState(false);
    }
  };

  const refreshGoldivaultInfoSolvbtc = async () => {
    setInfoLoadingState(true);
    const endTimeResult: any = await readContract(config, {
      address: contracts.solvbtcVault.address as `0x${string}`,
      abi: contracts.solvbtcVault.abi,
      functionName: "endTime",
      args: [],
    });

    const response = {
      endTime: parseFloat(endTimeResult),
      fixedApr: 0,
      otLiquidity: 0,
    };

    setGoldivaultInfoSolvbtcState(response);
    setInfoLoadingState(false);
  };

  const refreshGoldivaultWalletInfoSolvbtc = async () => {
    if (address) {
      setWalletInfoLoadingState(true);
      const solvbtcBalResult = await readContract(config, {
        address: contracts.solvbtc.address as `0x${string}`,
        abi: contracts.solvbtc.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const solvbtcotBalResult = await readContract(config, {
        address: contracts.solvbtcot.address as `0x${string}`,
        abi: contracts.solvbtcot.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const solvbtcytBalResult = await readContract(config, {
        address: contracts.solvbtcyt.address as `0x${string}`,
        abi: contracts.solvbtcyt.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const solvbtcAllResult = await readContract(config, {
        address: contracts.solvbtc.address as `0x${string}`,
        abi: contracts.solvbtc.abi,
        functionName: "allowance",
        args: [address, contracts.solvbtcVault.address],
      });

      const response = {
        solvbtc: parseFloat(formatEther(solvbtcBalResult as unknown as bigint)),
        solvbtcAllowance: parseFloat(
          formatEther(solvbtcotBalResult as unknown as bigint),
        ),
        solvbtcot: parseFloat(
          formatEther(solvbtcytBalResult as unknown as bigint),
        ),
        solvbtcyt: parseFloat(
          formatEther(solvbtcAllResult as unknown as bigint),
        ),
      };

      setGoldivaultWalletInfoSolvbtcState(response);
      setWalletInfoLoadingState(false);
    }
  };

  const refreshGoldivaultInfoUnibtc = async () => {
    setInfoLoadingState(true);
    const endTimeResult: any = await readContract(config, {
      address: contracts.unibtcVault.address as `0x${string}`,
      abi: contracts.unibtcVault.abi,
      functionName: "endTime",
      args: [],
    });
    const buyingOTQuoteResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.unibtc.address,
          contracts.unibtcot.address,
          parseUnits("1", 8),
          500,
          0,
        ],
      ],
    });
    const buyingOTPrice =
      parseFloat((buyingOTQuoteResult[0] as unknown as bigint).toString()) /
      1e8;
    const currentYtPrice = 1 - buyingOTPrice;

    const timeDifference = parseFloat(endTimeResult) * 1000 - Date.now();
    const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const daysTil = parseFloat(fixedDaysDifference.toFixed(2));
    const fixedAprResponse = ((1 - buyingOTPrice) / 1) * 100 * (365 / daysTil);

    const unibtcLiquidity = await readContract(config, {
      address: contracts.unibtc.address as `0x${string}`,
      abi: contracts.unibtc.abi,
      functionName: "balanceOf",
      args: ["0xa4b4B53f4F8f17E5c5003f8aA87a5E4a90a1715f"],
    });
    const unibtcOTLiquidity = await readContract(config, {
      address: contracts.unibtcot.address as `0x${string}`,
      abi: contracts.unibtcot.abi,
      functionName: "balanceOf",
      args: ["0xa4b4B53f4F8f17E5c5003f8aA87a5E4a90a1715f"],
    });
    const liquidityResult =
      (parseFloat((unibtcOTLiquidity as unknown as bigint).toString()) / 1e8 +
        parseFloat((unibtcLiquidity as unknown as bigint).toString()) / 1e8) *
      100000;

    const response = {
      endTime: parseFloat(endTimeResult),
      fixedApr: fixedAprResponse,
      otLiquidity: liquidityResult,
      bedrockLeverage: (1 / currentYtPrice) * 4,
      babylonLeverage: (1 / currentYtPrice) * 1,
      restakingYield: 0,
    };

    setGoldivaultInfoUnibtcState(response);
    setInfoLoadingState(false);
  };

  const refreshGoldivaultWalletInfoUnibtc = async () => {
    if (address) {
      setWalletInfoLoadingState(true);
      const unibtcBalResult = await readContract(config, {
        address: contracts.unibtc.address as `0x${string}`,
        abi: contracts.unibtc.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const unibtcAllResult = await readContract(config, {
        address: contracts.unibtc.address as `0x${string}`,
        abi: contracts.unibtc.abi,
        functionName: "allowance",
        args: [address, contracts.unibtcVault.address],
      });
      const unibtcotBalResult = await readContract(config, {
        address: contracts.unibtcot.address as `0x${string}`,
        abi: contracts.unibtcot.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const unibtcytBalResult = await readContract(config, {
        address: contracts.unibtcyt.address as `0x${string}`,
        abi: contracts.unibtcyt.abi,
        functionName: "balanceOf",
        args: [address],
      });

      const response = {
        unibtc:
          parseFloat((unibtcBalResult as unknown as bigint).toString()) / 1e8,
        unibtcAllowance:
          parseFloat((unibtcAllResult as unknown as bigint).toString()) / 1e8,
        unibtcot:
          parseFloat((unibtcotBalResult as unknown as bigint).toString()) / 1e8,
        unibtcyt:
          parseFloat((unibtcytBalResult as unknown as bigint).toString()) / 1e8,
      };

      setGoldivaultWalletInfoUnibtcState(response);
      setWalletInfoLoadingState(false);
    }
  };

  const refreshGoldivaultInfoRusd = async () => {
    setInfoLoadingState(true);
    const endTimeResult: any = await readContract(config, {
      address: contracts.rusdVault.address as `0x${string}`,
      abi: contracts.rusdVault.abi,
      functionName: "endTime",
      args: [],
    });
    const buyingOTQuoteResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.rusd.address,
          contracts.rusdot.address,
          parseEther("1"),
          500,
          0,
        ],
      ],
    });
    const buyingOTPrice =
      parseFloat(formatEther(buyingOTQuoteResult[0] as unknown as bigint))
    const currentYtPrice = 1 - buyingOTPrice;

    const timeDifference = parseFloat(endTimeResult) * 1000 - Date.now();
    const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const daysTil = parseFloat(fixedDaysDifference.toFixed(2));
    const fixedAprResponse = ((1 - buyingOTPrice) / 1) * 100 * (365 / daysTil);

    const rusdLiquidity = await readContract(config, {
      address: contracts.rusd.address as `0x${string}`,
      abi: contracts.rusd.abi,
      functionName: "balanceOf",
      args: ["0x1a2A927F758AE242fB967481CF293D2a36883be6"],
    });
    const rusdOTLiquidity = await readContract(config, {
      address: contracts.rusdot.address as `0x${string}`,
      abi: contracts.rusdot.abi,
      functionName: "balanceOf",
      args: ["0x1a2A927F758AE242fB967481CF293D2a36883be6"],
    });
    const liqManagerRusdLiquidity = await readContract(config, {
      address: contracts.rusd.address as `0x${string}`,
      abi: contracts.rusd.abi,
      functionName: "balanceOf",
      args: ["0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6"]
    })
    const liquidityResult =
      parseFloat(formatEther(rusdOTLiquidity as unknown as bigint)) +
      parseFloat(formatEther(liqManagerRusdLiquidity as unknown as bigint)) +
      parseFloat(formatEther(rusdLiquidity as unknown as bigint));

    const response = {
      endTime: parseFloat(endTimeResult),
      fixedApr: fixedAprResponse,
      otLiquidity: liquidityResult,
      reservoirLeverage: (1 / currentYtPrice) * 2.25,
    };

    console.log(response)

    setGoldivaultInfoRusdState(response);
    setInfoLoadingState(false);
  };

  const refreshGoldivaultWalletInfoRusd = async () => {
    if (address) {
      setInfoLoadingState(true);
      const rusdBalResult = await readContract(config, {
        address: contracts.rusd.address as `0x${string}`,
        abi: contracts.rusd.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const rusdAllResult = await readContract(config, {
        address: contracts.rusd.address as `0x${string}`,
        abi: contracts.rusd.abi,
        functionName: "allowance",
        args: [address, contracts.rusdVault.address],
      });
      const rusdcotBalResult = await readContract(config, {
        address: contracts.rusdot.address as `0x${string}`,
        abi: contracts.rusdot.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const rusdytBalResult = await readContract(config, {
        address: contracts.rusdyt.address as `0x${string}`,
        abi: contracts.rusdyt.abi,
        functionName: "balanceOf",
        args: [address],
      });

      const response = {
        rusd: parseFloat(formatEther(rusdBalResult as unknown as bigint)),
        rusdAllowance: parseFloat(
          formatEther(rusdAllResult as unknown as bigint),
        ),
        rusdot: parseFloat(formatEther(rusdcotBalResult as unknown as bigint)),
        rusdyt: parseFloat(formatEther(rusdytBalResult as unknown as bigint)),
      };

      setGoldivaultWalletInfoRusdState(response);
      setInfoLoadingState(false);
    }
  };

  const refreshVaultDisplayInfo = async () => {
    setInfoLoadingState(true);

    // weeth
    // const endTimeResultWeeth: any = await readContract(config, {
    //   address: contracts.weethVault.address as `0x${string}`,
    //   abi: contracts.weethVault.abi,
    //   functionName: 'endTime',
    //   args: []
    // })
    // const buyingOTQuoteResultWeeth: any = await readContract(config, {
    //   address: contracts.quoterv2.address as `0x${string}`,
    //   abi: contracts.quoterv2.abi,
    //   functionName: 'quoteExactOutputSingle',
    //   args: [[
    //     contracts.weeth.address,
    //     contracts.weot.address,
    //     parseEther(`1`),
    //     500,
    //     0
    //   ]]
    // })
    // const weethOTLiquidity = await readContract(config, {
    //   address: contracts.weeth.address as `0x${string}`,
    //   abi: contracts.weeth.abi,
    //   functionName: 'balanceOf',
    //   args: ['0xD26503C0447bEF83e978e7b872cb2d6b9B35262c']
    // })
    // const weethLiquidity = await readContract(config, {
    //   address: contracts.weot.address as `0x${string}`,
    //   abi: contracts.weot.abi,
    //   functionName: 'balanceOf',
    //   args: ['0xD26503C0447bEF83e978e7b872cb2d6b9B35262c']
    // })
    // const weethPriceResult: any = await readContract(config, {
    //   address: contracts.quoterv2.address as `0x${string}`,
    //   abi: contracts.quoterv2.abi,
    //   functionName: 'quoteExactOutputSingle',
    //   args: [[
    //     '0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03',
    //     '0xE28AfD8c634946833e89ee3F122C06d7C537E8A8',
    //     parseEther(`1`),
    //     3000,
    //     0
    //   ]]
    // })
    // const weethPrice = parseFloat(formatEther(weethPriceResult[0] as unknown as bigint))
    // const liquidityResultWeeth = (parseFloat(formatEther(weethOTLiquidity as unknown as bigint)) + parseFloat(formatEther(weethLiquidity as unknown as bigint))) * 3100
    // const buyingOTPriceWeeth = parseFloat(formatEther(buyingOTQuoteResultWeeth[0] as unknown as bigint))
    // const timeDifferenceWeeth = (parseFloat(endTimeResultWeeth)*1000) - Date.now()
    // const fixedDaysDifferenceWeeth = timeDifferenceWeeth / (1000 * 60 * 60 * 24)
    // const daysTilWeeth = parseFloat(fixedDaysDifferenceWeeth.toFixed(2))
    // const fixedAprResponseWeeth = (((1 - buyingOTPriceWeeth) / 1) * 100) * (365 / daysTilWeeth)
    // const ytPriceWeeth = 1 - buyingOTPriceWeeth

    // unibtc
    const endTimeResultUnibtc: any = await readContract(config, {
      address: contracts.unibtcVault.address as `0x${string}`,
      abi: contracts.unibtcVault.abi,
      functionName: "endTime",
      args: [],
    });
    // const buyingOTQuoteResultUnibtc: any = await readContract(config, {
    //   address: contracts.quoterv2.address as `0x${string}`,
    //   abi: contracts.quoterv2.abi,
    //   functionName: 'quoteExactOutputSingle',
    //   args: [[
    //     contracts.unibtc.address,
    //     contracts.unibtcot.address,
    //     parseUnits(`1`, 8),
    //     500,
    //     0
    //   ]]
    // })
    // const unibtcOTLiquidity = await readContract(config, {
    //   address: contracts.unibtc.address as `0x${string}`,
    //   abi: contracts.unibtc.abi,
    //   functionName: 'balanceOf',
    //   args: ['0xa4b4B53f4F8f17E5c5003f8aA87a5E4a90a1715f']
    // })
    // const unibtcLiquidity = await readContract(config, {
    //   address: contracts.unibtcot.address as `0x${string}`,
    //   abi: contracts.unibtcot.abi,
    //   functionName: 'balanceOf',
    //   args: ['0xa4b4B53f4F8f17E5c5003f8aA87a5E4a90a1715f']
    // })
    // const liquidityResultUnibtc = ((parseFloat((unibtcOTLiquidity as unknown as bigint).toString()) / 1e8) + (parseFloat((unibtcLiquidity as unknown as bigint).toString()) / 1e8)) * 100000
    // const buyingOTPriceUnibtc = parseFloat((buyingOTQuoteResultUnibtc[0] as unknown as bigint).toString())
    // const timeDifferenceUnibtc = (parseFloat(endTimeResultUnibtc)*1000) - Date.now()
    // const fixedDaysDifferenceUnibtc = timeDifferenceUnibtc / (1000 * 60 * 60 * 24)
    // const daysTilUnibtc = parseFloat(fixedDaysDifferenceUnibtc.toFixed(2))
    // const fixedAprResponseUnibtc = (((1 - buyingOTPriceUnibtc) / 1) * 100) * (365 / daysTilUnibtc)
    // const ytPriceUnibtc = 1 - buyingOTPriceUnibtc

    // rusd
    const endTimeResultRusd: any = await readContract(config, {
      address: contracts.rusdVault.address as `0x${string}`,
      abi: contracts.rusdVault.abi,
      functionName: 'endTime',
      args: []
    })
    const buyingOTQuoteResultRusd: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: 'quoteExactOutputSingle',
      args: [[
        contracts.rusd.address,
        contracts.rusdot.address,
        parseEther(`1`),
        500,
        0
      ]]
    })
    const rusdOTLiquidity = await readContract(config, {
      address: contracts.rusdot.address as `0x${string}`,
      abi: contracts.rusdot.abi,
      functionName: 'balanceOf',
      args: ['0x1a2A927F758AE242fB967481CF293D2a36883be6']
    })
    const rusdLiquidity = await readContract(config, {
      address: contracts.rusd.address as `0x${string}`,
      abi: contracts.rusd.abi,
      functionName: 'balanceOf',
      args: ['0x1a2A927F758AE242fB967481CF293D2a36883be6']
    })
    const liqManagerRusdLiquidity = await readContract(config, {
      address: contracts.rusd.address as `0x${string}`,
      abi: contracts.rusd.abi,
      functionName: "balanceOf",
      args: ["0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6"]
    })
    const liquidityResultRusd = parseFloat(formatEther(rusdOTLiquidity as unknown as bigint)) + parseFloat(formatEther(rusdLiquidity as unknown as bigint)) + parseFloat(formatEther(liqManagerRusdLiquidity as unknown as bigint))
    const buyingOTPriceRusd = parseFloat(formatEther(buyingOTQuoteResultRusd[0] as unknown as bigint))
    const timeDifferenceRusd = (parseFloat(endTimeResultRusd)*1000) - Date.now()
    const fixedDaysDifferenceRusd = timeDifferenceRusd / (1000 * 60 * 60 * 24)
    const daysTilRusd = parseFloat(fixedDaysDifferenceRusd.toFixed(2))
    const fixedAprResponseRusd = (((1 - buyingOTPriceRusd) / 1) * 100) * (365 / daysTilRusd)
    const ytPriceRusd = 1 - buyingOTPriceRusd

    const response = {
      weeth: {
        // fixedApr: fixedAprResponseWeeth,
        // daysTil: getRelativeDate(parseFloat(endTimeResultWeeth)),
        // liquidity: liquidityResultWeeth,
        // ytPrice: ytPriceWeeth,
        fixedApr: 0,
        daysTil: "",
        liquidity: 0,
        ytPrice: 0,
      },
      rseth: {
        fixedApr: 0,
        daysTil: "",
        liquidity: 0,
        ytPrice: 0,
      },
      ebtc: {
        fixedApr: 0,
        daysTil: "",
        liquidity: 0,
        ytPrice: 0,
      },
      unibtc: {
        // fixedApr: fixedAprResponseUnibtc,
        // daysTil: getRelativeDate(parseFloat(endTimeResultUnibtc)),
        // liquidity: liquidityResultUnibtc,
        // ytPrice: ytPriceUnibtc
        fixedApr: 0,
        daysTil: '',
        liquidity: 0,
        ytPrice: 0,
      },
      solvbtc: {
        fixedApr: 0,
        daysTil: "",
        liquidity: 0,
        ytPrice: 0,
      },
      rusd: {
        fixedApr: fixedAprResponseRusd,
        daysTil: getRelativeDate(parseFloat(endTimeResultRusd)),
        liquidity: liquidityResultRusd,
        ytPrice: ytPriceRusd,
      },
    };

    setVaultDisplayInfoState(response);
    setInfoLoadingState(false);
  };

  const handleChange = (input: string) => {
    if (activeToggleState === "DEPOSIT") {
      setDisplayStringState(input);
      !input ? setDepositState(0) : setDepositState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
      setOutputTokensLoadingState(true);
    } else if (activeToggleState === "REDEEMOT") {
      setDisplayStringState(input);
      !input ? setRedeemOTState(0) : setRedeemOTState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
      setOutputTokensLoadingState(true);
    } else if (activeToggleState === "REDEEMYT") {
      setDisplayStringState(input);
      !input ? setRedeemYTState(0) : setRedeemYTState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
      setOutputTokensLoadingState(true);
    } else {
      setDisplayStringState(input);
      !input ? setTradeInputState(0) : setTradeInputState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
      setOutputTokensLoadingState(true);
    }
  };

  const handleBalanceClick = (vault: string) => {
    const vaultOT =
      vault === "weeth"
        ? goldivaultWalletInfoWeethState.weot
        : vault === "bhoney"
          ? goldivaultWalletInfoBhoneyState.bhot
          : vault === "solvbtc"
            ? goldivaultWalletInfoSolvbtcState.solvbtcot
            : vault === "unibtc"
              ? goldivaultWalletInfoUnibtcState.unibtcot
              : vault === "rusd"
                ? goldivaultWalletInfoRusdState.rusdot
                : {};
    const vaultYT =
      vault === "weeth"
        ? goldivaultWalletInfoWeethState.weyt
        : vault === "bhoney"
          ? goldivaultWalletInfoBhoneyState.bhyt
          : vault === "solvbtc"
            ? goldivaultWalletInfoSolvbtcState.solvbtcyt
            : vault === "unibtc"
              ? goldivaultWalletInfoUnibtcState.unibtcyt
              : vault === "rusd"
                ? goldivaultWalletInfoRusdState.rusdyt
                : {};
    const vaultDT =
      vault === "weeth"
        ? goldivaultWalletInfoWeethState.weeth
        : vault === "bhoney"
          ? goldivaultWalletInfoBhoneyState.honey
          : vault === "solvbtc"
            ? goldivaultWalletInfoSolvbtcState.solvbtc
            : vault === "unibtc"
              ? goldivaultWalletInfoUnibtcState.unibtc
              : vault === "rusd"
                ? goldivaultWalletInfoRusdState.rusd
                : {};

    if (activeToggleState === "DEPOSIT") {
      setDisplayStringState(vaultDT.toFixed(4));
      setDepositState(vaultDT);
      setOutputTokensLoadingState(true);
    } else if (activeToggleState === "REDEEMOT") {
      setDisplayStringState(vaultOT.toFixed(4));
      setRedeemOTState(vaultOT);
      setOutputTokensLoadingState(true);
    } else {
      let num;
      if (activeToggleState === "TRADEOT") {
        if (tradeDirectionState === "OUT") {
          num = vaultOT;
        } else {
          num = vaultDT;
        }
      } else {
        if (tradeDirectionState === "OUT") {
          num = vaultYT;
        } else {
          num = vaultDT;
        }
      }
      setDisplayStringState(num.toFixed(4));
      setTradeInputState(num);
      setOutputTokensLoadingState(true);
    }
  };

  const flipTokens = () => {
    setDisplayStringState("");
    setTradeInputState(0);
    setTradeOutputState(0);
    setPriceImpactState(0);
    setImpliedAprState(0);
    setAllowanceButtonsState(false);
    if (tradeDirectionState === "OUT") {
      setTradeDirectionState("IN");
    } else {
      setTradeDirectionState("OUT");
    }
  };

  const calculateDeposit = async (vault: string) => {
    // let depositResult;
    // if (vault === "honeywbera") {
    //   depositResult = await readContract(config, {
    //     address: contracts.honeywberagoldivault.address as `0x${string}`,
    //     abi: contracts.honeywberagoldivault.abi,
    //     functionName: "calculateDeposit",
    //     args: [parseEther(`${debouncedDepositState}`)],
    //   });
    //   setOtAmountState(depositState);
    //   setYtAmountState(
    //     parseFloat(formatEther(depositResult as unknown as bigint)),
    //   );
    // } else if (vault === "weeth") {
    //   setOtAmountState(depositState);
    //   setYtAmountState(depositState);
    // } else if (vault === "unibtc") {
    //   setOtAmountState(depositState);
    //   setYtAmountState(depositState);
    // } else if (vault === "solvbtc") {
    //   setOtAmountState(depositState);
    //   setYtAmountState(depositState);
    // } else {
    //   setOtAmountState(0);
    //   setYtAmountState(0);
    // }

    setOtAmountState(depositState)
    setYtAmountState(depositState)
    setOutputTokensLoadingState(false);
  };

  const calculateOTRedeem = async (vault: string) => {
    // const client = getPublicClient(config);
    // const block: any = await client.getBlock();
    // let redeemResult;
    // if (vault === "honeywbera") {
    //   redeemResult = await readContract(config, {
    //     address: contracts.honeywberagoldivault.address as `0x${string}`,
    //     abi: contracts.honeywberagoldivault.abi,
    //     functionName: "calculateDeposit",
    //     args: [parseEther(`${debouncedRedeemOTState}`)],
    //   });
    //   if (
    //     parseInt(block.timestamp.toString(), 16) <
    //     parseInt(goldivaultInfoHoneyWberaState.endTime.toString(), 16)
    //   ) {
    //     setOtAmountState(debouncedRedeemOTState * 0.97);
    //   } else {
    //     setOtAmountState(debouncedRedeemOTState);
    //   }
    //   setYtAmountState(
    //     parseFloat(formatEther(redeemResult as unknown as bigint)),
    //   );
    // } else if (vault === "unibtc") {
    //   setOtAmountState(debouncedRedeemOTState);
    //   setYtAmountState(debouncedRedeemOTState);
    // } else if (vault === "solvbtc") {
    //   setOtAmountState(debouncedRedeemOTState);
    //   setYtAmountState(debouncedRedeemOTState);
    // }

    setOtAmountState(debouncedRedeemOTState);
    setYtAmountState(debouncedRedeemOTState);
    setOutputTokensLoadingState(false);
  };

  const calculateYTRedeem = async () => {
    const ytTotalSupply = await readContract(config, {
      address: contracts.bhyt.address as `0x${string}`,
      abi: contracts.bhyt.abi,
      functionName: "totalSupply",
      args: [],
    });
    const prgBalance = await readContract(config, {
      address: contracts.goldilocked.address as `0x${string}`,
      abi: contracts.goldilocked.abi,
      functionName: "balanceOf",
      args: [contracts.bhoneygoldivault.address],
    });

    const prgResponse =
      parseFloat(formatEther(prgBalance as unknown as bigint)) *
      (debouncedRedeemYTState /
        parseFloat(formatEther(ytTotalSupply as unknown as bigint)));
    // const ibgtResponse = goldivaultInfoBhoneyState.accumulatedIbgt * (debouncedRedeemYTState / parseFloat(formatEther(ytTotalSupply as unknown as bigint)))
    // const honeyResponse = goldivaultInfoBhoneyState.accumulatedHoney * (debouncedRedeemYTState / parseFloat(formatEther(ytTotalSupply as unknown as bigint)))
    const response = {
      ibgt: prgResponse,
      honey: 0,
      value: prgResponse,
    };
    setRedeemYTAmountsState(response);
    setOutputTokensLoadingState(false);
  };

  const resetYTAmounts = () => {
    const response = {
      ibgt: 0,
      honey: 0,
      value: 0,
    };

    setRedeemYTAmountsState(response);
  };

  const quoteSwap = async () => {
    let pathOne;
    let pathTwo;
    if (activeToggleState === "TRADEOT") {
      if (tradeDirectionState === "OUT") {
        pathOne = contracts.bhot.address;
        pathTwo = contracts.honey.address;
      } else {
        pathOne = contracts.honey.address;
        pathTwo = contracts.bhot.address;
      }
    } else {
      if (tradeDirectionState === "OUT") {
        pathOne = contracts.bhyt.address;
        pathTwo = contracts.honey.address;
      } else {
        pathOne = contracts.honey.address;
        pathTwo = contracts.bhyt.address;
      }
    }
    const bhotPriceResult = await readContract(config, {
      address: contracts.quoter.address as `0x${string}`,
      abi: contracts.quoter.abi,
      functionName: "quoteExactInputSingleV2",
      args: [[pathOne, pathTwo, parseEther(tradeInputState.toString())]],
    });

    setTradeOutputState(
      parseFloat(formatEther(bhotPriceResult as unknown as bigint)),
    );
    setOutputTokensLoadingState(false);
  };

  const getDaysUntil = (timestamp: number): number => {
    const now = new Date();
    const futureDate = new Date(timestamp * 1000);
    const differenceInMs = futureDate.getTime() - now.getTime();
    const daysLeft = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 ? daysLeft : 0;
  };

  const getVaultOT = (vault: string): string => {
    if (vault === "weeth") {
      return contracts.weot.address;
    } else if (vault === "rseth") {
      return "";
    } else if (vault === "ebtc") {
      return "";
    } else if (vault === "unibtc") {
      return contracts.unibtcot.address;
    } else if (vault === "rusd") {
      return contracts.rusdot.address;
    } else {
      return contracts.solvbtcot.address;
    }
  };

  const getVaultDT = (vault: string): string => {
    if (vault === "weeth") {
      return contracts.weeth.address;
    } else if (vault === "rseth") {
      return "";
    } else if (vault === "ebtc") {
      return "";
    } else if (vault === "unibtc") {
      return contracts.unibtc.address;
    } else if (vault === "rusd") {
      return contracts.rusd.address;
    } else {
      return contracts.solvbtc.address;
    }
  };

  const getVault = (vault: string): string => {
    if (vault === "weeth") {
      return contracts.weethVault.address;
    } else if (vault === "rseth") {
      return "";
    } else if (vault === "ebtc") {
      return "";
    } else if (vault === "unibtc") {
      return contracts.unibtcVault.address;
    } else if (vault === "rusd") {
      return contracts.rusdVault.address;
    } else {
      return contracts.solvbtcVault.address;
    }
  };

  const getVaultFixedAPR = (vault: string): number => {
    if (vault === "weeth") {
      return goldivaultInfoWeethState.fixedApr;
    } else if (vault === "rseth") {
      return 0;
    } else if (vault === "ebtc") {
      return 0;
    } else if (vault === "unibtc") {
      return goldivaultInfoUnibtcState.fixedApr;
    } else if (vault === "rusd") {
      return goldivaultInfoRusdState.fixedApr;
    } else {
      return goldivaultInfoSolvbtcState.fixedApr;
    }
  };

  const quoteV3Swap = async (vault: string, vaultType: string) => {
    const vaultOT = getVaultOT(vault);
    const vaultDT = getVaultDT(vault);
    const vaultFixedApr = getVaultFixedAPR(vault);
    if (activeToggleState === "TRADEOT") {
      let quoteResult: any;
      let quoteForOutput: any;
      let impliedApr: any;
      if (tradeDirectionState === "OUT") {
        quoteResult = await readContract(config, {
          address: contracts.quoterv2.address as `0x${string}`,
          abi: contracts.quoterv2.abi,
          functionName: "quoteExactInputSingle",
          args: [
            [
              vaultOT,
              vaultDT,
              vaultType === "eth"
                ? parseEther(tradeInputState.toString())
                : parseUnits(tradeInputState.toString(), 8),
              500,
              0,
            ],
          ],
        });
        quoteForOutput =
          vaultType === "eth"
            ? parseFloat(formatEther(quoteResult[0] as unknown as bigint))
            : parseFloat((quoteResult[0] as unknown as bigint).toString()) /
              1e8;
      } else {
        quoteResult = await readContract(config, {
          address: contracts.quoterv2.address as `0x${string}`,
          abi: contracts.quoterv2.abi,
          functionName: "quoteExactInputSingle",
          args: [
            [
              vaultDT,
              vaultOT,
              vaultType === "eth"
                ? parseEther(tradeInputState.toString())
                : parseUnits(tradeInputState.toString(), 8),
              500,
              0,
            ],
          ],
        });
        quoteForOutput =
          vaultType === "eth"
            ? parseFloat(formatEther(quoteResult[0] as unknown as bigint))
            : parseFloat((quoteResult[0] as unknown as bigint).toString()) /
              1e8;
      }
      const buyingOTQuoteResult: any = await readContract(config, {
        address: contracts.quoterv2.address as `0x${string}`,
        abi: contracts.quoterv2.abi,
        functionName: 'quoteExactOutputSingle',
        args: [[
          vaultDT,
          vaultOT,
          vaultType === 'eth' ? parseEther(`1`) : parseUnits('1', 8),
          500,
          0
        ]]
      })
      const buyingOTPrice = vaultType === 'eth' ? parseFloat(formatEther(buyingOTQuoteResult[0] as unknown as bigint)) : parseFloat((buyingOTQuoteResult[0] as unknown as bigint).toString()) / 1e8
      const executionPrice = tradeDirectionState === 'OUT' ? quoteForOutput / tradeInputState : tradeInputState / quoteForOutput 
      const predictedPriceImpact = Math.abs(((executionPrice - buyingOTPrice) / buyingOTPrice) * 100)
      impliedApr = tradeDirectionState === 'OUT' ? (vaultFixedApr * (100 + predictedPriceImpact)) / 100 : (vaultFixedApr * (100 - predictedPriceImpact)) / 100

      setPriceImpactState(predictedPriceImpact)
      setImpliedAprState(impliedApr)
      setTradeOutputState(quoteForOutput * (1 - (slippageState.amount / 100)))
      setOutputTokensLoadingState(false)
    }
    else {
      if(tradeDirectionState === 'OUT') {
        // if(vaultType === 'eth') {
          const buyingOTQuoteResult: any = await readContract(config, {
            address: contracts.quoterv2.address as `0x${string}`,
            abi: contracts.quoterv2.abi,
            functionName: 'quoteExactOutputSingle',
            args: [[
              vaultDT,
              vaultOT,
              vaultType === 'eth' ? parseEther(`1`) : parseUnits('1', 8),
              500,
              0
            ]]
          })
          const buyingOTPrice = vaultType === 'eth' ? parseFloat(formatEther(buyingOTQuoteResult[0] as unknown as bigint)) : parseFloat((buyingOTQuoteResult[0] as unknown as bigint).toString()) / 1e8
          const dtSpendQuoteResult: any = await readContract(config, {
            address: contracts.quoterv2.address as `0x${string}`,
            abi: contracts.quoterv2.abi,
            functionName: 'quoteExactOutputSingle',
            args: [[
              vaultDT,
              vaultOT,
              vaultType === 'eth' ? parseEther(`${tradeInputState}`) : parseUnits(`${tradeInputState}`, 8),
              500,
              0
            ]]
          })
          const amountInMax = vaultType === 'eth' ? (parseFloat(formatEther(dtSpendQuoteResult[0] as unknown as bigint)) * 1.003) : (parseFloat(formatUnits(dtSpendQuoteResult[0] as unknown as bigint, 8)) * 1.003)
          const currentYtPrice = 1 - buyingOTPrice
          const calleddtAmountMin = (tradeInputState - amountInMax) * 0.997
          const dtAmountMin = tradeInputState * currentYtPrice
          const executionYtPrice = vaultType === 'eth' ? ((tradeInputState - parseFloat(formatEther(dtSpendQuoteResult[0] as unknown as bigint))) / tradeInputState) : ((tradeInputState - parseFloat(formatUnits(dtSpendQuoteResult[0] as unknown as bigint, 8))) / tradeInputState)
          const predictedPriceImpact = Math.abs(((currentYtPrice - executionYtPrice) / currentYtPrice) * 100)
          const impliedApr = (vaultFixedApr * (100 - predictedPriceImpact)) / 100

          setTradeOutputState(dtAmountMin * (1 - Math.abs((currentYtPrice - executionYtPrice) / currentYtPrice)))
          setCalledDtAmountMin(calleddtAmountMin)
          setVaultSwapTxAmountState(amountInMax)
          setHoneyApprovalAmountState(amountInMax)
          setPriceImpactState(predictedPriceImpact)
          setImpliedAprState(impliedApr)
        // }
        // else {
          // const quoteResult: any = await readContract(config, {
          //   address: contracts.quoterv2.address as `0x${string}`,
          //   abi: contracts.quoterv2.abi,
          //   functionName: 'quoteExactOutputSingle',
          //   args: [[
          //     vaultDT,
          //     vaultOT,
          //     vaultType === 'eth' ? parseEther(`${tradeInputState}`) : parseUnits(`${tradeInputState}`, 8),
          //     500,
          //     0
          //   ]]
          // })
          // const buyingOTQuoteResult: any = await readContract(config, {
          //   address: contracts.quoterv2.address as `0x${string}`,
          //   abi: contracts.quoterv2.abi,
          //   functionName: 'quoteExactOutputSingle',
          //   args: [[
          //     vaultDT,
          //     vaultOT,
          //     vaultType === 'eth' ? parseEther('0.0001') : parseUnits('0.0001', 8),
          //     500,
          //     0
          //   ]]
          // })
          // const amountInMax = vaultType === 'eth' ? parseFloat(formatEther(quoteResult[0] as unknown as bigint)) * 1.003 :  parseFloat(formatUnits(quoteResult[0] as unknown as bigint, 8)) * 1.003
          // const dtAmountMin = vaultType === 'eth' ? (tradeInputState - parseFloat(formatEther(quoteResult[0] as unknown as bigint))) * 0.997 : (tradeInputState - parseFloat(formatUnits(quoteResult[0] as unknown as bigint, 8))) * 0.997
          // const currentYtPrice = vaultType === 'eth' ? (0.0001 - parseFloat(formatEther(buyingOTQuoteResult[0] as unknown as bigint))) * 10000 : (0.0001 - parseFloat(formatUnits(buyingOTQuoteResult[0] as unknown as bigint, 8))) * 10000
          // const executionPrice = vaultType === 'eth' ? (tradeInputState - parseFloat(formatEther(quoteResult[0] as unknown as bigint))) / tradeInputState : (tradeInputState - parseFloat(formatUnits(quoteResult[0] as unknown as bigint, 8))) / tradeInputState
          // const predictedPriceImpact = ((currentYtPrice - executionPrice) / currentYtPrice) * 100
          // const impliedApr = (vaultFixedApr * (100 - predictedPriceImpact)) / 100
  
          // setTradeOutputState((tradeInputState * currentYtPrice) * ((100 - predictedPriceImpact) / 100))
          // setCalledDtAmountMin(dtAmountMin)
          // setVaultSwapTxAmountState(amountInMax)
          // setHoneyApprovalAmountState(amountInMax)
          // setPriceImpactState(predictedPriceImpact)
          // setImpliedAprState(impliedApr)
        // }
      }
      else {
        // if(vaultType === 'eth') {
        //   const quoteResult: any = await readContract(config, {
        //     address: contracts.quoterv2.address as `0x${string}`,
        //     abi: contracts.quoterv2.abi,
        //     functionName: 'quoteExactInputSingle',
        //     args: [[
        //       vaultOT,
        //       vaultDT,
        //       parseEther(`1`),
        //       500,
        //       0
        //     ]]
        //   })
        //   const otPrice = parseFloat(formatEther(quoteResult[0] as unknown as bigint))
        //   const ytPrice = 1 - otPrice
        //   const ytAmount = (tradeInputState / ytPrice) * (1 - (slippageState.amount / 100))
        //   const dtNeeded = tradeInputState > ytAmount ? 0 : ytAmount - tradeInputState
        //   const dtProceedsQuoteResult: any = await readContract(config, {
        //     address: contracts.quoterv2.address as `0x${string}`,
        //     abi: contracts.quoterv2.abi,
        //     functionName: 'quoteExactInputSingle',
        //     args: [[
        //       vaultOT,
        //       vaultDT,
        //       parseEther(`${ytAmount}`),
        //       500,
        //       0
        //     ]]
        //   })
        //   const amountOutMin = parseFloat(formatEther(dtProceedsQuoteResult[0] as unknown as bigint)) * 0.997
        //   const actualSpend = ytAmount - parseFloat(formatEther(dtProceedsQuoteResult[0] as unknown as bigint))
        //   const executionPrice = actualSpend / ytAmount
        //   const predictedPriceImpact = Math.abs(((executionPrice - ytPrice) / ytPrice) * 100)
        //   const impliedApr = (vaultFixedApr * (100 + predictedPriceImpact)) / 100

        //   setTradeOutputState(ytAmount)
        //   setCalledDtAmountMin(ytAmount)
        //   setVaultSwapTxAmountState(amountOutMin)
        //   setOtApprovalAmountState(tradeInputState + dtNeeded)
        //   setHoneyApprovalAmountState((tradeInputState + dtNeeded) + dtNeeded + ((tradeInputState + dtNeeded) * 1.003))
        //   setPriceImpactState(predictedPriceImpact)
        //   setImpliedAprState(impliedApr)
        // }
        // else {
          const quoteResult: any = await readContract(config, {
            address: contracts.quoterv2.address as `0x${string}`,
            abi: contracts.quoterv2.abi,
            functionName: 'quoteExactInputSingle',
            args: [[
              vaultOT,
              vaultDT,
              vaultType === 'eth' ? parseEther('0.0001') : parseUnits('0.0001', 8),
              500,
              0
            ]]
          })
          const ytPrice = vaultType === 'eth' ? (0.0001 - parseFloat(formatEther(quoteResult[0] as unknown as bigint))) * 10000 : (0.0001 - parseFloat(formatUnits(quoteResult[0] as unknown as bigint, 8))) * 10000
          const ytAmount = (tradeInputState / ytPrice) * (1 - (slippageState.amount / 100))
          const dtProceedsQuoteResult: any = await readContract(config, {
            address: contracts.quoterv2.address as `0x${string}`,
            abi: contracts.quoterv2.abi,
            functionName: 'quoteExactInputSingle',
            args: [[
              vaultOT,
              vaultDT,
              vaultType === 'eth' ? parseEther(`${ytAmount}`) : parseUnits(`${ytAmount}`, 8),
              500,
              0
            ]]
          })
          const amountOutMin = vaultType === 'eth' ? parseFloat(formatEther(dtProceedsQuoteResult[0] as unknown as bigint)) * 0.997 : parseFloat(formatUnits(dtProceedsQuoteResult[0] as unknown as bigint, 8)) * 0.997
          const dtNeeded = tradeInputState > ytAmount ? 0 : ytAmount - tradeInputState
          const executionPrice = vaultType === 'eth' ? (ytAmount - parseFloat(formatEther(dtProceedsQuoteResult[0] as unknown as bigint))) / ytAmount : (ytAmount - parseFloat(formatUnits(dtProceedsQuoteResult[0] as unknown as bigint, 8))) / ytAmount
          const predictedPriceImpact = ((executionPrice - ytPrice) / ytPrice) * 100
          const impliedApr = (vaultFixedApr * (100 + predictedPriceImpact)) / 100
  
          setTradeOutputState(ytAmount)
          setCalledDtAmountMin(ytAmount)
          setVaultSwapTxAmountState(amountOutMin)
          setOtApprovalAmountState(tradeInputState + dtNeeded)
          setHoneyApprovalAmountState((tradeInputState + dtNeeded) + dtNeeded + ((tradeInputState + dtNeeded) * 1.003))
          setPriceImpactState(predictedPriceImpact)
          setImpliedAprState(impliedApr)
        }
      // }
      setOutputTokensLoadingState(false)
    }
  };

  const checkVaultLiquidity = async (
    vault: string,
    vaultType: string,
  ): Promise<boolean> => {
    const vaultAddy = getVault(vault);
    const vaultOT = getVaultOT(vault);
    const vaultDT = getVaultDT(vault);
    const liquidityResult = await readContract(config, {
      address: vaultDT as `0x${string}`,
      abi: contracts.weeth.abi,
      functionName: "balanceOf",
      args: [vaultAddy],
    });
    const client = getPublicClient(config);
    const blockResult: any = await client.getBlock();
    const timestamp = parseFloat(blockResult.timestamp);
    const endTimeResult: any = await readContract(config, {
      address: vaultAddy as `0x${string}`,
      abi: contracts.weethVault.abi,
      functionName: "endTime",
      args: [],
    });
    const endTime = parseFloat(endTimeResult);
    const durationResult: any = await readContract(config, {
      address: vaultAddy as `0x${string}`,
      abi: contracts.weethVault.abi,
      functionName: "duration",
      args: [],
    });
    const quoteResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactInputSingle",
      args: [
        [
          vaultOT,
          vaultDT,
          vaultType === "eth" ? parseEther(`1`) : parseUnits("1", 8),
          500,
          0,
        ],
      ],
    });
    const otPrice =
      vaultType === "eth"
        ? parseFloat(formatEther(quoteResult[0] as unknown as bigint))
        : parseFloat((quoteResult[0] as unknown as bigint).toString()) / 1e8;
    const duration = parseFloat(durationResult);
    const remainingTime = timestamp > endTime ? 0 : endTime - timestamp;
    const ratio = remainingTime / duration;
    const vaultLiq =
      vaultType === "eth"
        ? parseFloat(formatEther(liquidityResult as unknown as bigint))
        : parseFloat((liquidityResult as unknown as bigint).toString()) / 1e8;
    if (tradeDirectionState === "OUT") {
      if (
        vaultLiq <
        (tradeOutputState * (1 - slippageState.amount / 100)) / ratio
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (vaultLiq < (tradeInputState / ratio) * otPrice) {
        return false;
      } else {
        return true;
      }
    }
  };

  const openNotification = (
    toggle: boolean,
    action: string,
    result: string,
    hash: string,
  ) => {
    setNotificationState((prevState: any) => ({
      toggle,
      action,
      result,
      hash,
    }));
  };

  const changeActiveToggle = (toggle: string) => {
    setDisplayStringState("");
    setDepositState(0);
    setRedeemOTState(0);
    setOtAmountState(0);
    setYtAmountState(0);
    setTradeInputState(0);
    setTradeOutputState(0);
    const response = {
      ibgt: 0,
      honey: 0,
      value: 0,
    };
    setRedeemYTAmountsState(response);
    setAllowanceButtonsState(false);
    setOutputTokensLoadingState(false);
    setActiveToggleState(toggle);
  };

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const enableInfoPopup = (info: string) => {
    if (info === "tvl") {
      setInfoPopupTextState(
        "Total value of all assets deposited to vault and the yield it has accumulated so far",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "yield") {
      setInfoPopupTextState(
        "Total yield accumulated by this vault over its lifetime",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "historicalapr") {
      setInfoPopupTextState(
        "Estimate of APR of underlying protocol based on yield since beginning of vault",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "currentapr") {
      setInfoPopupTextState(
        "Underlying protocol's current estimate of its APR",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "fixedapr") {
      setInfoPopupTextState(
        "Guaranteed annualized APR for buying OT and holding until expiry, assuming positive yield",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "ytimpliedvaluehistorical") {
      setInfoPopupTextState(
        "Estimate of value of one YT based on yield accrued by vault over its lifetime",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "ytimpliedvaluecurrent") {
      setInfoPopupTextState(
        "Estimate of value of one YT based on the underlying protocol estimated yield",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "longyieldhistorical") {
      setInfoPopupTextState(
        "Estimated annualized return of buying YT at current market price, given YT historical implied value",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "longyieldaprcurrent") {
      setInfoPopupTextState(
        "Estimated annualized return of buying YT at current market price, given YT current implied value",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "otlpapr") {
      setInfoPopupTextState(
        "Current APR for LPing the OT/Honey pair and staking LP token on Beradrome",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "ytlpapr") {
      setInfoPopupTextState(
        "Current APR for LPing the YT/Honey pair and staking LP token on Beradrome",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "pointsmultiplierweeth") {
      setInfoPopupTextState("Points multiplier given to YT holders and weETH in the LP");
      setInfoPopupToggleState(true);
    }
    if (info === "pointsmultiplierunibtc") {
      setInfoPopupTextState("Points multiplier given to YT holders and uniBTC in the LP");
      setInfoPopupToggleState(true);
    }
    if (info === "pointsmultiplierrusd") {
      setInfoPopupTextState("Points multiplier given to YT holders and rUSD in the LP");
      setInfoPopupToggleState(true);
    }
    if (info === "pointsperyt") {
      setInfoPopupTextState(
        "Amount of Etherfi points assigned to 1 YT at expiration of the vault",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "pointsleverage") {
      setInfoPopupTextState(
        "Effective points leverage achieved by holding 1 YT",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "vaultmaturity") {
      setInfoPopupTextState(
        "At maturity, YT tokens stop receiving yield and OT tokens become redeemable 1:1 for the underlying asset.",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "tvlweeth") {
      setInfoPopupTextState("Amount of weETH currently held in vault");
      setInfoPopupToggleState(true);
    }
    if (info === "fixedaprweeth") {
      setInfoPopupTextState(
        "Guaranteed annualized APR for buying OT at current price and holding until maturity. Alternatively: the expected apr implied by the current YT price",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "impliedyieldweeth") {
      setInfoPopupTextState(
        "Implied APR of points/yield based on current YT price",
      );
      setInfoPopupToggleState(true);
    }
    if (info === "weethvaultinfo") {
      setInfoPopupTextState(
        `4x Etherfi points and LRT^2 staking rewards;69x Etherfi point leverage`,
      );
      setInfoPopupToggleState(true);
    }
    if (info === "rsethvaultinfo") {
      setInfoPopupTextState(
        `2x Kelp DAO points and 1x Eigenlayer restaking rewards;69x Kelp DAO point leverage and 69x Eigenlayer point leverage`,
      );
      setInfoPopupToggleState(true);
    }
    if (info === "ebtcvaultinfo") {
      setInfoPopupTextState(
        `1x Babylon points, 2x Lombard points, 1x Symbiotic points, 3x Veda points, and 2x Karak points;69x Babylon point leverage, 69x Lombard point leverage, 69x Symbiotic point leverage, 69x Veda point leverage, and 69x Karak point leverage`,
      );
      setInfoPopupToggleState(true);
    }
    if (info === "unibtcvaultinfo") {
      setInfoPopupTextState(
        `4x Bedrock points and 1x Babylon points;69x Bedrock point leverage and 69x Babylon point leverage`,
      );
      setInfoPopupToggleState(true);
    }
    if (info === "solvbtcvaultinfo") {
      setInfoPopupTextState(
        `1x Babylon points and 4x Solv points;69x Babylon point leverage and 69x Solv point leverage`,
      );
      setInfoPopupToggleState(true);
    }
    if (info === "rusdvaultinfo") {
      setInfoPopupTextState(
        `2.25x Reservoir points;${(1 / vaultDisplayInfoState.rusd.ytPrice) * 2.25 < 100 ? formatAsString((1 / vaultDisplayInfoState.rusd.ytPrice) * 2.25) : "~"}x Reservoir point leverage`,
      );
      setInfoPopupToggleState(true);
    }
    if (info === "impliedapr") {
      setInfoPopupTextState(
        "The apr implied by the price at which your YT price is predicted to execute",
      );
      setInfoPopupToggleState(true);
    }
    if(info === 'lpapr') {
      setInfoPopupTextState('Providing liquidity earns a mixture of points, the fixed apr, trading fees and liquidity incentives through Beradrome')
      setInfoPopupToggleState(true)
    }
    if(info === 'fees') {
      setInfoPopupTextState('3% of points and 33% of LP trading fees (0.05%) and 0.5% fee on proceeds from YT trades')
      setInfoPopupToggleState(true)
    }
  };

  const disableInfoPopup = (info: string) => {
    setInfoPopupTextState("");
    setInfoPopupToggleState(false);
  };

  return (
    <GoldivaultContext.Provider
      value={{
        goldivaultInfoHoneyWbera: goldivaultInfoHoneyWberaState,
        goldivaultWalletInfoHoneyWbera: goldivaultWalletInfoHoneyWberaState,
        goldivaultInfoBhoney: goldivaultInfoBhoneyState,
        goldivaultWalletInfoBhoney: goldivaultWalletInfoBhoneyState,
        goldivaultInfoWeeth: goldivaultInfoWeethState,
        goldivaultWalletInfoWeeth: goldivaultWalletInfoWeethState,
        goldivaultInfoSolvbtc: goldivaultInfoSolvbtcState,
        goldivaultWalletInfoSolvbtc: goldivaultWalletInfoSolvbtcState,
        goldivaultInfoUnibtc: goldivaultInfoUnibtcState,
        goldivaultWalletInfoUnibtc: goldivaultWalletInfoUnibtcState,
        goldivaultInfoRusd: goldivaultInfoRusdState,
        goldivaultWalletInfoRusd: goldivaultWalletInfoRusdState,
        vaultDisplayInfo: vaultDisplayInfoState,
        slippage: slippageState,
        debouncedSlippage: debouncedSlippageState,
        refreshGoldivaultInfoHoneyWbera,
        refreshGoldivaultWalletInfoHoneyWbera,
        refreshGoldivaultInfoBhoney,
        refreshGoldivaultWalletInfoBhoney,
        refreshGoldivaultInfoWeeth,
        refreshGoldivaultWalletInfoWeeth,
        refreshGoldivaultInfoSolvbtc,
        refreshGoldivaultInfoUnibtc,
        refreshGoldivaultWalletInfoSolvbtc,
        refreshGoldivaultWalletInfoUnibtc,
        refreshGoldivaultInfoRusd,
        refreshGoldivaultWalletInfoRusd,
        refreshVaultDisplayInfo,
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
        vaultSwapTxAmount: vaultSwapTxAmountState,
        calledDtAmountMin: calledDtAmountMinState,
        priceImpact: priceImpactState,
        impliedApr: impliedAprState,
        honeyApprovalAmount: honeyApprovalAmountState,
        otApprovalAmount: otApprovalAmountState,
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
        infoPopupText: infoPopupTextState,
        checkVaultLiquidity,
      }}
    >
      {children}
    </GoldivaultContext.Provider>
  );
};

export const useGoldivault = () => useContext(GoldivaultContext);
