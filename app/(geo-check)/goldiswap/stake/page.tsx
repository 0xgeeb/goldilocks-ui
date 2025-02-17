import type { Metadata } from "next";

import { StakePage } from "../../../../components/stake";
import { StakeProvider } from "../../../../providers";

export const metadata: Metadata = {
  title: "mf staking",
  description: "Goldilocks Staking",
};

export default function Stake() {
  return (
    <StakeProvider>
      <StakePage />
    </StakeProvider>
  );
}
