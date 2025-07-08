"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiProvider as WagmiClientProvider,
  http,
  createConfig,
} from "wagmi";
import {
  BerachainMainnet,
  Bepolia,
  BerachainBartioTestnet,
} from "../../utils/customChains";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  injectedWallet,
  metaMaskWallet,
  bitgetWallet,
  binanceWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

const appName = "goldilocks";
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string;

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        injectedWallet,
        metaMaskWallet,
        bitgetWallet,
        binanceWallet,
        rainbowWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName,
    projectId,
  },
);

export const config = createConfig({
  chains: [BerachainMainnet],
  ssr: true,
  connectors: connectors,
  transports: {
    [BerachainMainnet.id]: http()
  },
});

const queryClient = new QueryClient();

export const WagmiProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  return (
    <WagmiClientProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiClientProvider>
  );
};
