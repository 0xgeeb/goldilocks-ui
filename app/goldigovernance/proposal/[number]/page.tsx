import type { Metadata } from "next"
import { ProposalPage } from "../../../../components/gov"
import {
  WagmiProvider,
  GovProvider,
  GeoProvider
} from "../../../../providers"

export const metadata: Metadata = {
  title: "mf goldigovernance",
  description: "Goldilocks Governance"
}

type Props = {
  params: {
    number: string;
  }
}

export default function Proposal({ params }: Props) {

  return (
    <GeoProvider>
      <WagmiProvider>
        <GovProvider>
          <ProposalPage params={params} />
        </GovProvider>
      </WagmiProvider>
    </GeoProvider>
  )
}