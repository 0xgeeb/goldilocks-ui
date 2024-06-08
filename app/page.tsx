import type { Metadata } from "next"
import { HomePage } from "../components/home"

export const metadata: Metadata = {
  title: "mf goldilocks",
  description: "Berachain Defi"
}

export default function Goldilend() {
  
  return (
    <HomePage />
  )
}