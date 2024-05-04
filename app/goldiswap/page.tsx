import type { Metadata } from "next"
import { GoldiswapPage } from "../../components/goldiswap"
import {
  WagmiProvider,
  WalletProvider,
  GoldiswapProvider
} from "../../providers"

export const metadata: Metadata = {
  title: "mf goldiswap",
  description: "Goldilocks AMM"
}

export default function Goldiswap() {
  
  return (
    <WagmiProvider> 
      <WalletProvider>
        <GoldiswapProvider>
          <GoldiswapPage />
        </GoldiswapProvider>
      </WalletProvider>
    </WagmiProvider>
  )
}