import localFont from "next/font/local"
import {
  Hahmlet,
  Source_Code_Pro,
} from "next/font/google"

export const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "45 920",
})

export const hahmlet = Hahmlet({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
})

export const source = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
})
