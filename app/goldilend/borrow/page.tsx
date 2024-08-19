import type { Metadata } from "next"
import { GoldilendPage } from "../../../components/goldilend"
import {
  WagmiProvider,
  WalletProvider,
  GoldilendProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldilend",
  description: "Berachain NFT Lending"
}

export default function Goldilend() {
  
  return (
    <WagmiProvider> 
      <WalletProvider>
        <GoldilendProvider>
          <GoldilendPage />
        </GoldilendProvider>
      </WalletProvider>
    </WagmiProvider>
  )
}