import type { Metadata } from "next"
import { GoldiswapPage } from "../../components/goldiswap"

export const metadata: Metadata = {
  title: "mf goldiswap",
  description: "Goldilocks AMM"
}

export default function Goldiswap() {
  
  return (
    <GoldiswapPage />
  )
}