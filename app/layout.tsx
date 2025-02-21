import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { DesktopProvider } from "../providers";
import { LayoutProps } from "../utils/interfaces";

export const metadata: Metadata = {
  title: "Goldilocks",
  description: "Berachain Defi",
};

const amatic = localFont({
  src: "../public/fonts/AmaticSC-Regular.ttf",
  display: "swap",
  variable: "--font-amatic",
});

const amaticBold = localFont({
  src: "../public/fonts/AmaticSC-Bold.ttf",
  display: "swap",
  variable: "--font-amaticbold",
});

const baloo = localFont({
  src: "../public/fonts/Baloo2-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-baloo",
});

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html
      lang="en"
      className={`${amatic.variable} ${amaticBold.variable} ${baloo.variable}`}
    >
      <body className="h-screen w-screen overflow-hidden">
        <DesktopProvider>{children}</DesktopProvider>
      </body>
    </html>
  );
}
