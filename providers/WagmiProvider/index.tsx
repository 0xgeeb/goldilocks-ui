"use client"

import { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider as WagmiClientProvider, http, createConfig } from "wagmi"
import { BerachainBartioTestnet } from "../../utils/customChains"
// import { base, baseSepolia } from "wagmi/chains"
import { RainbowKitProvider, connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"

const { wallets } = getDefaultWallets()
const appName = 'goldilocks'
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string

// export const config = getDefaultConfig({
//   appName: 'Goldilocks',
//   projectId,
//   chains: [baseSepolia],
//   ssr: true,
//   transports: {
//     [baseSepolia.id]: http()
//   }
// })

const connectors = connectorsForWallets(wallets, {appName, projectId})

export const config = createConfig({
  chains: [BerachainBartioTestnet],
  ssr: true,
  connectors: connectors,
  transports: {
    [BerachainBartioTestnet.id]: http()
  }
})

const queryClient = new QueryClient()

export const WagmiProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props
  
  return (
    <WagmiClientProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
          { children }
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiClientProvider>
  )
}