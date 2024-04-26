import type { Metadata } from "next"
import { LayoutProps } from "../utils/interfaces"
import "./globals.css"

export const metadata: Metadata = {
  title: "Goldilocks",
  description: "Berachain Defi"
}

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  )
}