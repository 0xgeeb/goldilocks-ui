"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { readContract } from "@wagmi/core";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useDebounce } from "../../hooks";
import { config } from "../../providers/WagmiProvider";
import { contracts } from "../../utils/addressi";
import {
  GoldilendInitialState,
  BeraInfo,
  PartnerInfo,
  LoanInfo,
  LoanData,
  BoostInfo,
} from "../../utils/interfaces";

const INITIAL_STATE: GoldilendInitialState = {
  goldilendInfo: {
    glwberaSupply: 0,
    stakedglwbera: 0,
    poolSize: 0,
    outstandingDebt: 0,
  },
  goldilendWalletInfo: {
    wbera: 0,
    glwbera: 0,
    wberaGoldilendAllowance: 0,
  },
  lock: 0,
  stake: 0,
  unstake: 0,
  setLock: (_lock: number) => {},
  setStake: (_stake: number) => {},
  setUnstake: (_unstake: number) => {},
  borrowDisplayString: "",
  loanExpiration: "",
  debouncedLoanExpiration: "",
  displayString: "",
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
  selectedBera: {
    name: "",
    id: 0,
    valuation: 0,
    index: -1,
  },
  userLoans: [],
  ownedPartners: [],
  selectedPartners: [],
  userBoost: {
    partnerNFTs: [],
    partnerNFTIds: [],
    boostMagnitude: 0,
    expiry: 0,
  },
  liquidatableLoans: [],
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
  activeToggle: "BORROW",
  changeActiveToggle: (_toggle: string) => {},
  lendActiveToggle: "STAKE",
  changeLendActiveToggle: (_toggle: string) => {},
  refreshGoldilendInfo: async () => {},
  refreshGoldilendWalletInfo: async () => {},
  infoLoading: false,
  setInfoLoading: (_loading: boolean) => {},
  walletInfoLoading: false,
  loansLoading: true,
  setLoansLoading: (_loading: boolean) => {},
  allowanceButtons: false,
  setAllowanceButtons: (_bool: boolean) => {},
  handlePercentageButtons: (_action: number) => {},
  handleStakeChange: (_input: string, _tab: string) => {},
  handleStakeBalance: (_tab: string) => "",
  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {},
  selectScreen: true,
  setSelectScreen: (_screen: boolean) => {},
  chartOpen: false,
  setChartOpen: (_open: boolean) => {},
  wutPopup: false,
  setWutPopup: (_popup: boolean) => {},
  boostPopup: false,
  setBoostPopup: (_popup: boolean) => {},
  balanceMobileToggle: false,
  setBalanceMobileToggle: (_toggle: boolean) => {},
  handleBeraClick: (_bera: BeraInfo) => {},
  handlePartnerClick: (_partner: PartnerInfo) => {},
  findSelectedPartnerIdxs: () => [],
  findBeras: (_beras: any) => {},
  findLoans: () => {},
  updateBorrowLimit: () => {},
  updateBoostMag: () => {},
  handleBorrowChange: (_input: string) => {},
  handleLoanDateChange: (_input: string) => {},
  getInterestRate: () => {},
  updateOwnedBeras: (_borrowedAgainstBera: BeraInfo) => {},
  updateOwnedPartners: (_nfts: PartnerInfo | PartnerInfo[]) => {},
};

const GoldilendContext = createContext(INITIAL_STATE);

