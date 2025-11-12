import type { Metadata } from "next"

import { GoldilendPage } from "../../../components/goldilend"
import { GoldilendProvider } from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldilend",
  description: "Berachain NFT Lending"
}

export default function Goldilend() {
  
  return (
    <GoldilendProvider>
      <GoldilendPage />
    </GoldilendProvider>
  )
}

