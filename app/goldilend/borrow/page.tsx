import type { Metadata } from "next"
import { GoldilendPage } from "../../../components/goldilend"
import {
  WagmiProvider,
  GoldilendProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldilend",
  description: "Berachain NFT Lending"
}

export default function Goldilend() {
  
  return (
    <WagmiProvider> 
      <GoldilendProvider>
        <GoldilendPage />
      </GoldilendProvider>
    </WagmiProvider>
  )
}