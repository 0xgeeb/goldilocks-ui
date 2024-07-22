import type { Metadata } from "next"
import { StakePage } from "../../../components/stake"
import {
  WagmiProvider,
  WalletProvider,
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
      <WalletProvider>
        <GoldiswapProvider>
          <StakeProvider>
            <StakePage />
          </StakeProvider>
        </GoldiswapProvider>
      </WalletProvider>
    </WagmiProvider>
  )
}