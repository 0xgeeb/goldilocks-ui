import type { Metadata } from "next"

import { GoldilendGHoneyPage } from "../../../../components/goldilend"
import { GoldilendProvider } from "../../../../providers"

export const metadata: Metadata = {
  title: "gHoney",
  description: "Goldilend Honey"
}

export default function GoldilendGHoney() {
  return (
    <GoldilendProvider>
      <GoldilendGHoneyPage />
    </GoldilendProvider>
  )
}
