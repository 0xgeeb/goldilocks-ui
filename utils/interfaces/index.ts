import React from "../../node_modules/@types/react"

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
}

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
}

export interface WalletInitialState {
  balance: BalanceState;
  wallet: string;
  isConnected: boolean;
  network: string;
  refreshBalances: () => void;
  balancesLoading: boolean;
}

export interface BeraInfo {
  name: string;
  id: number;
  imageSrc: string;
  valuation: number;
  index: number;
}

export interface PartnerInfo {
  name: string;
  id: number;
  imageSrc: string;
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

export interface GoldilendInitialState {
  goldilendInfo: {

  };
  lock: number;
  stake: number;
  unstake: number;
  loanAmount: number;
  borrowLimit: number;
  setLock: (_lock: number) => void;
  setStake: (_stake: number) => void;
  setUnstake: (_unstake: number) => void;
  displayString: string;
  borrowDisplayString: string;
  setDisplayString: (_displayString: string) => void;
  ownedBeras: BeraInfo[];
  userLoans: LoanInfo[];
  selectedBeras: BeraInfo[];
  notification: {
    toggle: boolean;
    action: string;
    result: string;
    hash:string;
  };
  openNotification: (
    _toggle: boolean,
    _action: string,
    _result: string,
    _hash: string
  ) => void;
  activeToggle: string;
  changeActiveToggle: (_toggle: string) => void;
  lendActiveToggle: string;
  changeLendActiveToggle: (_toggle: string) => void;
  refreshGoldilendInfo: () => void;
  infoLoading: boolean;
  setInfoLoading: (_loading: boolean) => void;
  allowanceButtons: boolean;
  setAllowanceButtons: (_bool: boolean) => void;
  handlePercentageButtons: (_action: number) => void;
  handleStakeChange: (_input: string, _tab: string) => void;
  handleStakeBalance: (_tab: string) => string;
  txConfirming: boolean;
  setTxConfirming: (_confirming: boolean) => void;
  handleBeraClick: (_bera: BeraInfo) => void;
  findSelectedBeraIdxs: () => number[];
  updateBorrowLimit: () => void;
  handleBorrowChange: (_input: string) => void;
  handleLoanDateChange: (_input: string) => void;
  loanExpiration: string;
}