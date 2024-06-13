import localFont from "next/font/local"
import { Hahmlet, Source_Code_Pro } from "next/font/google"

const pretendard = localFont({
  src: "../../public/static/fonts/PretendardVariable.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "45 920",
})

const hahmlet = Hahmlet({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
})

const source = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
})

export { pretendard, hahmlet, source }