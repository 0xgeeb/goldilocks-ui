"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { readContract } from "@wagmi/core";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useGoldiswapMath } from "../../hooks";
import { config } from "../../providers/WagmiProvider";
import { contracts } from "../../utils/addressi";
import { ChartDataEntry } from "../../utils/interfaces";

const INITIAL_STATE = {
  borrowInfo: {
    fsl: 0,
    psl: 0,
    supply: 0,
    targetRatio: 0,
    lastFloorRaise: 0,
  },

  borrowWalletInfo: {
    locks: 0,
    honey: 0,
    prg: 0,
    staked: 0,
    locked: 0,
    borrowed: 0,
    claimable: 0,
    honeyBorrowAllowance: 0,
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

  borrow: 0,
  repay: 0,
  setBorrow: (_borrow: number) => {},
  setRepay: (_repay: number) => {},

  displayString: "",
  setDisplayString: (_displayString: string) => {},

  allowanceButtons: false,
  setAllowanceButtons: (_bool: boolean) => {},
  updateAllowance: (_newAllowance: number) => {},

  activeToggle: "BORROW",
  changeActiveToggle: (_toggle: string) => {},

  borrowPopupToggle: false,
  setBorrowPopupToggle: (_bool: boolean) => {},

  chartOpen: false,
  setChartOpen: (_chart: boolean) => {},

  infoLoading: false,
  walletInfoLoading: false,

  handlePercentageButtons: (_action: number) => {},
  handleChange: (_input: string) => {},
  handleBalance: () => "",

  refreshBorrowInfo: async () => {},
  refreshBorrowWalletInfo: async () => {},

  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {},

  wutPopup: false,
  setWutPopup: (_popup: boolean) => {},

  balanceMobileToggle: false,
  setBalanceMobileToggle: (_toggle: boolean) => {},

  chartData: [] as ChartDataEntry[],
  getChartData: async () => {}
};

const BorrowContext = createContext(INITIAL_STATE);

export const BorrowProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const { address, isConnected } = useAccount();

  const { marketPrice, floorPrice } = useGoldiswapMath();

  const [borrowInfoState, setBorrowInfoState] = useState(
    INITIAL_STATE.borrowInfo,
  );
  const [borrowWalletInfoState, setBorrowWalletInfoState] = useState(
    INITIAL_STATE.borrowWalletInfo,
  );
  const [notificationState, setNotificationState] = useState(
    INITIAL_STATE.notification,
  );

  const [activeToggleState, setActiveToggleState] = useState<string>(
    INITIAL_STATE.activeToggle,
  );

  const [displayStringState, setDisplayStringState] = useState<string>(
    INITIAL_STATE.displayString,
  );

  const [borrowState, setBorrowState] = useState<number>(INITIAL_STATE.borrow);
  const [repayState, setRepayState] = useState<number>(INITIAL_STATE.repay);

  const [borrowPopupToggleState, setBorrowPopupToggleState] = useState<boolean>(
    INITIAL_STATE.borrowPopupToggle,
  );

  const [chartDataState, setChartDataState] = useState<
    any[]
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
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(
    INITIAL_STATE.txConfirming,
  );
  const [balanceMobileToggleState, setBalanceMobileToggleState] =
    useState<boolean>(INITIAL_STATE.balanceMobileToggle);
  const [wutPopupState, setWutPopupState] = useState<boolean>(
    INITIAL_STATE.wutPopup,
  );

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(
    INITIAL_STATE.allowanceButtons,
  );

  const changeActiveToggle = (toggle: string) => {
    setDisplayStringState("");
    setBorrowState(0);
    setRepayState(0);
    setActiveToggleState(toggle);
    setAllowanceButtonsState(false);
  };

  const handlePercentageButtons = (action: number) => {
    if (!isConnected) return;
    const borrowTemp =
      (borrowWalletInfoState.staked - borrowWalletInfoState.locked) *
      (borrowInfoState.fsl / borrowInfoState.supply);
    if (action == 1) {
      if (activeToggleState === "BORROW") {
        setDisplayStringState((borrowTemp / 4).toFixed(4));
        setBorrowState(borrowTemp / 4);
      }
      if (activeToggleState === "REPAY") {
        setDisplayStringState((borrowWalletInfoState.borrowed / 4).toFixed(4));
        setRepayState(borrowWalletInfoState.borrowed / 4);
      }
    }
    if (action == 2) {
      if (activeToggleState === "BORROW") {
        setDisplayStringState((borrowTemp / 2).toFixed(4));
        setBorrowState(borrowTemp / 2);
      }
      if (activeToggleState === "REPAY") {
        setDisplayStringState((borrowWalletInfoState.borrowed / 2).toFixed(4));
        setRepayState(borrowWalletInfoState.borrowed / 2);
      }
    }
    if (action == 3) {
      if (activeToggleState === "BORROW") {
        setDisplayStringState((borrowTemp * 0.75).toFixed(4));
        setBorrowState(borrowTemp * 0.75);
      }
      if (activeToggleState === "REPAY") {
        setDisplayStringState(
          (borrowWalletInfoState.borrowed * 0.75).toFixed(4),
        );
        setRepayState(borrowWalletInfoState.borrowed * 0.75);
      }
    }
    if (action == 4) {
      if (activeToggleState === "BORROW") {
        setDisplayStringState(borrowTemp.toFixed(4));
        setBorrowState(borrowTemp - 0.0001);
      }
      if (activeToggleState === "REPAY") {
        setDisplayStringState(borrowWalletInfoState.borrowed.toFixed(4));
        setRepayState(borrowWalletInfoState.borrowed);
      }
    }
  };

  const handleChange = (input: string) => {
    setDisplayStringState(input);
    if (activeToggleState === "BORROW") {
      !input ? setBorrowState(0) : setBorrowState(parseFloat(input));
    }
    if (activeToggleState === "REPAY") {
      !input ? setRepayState(0) : setRepayState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
    }
  };

  const handleBalance = (): string => {
    if (activeToggleState === "BORROW") {
      const borrowTemp =
        (borrowWalletInfoState.staked - borrowWalletInfoState.locked) *
        (borrowInfoState.fsl / borrowInfoState.supply);
      return borrowTemp > 0
        ? borrowTemp.toLocaleString("en-US", { maximumFractionDigits: 4 })
        : "0.00";
    }
    if (activeToggleState === "REPAY") {
      return borrowWalletInfoState.borrowed > 0
        ? borrowWalletInfoState.borrowed.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }

    return "";
  };

  const refreshBorrowInfo = async () => {
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

    const response = {
      fsl: parseFloat(formatEther(fslResult as unknown as bigint)),
      psl: parseFloat(formatEther(pslResult as unknown as bigint)),
      supply: parseFloat(formatEther(supplyResult as unknown as bigint)),
      targetRatio: parseFloat(formatEther(ratioResult as unknown as bigint)),
      lastFloorRaise: parseFloat(
        formatEther(lastFloorRaiseResult as unknown as bigint),
      ),
    };

    setBorrowInfoState(response);
    setInfoLoadingState(false);
  };

  const refreshBorrowWalletInfo = async () => {
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
      const honeyBorrowAllowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: "allowance",
        args: [address, contracts.goldilocked.address],
      });

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
        honeyBorrowAllowance: parseFloat(
          formatEther(honeyBorrowAllowanceResult as unknown as bigint),
        ),
      };

      setBorrowWalletInfoState(response);
      setWalletInfoLoadingState(false);
    }
  };

  const updateAllowance = (newAllowance: number) => {
    setBorrowWalletInfoState((prevState) => ({
      ...prevState,
      honeyBorrowAllowance: newAllowance,
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

  const getFormattedDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
  }

  const getChartData = async () => {
    const response = await fetch("/api/lockschart")
    const responseJson: any = await response.json()
    console.log(responseJson)
    const newChartData = []
    for(let node of responseJson.locksDaily) {
      const entry = {
        floorPrice: node.floor,
        marketPrice: node.market,
        date: getFormattedDate(node.timestamp)
      }

      newChartData.push(entry)
    }

    setChartDataState(newChartData.reverse())
  }

  return (
    <BorrowContext.Provider
      value={{
        borrowInfo: borrowInfoState,
        borrowWalletInfo: borrowWalletInfoState,
        activeToggle: activeToggleState,
        changeActiveToggle,
        chartOpen: chartOpenState,
        setChartOpen: setChartOpenState,
        infoLoading: infoLoadingState,
        walletInfoLoading: walletInfoLoadingState,
        refreshBorrowInfo,
        refreshBorrowWalletInfo,
        borrowPopupToggle: borrowPopupToggleState,
        setBorrowPopupToggle: setBorrowPopupToggleState,
        handlePercentageButtons,
        borrow: borrowState,
        repay: repayState,
        setBorrow: setBorrowState,
        setRepay: setRepayState,
        displayString: displayStringState,
        setDisplayString: setDisplayStringState,
        handleChange,
        handleBalance,
        txConfirming: txConfirmingState,
        setTxConfirming: setTxConfirmingState,
        notification: notificationState,
        openNotification,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
        updateAllowance,
        balanceMobileToggle: balanceMobileToggleState,
        setBalanceMobileToggle: setBalanceMobileToggleState,
        wutPopup: wutPopupState,
        setWutPopup: setWutPopupState,
        chartData: chartDataState,
        getChartData,
      }}
    >
      {children}
    </BorrowContext.Provider>
  );
};

export const useBorrow = () => useContext(BorrowContext);
