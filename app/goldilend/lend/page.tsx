import type { Metadata } from "next"
import { GoldilendLendPage } from "../../../components/goldilend"
import {
  WagmiProvider,
  WalletProvider,
  GoldilendProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldilend",
  description: "Berachain NFT Lending"
}

export default function GoldilendLend() {
  
  return (
    <WagmiProvider> 
      <WalletProvider>
        <GoldilendProvider>
          <GoldilendLendPage />
        </GoldilendProvider>
      </WalletProvider>
    </WagmiProvider>
  )
}