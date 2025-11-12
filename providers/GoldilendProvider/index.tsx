"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { readContract } from "@wagmi/core";
import { formatEther, parseAbiItem } from "viem";
import { useAccount } from "wagmi";
import { useDebounce } from "../../hooks";
import { config, client } from "../../providers/WagmiProvider";
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
    glhoneySupply: 0,
    poolSize: 0,
    outstandingDebt: 0,
    maxUtilization: 0,
    protocolInterestRate: 0
  },
  goldilendWalletInfo: {
    honey: 0,
    glhoney: 0,
    honeyGoldilendAllowance: 0,
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
  ownedBeras: [
    // {
    //   name: "BandBera",
    //   id: 69,
    //   valuation: 50,
    //   index: 0
    // }
  ],
  selectedBera: {
    name: "",
    id: 0,
    valuation: 0,
    index: -1,
  },
  userLoans: [
    {
      collateralNFTs: [contracts.bondbear.address],
      collateralNFTIds: [15],
      borrowedAmount: 3500,
      interest: 175,
      duration: 2592000,
      endDate: Math.floor(Date.now() / 1000) + 86400 * 15, // 15 days from now
      loanId: 1,
      repaid: false,
      liquidated: false,
      realBorrowedAmount: BigInt("3500000000000000000000"),
      realInterest: BigInt("175000000000000000000"),
    },
    {
      collateralNFTs: [contracts.bandbear.address],
      collateralNFTIds: [28],
      borrowedAmount: 4200,
      interest: 210,
      duration: 2592000,
      endDate: Math.floor(Date.now() / 1000) + 86400 * 8, // 8 days from now
      loanId: 2,
      repaid: false,
      liquidated: false,
      realBorrowedAmount: BigInt("4200000000000000000000"),
      realInterest: BigInt("210000000000000000000"),
    },
    {
      collateralNFTs: [contracts.bondbear.address],
      collateralNFTIds: [33],
      borrowedAmount: 2800,
      interest: 140,
      duration: 2592000,
      endDate: Math.floor(Date.now() / 1000) + 86400 * 22, // 22 days from now
      loanId: 3,
      repaid: false,
      liquidated: false,
      realBorrowedAmount: BigInt("2800000000000000000000"),
      realInterest: BigInt("140000000000000000000"),
    },
  ],
  ownedPartners: [],
  selectedPartners: [],
  userBoost: {
    partnerNFTs: [],
    partnerNFTIds: [],
    boostMagnitude: 0,
    expiry: 0,
  },
  liquidatableLoans: [
    {
      collateralNFTs: [contracts.bondbear.address],
      collateralNFTIds: [42],
      borrowedAmount: 5000,
      interest: 250,
      duration: 2592000,
      endDate: Math.floor(Date.now() / 1000) - 86400 * 3, // 3 days ago
      loanId: 101,
      repaid: false,
      liquidated: false,
      realBorrowedAmount: BigInt("5000000000000000000000"),
      realInterest: BigInt("250000000000000000000"),
    },
    {
      collateralNFTs: [contracts.bandbear.address],
      collateralNFTIds: [57],
      borrowedAmount: 3800,
      interest: 190,
      duration: 2592000,
      endDate: Math.floor(Date.now() / 1000) - 86400 * 5, // 5 days ago
      loanId: 102,
      repaid: false,
      liquidated: false,
      realBorrowedAmount: BigInt("3800000000000000000000"),
      realInterest: BigInt("190000000000000000000"),
    },
    {
      collateralNFTs: [contracts.bondbear.address, contracts.bandbear.address],
      collateralNFTIds: [88, 92],
      borrowedAmount: 7500,
      interest: 375,
      duration: 2592000,
      endDate: Math.floor(Date.now() / 1000) - 86400 * 1, // 1 day ago
      loanId: 103,
      repaid: false,
      liquidated: false,
      realBorrowedAmount: BigInt("7500000000000000000000"),
      realInterest: BigInt("375000000000000000000"),
    },
  ],
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
  activeToggle: "GHONEY", // changing to ghoney to only enable ghoney deposits
  changeActiveToggle: (_toggle: string) => {},
  lendActiveToggle: "DEPOSIT",
  changeLendActiveToggle: (_toggle: string) => {},
  refreshGoldilendInfo: async () => {},
  refreshGoldilendWalletInfo: async () => {},
  berasLoading: false,
  setBerasLoading: (_loading: boolean) => {},
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
  findBeras: () => {},
  findLoans: () => {},
  updateBorrowLimit: () => {},
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
  const [berasLoadingState, setBerasLoadingState] = useState<boolean>(INITIAL_STATE.berasLoading)
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
      if (lendActiveToggleState === "DEPOSIT") {
        setDisplayStringState((goldilendWalletInfoState.honey / 4).toFixed(4));
        setStakeState(goldilendWalletInfoState.honey / 4);
      }
      if (lendActiveToggleState === "WITHDRAW") {
        setDisplayStringState(
          (goldilendWalletInfoState.glhoney / 4).toFixed(4),
        );
        setUnstakeState(goldilendWalletInfoState.glhoney / 4);
      }
    }
    if (action == 2) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState((goldilendWalletInfoState.ibgt / 2).toFixed(4));
      //   setLockState(goldilendWalletInfoState.ibgt / 2);
      // }
      if (lendActiveToggleState === "DEPOSIT") {
        setDisplayStringState((goldilendWalletInfoState.honey / 2).toFixed(4));
        setStakeState(goldilendWalletInfoState.honey / 2);
      }
      if (lendActiveToggleState === "WITHDRAW") {
        setDisplayStringState(
          (goldilendWalletInfoState.glhoney / 2).toFixed(4),
        );
        setUnstakeState(goldilendWalletInfoState.glhoney / 2);
      }
    }
    if (action == 3) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState(
      //     (goldilendWalletInfoState.ibgt * 0.75).toFixed(4),
      //   );
      //   setLockState(goldilendWalletInfoState.ibgt * 0.75);
      // }
      if (lendActiveToggleState === "DEPOSIT") {
        setDisplayStringState(
          (goldilendWalletInfoState.honey * 0.75).toFixed(4),
        );
        setStakeState(goldilendWalletInfoState.honey * 0.75);
      }
      if (lendActiveToggleState === "WITHDRAW") {
        setDisplayStringState(
          (goldilendWalletInfoState.glhoney * 0.75).toFixed(4),
        );
        setUnstakeState(goldilendWalletInfoState.glhoney * 0.75);
      }
    }
    if (action == 4) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState(goldilendWalletInfoState.ibgt.toFixed(4));
      //   setLockState(goldilendWalletInfoState.ibgt - 0.0001);
      // }
      if (lendActiveToggleState === "DEPOSIT") {
        setDisplayStringState(goldilendWalletInfoState.honey.toFixed(4));
        setStakeState(goldilendWalletInfoState.honey - 0.0001);
      }
      if (lendActiveToggleState === "WITHDRAW") {
        setDisplayStringState(goldilendWalletInfoState.glhoney.toFixed(4));
        setUnstakeState(goldilendWalletInfoState.glhoney - 0.0001);
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
    const poolSize = goldilendInfoState.poolSize;
    const outstandingDebt = goldilendInfoState.outstandingDebt;
    const fairValue = selectedBeraState.valuation;
    const maxUtilization = goldilendInfoState.maxUtilization;
    
    const maxLoanAmount = poolSize / 10;
    const maxUtilizationLimit = (poolSize * maxUtilization / 100) - outstandingDebt;    
    const availablePoolCapacity = poolSize - outstandingDebt;
    const collateralLimit = fairValue;
    const borrowLimit = Math.min(
      maxLoanAmount,
      maxUtilizationLimit,
      availablePoolCapacity,
      collateralLimit
    );
    
    setBorrowLimitState(borrowLimit);
  };

  //todo: prolly the cause of approvals not going away. copy handleChange from stake
  const handleStakeChange = (input: string, tab: string) => {
    setDisplayStringState(input);
    if (tab === "LOCK") {
      !input ? setLockState(0) : setLockState(parseFloat(input));
    }
    if (tab === "DEPOSIT") {
      !input ? setStakeState(0) : setStakeState(parseFloat(input));
    }
    if (tab === "WITHDRAW") {
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
    if (tab === "DEPOSIT") {
      return goldilendWalletInfoState.honey > 0
        ? goldilendWalletInfoState.honey.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }
    if (tab === "WITHDRAW") {
      return goldilendWalletInfoState.glhoney > 0
        ? goldilendWalletInfoState.glhoney.toLocaleString("en-US", {
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

  const findBeras = async () => {
    // console.log('finding beras')
    // if(address) {
    //   setBerasLoadingState(true)
    //   const response = await fetch(`/api/ownedBeras/${address}`)
    //   const responseJson: any = await response.json()
      
    //   const nftIds = responseJson.nftIds
    //   const ownedBeras: BeraInfo[] = nftIds.map((tokenId: any, index: any) => ({
    //     name: "BandBera",
    //     id: tokenId,
    //     valuation: 50,
    //     index: index
    //   }))
    //   setOwnedBerasState(ownedBeras)
    //   setBerasLoadingState(false)
    // }
  }

  const findLoans = async () => {
    console.log('finding loans', address)
    if (address) {
      const userLoans: any[] = [];
      for (let i = 1; i < 10; i++) {
        const loanData: any = await readContract(config, {
          address: contracts.goldilend.address as `0x${string}`,
          abi: contracts.goldilend.abi,
          functionName: "loans",
          args: [address, i]
        })
        // console.log(`Loan ${i}:`, loanData)
        const userLoan = {
          collateralNFTs: loanData[0],
          collateralNFTIds: parseInt(loanData[1], 16),
          borrowedAmount: parseFloat(formatEther(loanData[2])),
          interest: parseFloat(formatEther(loanData[3])),
          duration: Number(loanData[4]),
          endDate: Number(loanData[5]),
          loanId: parseInt(loanData[6].toString(), 16),
          repaid: loanData[7],
          liquidated: loanData[8],
          realBorrowedAmount: loanData[2],
          realInterest: loanData[3]
        }
        if(userLoan.collateralNFTs !== "0x0000000000000000000000000000000000000000") {
          userLoans.push(userLoan)
        }
      }
      console.log(userLoans)
      setUserLoansState(userLoans);
    }
  };

  const refreshGoldilendInfo = async () => {
    console.log('refreshing info')
    setInfoLoadingState(true)
    const glhoneySupplyResult = await readContract(config, {
      address: contracts.glhoney.address as `0x${string}`,
      abi: contracts.glhoney.abi,
      functionName: "totalSupply",
      args: [],
    })
    const debtResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "outstandingDebt",
      args: [],
    });
    const maxUtilizationResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "maxUtilization",
      args: [],
    });
    const rateResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "protocolInterestRate",
      args: [],
    })

    const response = {
      glhoneySupply: parseFloat(formatEther(glhoneySupplyResult as unknown as bigint)),
      poolSize: parseFloat(formatEther(glhoneySupplyResult as unknown as bigint)),
      outstandingDebt: parseFloat(formatEther(debtResult as unknown as bigint)),
      maxUtilization: parseFloat(formatEther(maxUtilizationResult as unknown as bigint)),
      protocolInterestRate: parseFloat(formatEther(rateResult as unknown as bigint)),
    }

    setGoldilendInfoState(response);
    setInfoLoadingState(false);
  };

  const refreshGoldilendWalletInfo = async () => {
    if (!address) {
      setGoldilendWalletInfoState((prev) => ({
        ...prev,
        honey: 0,
        glhoney: 0,
        honeyGoldilendAllowance: 0,
      }));
      return;
    }

    setWalletInfoLoadingState(true);
    try {
      const [honeyResult, glhoneyResult, honeyAllowanceResult] =
        await Promise.all([
          readContract(config, {
            address: contracts.honey.address as `0x${string}`,
            abi: contracts.honey.abi,
            functionName: "balanceOf",
            args: [address],
          }),
          readContract(config, {
            address: contracts.glhoney.address as `0x${string}`,
            abi: contracts.glhoney.abi,
            functionName: "balanceOf",
            args: [address],
          }),
          readContract(config, {
            address: contracts.honey.address as `0x${string}`,
            abi: contracts.honey.abi,
            functionName: "allowance",
            args: [address, contracts.goldilend.address],
          }),
        ]);

      setGoldilendWalletInfoState({
        honey: parseFloat(formatEther(honeyResult as unknown as bigint)),
        glhoney: parseFloat(formatEther(glhoneyResult as unknown as bigint)),
        honeyGoldilendAllowance: parseFloat(
          formatEther(honeyAllowanceResult as unknown as bigint),
        ),
      });
    } catch (error) {
      console.error("Failed to refresh Goldilend wallet info", error);
      setGoldilendWalletInfoState((prev) => ({
        ...prev,
        honey: 0,
        glhoney: 0,
        honeyGoldilendAllowance: 0,
      }));
    } finally {
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
        berasLoading: berasLoadingState,
        setBerasLoading: setBerasLoadingState,
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
