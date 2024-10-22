import type { Metadata } from "next"
import { VaultPage } from "../../../../components/goldivault"
import {
  WagmiProvider,
  GoldivaultProvider
} from "../../../../providers"

export const metadata: Metadata = {
  title: "mf goldivaults",
  description: "Goldivaults"
}

type Props = {
  params: {
    address: string;
  }
}

export default function Vault({ params }: Props) {

  return (
    <WagmiProvider>
      <GoldivaultProvider>
        <VaultPage params={params} />
      </GoldivaultProvider>
    </WagmiProvider>
  )
}