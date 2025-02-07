import type { Metadata } from "next"
import { GoldiswapPage } from "../../../components/goldiswap"
import {
  WagmiProvider,
  GoldiswapProvider,
  GeoProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldiswap",
  description: "Goldilocks AMM"
}

export default function Goldiswap() {
  
  return (
    <GeoProvider>
      <WagmiProvider> 
        <GoldiswapProvider>
          <GoldiswapPage />
        </GoldiswapProvider>
      </WagmiProvider>
    </GeoProvider>
  )
}