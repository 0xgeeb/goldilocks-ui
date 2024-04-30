import React from "../../node_modules/@types/react"
import { WalletClient } from "viem"

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
}

export interface WalletInitialState {
  balance: BalanceState;
  wallet: string;
  isConnected: boolean;
  network: string;
  refreshBalances: () => void;
}