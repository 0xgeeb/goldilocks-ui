import type { Metadata } from "next"
import { GoldiswapPage } from "../../../components/goldiswap"
import {
  WagmiProvider,
  GoldiswapProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldiswap",
  description: "Goldilocks AMM"
}

export default function Goldiswap() {
  
  return (
    <WagmiProvider> 
      <GoldiswapProvider>
        <GoldiswapPage />
      </GoldiswapProvider>
    </WagmiProvider>
  )
}