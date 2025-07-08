import type { Metadata } from "next";

import { StrategiesPage } from "../../../components/strategies"

export const metadata: Metadata = {
  title: "mf strategies",
  description: "Goldilocks Strategies",
};

export default function Strategies() {
  return (
    <StrategiesPage />
  )
}