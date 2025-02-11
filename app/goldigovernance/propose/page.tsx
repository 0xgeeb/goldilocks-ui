import type { Metadata } from "next"
import { ProposePage } from "../../../components/gov"
import {
  WagmiProvider,
  GovProvider,
  GeoProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf goldigovernance",
  description: "Goldilocks Governance"
}

export default function Propose() {
  
  return (
    <GeoProvider>
      <WagmiProvider> 
        <GovProvider>
          <ProposePage />
        </GovProvider>
      </WagmiProvider>
    </GeoProvider>
  )
}