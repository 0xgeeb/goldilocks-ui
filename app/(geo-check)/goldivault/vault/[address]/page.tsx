import type { Metadata } from "next";

import { VaultPage } from "../../../../../components/goldivault";
import { GoldivaultProvider } from "../../../../../providers";

export const metadata: Metadata = {
  title: "mf goldivaults",
  description: "Goldivaults",
};

export const runtime = 'edge';

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
