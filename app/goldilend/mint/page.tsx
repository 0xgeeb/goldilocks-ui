import type { Metadata } from "next"
import { GoldilendMintPage } from "../../../components/goldilend"
import {
  WagmiProvider,
  GoldilendProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldilend",
  description: "Berachain NFT Lending"
}

export default function GoldilendMint() {

  return (
    <WagmiProvider> 
      <GoldilendProvider>
        <GoldilendMintPage />
      </GoldilendProvider>
    </WagmiProvider>
  )
}