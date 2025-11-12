import type { Metadata } from "next"

import { GoldilendMintPage } from "../../../../components/goldilend"
import { GoldilendProvider } from "../../../../providers"

export const metadata: Metadata = {
  title: "mf goldilend",
  description: "Berachain NFT Lending"
}

export default function GoldilendMint() {

  return (
    <GoldilendProvider>
      <GoldilendMintPage />
    </GoldilendProvider>
  )
}