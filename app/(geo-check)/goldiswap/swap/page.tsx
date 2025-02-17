import type { Metadata } from "next";

import { GoldiswapPage } from "../../../../components/goldiswap";
import { GoldiswapProvider } from "../../../../providers";

export const metadata: Metadata = {
  title: "mf goldiswap",
  description: "Goldilocks AMM",
};

export default function Goldiswap() {
  return (
    <GoldiswapProvider>
      <GoldiswapPage />
    </GoldiswapProvider>
  );
}
