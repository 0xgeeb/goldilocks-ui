import type { Metadata } from "next"

import { GoldilendGHoneyPage } from "../../../../components/goldilend"
import { GoldilendProvider } from "../../../../providers"

export const metadata: Metadata = {
  title: "gHONEY",
  description: "Goldilend gHONEY"
}

export default function GoldilendGHoney() {
  return (
    <GoldilendProvider>
      <GoldilendGHoneyPage />
    </GoldilendProvider>
  )
}
