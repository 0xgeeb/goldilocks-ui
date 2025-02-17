import type { Metadata } from "next";

import { VaultPage } from "../../../../../components/goldivault";
import { GoldivaultProvider } from "../../../../../providers";

export const metadata: Metadata = {
  title: "mf goldivaults",
  description: "Goldivaults",
};

type Props = {
  params: {
    address: string;
  };
};

export default function Vault({ params }: Props) {
  return (
    <GoldivaultProvider>
      <VaultPage params={params} />
    </GoldivaultProvider>
  );
}
