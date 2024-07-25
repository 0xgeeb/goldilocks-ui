"use client"

import { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider as WagmiClientProvider, http, createConfig } from "wagmi"
import { metaMask } from "@wagmi/connectors"
import { BerachainBartioTestnet } from "../../utils/customChains"
// import { base, baseSepolia } from "wagmi/chains"
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"

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

export const config = createConfig({
  chains: [BerachainBartioTestnet],
  ssr: true,
  connectors: [metaMask()],
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