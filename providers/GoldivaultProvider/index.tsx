"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { useAccount } from "wagmi";

import { getPublicClient, readContract } from "@wagmi/core";

import { useDebounce } from "../../hooks";
import { config } from "../../providers/WagmiProvider";
import { vault_contracts } from "../../data/contracts";
import { EtherfiAPIResponse, ChartDataEntry } from "../../utils/interfaces";
import { beraScanLink, dexLink } from "@/utils/links";
import { contracts } from "@/utils/addressi";
import { VaultType } from "@/app/(geo-check)/goldivault/_components/constant/vaults";

/**
 * contracts and vaultDisplayInfo are standardized across all vaults,
 * while vaultInfo and walletInfo are specific to each vault
*/
export type HoverLabel = {
  label: string;
  hoverText: string;
}

type VaultLabels = {
  [key: string]: {
    goldivaultInfo: {
      [key: string]: string | HoverLabel;
    },
    goldivaultWalletInfo: {
      [key: string]: string | HoverLabel;
    }
  };
};

type LinkLabel = {
  label: string;
  link: string;
}

export type CommonVaultLabels = (key: VaultType) => {
  contracts: {
    vault: LinkLabel;
    ot: LinkLabel;
    yt: LinkLabel;
    vaultLP: LinkLabel;
  },
  otherLinks: {
    protocolUrl: LinkLabel;
    vaultLPDexLink: LinkLabel;
  },
  vaultDisplayInfo: {
    fixedApr: string;
    daysTil: string;
    liquidity: string;
    ytPrice: string;
  },
}

export type VaultTab =
  "DEPOSIT" | "REDEEMOT" | "REDEEMYT" | "TRADEOT" | "TRADEYT" |
  "ADDLIQ" | "REMOVELIQ" | "STAKE" | "UNSTAKE" | "CLAIM" |
  "POOLS" | "INFO" // Idk how relevant these are

// The same for all vaults
export const COMMON_LABELS: CommonVaultLabels = (key) => {
  const labels = {
    vaultDisplayInfo: {
      fixedApr: "Fixed APR",
      daysTil: "Days until maturity",
      liquidity: "Liquidity",
      ytPrice: "YT Price",
    },
    contracts: {
      vault: {
        label: "Vault",
        link: beraScanLink(vault_contracts[key as string].vault.address),
      },
      ot: {
        label: "OT",
        link: beraScanLink(vault_contracts[key as string].ot.address),
      },
      yt: {
        label: "YT",
        link: beraScanLink(vault_contracts[key as string].yt.address),
      },
      vaultLP: {
        label: "LP",
        link: beraScanLink(vault_contracts[key as string].vaultLP),
      },
    },
    otherLinks: {
      protocolUrl: {
        label: "Protocol URL",
        link: "https://www.kelpdao.xyz/",
      },
      vaultLPDexLink: {
        label: "OT Chart",
        link: dexLink(vault_contracts[key as string].vaultLP),
      }
    }
  } as const;
  return labels
}

// Valid Vaults: rusd, unibtc, rseth, oribgt
// The other vaults are not going to be implemented yet
export const VAULT_LABELS: VaultLabels = {
  rusd: {
    goldivaultInfo: {
      endTime: {
        label: "Vault Maturity",
        hoverText: "The date the vault will mature and you can redeem your tokens"
      },
      fixedApr: "Fixed APR/Implied Yield",
      otLiquidity: "Liquidity",
      reservoirLeverage: {
        label: "Reservoir Leverage",
        hoverText: "2.25x Reservoir Points Multiplier"
      }
    },
    goldivaultWalletInfo: {
      rusd: "RUSD",
      rusdAllowance: "RUSD Allowance",
      rusdot: "RUSD OT",
      rusdyt: "RUSD YT",
      rusdaquabera: "RUSD Aquabera",
    },
  },
  unibtc: {
    goldivaultInfo: {
      endTime: {
        label: "Vault Maturity",
        hoverText: "The date the vault will mature and you can redeem your tokens"
      },
      fixedApr: "Fixed APR/Implied Yield",
      otLiquidity: "Liquidity",
      bedrockLeverage: {
        label: "Bedrock Leverage",
        hoverText: "4x Bedrock Points Multiplier"
      },
      babylonLeverage: {
        label: "Babylon Leverage",
        hoverText: "1x Babylon Points Multiplier"
      },
    },
    goldivaultWalletInfo: {
      unibtc: "UniBTC",
      unibtcAllowance: "UniBTC Allowance",
      unibtcot: "UniBTC OT",
      unibtcyt: "UniBTC YT",
    },
  },
  rseth: {
    goldivaultInfo: {
      endTime: {
        label: "Vault Maturity",
        hoverText: "The date the vault will mature and you can redeem your tokens"
      },
      fixedApr: "Fixed APR/Implied Yield",
      otLiquidity: "Liquidity",
      kelpLeverage: {
        label: "KelpDAO Points Leverage",
        hoverText: "2x KelpDAO Points Multiplier"
      },
      eigenLeverage: {
        label: "EigenLayer Points Leverage",
        hoverText: "1x EigenLayer Points Multiplier"
      },
      restakingYield: "Current restaking yield"
    },
    goldivaultWalletInfo: {
      rseth: "rsETH",
      rsethAllowance: "rsETH Allowance",
      rsethot: "rsETH OT",
      rsethyt: "rsETH YT",
    },
  },
  oribgt: {
    goldivaultInfo: {
      endTime: {
        label: "Vault Maturity",
        hoverText: "The date the vault will mature and you can redeem your tokens"
      },
      fixedApr: "Fixed APR/Implied Yield",
      otLiquidity: "Liquidity",
      origamiLeverage: {
        label: "Origami Points Leverage",
        hoverText: "10x Origami Points Multiplier"
      },
      // infraredLeverage: {
      //   label: "Infrared Points Leverage",
      //   hoverText: "1x Infrared Points Multiplier"
      // }
    },
    goldivaultWalletInfo: {
      ibgt: "iBGT",
      ibgtAllowance: "iBGT Allowance",
      oribgtot: "OriBGT OT",
      oribgtyt: "OriBGT YT",
      claimable: "Claimable",
      justYt: "Yield Token",
      stakedYt: "Staked Yield Token"
    },
  },
};