export const GoldilendProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const { address, isConnected } = useAccount();

  const [goldilendInfoState, setGoldilendInfoState] = useState(
    INITIAL_STATE.goldilendInfo,
  );
  const [goldilendWalletInfoState, setGoldilendWalletInfoState] = useState(
    INITIAL_STATE.goldilendWalletInfo,
  );
  const [notificationState, setNotificationState] = useState(
    INITIAL_STATE.notification,
  );

  const [displayStringState, setDisplayStringState] = useState(
    INITIAL_STATE.displayString,
  );
  const [borrowDisplayStringState, setBorrowDisplayStringState] = useState(
    INITIAL_STATE.borrowDisplayString,
  );
  const [loanExpirationState, setLoanExpirationState] = useState(
    INITIAL_STATE.loanExpiration,
  );
  const [loanInterestState, setLoanInterestState] = useState(
    INITIAL_STATE.loanInterest,
  );
  const [loanInterestRateState, setLoanInterestRateState] = useState(
    INITIAL_STATE.loanInterestRate,
  );
  const debouncedLoanExpirationState = useDebounce(loanExpirationState, 1000);
  const [lockState, setLockState] = useState<number>(INITIAL_STATE.lock);
  const [stakeState, setStakeState] = useState<number>(INITIAL_STATE.stake);
  const [unstakeState, setUnstakeState] = useState<number>(
    INITIAL_STATE.unstake,
  );
  const [ownedBerasState, setOwnedBerasState] = useState<BeraInfo[]>(
    INITIAL_STATE.ownedBeras,
  );
  const [selectedBeraState, setSelectedBeraState] = useState<BeraInfo>(
    INITIAL_STATE.selectedBera,
  );
  const [ownedPartnersState, setOwnedPartnersState] = useState<PartnerInfo[]>(
    INITIAL_STATE.ownedPartners,
  );
  const [selectedPartnersState, setSelectedPartnersState] = useState<
    PartnerInfo[]
  >([]);
  const [userLoansState, setUserLoansState] = useState<LoanInfo[]>(
    INITIAL_STATE.userLoans,
  );
  const [liquidatableLoansState, setLiquidatableLoansState] = useState<
    LoanInfo[]
  >(INITIAL_STATE.liquidatableLoans);
  const [userBoostState, setUserBoostState] = useState<BoostInfo>(
    INITIAL_STATE.userBoost,
  );
  const [activeToggleState, setActiveToggleState] = useState<string>(
    INITIAL_STATE.activeToggle,
  );
  const [lendActiveToggleState, setLendActiveToggleState] = useState<string>(
    INITIAL_STATE.lendActiveToggle,
  );
  const [loanAmountState, setLoanAmountState] = useState<number>(
    INITIAL_STATE.loanAmount,
  );
  const debouncedLoanAmountState = useDebounce(loanAmountState, 1000);
  const [borrowLimitState, setBorrowLimitState] = useState<number>(
    INITIAL_STATE.borrowLimit,
  );
  const [boostMagState, setBoostMagState] = useState<number>(
    INITIAL_STATE.boostMag,
  );

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(
    INITIAL_STATE.allowanceButtons,
  );
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(
    INITIAL_STATE.infoLoading,
  );
  const [walletInfoLoadingState, setWalletInfoLoadingState] = useState<boolean>(
    INITIAL_STATE.walletInfoLoading,
  );
  const [loansLoadingState, setLoansLoadingState] = useState<boolean>(
    INITIAL_STATE.loansLoading,
  );
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(
    INITIAL_STATE.txConfirming,
  );
  const [chartOpenState, setChartOpenState] = useState<boolean>(
    INITIAL_STATE.chartOpen,
  );
  const [balanceMobileToggleState, setBalanceMobileToggleState] =
    useState<boolean>(INITIAL_STATE.balanceMobileToggle);
  const [selectScreenState, setSelectScreenState] = useState<boolean>(
    INITIAL_STATE.selectScreen,
  );
  const [wutPopupState, setWutPopupState] = useState<boolean>(
    INITIAL_STATE.wutPopup,
  );
  const [boostPopupState, setBoostPopupState] = useState<boolean>(
    INITIAL_STATE.boostPopup,
  );

  const changeActiveToggle = (toggle: string) => {
    setSelectedBeraState({
      name: "",
      id: 0,
      valuation: 0,
      index: -1,
    });
    setSelectedPartnersState([]);
    setBorrowDisplayStringState("");
    setLoanExpirationState("");
    setLoanAmountState(0);
    setActiveToggleState(toggle);
  };

  const changeLendActiveToggle = (toggle: string) => {
    setDisplayStringState("");
    setLockState(0);
    setStakeState(0);
    setUnstakeState(0);
    setLendActiveToggleState(toggle);
    setAllowanceButtonsState(false);
  };

  const handlePercentageButtons = (action: number) => {
    if (!isConnected) return;
    if (action == 1) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState((goldilendWalletInfoState.ibgt / 4).toFixed(4));
      //   setLockState(goldilendWalletInfoState.ibgt / 4);
      // }
      if (lendActiveToggleState === "STAKE") {
        setDisplayStringState((goldilendWalletInfoState.wbera / 4).toFixed(4));
        setStakeState(goldilendWalletInfoState.wbera / 4);
      }
      if (lendActiveToggleState === "UNSTAKE") {
        setDisplayStringState(
          (goldilendWalletInfoState.glwbera / 4).toFixed(4),
        );
        setUnstakeState(goldilendWalletInfoState.glwbera / 4);
      }
    }
    if (action == 2) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState((goldilendWalletInfoState.ibgt / 2).toFixed(4));
      //   setLockState(goldilendWalletInfoState.ibgt / 2);
      // }
      if (lendActiveToggleState === "STAKE") {
        setDisplayStringState((goldilendWalletInfoState.wbera / 2).toFixed(4));
        setStakeState(goldilendWalletInfoState.wbera / 2);
      }
      if (lendActiveToggleState === "UNSTAKE") {
        setDisplayStringState(
          (goldilendWalletInfoState.glwbera / 2).toFixed(4),
        );
        setUnstakeState(goldilendWalletInfoState.glwbera / 2);
      }
    }
    if (action == 3) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState(
      //     (goldilendWalletInfoState.ibgt * 0.75).toFixed(4),
      //   );
      //   setLockState(goldilendWalletInfoState.ibgt * 0.75);
      // }
      if (lendActiveToggleState === "STAKE") {
        setDisplayStringState(
          (goldilendWalletInfoState.wbera * 0.75).toFixed(4),
        );
        setStakeState(goldilendWalletInfoState.wbera * 0.75);
      }
      if (lendActiveToggleState === "UNSTAKE") {
        setDisplayStringState(
          (goldilendWalletInfoState.glwbera * 0.75).toFixed(4),
        );
        setUnstakeState(goldilendWalletInfoState.glwbera * 0.75);
      }
    }
    if (action == 4) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState(goldilendWalletInfoState.ibgt.toFixed(4));
      //   setLockState(goldilendWalletInfoState.ibgt - 0.0001);
      // }
      if (lendActiveToggleState === "STAKE") {
        setDisplayStringState(goldilendWalletInfoState.wbera.toFixed(4));
        setStakeState(goldilendWalletInfoState.wbera - 0.0001);
      }
      if (lendActiveToggleState === "UNSTAKE") {
        setDisplayStringState(goldilendWalletInfoState.glwbera.toFixed(4));
        setUnstakeState(goldilendWalletInfoState.glwbera - 0.0001);
      }
    }
  };

  const handleBorrowChange = (input: string) => {
    if (!input) {
      setLoanAmountState(0);
      setBorrowDisplayStringState(input);
    } else {
      if (parseFloat(input) > borrowLimitState) {
        setBorrowDisplayStringState((borrowLimitState - 0.0001).toFixed(4));
        setLoanAmountState(borrowLimitState - 0.0001);
      } else {
        setLoanAmountState(parseFloat(input));
        setBorrowDisplayStringState(input);
      }
    }
  };

  const updateBorrowLimit = () => {
    let valLimit = 0;
    const poolLimit = goldilendInfoState.poolSize * 0.1;
    const debtLimit =
      goldilendInfoState.poolSize - goldilendInfoState.outstandingDebt;
    valLimit += selectedBeraState.valuation;
    setBorrowLimitState(Math.min(poolLimit, debtLimit, valLimit));
  };

  const updateBoostMag = () => {
    let mag = 0;
    selectedPartnersState.forEach((partner) => {
      mag += partner.boost;
    });
    setBoostMagState(mag);
  };

  //todo: prolly the cause of approvals not going away. copy handleChange from stake
  const handleStakeChange = (input: string, tab: string) => {
    setDisplayStringState(input);
    if (tab === "LOCK") {
      !input ? setLockState(0) : setLockState(parseFloat(input));
    }
    if (tab === "STAKE") {
      !input ? setStakeState(0) : setStakeState(parseFloat(input));
    }
    if (tab === "UNSTAKE") {
      !input ? setUnstakeState(0) : setUnstakeState(parseFloat(input));
    }
  };

  const handleStakeBalance = (tab: string): string => {
    // if (tab === "LOCK") {
    //   return goldilendWalletInfoState.ibgt > 0
    //     ? goldilendWalletInfoState.ibgt.toLocaleString("en-US", {
    //         maximumFractionDigits: 4,
    //       })
    //     : "0.00";
    // }
    if (tab === "STAKE") {
      return goldilendWalletInfoState.wbera > 0
        ? goldilendWalletInfoState.wbera.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }
    if (tab === "UNSTAKE") {
      return goldilendWalletInfoState.glwbera > 0
        ? goldilendWalletInfoState.glwbera.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }

    return "";
  };

  const handleBeraClick = (bera: BeraInfo) => {
    if (selectedBeraState.index == bera.index) {
      setSelectedBeraState({
        name: "",
        id: 0,
        valuation: 0,
        index: -1,
      });
    } else {
      setSelectedBeraState(bera);
    }
  };

  const findSelectedPartnerIdxs = (): number[] => {
    const idxArray: number[] = [];
    selectedPartnersState.forEach((selectedPartner) => {
      idxArray.push(selectedPartner.index);
    });
    return idxArray;
  };

  const handlePartnerClick = (partner: PartnerInfo) => {
    const idxArray: number[] = findSelectedPartnerIdxs();
    if (idxArray.includes(partner.index)) {
      setSelectedPartnersState((prev) =>
        prev.filter((partnerf) => partnerf.index !== partner.index),
      );
    } else {
      setSelectedPartnersState((prev) => [...prev, partner]);
    }
  };

  const handleLoanDateChange = (input: string) => {
    setLoanExpirationState(input);
  };

  const findBeras = async (beras: any) => {
    let beraIndex = 0;
    for (const bondbera of beras.bondBeras.items) {
      const bondInfo = {
        name: "BondBera",
        id: bondbera.id,
        valuation: 50,
        index: beraIndex,
      };
      setOwnedBerasState((curr) => [...curr, bondInfo]);
      beraIndex++;
    }
    for (const bandbera of beras.bandBeras.items) {
      const bandInfo = {
        name: "BandBera",
        id: bandbera.id,
        valuation: 50,
        index: beraIndex,
      };
      setOwnedBerasState((curr) => [...curr, bandInfo]);
      beraIndex++;
    }
  };

  const findLoans = async () => {
    if (address) {
      const userLoans: LoanInfo[] = [];
      const loans = await readContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "lookupLoans",
        args: [address],
      });
      const loansData = loans as unknown as LoanData[];
      for (let i = 0; i < loansData.length; i++) {
        const userLoan = {
          collateralNFTs: loansData[i].collateralNFTs,
          collateralNFTIds: loansData[i].collateralNFTIds.map((id) =>
            parseInt(id.toString(), 16),
          ),
          borrowedAmount: parseFloat(formatEther(loansData[i].borrowedAmount)),
          interest: parseFloat(formatEther(loansData[i].interest)),
          duration: Number(loansData[i].duration),
          endDate: Number(loansData[i].endDate),
          loanId: parseInt(loansData[i].loanId.toString(), 16),
          liquidated: loansData[i].liquidated,
        };
        userLoans.push(userLoan);
      }
      setUserLoansState(userLoans);
    }
  };

  const refreshGoldilendInfo = async () => {
    setInfoLoadingState(true);
    // const stakedGibgtResult = await readContract(config, {
    //   address: contracts.goldilend.address as `0x${string}`,
    //   abi: contracts.goldilend.abi,
    //   functionName: "balanceOf",
    //   args: [contracts.goldilend.address],
    // });
    const glwberaSupplyResult = await readContract(config, {
      address: contracts.glwbera.address as `0x${string}`,
      abi: contracts.glwbera.abi,
      functionName: "totalSupply",
      args: [],
    });
    const poolSizeResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "poolSize",
      args: [],
    });
    const debtResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "outstandingDebt",
      args: [],
    });

    const response = {
      glwberaSupply: parseFloat(formatEther(glwberaSupplyResult as unknown as bigint)),
      stakedglwbera: 0,
      poolSize: parseFloat(formatEther(poolSizeResult as unknown as bigint)),
      outstandingDebt: parseFloat(formatEther(debtResult as unknown as bigint)),
    };

    setGoldilendInfoState(response);
    setInfoLoadingState(false);
  };

  const refreshGoldilendWalletInfo = async () => {
    if (address) {
      setWalletInfoLoadingState(true);
      const wberaResult = await readContract(config, {
        address: contracts.wbera.address as `0x${string}`,
        abi: contracts.wbera.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const glwberaResult = await readContract(config, {
        address: contracts.glwbera.address as `0x${string}`,
        abi: contracts.glwbera.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const wberaGoldilendAllowanceResult = await readContract(config, {
        address: contracts.wbera.address as `0x${string}`,
        abi: contracts.wbera.abi,
        functionName: "allowance",
        args: [address, contracts.goldilend.address],
      });


      const response = {
        wbera: parseFloat(formatEther(wberaResult as unknown as bigint)),
        glwbera: parseFloat(formatEther(glwberaResult as unknown as bigint)),
        wberaGoldilendAllowance: parseFloat(formatEther(wberaGoldilendAllowanceResult as unknown as bigint))
      };

      setGoldilendWalletInfoState(response);
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

  const getInterestRate = async () => {
    const dateParts = loanExpirationState.split("-");
    const [month, day, year] = dateParts.map(Number);
    const parsedDate = new Date(year, month - 1, day);
    const timestamp = parsedDate.getTime();
    const currentTimestamp = Date.now();
    const loanDuration = Math.floor((timestamp - currentTimestamp) / 1000);
    const debtResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "outstandingDebt",
      args: [],
    });
    const debt: number = parseFloat(
      formatEther(debtResult as unknown as bigint),
    );
    const poolSizeResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "poolSize",
      args: [],
    });
    const poolSize: number = parseFloat(
      formatEther(poolSizeResult as unknown as bigint),
    );
    const yearSeconds = 31536000;
    const rate = 10;
    const ratio = (debt + loanAmountState) / poolSize + 0.5;
    const interestRate =
      rate + 10 * rate * (ratio * (loanDuration / yearSeconds));
    const interestAdjusted =
      interestRate * loanAmountState * (loanDuration / yearSeconds);
    if (userBoostState.partnerNFTs.length > 0) {
      let discount = 500;
      if (userBoostState.boostMagnitude < discount) {
        discount = 1000 - userBoostState.boostMagnitude;
      }
      const interest = (interestAdjusted * discount) / 1000;
      setLoanInterestState(interest / 100);
    } else {
      setLoanInterestState(interestAdjusted / 100);
    }

    const calculatedRate =
      10 + 10 * 10 * (loanDuration / yearSeconds) * (0.5 + debt / poolSize);
    setLoanInterestRateState(calculatedRate);
  };

  const updateOwnedBeras = (borrowedAgainstBera: BeraInfo) => {
    setOwnedBerasState((prevState) =>
      prevState.filter((bera) => bera !== borrowedAgainstBera),
    );
  };

  const updateOwnedPartners = (nfts: PartnerInfo | PartnerInfo[]) => {
    if (Array.isArray(nfts)) {
      setOwnedPartnersState((prevState) =>
        prevState.filter((partner) => !nfts.includes(partner)),
      );
    } else {
      setOwnedPartnersState((prevState) =>
        prevState.filter((partner) => partner !== nfts),
      );
    }
  };

  return (
    <GoldilendContext.Provider
      value={{
        goldilendInfo: goldilendInfoState,
        goldilendWalletInfo: goldilendWalletInfoState,
        infoLoading: infoLoadingState,
        walletInfoLoading: walletInfoLoadingState,
        displayString: displayStringState,
        setDisplayString: setDisplayStringState,
        setInfoLoading: setInfoLoadingState,
        refreshGoldilendInfo,
        refreshGoldilendWalletInfo,
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
        selectedBera: selectedBeraState,
        ownedBeras: ownedBerasState,
        userLoans: userLoansState,
        handleBeraClick,
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
        updateOwnedPartners,
        wutPopup: wutPopupState,
        setWutPopup: setWutPopupState,
        boostPopup: boostPopupState,
        setBoostPopup: setBoostPopupState,
      }}
    >
      {children}
    </GoldilendContext.Provider>
  );
};

export const useGoldilend = () => useContext(GoldilendContext);
