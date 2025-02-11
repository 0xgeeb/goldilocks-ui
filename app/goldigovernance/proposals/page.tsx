import type { Metadata } from "next"
import { ProposalsPage } from "../../../components/gov"
import {
  WagmiProvider,
  GovProvider,
  GeoProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldigovernance",
  description: "Goldilocks Governance"
}

export default function Proposals() {
  
  return (
    <GeoProvider>
      <WagmiProvider> 
        <GovProvider>
          <ProposalsPage />
        </GovProvider>
      </WagmiProvider>
    </GeoProvider>
  )
}