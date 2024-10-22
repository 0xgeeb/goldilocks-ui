import type { Metadata } from "next"
import { PoolsPage } from "../../../components/goldivault"
import {
  WagmiProvider,
  GoldivaultProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldivaults",
  description: "Goldivaults"
}

export default function GoldivaultPools() {

  return (
    <WagmiProvider>
      <GoldivaultProvider>
        <PoolsPage />
      </GoldivaultProvider>
    </WagmiProvider>
  )
}