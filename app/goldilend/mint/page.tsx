import type { Metadata } from "next"
import { GoldilendMintPage } from "../../../components/goldilend"
import {
  WagmiProvider,
  WalletProvider,
  GoldilendProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldilend",
  description: "Berachain NFT Lending"
}

export default function GoldilendMint() {

  return (
    <WagmiProvider> 
      <WalletProvider>
        <GoldilendProvider>
          <GoldilendMintPage />
        </GoldilendProvider>
      </WalletProvider>
    </WagmiProvider>
  )
}