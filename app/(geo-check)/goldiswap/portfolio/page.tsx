import type { Metadata } from "next";

import { GoldiswapPortfolioPage } from "../../../../components/goldiswap";
import { GoldiswapProvider } from "../../../../providers";

export const metadata: Metadata = {
  title: "Goldiswap Portfolio",
  description: "Goldiswap Portfolio Dashboard",
};

export default function Portfolio() {
  return (
    <GoldiswapProvider>
      <GoldiswapPortfolioPage />
    </GoldiswapProvider>
  );
}
