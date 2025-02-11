import type { Metadata } from "next"
import { GovLocksPage } from "../../../components/gov"
import {
  WagmiProvider,
  GovProvider,
  GeoProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldigovernance",
  description: "Goldilocks Governance"
}

export default function GovLocks() {
  
  return (
    <GeoProvider>
      <WagmiProvider> 
        <GovProvider>
          <GovLocksPage />
        </GovProvider>
      </WagmiProvider>
    </GeoProvider>
  )
}