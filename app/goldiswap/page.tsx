import type { Metadata } from "next"
import { GoldiswapPage } from "../../components/goldiswap"
import { NotificationManager } from "../../components/utils"
import {
  NotificationProvider,
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
    <NotificationProvider>
      <WagmiProvider> 
        <WalletProvider>
          <GoldiswapProvider>
            <GoldiswapPage />
            <NotificationManager />
          </GoldiswapProvider>
        </WalletProvider>
      </WagmiProvider>
    </NotificationProvider>
  )
}