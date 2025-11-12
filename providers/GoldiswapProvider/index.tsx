"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { readContract } from "@wagmi/core";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useDebounce, useGoldiswapMath } from "../../hooks";
import { config } from "../../providers/WagmiProvider";
import { contracts } from "../../utils/addressi";
import { LocksChartData } from "../../utils/interfaces";

const INITIAL_STATE = {
  goldiswapInfo: {
    fsl: 0,
    psl: 0,
    supply: 0,
    targetRatio: 0,
    lastFloorRaise: 0,
    prgValue: 0,
    prgSupply: 0,
    prgMarketCap: 0,
  },

  goldiswapWalletInfo: {
    locks: 0,
    honey: 0,
    prg: 0,
    staked: 0,
    locked: 0,
    borrowed: 0,
    claimable: 0,
    honeySwapAllowance: 0,
    unvested: 0
  },

  simInfo: {
    toggle: false,
    fsl: 0,
    psl: 0,
    supply: 0,
    floor: 0,
    market: 0,
    targetRatio: 0,
    prgValue: 0,
  },
  setSimInfo: (
    _toggle: boolean,
    _fsl: number,
    _psl: number,
    _supply: number,
    _floor: number,
    _market: number,
    _targetRatio: number,
    prgValue: number,
  ) => {},

  slippage: {
    amount: 0.5,
    toggle: false,
    displayString: "0.5",
  },

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

  honeyBuy: 0,
  sellingLocks: 0,
  redeemingLocks: 0,

  buyingLocks: 0,
  gettingHoney: 0,
  redeemingHoney: 0,

  debouncedHoneyBuy: 0,
  debouncedGettingHoney: 0,

  displayString: "",
  bottomDisplayString: "",

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

  activeToggle: "BUY",
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

  refreshGoldiswapInfo: async () => {},
  refreshGoldiswapWalletInfo: async () => {},

  infoLoading: false,
  walletInfoLoading: false,

  buyingLocksLoading: false,
  setBuyingLocksLoading: (_loading: boolean) => {},

  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {},

  wutPopup: false,
  setWutPopup: (_popup: boolean) => {},

  balanceMobileToggle: false,
  setBalanceMobileToggle: (_toggle: boolean) => {},
  chartData: {} as LocksChartData,
  getChartData: async () => {}
};

const GoldiswapContext = createContext(INITIAL_STATE);

