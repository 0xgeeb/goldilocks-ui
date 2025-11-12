import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Source_Code_Pro } from 'next/font/google';

import { DesktopProvider } from "../providers";
import { LayoutProps } from "../utils/interfaces";

export const metadata: Metadata = {
  title: "Goldilocks",
  description: "Berachain Defi",
  icons: {
    icon: '/icon.ico',
  },
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});

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
      className={`${amatic.variable} ${amaticBold.variable} ${baloo.variable} ${inter.variable} ${sourceCodePro.variable}`}
    >
      <body className="h-auto min-h-screen lg:h-screen w-screen lg:overflow-hidden">
        <DesktopProvider>{children}</DesktopProvider>
      </body>
    </html>
  );
}
