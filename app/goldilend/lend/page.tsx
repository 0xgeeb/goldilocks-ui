import type { Metadata } from "next"
import { GoldilendLendPage } from "../../../components/goldilend"
import {
  WagmiProvider,
  GoldilendProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldilend",
  description: "Berachain NFT Lending"
}

export default function GoldilendLend() {
  
  return (
    <WagmiProvider> 
      <GoldilendProvider>
        <GoldilendLendPage />
      </GoldilendProvider>
    </WagmiProvider>
  )
}