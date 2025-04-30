import type { Metadata } from "next"

import "@workspace/ui/globals.css"
import "@/app/styles/globals.css"

import { ThemeProvider } from "@/app/providers"
import {
  pretendard,
  hahmlet,
  source,
} from "@/app/fonts"

export const metadata: Metadata = {
  title: "JGPARK",
  description: "JGPARK - Frontend Engineer based in Seoul, South Korea.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pretendard.variable} ${hahmlet.variable} ${source.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
