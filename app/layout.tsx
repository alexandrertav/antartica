import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

import { Open_Sans, Rubik, Instrument_Serif } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
})

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mapa Interativo - Ilha Rei George",
  description: "Mapa interativo com fotografias georreferenciadas e dados geomorfológicos da Ilha Rei George, Antártica.",
  icons: {
    icon: [
      { url: "/assets/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/assets/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Mapa Interativo - Ilha Rei George",
    description: "Mapa interativo com fotografias georreferenciadas e dados geomorfológicos da Ilha Rei George, Antártica.",
    images: [
      {
        url: "/assets/logo.png",
        width: 4080,
        height: 2295,
        alt: "WebMapa Antártica",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapa Interativo - Ilha Rei George",
    description: "Mapa interativo com fotografias georreferenciadas e dados geomorfológicos da Ilha Rei George, Antártica.",
    images: ["/assets/logo.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${openSans.variable} ${rubik.variable} ${instrumentSerif.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}