// Define types only as needed
const INITIAL_STATE: {
  activeToggle: VaultTab;
  changeActiveToggle: (toggle: VaultTab) => void;
  // @ts-ignore
  [key: string]: any;
} = {
  goldivaultInfoWeeth: {
    endTime: 0,
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
    weethVaultAllowance: 0,
  },
  goldivaultInfoEbtc: {
    endTime: 0,
    fixedApr: 0,
    otLiquidity: 0,
    babylonLeverage: 0,
    lombardLeverage: 0,
    symbioticLeverage: 0,
    vedaLeverage: 0,
    karakLeverage: 0,
  },
  goldivaultWalletInfoEbtc: {
    ebtc: 0,
    ebtcAllowance: 0,
    ebtcot: 0,
    ebtcyt: 0,
  },
  goldivaultInfoSolvbtc: {
    endTime: 0,
    fixedApr: 0,
    otLiquidity: 0,
    babylonLeverage: 0,
    solvLeverage: 0,
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
    rusdaquabera: 0,
  },
  goldivaultInfoRseth: {
    endTime: 0,
    fixedApr: 0,
    otLiquidity: 0,
    kelpLeverage: 0,
    eigenLeverage: 0,
    restakingYield: 0
  },
  goldivaultWalletInfoRseth: {
    rseth: 0,
    rsethAllowance: 0,
    rsethot: 0,
    rsethyt: 0,
  },
  goldivaultInfoOribgt: {
    endTime: 0,
    fixedApr: 0,
    otLiquidity: 0,
    origamiLeverage: 0,
    infraredLeverage: 0
  },
  goldivaultWalletInfoOribgt: {
    ibgt: 0,
    ibgtAllowance: 0,
    oribgt: 0,
    oribgtot: 0,
    oribgtyt: 0,
    claimable: 0,
    justYt: 0,
    stakedYt: 0
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
    oribgt: {
      fixedApr: 0,
      daysTil: "",
      liquidity: 0,
      ytPrice: 0
    }
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
  buyOtPopup: false,
  setBuyOtPopup: (_popup: boolean) => {},
  sellOtPopup: false,
  setSellOtPopup: (_popup: boolean) => {},
  allowanceButtons: false,
  setAllowanceButtons: (_allowance: boolean) => {},
  handleChange: (_input: string) => {},
  handleBalanceClick: (_vault: string) => {},
  refreshGoldivaultInfoWeeth: async () => {},
  refreshGoldivaultWalletInfoWeeth: async () => {},
  refreshGoldivaultInfoEbtc: async () => {},
  refreshGoldivaultWalletInfoEbtc: async () => {},
  refreshGoldivaultInfoSolvbtc: async () => {},
  refreshGoldivaultWalletInfoSolvbtc: async () => {},
  refreshGoldivaultInfoUnibtc: async () => {},
  refreshGoldivaultWalletInfoUnibtc: async () => {},
  refreshGoldivaultInfoRusd: async () => {},
  refreshGoldivaultWalletInfoRusd: async () => {},
  refreshGoldivaultInfoRseth: async () => {},
  refreshGoldivaultWalletInfoRseth: async () => {},
  refreshGoldivaultInfoOribgt: async () => {},
  refreshGoldivaultWalletInfoOribgt: async () => {},
  refreshVaultDisplayInfo: async () => {},
  calculateDeposit: async (_vault: string) => {},
  calculateOTRedeem: async (_vault: string) => {},
  calculateYTRedeem: async () => {},
  quoteV3Swap: async () => {},
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
  chartData: [] as ChartDataEntry[],
  getChartData: async () => {}
} as const;

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
  const [goldivaultInfoWeethState, setGoldivaultInfoWeethState] = useState(
    INITIAL_STATE.goldivaultInfoWeeth,
  );
  const [goldivaultWalletInfoWeethState, setGoldivaultWalletInfoWeethState] =
    useState(INITIAL_STATE.goldivaultWalletInfoWeeth);
  const [goldivaultInfoEbtcState, setGoldivaultInfoEbtcState] = useState(
    INITIAL_STATE.goldivaultInfoEbtc,
  );
  const [goldivaultWalletInfoEbtcState, setGoldivaultWalletInfoEbtcState] =
    useState(INITIAL_STATE.goldivaultWalletInfoEbtc);
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
  const [goldivaultInfoRsethState, setGoldivaultInfoRsethState] = useState(
    INITIAL_STATE.goldivaultInfoRseth,
  );
  const [goldivaultWalletInfoRsethState, setGoldivaultWalletInfoRsethState] =
    useState(INITIAL_STATE.goldivaultWalletInfoRseth);
  const [goldivaultInfoOribgtState, setGoldivaultInfoOribgtState] = useState(INITIAL_STATE.goldivaultInfoOribgt)
  const [goldivaultWalletInfoOribgtState, setGoldivaultWalletInfoOribgtState] = useState(INITIAL_STATE.goldivaultWalletInfoOribgt)
  const [vaultDisplayInfoState, setVaultDisplayInfoState] = useState(
    INITIAL_STATE.vaultDisplayInfo,
  );
  const [notificationState, setNotificationState] = useState(
    INITIAL_STATE.notification,
  );
  const [activeToggleState, setActiveToggleState] = useState<VaultTab>(
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
  const [buyOtPopupState, setBuyOtPopupState] = useState<boolean>(INITIAL_STATE.buyOtPopup)
  const [sellOtPopupState, setSellOtPopupState] = useState<boolean>(INITIAL_STATE.sellOtPopup)
  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(
    INITIAL_STATE.allowanceButtons,
  );
  const [otAmountState, setOtAmountState] = useState<number>(
    INITIAL_STATE.otAmount,
  );
  const [ytAmountState, setYtAmountState] = useState<number>(
    INITIAL_STATE.ytAmount,
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
  const [chartDataState, setChartDataState] = useState<
    any[]
  >(INITIAL_STATE.chartData);

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
    if (amount > 100) {
      updatedState.amount = 100;
      updatedState.displayString = "100";
    } else {
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
    let buyingOTQuoteResult: any;
    let buyingOTPrice;
    try {
      buyingOTQuoteResult = await readContract(config, {
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
      buyingOTPrice = parseFloat(
        formatEther(buyingOTQuoteResult[0] as unknown as bigint),
      );
    } catch (e) {
      buyingOTQuoteResult = 0;
      buyingOTPrice = 0;
    }
    const impliedYieldResult =
      (1 - buyingOTPrice) * (31536000 / duration) * 100;
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
      args: [contracts.vaultLPaddys.weeth],
    });
    const weethLiquidity = await readContract(config, {
      address: contracts.weot.address as `0x${string}`,
      abi: contracts.weot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.weeth],
    });
    const weethPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.honey.address,
          contracts.weth.address,
          parseEther(`1`),
          3000,
          0,
        ],
      ],
    });
    const weethPrice = parseFloat(
      formatEther(weethPriceResult[0] as unknown as bigint),
    );

    const liquidityResult =
      (parseFloat(formatEther(weethOTLiquidity as unknown as bigint)) +
        parseFloat(formatEther(weethLiquidity as unknown as bigint))) *
      weethPrice;
    const etherfiResult = await getEtherfiData();

    const response = {
      endTime: parseFloat(endTimeResult),
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
      const weethVaultAllResult = await readContract(config, {
        address: contracts.weeth.address as `0x${string}`,
        abi: contracts.weeth.abi,
        functionName: "allowance",
        args: [address, contracts.weethVault.address],
      });

      const response = {
        weeth: parseFloat(formatEther(weethBalResult as unknown as bigint)),
        weot: parseFloat(formatEther(weotBalResult as unknown as bigint)),
        weyt: parseFloat(formatEther(weytBalResult as unknown as bigint)),
        weethVaultAllowance: parseFloat(
          formatEther(weethVaultAllResult as unknown as bigint),
        ),
      };

      setGoldivaultWalletInfoWeethState(response);
      setWalletInfoLoadingState(false);
    }
  };

  const refreshGoldivaultInfoEbtc = async () => {
    setInfoLoadingState(true);
    const endTimeResult: any = await readContract(config, {
      address: contracts.ebtcVault.address as `0x${string}`,
      abi: contracts.ebtcVault.abi,
      functionName: "endTime",
      args: [],
    });
    let buyingOTQuoteResult: any;
    let buyingOTPrice;
    try {
      buyingOTQuoteResult = await readContract(config, {
        address: contracts.quoterv2.address as `0x${string}`,
        abi: contracts.quoterv2.abi,
        functionName: "quoteExactOutputSingle",
        args: [
          [
            contracts.ebtc.address,
            contracts.ebtcot.address,
            parseUnits("1", 8),
            500,
            0,
          ],
        ],
      });
      buyingOTPrice = parseFloat(
        formatUnits(buyingOTQuoteResult[0] as unknown as bigint, 8),
      );
    } catch (e) {
      buyingOTQuoteResult = 0;
      buyingOTPrice = 0;
    }
    const currentYtPrice = 1 - buyingOTPrice;

    const timeDifference = parseFloat(endTimeResult) * 1000 - Date.now();
    const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const daysTil = parseFloat(fixedDaysDifference.toFixed(2));
    const fixedAprResponse = ((1 - buyingOTPrice) / 1) * 100 * (365 / daysTil);

    const ebtcLiquidity = await readContract(config, {
      address: contracts.ebtc.address as `0x${string}`,
      abi: contracts.ebtc.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.ebtc],
    });
    const ebtcOTLiquidity = await readContract(config, {
      address: contracts.ebtcot.address as `0x${string}`,
      abi: contracts.ebtcot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.ebtc],
    });
    const wbtcPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.honey.address,
          "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c",
          parseUnits(`1`, 8),
          3000,
          0,
        ],
      ],
    });
    const wbtcPrice = parseFloat(
      formatEther(wbtcPriceResult[0] as unknown as bigint),
    );

    const liquidityResult =
      (parseFloat(formatUnits(ebtcOTLiquidity as unknown as bigint, 8)) +
        parseFloat(formatUnits(ebtcLiquidity as unknown as bigint, 8))) *
      wbtcPrice;

    const response = {
      endTime: parseFloat(endTimeResult),
      fixedApr: fixedAprResponse,
      otLiquidity: liquidityResult,
      babylonLeverage: (1 / currentYtPrice) * 1,
      lombardLeverage: (1 / currentYtPrice) * 2,
      symbioticLeverage: (1 / currentYtPrice) * 1,
      vedaLeverage: (1 / currentYtPrice) * 3,
      karakLeverage: (1 / currentYtPrice) * 2,
    };

    setGoldivaultInfoEbtcState(response);
    setInfoLoadingState(false);
  };

  const refreshGoldivaultWalletInfoEbtc = async () => {
    if (address) {
      setWalletInfoLoadingState(true);
      const ebtcBalResult = await readContract(config, {
        address: contracts.ebtc.address as `0x${string}`,
        abi: contracts.ebtc.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const ebtcotBalResult = await readContract(config, {
        address: contracts.ebtcot.address as `0x${string}`,
        abi: contracts.ebtcot.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const ebtcytBalResult = await readContract(config, {
        address: contracts.ebtcyt.address as `0x${string}`,
        abi: contracts.ebtcyt.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const ebtcVaultAllResult = await readContract(config, {
        address: contracts.ebtc.address as `0x${string}`,
        abi: contracts.ebtc.abi,
        functionName: "allowance",
        args: [address, contracts.ebtcVault.address],
      });

      const response = {
        ebtc: parseFloat(formatUnits(ebtcBalResult as unknown as bigint, 8)),
        ebtcot: parseFloat(
          formatUnits(ebtcotBalResult as unknown as bigint, 8),
        ),
        ebtcyt: parseFloat(
          formatUnits(ebtcytBalResult as unknown as bigint, 8),
        ),
        ebtcVaultAllowance: parseFloat(
          formatUnits(ebtcVaultAllResult as unknown as bigint, 8),
        ),
      };

      setGoldivaultWalletInfoEbtcState(response);
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
    let buyingOTQuoteResult: any;
    let buyingOTPrice;
    try {
      buyingOTQuoteResult = await readContract(config, {
        address: contracts.quoterv2.address as `0x${string}`,
        abi: contracts.quoterv2.abi,
        functionName: "quoteExactOutputSingle",
        args: [
          [
            contracts.solvbtc.address,
            contracts.solvbtcot.address,
            parseEther("1"),
            500,
            0,
          ],
        ],
      });
      buyingOTPrice = parseFloat(
        formatEther(buyingOTQuoteResult[0] as unknown as bigint),
      );
    } catch (e) {
      buyingOTQuoteResult = 0;
      buyingOTPrice = 0;
    }
    const currentYtPrice = 1 - buyingOTPrice;

    const timeDifference = parseFloat(endTimeResult) * 1000 - Date.now();
    const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const daysTil = parseFloat(fixedDaysDifference.toFixed(2));
    const fixedAprResponse = ((1 - buyingOTPrice) / 1) * 100 * (365 / daysTil);

    const solvbtcLiquidity = await readContract(config, {
      address: contracts.solvbtc.address as `0x${string}`,
      abi: contracts.solvbtc.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.solvbtc],
    });
    const solvbtcOTLiquidity = await readContract(config, {
      address: contracts.solvbtcot.address as `0x${string}`,
      abi: contracts.solvbtcot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.solvbtc],
    });
    const wbtcPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.honey.address,
          "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c",
          parseUnits(`1`, 8),
          3000,
          0,
        ],
      ],
    });
    const wbtcPrice = parseFloat(
      formatEther(wbtcPriceResult[0] as unknown as bigint),
    );

    const liquidityResult =
      (parseFloat(formatEther(solvbtcOTLiquidity as unknown as bigint)) +
        parseFloat(formatEther(solvbtcLiquidity as unknown as bigint))) *
      wbtcPrice;

    const response = {
      endTime: parseFloat(endTimeResult),
      fixedApr: fixedAprResponse,
      otLiquidity: liquidityResult,
      babylonLeverage: (1 / currentYtPrice) * 1,
      solvLeverage: (1 / currentYtPrice) * 4,
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
      args: [contracts.vaultLPaddys.unibtc],
    });
    const unibtcOTLiquidity = await readContract(config, {
      address: contracts.unibtcot.address as `0x${string}`,
      abi: contracts.unibtcot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.unibtc],
    });
    const wbtcPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.honey.address,
          "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c",
          parseUnits(`1`, 8),
          3000,
          0,
        ],
      ],
    });
    const wbtcPrice = parseFloat(
      formatEther(wbtcPriceResult[0] as unknown as bigint),
    );
    const liquidityResult =
      (parseFloat((unibtcOTLiquidity as unknown as bigint).toString()) / 1e8 +
        parseFloat((unibtcLiquidity as unknown as bigint).toString()) / 1e8) *
      wbtcPrice;

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
    const buyingOTPrice = parseFloat(
      formatEther(buyingOTQuoteResult[0] as unknown as bigint),
    );
    const currentYtPrice = 1 - buyingOTPrice;

    const timeDifference = parseFloat(endTimeResult) * 1000 - Date.now();
    const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const daysTil = parseFloat(fixedDaysDifference.toFixed(2));
    const fixedAprResponse = ((1 - buyingOTPrice) / 1) * 100 * (365 / daysTil);

    const rusdLiquidity = await readContract(config, {
      address: contracts.rusd.address as `0x${string}`,
      abi: contracts.rusd.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.rusd],
    });
    const rusdOTLiquidity = await readContract(config, {
      address: contracts.rusdot.address as `0x${string}`,
      abi: contracts.rusdot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.rusd],
    });
    const liqManagerRusdLiquidity = await readContract(config, {
      address: contracts.rusd.address as `0x${string}`,
      abi: contracts.rusd.abi,
      functionName: "balanceOf",
      args: ["0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6"],
    });
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
      const rusdaquaberaBalResult = await readContract(config, {
        address: contracts.rusdaquabera.address as `0x${string}`,
        abi: contracts.rusdaquabera.abi,
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
        rusdaquabera: parseFloat(
          formatEther(rusdaquaberaBalResult as unknown as bigint),
        ),
      };

      setGoldivaultWalletInfoRusdState(response);
      setInfoLoadingState(false);
    }
  };

  const refreshGoldivaultInfoRseth = async () => {
    setInfoLoadingState(true);
    const endTimeResult: any = await readContract(config, {
      address: contracts.rsethVault.address as `0x${string}`,
      abi: contracts.rsethVault.abi,
      functionName: "endTime",
      args: [],
    });
    const buyingOTQuoteResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.rseth.address,
          contracts.rsethot.address,
          parseEther("1"),
          500,
          0,
        ],
      ],
    });
    const buyingOTPrice = parseFloat(
      formatEther(buyingOTQuoteResult[0] as unknown as bigint),
    );
    const currentYtPrice = 1 - buyingOTPrice;

    const timeDifference = parseFloat(endTimeResult) * 1000 - Date.now();
    const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const daysTil = parseFloat(fixedDaysDifference.toFixed(2));
    const fixedAprResponse = ((1 - buyingOTPrice) / 1) * 100 * (365 / daysTil);

    const rsethLiquidity = await readContract(config, {
      address: contracts.rseth.address as `0x${string}`,
      abi: contracts.rseth.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.rseth],
    });
    const rsethOTLiquidity = await readContract(config, {
      address: contracts.rsethot.address as `0x${string}`,
      abi: contracts.rsethot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.rseth],
    });
    const weethPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.honey.address,
          contracts.weth.address,
          parseEther(`1`),
          3000,
          0,
        ],
      ],
    });
    const weethPrice = parseFloat(
      formatEther(weethPriceResult[0] as unknown as bigint),
    );

    const liquidityResult =
      (parseFloat(formatEther(rsethOTLiquidity as unknown as bigint)) +
        parseFloat(formatEther(rsethLiquidity as unknown as bigint))) *
      weethPrice;

    const kelpdaoDataResult = await getKelpdaoData()

    const response = {
      endTime: parseFloat(endTimeResult),
      fixedApr: fixedAprResponse,
      otLiquidity: liquidityResult,
      kelpLeverage: (1 / currentYtPrice) * 2,
      eigenLeverage: (1 / currentYtPrice) * 1,
      restakingYield: kelpdaoDataResult ? kelpdaoDataResult : 0
    };

    setGoldivaultInfoRsethState(response);
    setInfoLoadingState(false);
  };

  const getKelpdaoData = async (): Promise<any> => {
    let rsethResponse: any | null = null
    try {
      const response = await fetch("/api/kelpdao")
      const responseJson = await response.json()
      rsethResponse = responseJson.data[responseJson.data.length - 1].apy
    }
    catch {
      console.log('rseth api error')
    }

    return rsethResponse
  }

  const refreshGoldivaultWalletInfoRseth = async () => {
    if (address) {
      setInfoLoadingState(true);
      const rsethBalResult = await readContract(config, {
        address: contracts.rseth.address as `0x${string}`,
        abi: contracts.rseth.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const rsethAllResult = await readContract(config, {
        address: contracts.rseth.address as `0x${string}`,
        abi: contracts.rseth.abi,
        functionName: "allowance",
        args: [address, contracts.rsethVault.address],
      });
      const rsethotBalResult = await readContract(config, {
        address: contracts.rsethot.address as `0x${string}`,
        abi: contracts.rsethot.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const rsethytBalResult = await readContract(config, {
        address: contracts.rsethyt.address as `0x${string}`,
        abi: contracts.rsethyt.abi,
        functionName: "balanceOf",
        args: [address],
      });

      const response = {
        rseth: parseFloat(formatEther(rsethBalResult as unknown as bigint)),
        rsethAllowance: parseFloat(
          formatEther(rsethAllResult as unknown as bigint),
        ),
        rsethot: parseFloat(formatEther(rsethotBalResult as unknown as bigint)),
        rsethyt: parseFloat(formatEther(rsethytBalResult as unknown as bigint)),
      };

      setGoldivaultWalletInfoRsethState(response);
      setInfoLoadingState(false);
    }
  };

  const refreshGoldivaultInfoOribgt = async () => {
    setInfoLoadingState(true);
    const endTimeResult: any = await readContract(config, {
      address: contracts.oribgtVault.address as `0x${string}`,
      abi: contracts.oribgtVault.abi,
      functionName: "endTime",
      args: [],
    })
    const buyingOTQuoteResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.oribgt.address,
          contracts.oribgtot.address,
          parseEther("1"),
          500,
          0,
        ],
      ],
    })
    const buyingOTPrice = parseFloat(formatEther(buyingOTQuoteResult[0] as unknown as bigint))
    const timeDifference = parseFloat(endTimeResult) * 1000 - Date.now();
    const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const daysTil = parseFloat(fixedDaysDifference.toFixed(2));
    const convertedQuote = await readContract(config, {
      address: contracts.oribgt.address as `0x${string}`,
      abi: contracts.oribgt.abi,
      functionName: 'convertToAssets',
      args: [parseEther(`${buyingOTPrice}`)]
    })
    const currentYtPrice = 1 - parseFloat(formatEther(convertedQuote as unknown as bigint))
    const fixedAprResponse = currentYtPrice * 100 * (365 / daysTil);

    const oribgtBalance = await readContract(config, {
      address: contracts.oribgt.address as `0x${string}`,
      abi: contracts.oribgt.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.oribgt],
    });
    const oribgtOTLiquidity = await readContract(config, {
      address: contracts.oribgtot.address as `0x${string}`,
      abi: contracts.oribgtot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.oribgt],
    });
    const oribgtLiquidity = await readContract(config, {
      address: contracts.oribgt.address as `0x${string}`,
      abi: contracts.oribgt.abi,
      functionName: "convertToAssets",
      args: [oribgtBalance],
    })
    const beraPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.honey.address,
          contracts.wbera.address,
          parseEther(`1`),
          3000,
          0,
        ],
      ],
    });
    const beraPrice = parseFloat(formatEther(beraPriceResult[0] as unknown as bigint))
    const ibgtPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.wbera.address,
          contracts.ibgt.address,
          parseEther(`1`),
          3000,
          0,
        ],
      ],
    });
    const ibgtPrice = parseFloat(formatEther(ibgtPriceResult[0] as unknown as bigint))
    const liquidityTokens = (parseFloat(formatEther(oribgtLiquidity as unknown as bigint)) + parseFloat(formatEther(oribgtOTLiquidity as unknown as bigint)))
    const liquidityResult = liquidityTokens * (ibgtPrice * beraPrice)

    const response = {
      endTime: parseFloat(endTimeResult),
      fixedApr: fixedAprResponse,
      otLiquidity: liquidityResult,
      origamiLeverage: (1 / currentYtPrice) * 10,
      infraredLeverage: (1 / currentYtPrice) * 1
    }

    setGoldivaultInfoOribgtState(response);
    setInfoLoadingState(false);
  }
  
  const refreshGoldivaultWalletInfoOribgt = async () => {
    if (address) {
      setInfoLoadingState(true);
      const ibgtBalResult = await readContract(config, {
        address: contracts.ibgt.address as `0x${string}`,
        abi: contracts.ibgt.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const ibgtAllResult = await readContract(config, {
        address: contracts.ibgt.address as `0x${string}`,
        abi: contracts.ibgt.abi,
        functionName: "allowance",
        args: [address, contracts.oribgtVault.address],
      });
      const oribgtBalResult = await readContract(config, {
        address: contracts.oribgt.address as `0x${string}`,
        abi: contracts.oribgt.abi,
        functionName: "balanceOf",
        args: [address],
      })
      const oribgtotBalResult = await readContract(config, {
        address: contracts.oribgtot.address as `0x${string}`,
        abi: contracts.oribgtot.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const oribgtytBalResult = await readContract(config, {
        address: contracts.oribgtyt.address as `0x${string}`,
        abi: contracts.oribgtyt.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const oribgtYtStakedResult = await readContract(config, {
        address: contracts.oribgtVault.address as `0x${string}`,
        abi: contracts.oribgtVault.abi,
        functionName: "ytStaked",
        args: [address],
      });
      const claimableResult = await readContract(config, {
        address: contracts.oribgtVault.address as `0x${string}`,
        abi: contracts.oribgtVault.abi,
        functionName: "userClaimableUnderlying",
        args: [address],
      })

      const response = {
        ibgt: parseFloat(formatEther(ibgtBalResult as unknown as bigint)),
        ibgtAllowance: parseFloat(formatEther(ibgtAllResult as unknown as bigint)),
        oribgt: parseFloat(formatEther(oribgtBalResult as unknown as bigint)),
        oribgtot: parseFloat(formatEther(oribgtotBalResult as unknown as bigint)),
        oribgtyt: parseFloat(formatEther(oribgtytBalResult as unknown as bigint)) + parseFloat(formatEther(oribgtYtStakedResult as unknown as bigint)),
        claimable: parseFloat(formatEther(claimableResult as unknown as bigint)),
        justYt: parseFloat(formatEther(oribgtytBalResult as unknown as bigint)),
        stakedYt: parseFloat(formatEther(oribgtYtStakedResult as unknown as bigint))
      };

      setGoldivaultWalletInfoOribgtState(response);
      setInfoLoadingState(false);
    }
  }

  const refreshVaultDisplayInfo = async () => {
    setInfoLoadingState(true);

    // weeth
    const endTimeResultWeeth: any = await readContract(config, {
      address: contracts.weethVault.address as `0x${string}`,
      abi: contracts.weethVault.abi,
      functionName: "endTime",
      args: [],
    });
    let buyingOTQuoteResultWeeth: any;
    let buyingOTPriceWeeth;
    try {
      buyingOTQuoteResultWeeth = await readContract(config, {
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
      buyingOTPriceWeeth = parseFloat(
        formatEther(buyingOTQuoteResultWeeth[0] as unknown as bigint),
      );
    } catch (e) {
      buyingOTQuoteResultWeeth = 0;
      buyingOTPriceWeeth = 0;
    }
    const weethOTLiquidity = await readContract(config, {
      address: contracts.weeth.address as `0x${string}`,
      abi: contracts.weeth.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.weeth],
    });
    const weethLiquidity = await readContract(config, {
      address: contracts.weot.address as `0x${string}`,
      abi: contracts.weot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.weeth],
    });
    const weethPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.honey.address,
          contracts.weth.address,
          parseEther(`1`),
          3000,
          0,
        ],
      ],
    });
    const weethPrice = parseFloat(
      formatEther(weethPriceResult[0] as unknown as bigint),
    );
    const liquidityResultWeeth =
      (parseFloat(formatEther(weethOTLiquidity as unknown as bigint)) +
        parseFloat(formatEther(weethLiquidity as unknown as bigint))) *
      weethPrice;
    const timeDifferenceWeeth =
      parseFloat(endTimeResultWeeth) * 1000 - Date.now();
    const fixedDaysDifferenceWeeth =
      timeDifferenceWeeth / (1000 * 60 * 60 * 24);
    const daysTilWeeth = parseFloat(fixedDaysDifferenceWeeth.toFixed(2));
    const fixedAprResponseWeeth =
      ((1 - buyingOTPriceWeeth) / 1) * 100 * (365 / daysTilWeeth);
    const ytPriceWeeth = 1 - buyingOTPriceWeeth;

    // rseth
    const endTimeResultRseth: any = await readContract(config, {
      address: contracts.rsethVault.address as `0x${string}`,
      abi: contracts.rsethVault.abi,
      functionName: "endTime",
      args: [],
    });
    const buyingOTQuoteResultRseth: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.rseth.address,
          contracts.rsethot.address,
          parseEther(`1`),
          500,
          0,
        ],
      ],
    });
    const rsethOTLiquidity = await readContract(config, {
      address: contracts.rsethot.address as `0x${string}`,
      abi: contracts.rsethot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.rseth],
    });
    const rsethLiquidity = await readContract(config, {
      address: contracts.rseth.address as `0x${string}`,
      abi: contracts.rseth.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.rseth],
    });
    const liquidityResultRseth =
      (parseFloat(formatEther(rsethOTLiquidity as unknown as bigint)) +
        parseFloat(formatEther(rsethLiquidity as unknown as bigint))) *
      weethPrice;
    const buyingOTPriceRseth = parseFloat(
      formatEther(buyingOTQuoteResultRseth[0] as unknown as bigint),
    );
    const timeDifferenceRseth =
      parseFloat(endTimeResultRseth) * 1000 - Date.now();
    const fixedDaysDifferenceRseth =
      timeDifferenceRseth / (1000 * 60 * 60 * 24);
    const daysTilRseth = parseFloat(fixedDaysDifferenceRseth.toFixed(2));
    const fixedAprResponseRseth =
      ((1 - buyingOTPriceRseth) / 1) * 100 * (365 / daysTilRseth);
    const ytPriceRseth = 1 - buyingOTPriceRseth;

    // ebtc
    const endTimeResultEbtc: any = await readContract(config, {
      address: contracts.ebtcVault.address as `0x${string}`,
      abi: contracts.ebtcVault.abi,
      functionName: "endTime",
      args: [],
    });
    let buyingOTQuoteResultEbtc: any;
    let buyingOTPriceEbtc;
    try {
      buyingOTQuoteResultEbtc = await readContract(config, {
        address: contracts.quoterv2.address as `0x${string}`,
        abi: contracts.quoterv2.abi,
        functionName: "quoteExactOutputSingle",
        args: [
          [
            contracts.ebtc.address,
            contracts.ebtcot.address,
            parseUnits("1", 8),
            500,
            0,
          ],
        ],
      });
      buyingOTPriceEbtc = parseFloat(
        formatUnits(buyingOTQuoteResultEbtc[0] as unknown as bigint, 8),
      );
    } catch (e) {
      buyingOTQuoteResultEbtc = 0;
      buyingOTPriceEbtc = 0;
    }
    const ytPriceEbtc = 1 - buyingOTPriceEbtc;

    const timeDifferenceEbtc =
      parseFloat(endTimeResultEbtc) * 1000 - Date.now();
    const fixedDaysDifferenceEbtc = timeDifferenceEbtc / (1000 * 60 * 60 * 24);
    const daysTilEbtc = parseFloat(fixedDaysDifferenceEbtc.toFixed(2));
    const fixedAprResponseEbtc =
      ((1 - buyingOTPriceEbtc) / 1) * 100 * (365 / daysTilEbtc);

    const ebtcLiquidity = await readContract(config, {
      address: contracts.ebtc.address as `0x${string}`,
      abi: contracts.ebtc.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.ebtc],
    });
    const ebtcOTLiquidity = await readContract(config, {
      address: contracts.ebtcot.address as `0x${string}`,
      abi: contracts.ebtcot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.ebtc],
    });
    const wbtcPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.honey.address,
          "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c",
          parseUnits(`1`, 8),
          3000,
          0,
        ],
      ],
    });
    const wbtcPrice = parseFloat(
      formatEther(wbtcPriceResult[0] as unknown as bigint),
    );
    const liquidityResultEbtc =
      (parseFloat(formatUnits(ebtcOTLiquidity as unknown as bigint, 8)) +
        parseFloat(formatUnits(ebtcLiquidity as unknown as bigint, 8))) *
      wbtcPrice;

    // unibtc
    const endTimeResultUnibtc: any = await readContract(config, {
      address: contracts.unibtcVault.address as `0x${string}`,
      abi: contracts.unibtcVault.abi,
      functionName: "endTime",
      args: [],
    });
    const buyingOTQuoteResultUnibtc: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.unibtc.address,
          contracts.unibtcot.address,
          parseUnits(`1`, 8),
          500,
          0,
        ],
      ],
    });
    const unibtcOTLiquidity = await readContract(config, {
      address: contracts.unibtc.address as `0x${string}`,
      abi: contracts.unibtc.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.unibtc],
    });
    const unibtcLiquidity = await readContract(config, {
      address: contracts.unibtcot.address as `0x${string}`,
      abi: contracts.unibtcot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.unibtc],
    });
    const liquidityResultUnibtc =
      (parseFloat((unibtcOTLiquidity as unknown as bigint).toString()) / 1e8 +
        parseFloat((unibtcLiquidity as unknown as bigint).toString()) / 1e8) *
      wbtcPrice;
    const buyingOTPriceUnibtc = parseFloat(
      formatUnits(buyingOTQuoteResultUnibtc[0] as unknown as bigint, 8),
    );
    const timeDifferenceUnibtc =
      parseFloat(endTimeResultUnibtc) * 1000 - Date.now();
    const fixedDaysDifferenceUnibtc =
      timeDifferenceUnibtc / (1000 * 60 * 60 * 24);
    const daysTilUnibtc = parseFloat(fixedDaysDifferenceUnibtc.toFixed(2));
    const fixedAprResponseUnibtc =
      ((1 - buyingOTPriceUnibtc) / 1) * 100 * (365 / daysTilUnibtc);
    const ytPriceUnibtc = 1 - buyingOTPriceUnibtc;

    // solvbtc
    const endTimeResultSolvbtc: any = await readContract(config, {
      address: contracts.solvbtcVault.address as `0x${string}`,
      abi: contracts.solvbtcVault.abi,
      functionName: "endTime",
      args: [],
    });
    let buyingOTQuoteResultSolvbtc: any;
    let buyingOTPriceSolvbtc;
    try {
      buyingOTQuoteResultSolvbtc = await readContract(config, {
        address: contracts.quoterv2.address as `0x${string}`,
        abi: contracts.quoterv2.abi,
        functionName: "quoteExactOutputSingle",
        args: [
          [
            contracts.solvbtc.address,
            contracts.solvbtcot.address,
            parseEther(`1`),
            500,
            0,
          ],
        ],
      });
      buyingOTPriceSolvbtc = parseFloat(
        formatEther(buyingOTQuoteResultSolvbtc[0] as unknown as bigint),
      );
    } catch (e) {
      buyingOTQuoteResultSolvbtc = 0;
      buyingOTPriceSolvbtc = 0;
    }
    const solvbtcOTLiquidity = await readContract(config, {
      address: contracts.solvbtcot.address as `0x${string}`,
      abi: contracts.solvbtcot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.solvbtc],
    });
    const solvbtcLiquidity = await readContract(config, {
      address: contracts.solvbtc.address as `0x${string}`,
      abi: contracts.solvbtc.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.solvbtc],
    });
    const liquidityResultSolvbtc =
      (parseFloat(formatEther(solvbtcOTLiquidity as unknown as bigint)) +
        parseFloat(formatEther(solvbtcLiquidity as unknown as bigint))) *
      wbtcPrice;
    const timeDifferenceSolvbtc =
      parseFloat(endTimeResultSolvbtc) * 1000 - Date.now();
    const fixedDaysDifferenceSolvbtc =
      timeDifferenceSolvbtc / (1000 * 60 * 60 * 24);
    const daysTilSolvbtc = parseFloat(fixedDaysDifferenceSolvbtc.toFixed(2));
    const fixedAprResponseSolvbtc =
      ((1 - buyingOTPriceSolvbtc) / 1) * 100 * (365 / daysTilSolvbtc);
    const ytPriceSolvbtc = 1 - buyingOTPriceSolvbtc;

    // rusd
    const endTimeResultRusd: any = await readContract(config, {
      address: contracts.rusdVault.address as `0x${string}`,
      abi: contracts.rusdVault.abi,
      functionName: "endTime",
      args: [],
    });
    const buyingOTQuoteResultRusd: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.rusd.address,
          contracts.rusdot.address,
          parseEther(`1`),
          500,
          0,
        ],
      ],
    });
    const rusdOTLiquidity = await readContract(config, {
      address: contracts.rusdot.address as `0x${string}`,
      abi: contracts.rusdot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.rusd],
    });
    const rusdLiquidity = await readContract(config, {
      address: contracts.rusd.address as `0x${string}`,
      abi: contracts.rusd.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.rusd],
    });
    const liqManagerRusdLiquidity = await readContract(config, {
      address: contracts.rusd.address as `0x${string}`,
      abi: contracts.rusd.abi,
      functionName: "balanceOf",
      args: ["0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6"],
    });
    const liquidityResultRusd =
      parseFloat(formatEther(rusdOTLiquidity as unknown as bigint)) +
      parseFloat(formatEther(rusdLiquidity as unknown as bigint)) +
      parseFloat(formatEther(liqManagerRusdLiquidity as unknown as bigint));
    const buyingOTPriceRusd = parseFloat(
      formatEther(buyingOTQuoteResultRusd[0] as unknown as bigint),
    );
    const timeDifferenceRusd =
      parseFloat(endTimeResultRusd) * 1000 - Date.now();
    const fixedDaysDifferenceRusd = timeDifferenceRusd / (1000 * 60 * 60 * 24);
    const daysTilRusd = parseFloat(fixedDaysDifferenceRusd.toFixed(2));
    const fixedAprResponseRusd =
      ((1 - buyingOTPriceRusd) / 1) * 100 * (365 / daysTilRusd);
    const ytPriceRusd = 1 - buyingOTPriceRusd;
    
    // oribgt
    const endTimeResultOribgt: any = await readContract(config, {
      address: contracts.oribgtVault.address as `0x${string}`,
      abi: contracts.oribgtVault.abi,
      functionName: "endTime",
      args: [],
    });
    const oribgtOTLiquidity = await readContract(config, {
      address: contracts.oribgtot.address as `0x${string}`,
      abi: contracts.oribgtot.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.oribgt],
    });
    const oribgtBalance = await readContract(config, {
      address: contracts.oribgt.address as `0x${string}`,
      abi: contracts.oribgt.abi,
      functionName: "balanceOf",
      args: [contracts.vaultLPaddys.oribgt],
    });
    const oribgtLiquidity = await readContract(config, {
      address: contracts.oribgt.address as `0x${string}`,
      abi: contracts.oribgt.abi,
      functionName: "convertToAssets",
      args: [oribgtBalance],
    })
    const beraPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.honey.address,
          contracts.wbera.address,
          parseEther(`1`),
          3000,
          0,
        ],
      ],
    });
    const beraPrice = parseFloat(formatEther(beraPriceResult[0] as unknown as bigint))
    const ibgtPriceResult: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.wbera.address,
          contracts.ibgt.address,
          parseEther(`1`),
          3000,
          0,
        ],
      ],
    });
    const ibgtPrice = parseFloat(formatEther(ibgtPriceResult[0] as unknown as bigint))
    const liquidityTokens = (parseFloat(formatEther(oribgtLiquidity as unknown as bigint)) + parseFloat(formatEther(oribgtOTLiquidity as unknown as bigint)))
    const liquidityResultOribgt = liquidityTokens * (ibgtPrice * beraPrice)
    const buyingOTQuoteResultOribgt: any = await readContract(config, {
      address: contracts.quoterv2.address as `0x${string}`,
      abi: contracts.quoterv2.abi,
      functionName: "quoteExactOutputSingle",
      args: [
        [
          contracts.oribgt.address,
          contracts.oribgtot.address,
          parseEther("1"),
          500,
          0,
        ],
      ],
    })
    const buyingOTPriceOribgt = parseFloat(formatEther(buyingOTQuoteResultOribgt[0] as unknown as bigint))
    const timeDifferenceOribgt = parseFloat(endTimeResultOribgt) * 1000 - Date.now();
    const fixedDaysDifferenceOribgt = timeDifferenceOribgt / (1000 * 60 * 60 * 24);
    const daysTilOribgt = parseFloat(fixedDaysDifferenceOribgt.toFixed(2));
    const convertedQuoteOribgt = await readContract(config, {
      address: contracts.oribgt.address as `0x${string}`,
      abi: contracts.oribgt.abi,
      functionName: 'convertToAssets',
      args: [parseEther(`${buyingOTPriceOribgt}`)]
    })
    const ytPriceOribgt = 1 - parseFloat(formatEther(convertedQuoteOribgt as unknown as bigint))
    const fixedAprResponseOribgt = ytPriceOribgt * 100 * (365 / daysTilOribgt);

    const response = {
      weeth: {
        fixedApr: fixedAprResponseWeeth,
        daysTil: getRelativeDate(parseFloat(endTimeResultWeeth)),
        liquidity: liquidityResultWeeth,
        ytPrice: ytPriceWeeth,
      },
      rseth: {
        fixedApr: fixedAprResponseRseth,
        daysTil: getRelativeDate(parseFloat(endTimeResultRseth)),
        liquidity: liquidityResultRseth,
        ytPrice: ytPriceRseth,
      },
      ebtc: {
        fixedApr: fixedAprResponseEbtc,
        daysTil: getRelativeDate(parseFloat(endTimeResultEbtc)),
        liquidity: liquidityResultEbtc,
        ytPrice: ytPriceEbtc,
      },
      unibtc: {
        fixedApr: fixedAprResponseUnibtc,
        daysTil: getRelativeDate(parseFloat(endTimeResultUnibtc)),
        liquidity: liquidityResultUnibtc,
        ytPrice: ytPriceUnibtc,
      },
      solvbtc: {
        fixedApr: fixedAprResponseSolvbtc,
        daysTil: getRelativeDate(parseFloat(endTimeResultSolvbtc)),
        liquidity: liquidityResultSolvbtc,
        ytPrice: ytPriceSolvbtc,
      },
      rusd: {
        fixedApr: fixedAprResponseRusd,
        daysTil: getRelativeDate(parseFloat(endTimeResultRusd)),
        liquidity: liquidityResultRusd,
        ytPrice: ytPriceRusd,
      },
      oribgt: {
        fixedApr: fixedAprResponseOribgt,
        daysTil: getRelativeDate(parseFloat(endTimeResultOribgt)),
        liquidity: liquidityResultOribgt,
        ytPrice: ytPriceOribgt
      }
    };

    setVaultDisplayInfoState(response);
    setInfoLoadingState(false);
  };

  const handleChange = (input: VaultTab) => {
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
    } else if (activeToggleState === "ADDLIQ") {
      setDisplayStringState(input);
      !input ? setTradeInputState(0) : setTradeInputState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
    } else if (activeToggleState === "REMOVELIQ") {
      setDisplayStringState(input);
      !input ? setTradeInputState(0) : setTradeInputState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
    } else if (activeToggleState === "STAKE" || activeToggleState === "UNSTAKE") {
      setDisplayStringState(input);
      !input ? setTradeInputState(0) : setTradeInputState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
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
        : vault === "solvbtc"
          ? goldivaultWalletInfoSolvbtcState.solvbtcot
          : vault === "unibtc"
            ? goldivaultWalletInfoUnibtcState.unibtcot
            : vault === "rusd"
              ? goldivaultWalletInfoRusdState.rusdot
              : vault === "ebtc"
                ? goldivaultWalletInfoEbtcState.ebtcot
                : vault === "rseth"
                  ? goldivaultWalletInfoRsethState.rsethot
                  : vault === "oribgt"
                    ? goldivaultWalletInfoOribgtState.oribgtot
                    : {}; // @note
    const vaultYT =
      vault === "weeth"
        ? goldivaultWalletInfoWeethState.weyt
        : vault === "solvbtc"
          ? goldivaultWalletInfoSolvbtcState.solvbtcyt
          : vault === "unibtc"
            ? goldivaultWalletInfoUnibtcState.unibtcyt
            : vault === "rusd"
              ? goldivaultWalletInfoRusdState.rusdyt
              : vault === "ebtc"
                ? goldivaultWalletInfoEbtcState.ebtcyt
                : vault === "rseth"
                  ? goldivaultWalletInfoRsethState.rsethyt
                  : vault === "oribgt"
                    ? goldivaultWalletInfoOribgtState.oribgtyt
                    : {}; // @note
    const vaultDT =
      vault === "weeth"
        ? goldivaultWalletInfoWeethState.weeth
        : vault === "solvbtc"
          ? goldivaultWalletInfoSolvbtcState.solvbtc
          : vault === "unibtc"
            ? goldivaultWalletInfoUnibtcState.unibtc
            : vault === "rusd"
              ? goldivaultWalletInfoRusdState.rusd
              : vault === "ebtc"
                ? goldivaultWalletInfoEbtcState.ebtc
                : vault === "rseth"
                  ? goldivaultWalletInfoRsethState.rseth
                  : vault === "oribgt"
                    ? goldivaultWalletInfoOribgtState.ibgt
                    : {}; // @note This should be a number, not {}
    const vaultLP =
      vault === "rusd" ? goldivaultWalletInfoRusdState.rusdaquabera : 0;

    if (activeToggleState === "DEPOSIT") {
      setDisplayStringState(vaultDT.toFixed(4));
      setDepositState(vaultDT - 0.0000001);
      setOutputTokensLoadingState(true);
    } else if (activeToggleState === "REDEEMOT") {
      setDisplayStringState(vaultOT.toFixed(4));
      setRedeemOTState(vaultOT - 0.0000001);
      setOutputTokensLoadingState(true);
    } else if (activeToggleState === "ADDLIQ") {
      setDisplayStringState(vaultDT.toFixed(4));
      setTradeInputState(vaultDT - 0.0000001);
    } else if (activeToggleState === "REMOVELIQ") {
      setDisplayStringState(vaultLP.toFixed(4));
      setTradeInputState(vaultLP - 0.0000001);
    } else if (activeToggleState === "STAKE") {
      setDisplayStringState(goldivaultWalletInfoOribgtState.justYt.toFixed(4));
      setTradeInputState(goldivaultWalletInfoOribgtState.justYt - 0.0000001);
    } else if (activeToggleState === "UNSTAKE") {
      setDisplayStringState(goldivaultWalletInfoOribgtState.stakedYt.toFixed(4));
      setTradeInputState(goldivaultWalletInfoOribgtState.stakedYt - 0.0000001);
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
      setTradeInputState(num - 0.0000001);
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
    setOtAmountState(parseFloat(depositState.toFixed(4)));
    setYtAmountState(depositState);
    setOutputTokensLoadingState(false);
  };

  const calculateOTRedeem = async (vault: string) => {
    setOtAmountState(debouncedRedeemOTState);
    setYtAmountState(debouncedRedeemOTState);
    setOutputTokensLoadingState(false);
  };

  const calculateYTRedeem = async () => {
    // const ytTotalSupply = await readContract(config, {
    //   address: contracts.bhyt.address as `0x${string}`,
    //   abi: contracts.bhyt.abi,
    //   functionName: "totalSupply",
    //   args: [],
    // });
    // const prgBalance = await readContract(config, {
    //   address: contracts.goldilocked.address as `0x${string}`,
    //   abi: contracts.goldilocked.abi,
    //   functionName: "balanceOf",
    //   args: [contracts.bhoneygoldivault.address],
    // });
    // const prgResponse =
    //   parseFloat(formatEther(prgBalance as unknown as bigint)) *
    //   (debouncedRedeemYTState /
    //     parseFloat(formatEther(ytTotalSupply as unknown as bigint)));
    // // const ibgtResponse = goldivaultInfoBhoneyState.accumulatedIbgt * (debouncedRedeemYTState / parseFloat(formatEther(ytTotalSupply as unknown as bigint)))
    // // const honeyResponse = goldivaultInfoBhoneyState.accumulatedHoney * (debouncedRedeemYTState / parseFloat(formatEther(ytTotalSupply as unknown as bigint)))
    // const response = {
    //   ibgt: prgResponse,
    //   honey: 0,
    //   value: prgResponse,
    // };
    // setRedeemYTAmountsState(response);
    // setOutputTokensLoadingState(false);
  };

  const resetYTAmounts = () => {
    const response = {
      ibgt: 0,
      honey: 0,
      value: 0,
    };

    setRedeemYTAmountsState(response);
  };

  // const getDaysUntil = (timestamp: number): number => {
  //   const now = new Date();
  //   const futureDate = new Date(timestamp * 1000);
  //   const differenceInMs = futureDate.getTime() - now.getTime();
  //   const daysLeft = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  //   return daysLeft >= 0 ? daysLeft : 0;
  // };

  const getVaultOT = (vault: string): string => {
    if (vault === "weeth") {
      return contracts.weot.address;
    } else if (vault === "rseth") {
      return contracts.rsethot.address;
    } else if (vault === "ebtc") {
      return contracts.ebtcot.address;
    } else if (vault === "unibtc") {
      return contracts.unibtcot.address;
    } else if (vault === "rusd") {
      return contracts.rusdot.address;
    } else if (vault === "oribgt") {
      return contracts.oribgtot.address;
    } else {
      return contracts.solvbtcot.address;
    }
  };

  const getVaultDT = (vault: string): string => {
    if (vault === "weeth") {
      return contracts.weeth.address;
    } else if (vault === "rseth") {
      return contracts.rseth.address;
    } else if (vault === "ebtc") {
      return contracts.ebtc.address;
    } else if (vault === "unibtc") {
      return contracts.unibtc.address;
    } else if (vault === "rusd") {
      return contracts.rusd.address;
    } else if (vault === "oribgt") {
      return contracts.oribgt.address;
    } else {
      return contracts.solvbtc.address;
    }
  };

  const getVault = (vault: string): string => {
    if (vault === "weeth") {
      return contracts.weethVault.address;
    } else if (vault === "rseth") {
      return contracts.rsethVault.address;
    } else if (vault === "ebtc") {
      return contracts.ebtcVault.address;
    } else if (vault === "unibtc") {
      return contracts.unibtcVault.address;
    } else if (vault === "rusd") {
      return contracts.rusdVault.address;
    } else if (vault === "oribgt") {
      return contracts.oribgtVault.address;
    } else {
      return contracts.solvbtcVault.address;
    }
  };

  const getVaultFixedAPR = (vault: string): number => {
    if (vault === "weeth") {
      return goldivaultInfoWeethState.fixedApr;
    } else if (vault === "rseth") {
      return goldivaultInfoRsethState.fixedApr;
    } else if (vault === "ebtc") {
      return goldivaultInfoEbtcState.fixedApr;
    } else if (vault === "unibtc") {
      return goldivaultInfoUnibtcState.fixedApr;
    } else if (vault === "rusd") {
      return goldivaultInfoRusdState.fixedApr;
    } else if (vault === "oribgt") {
      return goldivaultInfoOribgtState.fixedApr;
    } else {
      return goldivaultInfoSolvbtcState.fixedApr;
    }
  };

  const quoteV3Swap = async (vault: string, vaultType: string, four626bool: boolean) => {
    const vaultOT = getVaultOT(vault);
    const vaultDT = getVaultDT(vault);
    const vaultAddy = getVault(vault);
    const vaultFixedApr = getVaultFixedAPR(vault);
    if (activeToggleState === "TRADEOT") {
      let quoteResult: any;
      let quoteForOutput: any;
      const endTimeResult: any = await readContract(config, {
        address: vaultAddy as `0x${string}`,
        abi: contracts.weethVault.abi,
        functionName: "endTime",
        args: [],
      });
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
        if(four626bool) {
          const outputResult = await readContract(config, {
            address: contracts.oribgt.address as `0x${string}`,
            abi: contracts.oribgt.abi,
            functionName: 'convertToAssets',
            args: [parseEther(`${quoteForOutput}`)]
          })
          quoteForOutput = parseFloat(formatEther(outputResult as unknown as bigint))
        }
      } else {
        let convertedInput: number = 0
        if(four626bool) {
          const inputResult = await readContract(config, {
            address: contracts.oribgt.address as `0x${string}`,
            abi: contracts.oribgt.abi,
            functionName: 'convertToShares',
            args: [parseEther(`${tradeInputState}`)]
          })
          convertedInput = parseFloat(formatEther(inputResult as unknown as bigint))
        }
        quoteResult = await readContract(config, {
          address: contracts.quoterv2.address as `0x${string}`,
          abi: contracts.quoterv2.abi,
          functionName: "quoteExactInputSingle",
          args: [
            [
              vaultDT,
              vaultOT,
              vaultType === "eth"
                ? parseEther(`${four626bool ? convertedInput : tradeInputState}`)
                : parseUnits(`${four626bool ? convertedInput : tradeInputState}`, 8),
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
        functionName: "quoteExactOutputSingle",
        args: [
          [
            vaultDT,
            vaultOT,
            vaultType === "eth" ? parseEther(`1`) : parseUnits("1", 8),
            500,
            0,
          ],
        ],
      });
      const buyingOTPrice = vaultType === "eth"
          ? parseFloat(formatEther(buyingOTQuoteResult[0] as unknown as bigint))
          : parseFloat((buyingOTQuoteResult[0] as unknown as bigint).toString()) / 1e8;
      const newbuyingOTQuoteResult: any = await readContract(config, {
        address: contracts.quoterv2.address as `0x${string}`,
        abi: contracts.quoterv2.abi,
        functionName: "quoteExactOutputSingle",
        args: [
          [
            vaultDT,
            vaultOT,
            vaultType === "eth" ? parseEther(`0.0001`) : parseUnits(`0.0001`, 8),
            500,
            0,
          ],
        ],
      });
      const newbuyingOTPrice = vaultType === "eth"
        ? parseFloat(formatEther(newbuyingOTQuoteResult[0] as unknown as bigint)) * 10000
        : parseFloat(formatUnits(newbuyingOTQuoteResult[0] as unknown as bigint, 8)) * 10000
      const executionPrice = tradeDirectionState === "OUT"
          ? quoteForOutput / tradeInputState
          : tradeInputState / quoteForOutput;
      let correctOtPrice = 0
      if(four626bool) {
        const inputResult = await readContract(config, {
          address: contracts.oribgt.address as `0x${string}`,
          abi: contracts.oribgt.abi,
          functionName: 'convertToAssets',
          args: [parseEther(`${newbuyingOTPrice}`)]
        })
        correctOtPrice = parseFloat(formatEther(inputResult as unknown as bigint))
      }
      else {
        correctOtPrice = newbuyingOTPrice
      }
      const predictedPriceImpact = Math.abs(((executionPrice - correctOtPrice) / correctOtPrice) * 100)
      const timeDifference = parseFloat(endTimeResult) * 1000 - Date.now();
      const fixedDaysDifference = timeDifference / (1000 * 60 * 60 * 24);
      const daysTil = parseFloat(fixedDaysDifference.toFixed(2));
      const impliedApr = (1 - executionPrice) * (365 / daysTil) * 100;

      setPriceImpactState(predictedPriceImpact);
      setImpliedAprState(impliedApr);
      setTradeOutputState(quoteForOutput * (1 - slippageState.amount / 100));
      setOutputTokensLoadingState(false);
    } else {
      if (tradeDirectionState === "OUT") {
        // if(vaultType === 'eth') {
        const buyingOTQuoteResult: any = await readContract(config, {
          address: contracts.quoterv2.address as `0x${string}`,
          abi: contracts.quoterv2.abi,
          functionName: "quoteExactOutputSingle",
          args: [
            [
              vaultDT,
              vaultOT,
              vaultType === "eth"
                ? parseEther("0.0001")
                : parseUnits("0.0001", 8),
              500,
              0,
            ],
          ],
        });
        const buyingOTPrice = vaultType === "eth"
            ? parseFloat(formatEther(buyingOTQuoteResult[0] as unknown as bigint))
            : parseFloat((buyingOTQuoteResult[0] as unknown as bigint).toString()) / 1e8;
        const dtSpendQuoteResult: any = await readContract(config, {
          address: contracts.quoterv2.address as `0x${string}`,
          abi: contracts.quoterv2.abi,
          functionName: "quoteExactOutputSingle",
          args: [
            [
              vaultDT,
              vaultOT,
              vaultType === "eth" ? parseEther(`${tradeInputState}`) : parseUnits(`${tradeInputState}`, 8),
              500,
              0,
            ],
          ],
        });
        const amountInMax = vaultType === "eth"
            ? parseFloat(formatEther(dtSpendQuoteResult[0] as unknown as bigint)) * 1.003
            : parseFloat(formatUnits(dtSpendQuoteResult[0] as unknown as bigint, 8)) * 1.003;
        let currentYtPrice = (0.0001 - buyingOTPrice) * 10000;
        let calleddtAmountMin = (tradeInputState - amountInMax) * 0.997;
        let convertedSpendQuote: any
        if(four626bool) {
          convertedSpendQuote = await readContract(config, {
            address: contracts.oribgt.address as `0x${string}`,
            abi: contracts.oribgt.abi,
            functionName: 'convertToAssets',
            args: [parseEther(`${parseFloat(formatEther(dtSpendQuoteResult[0] as unknown as bigint))}`)]
          })
          const convertedQuote = await readContract(config, {
            address: contracts.oribgt.address as `0x${string}`,
            abi: contracts.oribgt.abi,
            functionName: 'convertToAssets',
            args: [parseEther(`${buyingOTPrice}`)]
          })
          currentYtPrice = (0.0001 - parseFloat(formatEther(convertedQuote as unknown as bigint))) * 10000;
          calleddtAmountMin = (tradeInputState - (1.003 * parseFloat(formatEther(convertedSpendQuote as unknown as bigint)))) * 0.997;
        }
        const dtAmountMin = tradeInputState * currentYtPrice;
        const executionYtPrice = vaultType === "eth"
            ? (
              four626bool ?
              (tradeInputState - parseFloat(formatEther(convertedSpendQuote as unknown as bigint))) / tradeInputState :
              (tradeInputState - parseFloat(formatEther(dtSpendQuoteResult[0] as unknown as bigint))) / tradeInputState
            )
            : (tradeInputState - parseFloat(formatUnits(dtSpendQuoteResult[0] as unknown as bigint, 8))) / tradeInputState;
        const predictedPriceImpact = Math.abs(((currentYtPrice - executionYtPrice) / currentYtPrice) * 100);
        const impliedApr = (vaultFixedApr * (100 - predictedPriceImpact)) / 100;

        setTradeOutputState(dtAmountMin * (1 - Math.abs((currentYtPrice - executionYtPrice) / currentYtPrice)));
        setCalledDtAmountMin(calleddtAmountMin);
        setVaultSwapTxAmountState(amountInMax);
        setHoneyApprovalAmountState(amountInMax);
        setPriceImpactState(predictedPriceImpact);
        setImpliedAprState(impliedApr);
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
      } else {
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
          functionName: "quoteExactInputSingle",
          args: [
            [
              vaultOT,
              vaultDT,
              vaultType === "eth"
                ? parseEther("0.0001")
                : parseUnits("0.0001", 8),
              500,
              0,
            ],
          ],
        });
        let sellQuote = vaultType === "eth" ? parseFloat(formatEther(quoteResult[0] as unknown as bigint)) : parseFloat(formatUnits(quoteResult[0] as unknown as bigint, 8))
        if(four626bool) {
          const convertedQuote = await readContract(config, {
            address: contracts.oribgt.address as `0x${string}`,
            abi: contracts.oribgt.abi,
            functionName: 'convertToAssets',
            args: [parseEther(`${sellQuote}`)]
          })
          sellQuote = parseFloat(formatEther(convertedQuote as unknown as bigint))
        }
        const ytPrice = (0.0001 - sellQuote) * 10000;
        const ytAmount = (tradeInputState / ytPrice) * (1 - slippageState.amount / 100);
        const dtProceedsQuoteResult: any = await readContract(config, {
          address: contracts.quoterv2.address as `0x${string}`,
          abi: contracts.quoterv2.abi,
          functionName: "quoteExactInputSingle",
          args: [
            [
              vaultOT,
              vaultDT,
              vaultType === "eth"
                ? parseEther(`${ytAmount}`)
                : parseUnits(`${ytAmount}`, 8),
              500,
              0,
            ],
          ],
        });
        const amountOutMin = vaultType === "eth"
          ? parseFloat(formatEther(dtProceedsQuoteResult[0] as unknown as bigint)) * 0.997
          : parseFloat(formatUnits(dtProceedsQuoteResult[0] as unknown as bigint, 8)) * 0.997;
        const dtNeeded = tradeInputState > ytAmount ? 0 : ytAmount - tradeInputState;
        let executionPrice = vaultType === "eth" ?
          (ytAmount - parseFloat(formatEther(dtProceedsQuoteResult[0] as unknown as bigint))) / ytAmount
        : (ytAmount - parseFloat(formatUnits(dtProceedsQuoteResult[0] as unknown as bigint, 8))) / ytAmount;
        if(four626bool) {
          const convertedProceeds = await readContract(config, {
            address: contracts.oribgt.address as `0x${string}`,
            abi: contracts.oribgt.abi,
            functionName: 'convertToAssets',
            args: [dtProceedsQuoteResult[0]]
          })
          executionPrice = (ytAmount - parseFloat(formatEther(convertedProceeds as unknown as bigint))) / ytAmount
        }
        const predictedPriceImpact = ((executionPrice - ytPrice) / ytPrice) * 100;
        const impliedApr = (vaultFixedApr * (100 + predictedPriceImpact)) / 100;

        setTradeOutputState(ytAmount);
        setCalledDtAmountMin(ytAmount);
        setVaultSwapTxAmountState(amountOutMin);
        setOtApprovalAmountState(tradeInputState + dtNeeded);
        setHoneyApprovalAmountState(tradeInputState + dtNeeded + dtNeeded + (tradeInputState + dtNeeded) * 1.003);
        setPriceImpactState(predictedPriceImpact);
        setImpliedAprState(impliedApr);
      }
      // }
      setOutputTokensLoadingState(false);
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
    setActiveToggleState(toggle as VaultTab);
  };

  const formatLeverageNum = (num: number, leverage: number): string => {
    const lev = (1 / num) * leverage;
    if (num < 100) {
      return lev.toLocaleString("en-US", { maximumFractionDigits: 2 });
    } else {
      return "~";
    }
  };

  const enableInfoPopup = (info: string) => {
    setInfoPopupTextState((prev) =>
      (() => {
        switch (info) {
          case "tvl":
            return "Total value of all assets deposited to vault and the yield it has accumulated so far";
          case "yield":
            return "Total yield accumulated by this vault over its lifetime";
          case "historicalapr":
            return "Estimate of APR of underlying protocol based on yield since beginning of vault";
          case "currentapr":
            return "Underlying protocol's current estimate of its APR";
          case "fixedapr":
            return "Guaranteed annualized APR for buying OT and holding until expiry, assuming positive yield";
          case "ytimpliedvaluehistorical":
            return "Estimate of value of one YT based on yield accrued by vault over its lifetime";
          case "ytimpliedvaluecurrent":
            return "Estimate of value of one YT based on the underlying protocol estimated yield";
          case "longyieldhistorical":
            return "Estimated annualized return of buying YT at current market price, given YT historical implied value";
          case "longyieldaprcurrent":
            return "Estimated annualized return of buying YT at current market price, given YT current implied value";
          case "otlpapr":
            return "Current APR for LPing the OT/Honey pair and staking LP token on Beradrome";
          case "ytlpapr":
            return "Current APR for LPing the YT/Honey pair and staking LP token on Beradrome";
          case "pointsmultiplierweeth":
            return "Points multiplier given to YT holders and weETH in the LP";
          case "pointsmultiplierunibtc":
            return "Points multiplier given to YT holders and uniBTC in the LP";
          case "pointsmultiplierrusd":
            return "Points multiplier given to YT holders and rUSD in the LP";
          case "pointsperyt":
            return "Amount of Etherfi points assigned to 1 YT at expiration of the vault";
          case "pointsleverage":
            return "Effective points leverage achieved by holding 1 YT";
          case "vaultmaturity":
            return "At maturity, YT tokens stop receiving yield and OT tokens become redeemable 1:1 for the underlying asset.";
          case "tvlweeth":
            return "Amount of weETH currently held in vault";
          case "fixedaprweeth":
            return "Guaranteed annualized APR for buying OT at current price and holding until maturity. Alternatively: the expected apr implied by the current YT price";
          case "impliedyieldweeth":
            return "Implied APR of points/yield based on current YT price";
          case "weethvaultinfo":
            return `4x Etherfi points and LRT^2 staking rewards;${formatLeverageNum(vaultDisplayInfoState.weeth.ytPrice, 4)}x Etherfi point leverage`;
          case "rsethvaultinfo":
            return `2x Kelp DAO points and 1x Eigenlayer restaking rewards;${formatLeverageNum(vaultDisplayInfoState.rseth.ytPrice, 2)}x Kelp DAO point leverage and ${formatLeverageNum(vaultDisplayInfoState.rseth.ytPrice, 1)}x Eigenlayer point leverage`;
          case "ebtcvaultinfo":
            return `1x Babylon points, 2x Lombard points, 1x Symbiotic points, 3x Veda points, and 2x Karak points;${formatLeverageNum(vaultDisplayInfoState.ebtc.ytPrice, 1)}x Babylon point leverage, ${formatLeverageNum(vaultDisplayInfoState.ebtc.ytPrice, 2)}x Lombard point leverage, ${formatLeverageNum(vaultDisplayInfoState.ebtc.ytPrice, 1)}x Symbiotic point leverage, ${formatLeverageNum(vaultDisplayInfoState.ebtc.ytPrice, 3)}x Veda point leverage, and ${formatLeverageNum(vaultDisplayInfoState.ebtc.ytPrice, 2)}x Karak point leverage`;
          case "unibtcvaultinfo":
            return `4x Bedrock points and 1x Babylon points;${formatLeverageNum(vaultDisplayInfoState.unibtc.ytPrice, 4)}x Bedrock point leverage and ${formatLeverageNum(vaultDisplayInfoState.unibtc.ytPrice, 1)}x Babylon point leverage`;
          case "solvbtcvaultinfo":
            return `1x Babylon points and 4x Solv points;${formatLeverageNum(vaultDisplayInfoState.solvbtc.ytPrice, 1)}x Babylon point leverage and ${formatLeverageNum(vaultDisplayInfoState.solvbtc.ytPrice, 4)}x Solv point leverage`;
          case "rusdvaultinfo":
            return `2.25x Reservoir points;${formatLeverageNum(vaultDisplayInfoState.rusd.ytPrice, 2.25)}x Reservoir point leverage`;
          case "oribgtvaultinfo":
            // return `10x Origami points and 1x Infrared points;${formatLeverageNum(vaultDisplayInfoState.oribgt.ytPrice, 10)}x Origami point leverage and ${formatLeverageNum(vaultDisplayInfoState.oribgt.ytPrice, 1)}x Infrared point leverage`
            return `10x Origami points;${formatLeverageNum(vaultDisplayInfoState.oribgt.ytPrice, 10)}x Origami point leverage`
          case "impliedapr":
            return "The apr implied by the price at which your trade is predicted to execute";
          case "lpapr":
            return "Providing liquidity earns a mixture of points, the fixed apr, trading fees and liquidity incentives through Beradrome";
          case "fees":
            return "3% of yield and points and 33% of LP trading fees (0.05%) and 0.5% fee on proceeds from YT trades";
          case "redeemotinfo":
            return "Burn ownership and yield tokens to receive underlying assets from the vault";
          case "redeemytinfo":
            return "Only available after vault expiration";
          default:
            return prev;
        }
      })(),
    );
    setInfoPopupToggleState(true);
  };

  const disableInfoPopup = (info: string) => {
    setInfoPopupTextState("");
    setInfoPopupToggleState(false);
  };

  // @momo
  const getVaultInfo = (vault: string) => {
    switch (vault.toLowerCase()) {
      case "weeth":
        return goldivaultInfoWeethState;
      case "ebtc":
        return goldivaultInfoEbtcState;
      case "solvbtc":
        return goldivaultInfoSolvbtcState;
      case "unibtc":
        return goldivaultInfoUnibtcState;
      case "rusd":
        return goldivaultInfoRusdState;
      case "rseth":
        return goldivaultInfoRsethState;
      case "oribgt":
        return goldivaultInfoOribgtState;
      default:
        return null;
    }
  };

  // @momo
  const getVaultWalletInfo = (vault: string) => {
    switch (vault.toLowerCase()) {
      case "weeth":
        return goldivaultWalletInfoWeethState;
      case "ebtc":
        return goldivaultWalletInfoEbtcState;
      case "solvbtc":
        return goldivaultWalletInfoSolvbtcState;
      case "unibtc":
        return goldivaultWalletInfoUnibtcState;
      case "rusd":
        return goldivaultWalletInfoRusdState;
      case "rseth":
        return goldivaultWalletInfoRsethState;
      case "oribgt":
        return goldivaultWalletInfoOribgtState;
      default:
        return null;
    }
  };

  // @momo
  const refreshVaultInfo = async (vault: VaultType) => {
    switch (vault.toLowerCase()) {
      case "weeth":
        return refreshGoldivaultInfoWeeth();
      case "ebtc":
        return refreshGoldivaultInfoEbtc();
      case "solvbtc":
        return refreshGoldivaultInfoSolvbtc();
      case "unibtc":
        return refreshGoldivaultInfoUnibtc();
      case "rusd":
        return refreshGoldivaultInfoRusd();
      case "rseth":
        return refreshGoldivaultInfoRseth();
      case "oribgt":
        return refreshGoldivaultInfoOribgt();
      default:
        return;
    }
  };

  // @momo
  const refreshVaultWalletInfo = async (vault: VaultType) => {
    switch (vault.toLowerCase()) {
      case "weeth":
        return refreshGoldivaultWalletInfoWeeth();
      case "ebtc":
        return refreshGoldivaultWalletInfoEbtc();
      case "solvbtc":
        return refreshGoldivaultWalletInfoSolvbtc();
      case "unibtc":
        return refreshGoldivaultWalletInfoUnibtc();
      case "rusd":
        return refreshGoldivaultWalletInfoRusd();
      case "rseth":
        return refreshGoldivaultWalletInfoRseth();
      case "oribgt":
        return refreshGoldivaultWalletInfoOribgt();
      default:
        return;
    }
  };

  const getFormattedDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
  }

  const getChartData = async () => {
    // const response = await fetch("/api/rusdytchart")
    // const responseJson: any = await response.json()
    // // console.log(responseJson)
    // const newChartData = []
    // for(let node of responseJson.rusdytDaily) {
    //   const entry = {
    //     ytPrice: parseFloat(node.ytPrice.toFixed(5)),
    //     fixedApr: parseFloat(node.fixedApr.toFixed(3)),
    //     date: getFormattedDate(node.timestamp)
    //   }

    //   newChartData.push(entry)
    // }
    
    // setChartDataState(newChartData.reverse())
  }

  return (
    <GoldivaultContext.Provider
      value={{
        goldivaultInfoWeeth: goldivaultInfoWeethState,
        goldivaultWalletInfoWeeth: goldivaultWalletInfoWeethState,
        goldivaultInfoEbtc: goldivaultInfoEbtcState,
        goldivaultWalletInfoEbtc: goldivaultWalletInfoEbtcState,
        goldivaultInfoSolvbtc: goldivaultInfoSolvbtcState,
        goldivaultWalletInfoSolvbtc: goldivaultWalletInfoSolvbtcState,
        goldivaultInfoUnibtc: goldivaultInfoUnibtcState,
        goldivaultWalletInfoUnibtc: goldivaultWalletInfoUnibtcState,
        goldivaultInfoRusd: goldivaultInfoRusdState,
        goldivaultWalletInfoRusd: goldivaultWalletInfoRusdState,
        goldivaultInfoRseth: goldivaultInfoRsethState,
        goldivaultWalletInfoRseth: goldivaultWalletInfoRsethState,
        goldivaultInfoOribgt: goldivaultInfoOribgtState,
        goldivaultWalletInfoOribgt: goldivaultWalletInfoOribgtState,
        vaultDisplayInfo: vaultDisplayInfoState,
        slippage: slippageState,
        debouncedSlippage: debouncedSlippageState,
        refreshGoldivaultInfoWeeth,
        refreshGoldivaultWalletInfoWeeth,
        refreshGoldivaultInfoEbtc,
        refreshGoldivaultWalletInfoEbtc,
        refreshGoldivaultInfoSolvbtc,
        refreshGoldivaultInfoUnibtc,
        refreshGoldivaultWalletInfoSolvbtc,
        refreshGoldivaultWalletInfoUnibtc,
        refreshGoldivaultInfoRusd,
        refreshGoldivaultWalletInfoRusd,
        refreshGoldivaultInfoRseth,
        refreshGoldivaultWalletInfoRseth,
        refreshGoldivaultInfoOribgt,
        refreshGoldivaultWalletInfoOribgt,
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
        buyOtPopup: buyOtPopupState,
        setBuyOtPopup: setBuyOtPopupState,
        sellOtPopup: sellOtPopupState,
        setSellOtPopup: setSellOtPopupState,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
        handleChange,
        handleBalanceClick,
        calculateDeposit,
        calculateOTRedeem,
        calculateYTRedeem,
        quoteV3Swap,
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
        getVaultInfo,
        getVaultWalletInfo,
        refreshVaultInfo,
        refreshVaultWalletInfo,
        chartData: chartDataState,
        getChartData
      }}
    >
      {children}
    </GoldivaultContext.Provider>
  );
};

export const useGoldivault = () => useContext(GoldivaultContext);