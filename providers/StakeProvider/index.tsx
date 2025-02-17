"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { formatEther } from "viem";
import { useGoldiswapMath } from "../../hooks";
import { config } from "../../providers/WagmiProvider";
import { contracts } from "../../utils/addressi";

const INITIAL_STATE = {
  stakeInfo: {
    fsl: 0,
    psl: 0,
    supply: 0,
    targetRatio: 0,
    lastFloorRaise: 0,
  },

  stakeWalletInfo: {
    locks: 0,
    prg: 0,
    honey: 0,
    locksPrgAllowance: 0,
    honeyPrgAllowance: 0,
    staked: 0,
    locked: 0,
    borrowed: 0,
    claimable: 0,
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

  stake: 0,
  unstake: 0,
  stir: 0,

  setStake: (_stake: number) => {},
  setUnstake: (_unstake: number) => {},
  setStir: (_realize: number) => {},

  displayString: "",
  setDisplayString: (_displayString: string) => {},

  activeToggle: "STAKE",
  changeActiveToggle: (_toggle: string) => {},

  infoLoading: false,
  walletInfoLoading: false,

  chartOpen: false,
  setChartOpen: (_chart: boolean) => {},

  stirPopupToggle: false,
  setStirPopupToggle: (_bool: boolean) => {},

  unstakePopupToggle: false,
  setUnstakePopupToggle: (_bool: boolean) => {},

  allowanceButtons: false,
  setAllowanceButtons: (_bool: boolean) => {},
  updateAllowance: (_token: string, _newAllowance: number) => {},

  handleBalance: () => "",
  handleBalanceLabel: () => "",
  handlePercentageButtons: (_action: number) => {},
  handleChange: (_input: string) => {},

  refreshStakeInfo: async () => {},
  refreshStakeWalletInfo: async () => {},

  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {},

  balanceMobileToggle: false,
  setBalanceMobileToggle: (_toggle: boolean) => {},

  wutPopup: false,
  setWutPopup: (_popup: boolean) => {},

  chartData: [] as { [x: string]: number; value: number }[],
  updateChartData: (_chartData: {}) => {},
};

const StakeContext = createContext(INITIAL_STATE);

export const StakeProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const { address, isConnected } = useAccount();

  const { marketPrice, floorPrice } = useGoldiswapMath();

  const [stakeInfoState, setStakeInfoState] = useState(INITIAL_STATE.stakeInfo);
  const [stakeWalletInfoState, setStakeWalletInfoState] = useState(
    INITIAL_STATE.stakeWalletInfo,
  );
  const [notificationState, setNotificationState] = useState(
    INITIAL_STATE.notification,
  );

  const [stakeState, setStakeState] = useState<number>(INITIAL_STATE.stake);
  const [unstakeState, setUnstakeState] = useState<number>(
    INITIAL_STATE.unstake,
  );
  const [stirState, setStirState] = useState<number>(INITIAL_STATE.stir);

  const [displayStringState, setDisplayStringState] = useState<string>(
    INITIAL_STATE.displayString,
  );

  const [activeToggleState, setActiveToggleState] = useState<string>(
    INITIAL_STATE.activeToggle,
  );

  const [stirPopupToggleState, setStirPopupToggleState] = useState<boolean>(
    INITIAL_STATE.stirPopupToggle,
  );
  const [unstakePopupToggleState, setUnstakePopupToggleState] =
    useState<boolean>(INITIAL_STATE.unstakePopupToggle);

  const [chartDataState, setChartDataState] = useState<
    { [x: string]: number; value: number }[]
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
    setStakeState(0);
    setUnstakeState(0);
    setStirState(0);
    setActiveToggleState(toggle);
    setAllowanceButtonsState(false);
  };

  const handlePercentageButtons = (action: number) => {
    if (!isConnected) return;
    if (action == 1) {
      if (activeToggleState === "STAKE") {
        setDisplayStringState((stakeWalletInfoState.locks / 4).toFixed(4));
        setStakeState(stakeWalletInfoState.locks / 4);
      }
      if (activeToggleState === "UNSTAKE") {
        setDisplayStringState(
          (
            (stakeWalletInfoState.staked - stakeWalletInfoState.locked) /
            4
          ).toFixed(4),
        );
        setUnstakeState(
          (stakeWalletInfoState.staked - stakeWalletInfoState.locked) / 4,
        );
      }
      if (activeToggleState === "realize") {
        setDisplayStringState((stakeWalletInfoState.prg / 4).toFixed(4));
        setStirState(stakeWalletInfoState.prg / 4);
      }
    }
    if (action == 2) {
      if (activeToggleState === "STAKE") {
        setDisplayStringState((stakeWalletInfoState.locks / 2).toFixed(4));
        setStakeState(stakeWalletInfoState.locks / 2);
      }
      if (activeToggleState === "UNSTAKE") {
        setDisplayStringState(
          (
            (stakeWalletInfoState.staked - stakeWalletInfoState.locked) /
            2
          ).toFixed(4),
        );
        setUnstakeState(
          (stakeWalletInfoState.staked - stakeWalletInfoState.locked) / 2,
        );
      }
      if (activeToggleState === "STIR") {
        setDisplayStringState((stakeWalletInfoState.prg / 2).toFixed(4));
        setStirState(stakeWalletInfoState.prg / 2);
      }
    }
    if (action == 3) {
      if (activeToggleState === "STAKE") {
        setDisplayStringState((stakeWalletInfoState.locks * 0.75).toFixed(4));
        setStakeState(stakeWalletInfoState.locks * 0.75);
      }
      if (activeToggleState === "UNSTAKE") {
        setDisplayStringState(
          (
            (stakeWalletInfoState.staked - stakeWalletInfoState.locked) *
            0.75
          ).toFixed(4),
        );
        setUnstakeState(
          (stakeWalletInfoState.staked - stakeWalletInfoState.locked) * 0.75,
        );
      }
      if (activeToggleState === "STIR") {
        setDisplayStringState((stakeWalletInfoState.prg * 0.75).toFixed(4));
        setStirState(stakeWalletInfoState.prg * 0.75);
      }
    }
    if (action == 4) {
      if (activeToggleState === "STAKE") {
        setDisplayStringState(stakeWalletInfoState.locks.toFixed(4));
        setStakeState(stakeWalletInfoState.locks - 0.0001);
      }
      if (activeToggleState === "UNSTAKE") {
        setDisplayStringState(
          (stakeWalletInfoState.staked - stakeWalletInfoState.locked).toFixed(
            4,
          ),
        );
        setUnstakeState(
          stakeWalletInfoState.staked - stakeWalletInfoState.locked - 0.0001,
        );
      }
      if (activeToggleState === "STIR") {
        setDisplayStringState(stakeWalletInfoState.prg.toFixed(4));
        setStirState(stakeWalletInfoState.prg - 0.0001);
      }
    }
  };

  const handleChange = (input: string) => {
    setDisplayStringState(input);
    if (activeToggleState === "STAKE") {
      !input ? setStakeState(0) : setStakeState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
    }
    if (activeToggleState === "UNSTAKE") {
      !input ? setUnstakeState(0) : setUnstakeState(parseFloat(input));
    }
    if (activeToggleState === "STIR") {
      !input ? setStirState(0) : setStirState(parseFloat(input));
      !input && setAllowanceButtonsState(false);
    }
  };

  const handleBalance = (): string => {
    if (activeToggleState === "STAKE") {
      return stakeWalletInfoState.locks > 0
        ? stakeWalletInfoState.locks.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }
    if (activeToggleState === "UNSTAKE") {
      return stakeWalletInfoState.staked - stakeWalletInfoState.locked > 0
        ? (
            stakeWalletInfoState.staked - stakeWalletInfoState.locked
          ).toLocaleString("en-US", { maximumFractionDigits: 4 })
        : "0.00";
    }
    if (activeToggleState === "STIR") {
      return stakeWalletInfoState.prg > 0
        ? stakeWalletInfoState.prg.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }
    if (activeToggleState === "CLAIM") {
      return stakeWalletInfoState.claimable > 0
        ? stakeWalletInfoState.claimable.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }

    return "";
  };

  const handleBalanceLabel = (): string => {
    if (activeToggleState === "STAKE") {
      return "balance";
    }
    if (activeToggleState === "UNSTAKE") {
      return "unstakable locks";
    }
    if (activeToggleState === "STIR") {
      return "balance";
    }
    if (activeToggleState === "CLAIM") {
      return "claimable porridge";
    }

    return "";
  };

  const refreshStakeInfo = async () => {
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

    setStakeInfoState(response);
    setInfoLoadingState(false);
  };

  const refreshStakeWalletInfo = async () => {
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
      const locksPrgAllowanceResult = await readContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.goldiswap.abi,
        functionName: "allowance",
        args: [address, contracts.goldilocked.address],
      });
      const honeyPrgAllowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: "allowance",
        args: [address, contracts.goldilocked.address],
      });

      const response = {
        locks: parseFloat(formatEther(locksBalance as unknown as bigint)),
        prg: parseFloat(formatEther(porridgeBalance as unknown as bigint)),
        honey: parseFloat(formatEther(honeyBalance as unknown as bigint)),
        locksPrgAllowance: parseFloat(
          formatEther(locksPrgAllowanceResult as unknown as bigint),
        ),
        honeyPrgAllowance: parseFloat(
          formatEther(honeyPrgAllowanceResult as unknown as bigint),
        ),
        staked: parseFloat(formatEther(stakedBalance as unknown as bigint)),
        locked: parseFloat(formatEther(lockedBalance as unknown as bigint)),
        borrowed: parseFloat(formatEther(borrowedBalance as unknown as bigint)),
        claimable: parseFloat(
          formatEther(claimableBalance as unknown as bigint),
        ),
      };

      setStakeWalletInfoState(response);
      setWalletInfoLoadingState(false);
    }
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

  const updateAllowance = (token: string, newAllowance: number) => {
    if (token === "locks") {
      setStakeWalletInfoState((prevState) => ({
        ...prevState,
        locksPrgAllowance: newAllowance,
      }));
    } else {
      setStakeWalletInfoState((prevState) => ({
        ...prevState,
        honeyPrgAllowance: newAllowance,
      }));
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Get month and add leading zero if needed
    const day = date.getUTCDate().toString().padStart(2, "0"); // Get day and add leading zero if needed

    return `${month}/${day}`;
  };

  const updateChartData = (chartData: any) => {
    const tempChartData: any[] = [];
    const days = [
      "firstDay",
      "secondDay",
      "thirdDay",
      "fourthDay",
      "fifthDay",
      "sixthDay",
      "seventhDay",
    ];
    for (const day of days) {
      const dayData = chartData[day];
      const item = dayData.items[0];
      if (item) {
        const marketResult = marketPrice(
          parseFloat(formatEther(item.fsl)),
          parseFloat(formatEther(item.psl)),
          parseFloat(formatEther(item.supply)),
        );
        const floorResult = floorPrice(
          parseFloat(formatEther(item.fsl)),
          parseFloat(formatEther(item.supply)),
        );
        tempChartData.push({
          [`${day}`]: marketResult,
          marketPrice: marketResult.toLocaleString("en-US", {
            maximumFractionDigits: 6,
          }),
          floorPrice: floorResult.toLocaleString("en-US", {
            maximumFractionDigits: 6,
          }),
          date: formatTimestamp(item.timestamp),
        });
      } else {
        tempChartData.push({
          [`${day}`]: 0,
          marketPrice: 0,
          floorPrice: 0,
          date: formatTimestamp(item.timestamp),
        });
      }
    }
    let fallbackNumber: number | null = null;
    for (let i = 0; i < tempChartData.length; i++) {
      if (tempChartData[i][`${days[i]}`] !== 0) {
        fallbackNumber = tempChartData[i][`${days[i]}`];
        break;
      }
    }
    let farthestNumber: number | null = fallbackNumber;
    for (let i = tempChartData.length - 1; i >= 0; i--) {
      if (tempChartData[i][`${days[i]}`] !== 0) {
        farthestNumber = tempChartData[i][`${days[i]}`];
      } else if (farthestNumber !== null) {
        tempChartData[i][`${days[i]}`] = farthestNumber;
        tempChartData[i].marketPrice = farthestNumber;
      }
    }

    setChartDataState(tempChartData);
  };

  return (
    <StakeContext.Provider
      value={{
        stake: stakeState,
        unstake: unstakeState,
        stir: stirState,
        setStake: setStakeState,
        setUnstake: setUnstakeState,
        setStir: setStirState,
        displayString: displayStringState,
        setDisplayString: setDisplayStringState,
        stakeInfo: stakeInfoState,
        stakeWalletInfo: stakeWalletInfoState,
        infoLoading: infoLoadingState,
        walletInfoLoading: walletInfoLoadingState,
        refreshStakeInfo,
        refreshStakeWalletInfo,
        chartOpen: chartOpenState,
        setChartOpen: setChartOpenState,
        stirPopupToggle: stirPopupToggleState,
        setStirPopupToggle: setStirPopupToggleState,
        unstakePopupToggle: unstakePopupToggleState,
        setUnstakePopupToggle: setUnstakePopupToggleState,
        activeToggle: activeToggleState,
        changeActiveToggle,
        txConfirming: txConfirmingState,
        setTxConfirming: setTxConfirmingState,
        notification: notificationState,
        openNotification,
        handlePercentageButtons,
        handleChange,
        handleBalance,
        handleBalanceLabel,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
        updateAllowance,
        balanceMobileToggle: balanceMobileToggleState,
        setBalanceMobileToggle: setBalanceMobileToggleState,
        wutPopup: wutPopupState,
        setWutPopup: setWutPopupState,
        chartData: chartDataState,
        updateChartData,
      }}
    >
      {children}
    </StakeContext.Provider>
  );
};

export const useStake = () => useContext(StakeContext);