export const GoldiswapProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const { address, isConnected } = useAccount();

  const { simulateBuyDry, simulateSellDry, floorPrice, marketPrice } =
    useGoldiswapMath();

  const [goldiswapInfoState, setGoldiswapInfoState] = useState(
    INITIAL_STATE.goldiswapInfo,
  );
  const [goldiswapWalletInfoState, setGoldiswapWalletInfoState] = useState(
    INITIAL_STATE.goldiswapWalletInfo,
  );
  const [slippageState, setSlippageState] = useState(INITIAL_STATE.slippage);
  const [notificationState, setNotificationState] = useState(
    INITIAL_STATE.notification,
  );

  const [honeyBuyState, setHoneyBuyState] = useState<number>(
    INITIAL_STATE.honeyBuy,
  );
  const debouncedHoneyBuyState = useDebounce(honeyBuyState, 1000);
  const [sellingLocksState, setSellingLocksState] = useState<number>(
    INITIAL_STATE.sellingLocks,
  );
  const [redeemingLocksState, setRedeemingLocksState] = useState<number>(
    INITIAL_STATE.redeemingLocks,
  );

  const [buyingLocksState, setBuyingLocksState] = useState<number>(
    INITIAL_STATE.buyingLocks,
  );
  const [gettingHoneyState, setGettingHoneyState] = useState<number>(
    INITIAL_STATE.gettingHoney,
  );
  const debouncedGettingHoneyState = useDebounce(gettingHoneyState, 1000);
  const [redeemingHoneyState, setRedeemingHoneyState] = useState<number>(
    INITIAL_STATE.redeemingHoney,
  );

  const [topInputFlagState, setTopInputFlagState] = useState<boolean>(
    INITIAL_STATE.topInputFlag,
  );
  const [bottomInputFlagState, setBottomInputFlagState] = useState<boolean>(
    INITIAL_STATE.bottomInputFlag,
  );

  const [activeToggleState, setActiveToggleState] = useState<string>(
    INITIAL_STATE.activeToggle,
  );
  const [displayStringState, setDisplayStringState] = useState<string>(
    INITIAL_STATE.displayString,
  );
  const [bottomDisplayStringState, setBottomDisplayStringState] =
    useState<string>(INITIAL_STATE.bottomDisplayString);

  const [chartDataState, setChartDataState] = useState<
    any
  >(INITIAL_STATE.chartData);
  const [chartOpenState, setChartOpenState] = useState<boolean>(
    INITIAL_STATE.chartOpen,
  );
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(
    INITIAL_STATE.infoLoading,
  );
  const [walletInfoLoadingState, setWalletInfoLoadingState] = useState<boolean>(
    INITIAL_STATE.walletInfoLoading,
  );
  const [buyingLocksLoadingState, setBuyingLocksLoadingState] =
    useState<boolean>(INITIAL_STATE.buyingLocksLoading);
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(
    INITIAL_STATE.txConfirming,
  );
  const [balanceMobileToggleState, setBalanceMobileToggleState] =
    useState<boolean>(INITIAL_STATE.balanceMobileToggle);
  const [wutPopupState, setWutPopupState] = useState<boolean>(
    INITIAL_STATE.wutPopup,
  );

  const [redeemPopupToggleState, setRedeemPopupToggleState] = useState<boolean>(
    INITIAL_STATE.redeemPopupToggle,
  );

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(
    INITIAL_STATE.allowanceButtons,
  );
  const [simInfoState, setSimInfoState] = useState(INITIAL_STATE.simInfo);

  const changeSlippage = (amount: number, displayString: string) => {
    const updatedState = { ...slippageState };
    updatedState.amount = amount;
    updatedState.displayString = displayString;
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

  const changeActiveToggle = (toggle: string) => {
    setDisplayStringState("");
    setBottomDisplayStringState("");
    setHoneyBuyState(0);
    setBuyingLocksState(0);
    setSellingLocksState(0);
    setGettingHoneyState(0);
    setRedeemingLocksState(0);
    setRedeemingHoneyState(0);
    setActiveToggleState(toggle);
    setAllowanceButtonsState(false);
  };

  const flipTokens = () => {
    if (activeToggleState === "REDEEM") {
      return;
    }
    setDisplayStringState("");
    setBottomDisplayStringState("");
    setHoneyBuyState(0);
    setBuyingLocksState(0);
    setSellingLocksState(0);
    setGettingHoneyState(0);
    setAllowanceButtonsState(false);
    if (activeToggleState === "BUY") {
      setActiveToggleState("SELL");
    } else if (activeToggleState === "SELL") {
      setActiveToggleState("BUY");
    }
  };

  const handlePercentageButtons = (action: number) => {
    if (!isConnected) return;
    if (action == 1) {
      if (activeToggleState === "BUY") {
        setDisplayStringState((goldiswapWalletInfoState.honey / 4).toFixed(4));
        setHoneyBuyState(goldiswapWalletInfoState.honey / 4);
      }
      if (activeToggleState === "SELL") {
        setDisplayStringState((goldiswapWalletInfoState.locks / 4).toFixed(4));
        setSellingLocksState(goldiswapWalletInfoState.locks / 4);
      }
      if (activeToggleState === "REDEEM") {
        setDisplayStringState((goldiswapWalletInfoState.locks / 4).toFixed(4));
        setRedeemingLocksState(goldiswapWalletInfoState.locks / 4);
      }
    }
    if (action == 2) {
      if (activeToggleState === "BUY") {
        setDisplayStringState((goldiswapWalletInfoState.honey / 2).toFixed(4));
        setHoneyBuyState(goldiswapWalletInfoState.honey / 2);
      }
      if (activeToggleState === "SELL") {
        setDisplayStringState((goldiswapWalletInfoState.locks / 2).toFixed(4));
        setSellingLocksState(goldiswapWalletInfoState.locks / 2);
      }
      if (activeToggleState === "REDEEM") {
        setDisplayStringState((goldiswapWalletInfoState.locks / 2).toFixed(4));
        setRedeemingLocksState(goldiswapWalletInfoState.locks / 2);
      }
    }
    if (action == 3) {
      if (activeToggleState === "BUY") {
        setDisplayStringState(
          (goldiswapWalletInfoState.honey * 0.75).toFixed(4),
        );
        setHoneyBuyState(goldiswapWalletInfoState.honey * 0.75);
      }
      if (activeToggleState === "SELL") {
        setDisplayStringState(
          (goldiswapWalletInfoState.locks * 0.75).toFixed(4),
        );
        setSellingLocksState(goldiswapWalletInfoState.locks * 0.75);
      }
      if (activeToggleState === "REDEEM") {
        setDisplayStringState(
          (goldiswapWalletInfoState.locks * 0.75).toFixed(4),
        );
        setRedeemingLocksState(goldiswapWalletInfoState.locks * 0.75);
      }
    }
    if (action == 4) {
      if (activeToggleState === "BUY") {
        setDisplayStringState(goldiswapWalletInfoState.honey.toFixed(4));
        setHoneyBuyState(goldiswapWalletInfoState.honey - 0.0001);
      }
      if (activeToggleState === "SELL") {
        setDisplayStringState(goldiswapWalletInfoState.locks.toFixed(4));
        setSellingLocksState(goldiswapWalletInfoState.locks - 0.0001);
      }
      if (activeToggleState === "REDEEM") {
        setDisplayStringState(goldiswapWalletInfoState.locks.toFixed(4));
        setRedeemingLocksState(goldiswapWalletInfoState.locks - 0.0001);
      }
    }
  };

  const findLocksBuyAmount = (debouncedValue: number) => {
    const currentMarket: number = marketPrice(
      goldiswapInfoState.fsl,
      goldiswapInfoState.psl,
      goldiswapInfoState.supply,
    );
    const honey: number = debouncedValue;
    let locks: number = honey / currentMarket;
    // console.log("initial locks: ", locks)
    let temp: number = 0;
    while (parseFloat(temp.toFixed(2)) !== parseFloat(honey.toFixed(2))) {
      temp = simulateBuyDry(
        locks,
        goldiswapInfoState.fsl,
        goldiswapInfoState.psl,
        goldiswapInfoState.supply,
      );
      // console.log("temp: ", temp)
      if (parseFloat(temp.toFixed(2)) > parseFloat(honey.toFixed(2))) {
        const diff = temp - honey;
        if (diff > 10000) {
          locks -= (10000 * 0.9) / currentMarket;
        } else if (diff > 1000) {
          locks -= (1000 * 0.9) / currentMarket;
        } else if (diff > 100) {
          locks -= (100 * 0.9) / currentMarket;
        } else if (diff > 10) {
          locks -= (10 * 0.9) / currentMarket;
        } else if (diff > 1) {
          locks -= (1 * 0.9) / currentMarket;
        } else if (diff > 0.1) {
          locks -= (0.1 * 0.9) / currentMarket;
        } else if (diff > 0.01) {
          locks -= (0.01 * 0.9) / currentMarket;
        } else {
          locks -= 0.05;
        }
      } else if (parseFloat(temp.toFixed(2)) < parseFloat(honey.toFixed(2))) {
        const diff = honey - temp;
        if (diff > 10000) {
          locks += (10000 * 0.9) / currentMarket;
        } else if (diff > 1000) {
          locks += (1000 * 0.9) / currentMarket;
        } else if (diff > 100) {
          locks += (100 * 0.9) / currentMarket;
        } else if (diff > 10) {
          locks += (10 * 0.9) / currentMarket;
        } else if (diff > 1) {
          locks += (1 * 0.9) / currentMarket;
        } else if (diff > 0.1) {
          locks += (0.1 * 0.9) / currentMarket;
        } else if (diff > 0.01) {
          locks += (0.01 * 0.9) / currentMarket;
        } else {
          locks += 0.05;
        }
      } else {
        const locksWithSlippage: number =
          locks * (1 - slippageState.amount / 100);
        setBuyingLocksState(locksWithSlippage);
        setBottomDisplayStringState(locksWithSlippage.toFixed(4));
        // console.log('found it: ', parseFloat(temp.toFixed(2)))
        // console.log('locks: ', locks)
        // console.log('with slippage: ', locksWithSlippage)
      }
    }
    return locks * (1 - slippageState.amount / 100);
  };

  const findLocksSellAmount = (debouncedValue: number) => {
    const currentMarket: number = marketPrice(
      goldiswapInfoState.fsl,
      goldiswapInfoState.psl,
      goldiswapInfoState.supply,
    );
    const honey: number = debouncedValue;
    let locks: number = honey / currentMarket;
    let temp: number = 0;
    while (parseFloat(temp.toFixed(2)) !== parseFloat(honey.toFixed(2))) {
      temp = simulateSellDry(
        locks,
        goldiswapInfoState.fsl,
        goldiswapInfoState.psl,
        goldiswapInfoState.supply,
      );
      if (parseFloat(temp.toFixed(2)) > parseFloat(honey.toFixed(2))) {
        const diff = temp - honey;
        if (diff > 10000) {
          locks -= (10000 * 0.9) / currentMarket;
        } else if (diff > 1000) {
          locks -= (1000 * 0.9) / currentMarket;
        } else if (diff > 100) {
          locks -= (100 * 0.9) / currentMarket;
        } else if (diff > 10) {
          locks -= (10 * 0.9) / currentMarket;
        } else if (diff > 1) {
          locks -= (1 * 0.9) / currentMarket;
        } else if (diff > 0.1) {
          locks -= (0.1 * 0.9) / currentMarket;
        } else if (diff > 0.01) {
          locks -= (0.01 * 0.9) / currentMarket;
        } else {
          locks -= 0.05;
        }
      } else if (parseFloat(temp.toFixed(2)) < parseFloat(honey.toFixed(2))) {
        const diff = honey - temp;
        if (diff > 10000) {
          locks += (10000 * 0.9) / currentMarket;
        } else if (diff > 1000) {
          locks += (1000 * 0.9) / currentMarket;
        } else if (diff > 100) {
          locks += (100 * 0.9) / currentMarket;
        } else if (diff > 10) {
          locks += (10 * 0.9) / currentMarket;
        } else if (diff > 1) {
          locks += (1 * 0.9) / currentMarket;
        } else if (diff > 0.1) {
          locks += (0.1 * 0.9) / currentMarket;
        } else if (diff > 0.01) {
          locks += (0.01 * 0.9) / currentMarket;
        } else {
          locks += 0.05;
        }
      }
    }
    return locks;
  };

  const simulateBuy = (amt: number) => {
    let _leftover = amt;
    let _fsl = goldiswapInfoState.fsl;
    let _psl = goldiswapInfoState.psl;
    let _supply = goldiswapInfoState.supply;
    let _purchasePrice = 0;
    let _tax = 0;
    let _market = 0;
    let _floor = 0;
    while (_leftover >= 1000) {
      _market = marketPrice(_fsl, _psl, _supply);
      _floor = floorPrice(_fsl, _supply);
      _purchasePrice += _market * 1000;
      _supply += 1000;
      if (_psl / _fsl >= 0.5) {
        _fsl += _market * 1000;
      } else {
        _fsl += _floor * 1000;
        _psl += (_market - _floor) * 1000;
      }
      _leftover -= 1000;
    }
    if (_leftover > 0) {
      _market = marketPrice(_fsl, _psl, _supply);
      _floor = floorPrice(_fsl, _supply);
      _purchasePrice += _market * _leftover;
      _supply += _leftover;
      if (_psl / _fsl >= 0.5) {
        _fsl += _market * _leftover;
      } else {
        _psl += (_market - _floor) * _leftover;
        _fsl += _floor * _leftover;
      }
    }
    _tax = _purchasePrice * 0.003;

    let response;

    if (_psl / _fsl >= goldiswapInfoState.targetRatio) {
      const raiseAmount: number = (_psl / _fsl) * (_psl / 32);
      const newFsl = _fsl + raiseAmount;
      const newPsl = _psl - raiseAmount;
      response = {
        toggle: true,
        fsl: newFsl,
        psl: newPsl,
        supply: _supply,
        floor: floorPrice(newFsl, _supply),
        market: marketPrice(newFsl, newPsl, _supply),
        targetRatio:
          goldiswapInfoState.targetRatio + goldiswapInfoState.targetRatio / 50,
        prgValue:
          marketPrice(newFsl, newPsl, _supply) - floorPrice(newFsl, _supply),
      };
    } else {
      response = {
        toggle: true,
        fsl: _fsl,
        psl: _psl,
        supply: _supply,
        floor: floorPrice(_fsl, _supply),
        market: marketPrice(_fsl, _psl, _supply),
        targetRatio: goldiswapInfoState.targetRatio,
        prgValue: marketPrice(_fsl, _psl, _supply) - floorPrice(_fsl, _supply),
      };
    }

    setSimInfoState(response);
  };

  const simulateSell = (amt: number) => {
    let _leftover = amt;
    let _fsl = goldiswapInfoState.fsl;
    let _psl = goldiswapInfoState.psl;
    let _supply = goldiswapInfoState.supply;
    let _salePrice = 0;
    let _tax = 0;
    let _market = 0;
    let _floor = 0;
    while (_leftover >= 1000) {
      _market = marketPrice(_fsl, _psl, _supply);
      _floor = floorPrice(_fsl, _supply);
      _salePrice += _market * 1000;
      _supply -= 1000;
      _leftover -= 1000;
      _fsl -= _floor * 1000;
      _psl -= (_market - _floor) * 1000;
    }
    if (_leftover > 0) {
      _market = marketPrice(_fsl, _psl, _supply);
      _floor = floorPrice(_fsl, _supply);
      _salePrice += _market * _leftover;
      _psl -= (_market - _floor) * _leftover;
      _fsl -= _floor * _leftover;
      _supply -= _leftover;
    }
    _tax = _salePrice * 0.053;

    const response = {
      toggle: true,
      fsl: _fsl + _tax,
      psl: _psl,
      supply: _supply,
      floor: floorPrice(_fsl + _tax, _supply),
      market: marketPrice(_fsl + _tax, _psl, _supply),
      targetRatio: goldiswapInfoState.targetRatio,
      prgValue:
        marketPrice(_fsl + _tax, _psl, _supply) -
        floorPrice(_fsl + _tax, _supply),
    };

    setSimInfoState(response);
  };

  const simulateRedeem = (amt: number) => {
    const rawTotal: number =
      amt * floorPrice(goldiswapInfoState.fsl, goldiswapInfoState.supply);
    let newFsl = goldiswapInfoState.fsl - rawTotal;
    const _psl = goldiswapInfoState.psl;
    const newSupply = goldiswapInfoState.supply - redeemingLocksState;
    let response;

    if (_psl / newFsl >= goldiswapInfoState.targetRatio) {
      const raiseAmount: number = (_psl / newFsl) * (_psl / 32);
      newFsl = newFsl + raiseAmount;
      const newPsl = _psl - raiseAmount;
      response = {
        toggle: true,
        fsl: newFsl,
        psl: newPsl,
        supply: newSupply,
        floor: floorPrice(newFsl, newSupply),
        market: marketPrice(newFsl, newPsl, newSupply),
        targetRatio:
          goldiswapInfoState.targetRatio + goldiswapInfoState.targetRatio / 50,
        prgValue:
          marketPrice(newFsl, newPsl, newSupply) -
          floorPrice(newFsl, newSupply),
      };
    } else {
      response = {
        toggle: true,
        fsl: newFsl,
        psl: _psl,
        supply: newSupply,
        floor: floorPrice(newFsl, newSupply),
        market: marketPrice(newFsl, _psl, newSupply),
        targetRatio: goldiswapInfoState.targetRatio,
        prgValue:
          marketPrice(newFsl, _psl, newSupply) - floorPrice(newFsl, newSupply),
      };
    }

    setSimInfoState(response);
  };

  const handleTopBalance = (): string => {
    if (activeToggleState === "BUY") {
      return goldiswapWalletInfoState.honey > 0
        ? goldiswapWalletInfoState.honey.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    } else {
      return goldiswapWalletInfoState.locks > 0
        ? goldiswapWalletInfoState.locks.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }
  };

  const handleBottomBalance = (): string => {
    if (activeToggleState === "BUY") {
      return goldiswapWalletInfoState.locks > 0
        ? goldiswapWalletInfoState.locks.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    } else {
      return goldiswapWalletInfoState.honey > 0
        ? goldiswapWalletInfoState.honey.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }
  };

  const handleTopChange = (input: string) => {
    if (activeToggleState === "BUY") {
      if (parseFloat(input) > 2000000) {
        input = "";
      }
      setDisplayStringState(input);
      setBottomInputFlagState(false);
      !input ? setHoneyBuyState(0) : setHoneyBuyState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
    } else if (activeToggleState === "SELL") {
      setDisplayStringState(input);
      setBottomInputFlagState(false);
      !input
        ? setSellingLocksState(0)
        : setSellingLocksState(parseFloat(input));
    } else {
      setDisplayStringState(input);
      setBottomInputFlagState(false);
      !input
        ? setRedeemingLocksState(0)
        : setRedeemingLocksState(parseFloat(input));
    }
  };

  const handleBottomChange = (input: string) => {
    if (activeToggleState === "BUY") {
      setBottomDisplayStringState(input);
      setTopInputFlagState(false);
      !input ? setBuyingLocksState(0) : setBuyingLocksState(parseFloat(input));
    } else if (activeToggleState === "SELL") {
      if (parseFloat(input) > 2000000) {
        input = "";
      }
      setBottomDisplayStringState(input);
      setTopInputFlagState(false);
      !input
        ? setGettingHoneyState(0)
        : setGettingHoneyState(parseFloat(input));
    } else {
      setBottomDisplayStringState(input);
      setTopInputFlagState(false);
      !input
        ? setRedeemingHoneyState(0)
        : setRedeemingHoneyState(parseFloat(input));
    }
  };

  const refreshGoldiswapInfo = async () => {
    setInfoLoadingState(true);
    const fslResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: "fsl",
    });
    const pslResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: "psl",
    });
    const supplyResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: "totalSupply",
    });
    const ratioResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: "targetRatio",
    });
    const lastFloorRaiseResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: "lastFloorIncrease",
    });
    const prgSupply = await readContract(config, {
      address: contracts.goldilocked.address as `0x${string}`,
      abi: contracts.goldilocked.abi,
      functionName: "totalSupply",
      args: [],
    });
    const prgTreasuryBalance = await readContract(config, {
      address: contracts.goldilocked.address as `0x${string}`,
      abi: contracts.goldilocked.abi,
      functionName: "balanceOf",
      args: ["0x895614c89beC7D11454312f740854d08CbF57A78"],
    });

    const prgValueResponse =
      marketPrice(
        parseFloat(formatEther(fslResult as unknown as bigint)),
        parseFloat(formatEther(pslResult as unknown as bigint)),
        parseFloat(formatEther(supplyResult as unknown as bigint)),
      ) -
      floorPrice(
        parseFloat(formatEther(fslResult as unknown as bigint)),
        parseFloat(formatEther(supplyResult as unknown as bigint)),
      );
    const prgSupplyResponse =
      parseFloat(formatEther(prgSupply as unknown as bigint)) -
      parseFloat(formatEther(prgTreasuryBalance as unknown as bigint));

    const response = {
      fsl: parseFloat(formatEther(fslResult as unknown as bigint)),
      psl: parseFloat(formatEther(pslResult as unknown as bigint)),
      supply: parseFloat(formatEther(supplyResult as unknown as bigint)),
      targetRatio: parseFloat(formatEther(ratioResult as unknown as bigint)),
      lastFloorRaise: parseFloat(
        formatEther(lastFloorRaiseResult as unknown as bigint),
      ),
      prgValue: prgValueResponse,
      prgSupply: prgSupplyResponse,
      prgMarketCap: prgValueResponse * prgSupplyResponse,
    };

    const simResponse = {
      toggle: false,
      fsl: parseFloat(formatEther(fslResult as unknown as bigint)),
      psl: parseFloat(formatEther(pslResult as unknown as bigint)),
      supply: parseFloat(formatEther(supplyResult as unknown as bigint)),
      floor: floorPrice(
        parseFloat(formatEther(fslResult as unknown as bigint)),
        parseFloat(formatEther(supplyResult as unknown as bigint)),
      ),
      market: marketPrice(
        parseFloat(formatEther(fslResult as unknown as bigint)),
        parseFloat(formatEther(pslResult as unknown as bigint)),
        parseFloat(formatEther(supplyResult as unknown as bigint)),
      ),
      targetRatio: parseFloat(formatEther(ratioResult as unknown as bigint)),
      prgValue: prgValueResponse,
    };

    setGoldiswapInfoState(response);
    setSimInfoState(simResponse);
    setInfoLoadingState(false);
  };

  const refreshGoldiswapWalletInfo = async () => {
    if (address) {
      setWalletInfoLoadingState(true);
      const locksBalance = await readContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.goldiswap.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const porridgeBalance = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const honeyBalance = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const stakedBalance = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: "userStakedLocks",
        args: [address],
      });
      const claimableBalance = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: "userClaimablePrg",
        args: [address],
      });
      const lockedBalance = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: "userLockedLocks",
        args: [address],
      });
      const borrowedBalance = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: "userBorrowedHoney",
        args: [address],
      });
      const honeySwapAllowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: "allowance",
        args: [address, contracts.goldiswap.address],
      });
      const unvestedResult = await readContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: "userVestingCheck",
        args: [address],
      })

      const response = {
        locks: parseFloat(formatEther(locksBalance as unknown as bigint)),
        honey: parseFloat(formatEther(honeyBalance as unknown as bigint)),
        prg: parseFloat(formatEther(porridgeBalance as unknown as bigint)),
        staked: parseFloat(formatEther(stakedBalance as unknown as bigint)),
        locked: parseFloat(formatEther(lockedBalance as unknown as bigint)),
        borrowed: parseFloat(formatEther(borrowedBalance as unknown as bigint)),
        claimable: parseFloat(
          formatEther(claimableBalance as unknown as bigint),
        ),
        honeySwapAllowance: parseFloat(
          formatEther(honeySwapAllowanceResult as unknown as bigint),
        ),
        unvested: parseFloat(formatEther(unvestedResult as unknown as bigint))
      };

      setGoldiswapWalletInfoState(response);
      setWalletInfoLoadingState(false);
    }
  };

  const setSimInfo = (
    toggle: boolean,
    fsl: number,
    psl: number,
    supply: number,
    floor: number,
    market: number,
    targetRatio: number,
    prgValue: number,
  ) => {
    setSimInfoState({
      toggle,
      fsl,
      psl,
      supply,
      floor,
      market,
      targetRatio,
      prgValue,
    });
  };

  const updateAllowance = (newAllowance: number) => {
    setGoldiswapWalletInfoState((prevState) => ({
      ...prevState,
      honeySwapAllowance: newAllowance,
    }));
  };

  const openNotification = (
    toggle: boolean,
    action: string,
    result: string,
    hash: string,
  ) => {
    setNotificationState((prevState) => ({
      toggle,
      action,
      result,
      hash,
    }));
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Get month and add leading zero if needed
    const day = date.getUTCDate().toString().padStart(2, "0"); // Get day and add leading zero if needed

    return `${month}/${day}`;
  };

  const getFormattedDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`
  }

  const getFormattedTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  const getChartData = async () => {
    const response = await fetch("/api/lockschartdata")
    const responseJson: any = await response.json()
    const hourlyLocks = responseJson.locksHourly.map((node: any) => ({
      floorPrice: parseFloat(parseFloat(node.floor).toFixed(15)),
      marketPrice: parseFloat(node.market),
      date: getFormattedTime(node.timestamp)
    }))
    const dailyLocks = responseJson.locksDaily.map((node: any) => ({
      floorPrice: parseFloat(node.floor),
      marketPrice: parseFloat(node.market),
      date: getFormattedDate(node.timestamp)
    }))
    const weeklyLocks = responseJson.locksWeekly.map((node: any) => ({
      floorPrice: parseFloat(node.floor),
      marketPrice: parseFloat(node.market),
      date: getFormattedDate(node.timestamp)
    }))

    const newChartData = {
      hourly: hourlyLocks.reverse(),
      daily: dailyLocks.reverse(),
      weekly: weeklyLocks.reverse()
    }
    setChartDataState(newChartData)
  }

  return (
    <GoldiswapContext.Provider
      value={{
        goldiswapInfo: goldiswapInfoState,
        goldiswapWalletInfo: goldiswapWalletInfoState,
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
        refreshGoldiswapWalletInfo,
        infoLoading: infoLoadingState,
        walletInfoLoading: walletInfoLoadingState,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
        simInfo: simInfoState,
        setSimInfo,
        updateAllowance,
        buyingLocksLoading: buyingLocksLoadingState,
        setBuyingLocksLoading: setBuyingLocksLoadingState,
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
        setBalanceMobileToggle: setBalanceMobileToggleState,
        chartData: chartDataState,
        getChartData,
        wutPopup: wutPopupState,
        setWutPopup: setWutPopupState,
      }}
    >
      {children}
    </GoldiswapContext.Provider>
  );
};

export const useGoldiswap = () => useContext(GoldiswapContext);
