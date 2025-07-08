import type { Metadata } from "next"

import { GoldilendLendPage } from "../../../../components/goldilend"
import { GoldilendProvider } from "../../../../providers"

export const metadata: Metadata = {
  title: "mf goldilend",
  description: "Berachain NFT Lending"
}

export default function GoldilendLend() {
  
  return (
    <GoldilendProvider>
      <GoldilendLendPage />
    </GoldilendProvider>
  )
}