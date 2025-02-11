import type { Metadata } from "next"
import { HomePage } from "../components/home"

export const metadata: Metadata = {
  title: "Goldilocks",
  description: "Berachain Defi"
}

export default function Home() {
  
  return (
    <HomePage />
  )
}