import type { Metadata } from "next"
import { StakePage } from "../../../components/stake"
import {
  WagmiProvider,
  StakeProvider,
  GeoProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf staking",
  description: "Goldilocks Staking"
}

export default function Stake() {

  return (
    <GeoProvider>
      <WagmiProvider>
        <StakeProvider>
          <StakePage />
        </StakeProvider>
      </WagmiProvider>
    </GeoProvider>
  )
}