import type { Metadata } from "next";
import { Goldilend2LendPage } from "../../../../components/goldilend2"

export const metadata: Metadata = {
  title: "mf goldilend2",
  description: "Goldilend 2",
}

export default function Goldilend2Lend() {
  return (
    <Goldilend2LendPage />
  )
}