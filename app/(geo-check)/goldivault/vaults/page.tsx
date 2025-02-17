import type { Metadata } from "next";

import { GoldivaultPage } from "../../../../components/goldivault";
import { GoldivaultProvider } from "../../../../providers";

export const metadata: Metadata = {
  title: "mf goldivaults",
  description: "Goldivaults",
};

export default function Goldivaults() {
  return (
    <GoldivaultProvider>
      <GoldivaultPage />
    </GoldivaultProvider>
  );
}
