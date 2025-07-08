import React from "../../node_modules/@types/react";

export interface LayoutProps {
  children: React.ReactNode;
}

export type NotificationProps = {
  hash: string;
  title: string;
  direction: string;
  amount: number;
  price: number;
  page: string;
};

export interface NotificationProviderState {
  notifications: Array<NotificationProps>;
  openNotification(notification: NotificationProps): void;
  closeNotification(notificationHash: string): void;
}

export interface BalanceState {
  locks: number;
  prg: number;
  honey: number;
  staked: number;
  claimable: number;
  locked: number;
  borrowed: number;
  ibgt: number;
  gibgt: number;
  lendStaked: number;
  lendClaimable: number;
  lendInfraredClaimable: number;
  locksPrgAllowance: number;
  honeyPrgAllowance: number;
  honeyBorrowAllowance: number;
  honeySwapAllowance: number;
}

export interface WalletInitialState {
  balance: BalanceState;
  wallet: string;
  isConnected: boolean;
  network: string;
  refreshBalances: () => void;
  balancesLoading: boolean;
  updateBalanceAllowance: (_type: string, _newAllowance: number) => void;
}

export interface BeraInfo {
  name: string;
  id: number;
  valuation: number;
  index: number;
}

export interface PartnerInfo {
  name: string;
  id: number;
  boost: number;
  index: number;
}

export interface BoostInfo {
  partnerNFTs: string[];
  partnerNFTIds: number[];
  boostMagnitude: number;
  expiry: number;
}

export interface LoanInfo {
  collateralNFTs: string[];
  collateralNFTIds: number[];
  borrowedAmount: number;
  interest: number;
  duration: number;
  endDate: number;
  loanId: number;
  liquidated: boolean;
}

export interface LoanData {
  collateralNFTs: string[];
  collateralNFTIds: bigint[];
  borrowedAmount: bigint;
  interest: bigint;
  duration: bigint;
  endDate: bigint;
  loanId: bigint;
  liquidated: boolean;
}

export interface GoldilendInitialState {
  goldilendInfo: {
    glwberaSupply: number;
    stakedglwbera: number;
    poolSize: number;
    outstandingDebt: number;
  };
  goldilendWalletInfo: {
    wbera: number;
    glwbera: number;
    wberaGoldilendAllowance: number;
  };
  lock: number;
  stake: number;
  unstake: number;
  loanAmount: number;
  debouncedLoanAmount: number;
  borrowLimit: number;
  boostMag: number;
  loanInterest: number;
  setLoanInterest: (_interest: number) => void;
  loanInterestRate: number;
  setLoanInterestRate: (_interestRate: number) => void;
  setLock: (_lock: number) => void;
  setStake: (_stake: number) => void;
  setUnstake: (_unstake: number) => void;
  displayString: string;
  borrowDisplayString: string;
  setDisplayString: (_displayString: string) => void;
  ownedBeras: BeraInfo[];
  selectedBera: BeraInfo;
  ownedPartners: PartnerInfo[];
  selectedPartners: PartnerInfo[];
  userLoans: LoanInfo[];
  userBoost: BoostInfo;
  liquidatableLoans: LoanInfo[];
  notification: {
    toggle: boolean;
    action: string;
    result: string;
    hash: string;
  };
  openNotification: (
    _toggle: boolean,
    _action: string,
    _result: string,
    _hash: string,
  ) => void;
  activeToggle: string;
  changeActiveToggle: (_toggle: string) => void;
  lendActiveToggle: string;
  changeLendActiveToggle: (_toggle: string) => void;
  refreshGoldilendInfo: () => void;
  refreshGoldilendWalletInfo: () => void;
  infoLoading: boolean;
  setInfoLoading: (_loading: boolean) => void;
  walletInfoLoading: boolean;
  loansLoading: boolean;
  setLoansLoading: (_loading: boolean) => void;
  allowanceButtons: boolean;
  setAllowanceButtons: (_bool: boolean) => void;
  handlePercentageButtons: (_action: number) => void;
  handleStakeChange: (_input: string, _tab: string) => void;
  handleStakeBalance: (_tab: string) => string;
  txConfirming: boolean;
  setTxConfirming: (_confirming: boolean) => void;
  selectScreen: boolean;
  setSelectScreen: (_screen: boolean) => void;
  chartOpen: boolean;
  setChartOpen: (_open: boolean) => void;
  wutPopup: boolean;
  setWutPopup: (_popup: boolean) => void;
  boostPopup: boolean;
  setBoostPopup: (_popup: boolean) => void;
  balanceMobileToggle: boolean;
  setBalanceMobileToggle: (_toggle: boolean) => void;
  handleBeraClick: (_bera: BeraInfo) => void;
  handlePartnerClick: (_partner: PartnerInfo) => void;
  findSelectedPartnerIdxs: () => number[];
  updateBorrowLimit: () => void;
  updateBoostMag: () => void;
  handleBorrowChange: (_input: string) => void;
  handleLoanDateChange: (_input: string) => void;
  loanExpiration: string;
  debouncedLoanExpiration: string;
  findLoans: () => void;
  findBeras: (_beras: any) => void;
  getInterestRate: () => void;
  updateOwnedBeras: (_borrowedAgainstBera: BeraInfo) => void;
  updateOwnedPartners: (_nfts: PartnerInfo | PartnerInfo[]) => void;
}

export interface EtherfiAPIResponse {
  "7_day_apr": number;
  "7_day_restaking_apr": number;
  tvl: number;
  buffer_eth: number;
}

export interface LocksChartData {
  hourly: LocksChartDataEntry[];
  daily: LocksChartDataEntry[];
  weekly: LocksChartDataEntry[];
}

export interface LocksChartDataEntry {
  floor: number;
  market: number;
  date: string;
}

export interface YtChartData {
  hourly: YtChartDataEntry[];
  daily: YtChartDataEntry[];
  weekly: YtChartDataEntry[];
}

export interface YtChartDataEntry {
  fixedApr: number;
  ytPrice: number;
  daysTil: number;
  date: string;
}