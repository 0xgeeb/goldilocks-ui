import type { Metadata } from "next"
import { LayoutProps } from "../utils/interfaces"
import localFont from "next/font/local"
import "./globals.css"

export const metadata: Metadata = {
  title: "Goldilocks",
  description: "Berachain Defi"
}

const amatic = localFont({
  src: '../public/fonts/AmaticSC-Regular.ttf',
  display: 'swap',
  variable: '--font-amatic'
})

const amaticBold = localFont({
  src: '../public/fonts/AmaticSC-Bold.ttf',
  display: 'swap',
  variable: '--font-amaticbold'
})

const baloo = localFont({
  src: '../public/fonts/Baloo2-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-baloo'
})

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="en" className={`${amatic.variable} ${amaticBold.variable} ${baloo.variable}`}>
      <body>
        { children }
      </body>
    </html>
  )
}