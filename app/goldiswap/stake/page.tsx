import type { Metadata } from "next"
import { StakePage } from "../../../components/stake"
import {
  WagmiProvider,
  StakeProvider,
  GoldiswapProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: "mf staking",
  description: "Goldilocks Staking"
}

export default function Stake() {

  return (
    <WagmiProvider>
      <GoldiswapProvider>
        <StakeProvider>
          <StakePage />
        </StakeProvider>
      </GoldiswapProvider>
    </WagmiProvider>
  )
}