import type { Metadata } from "next"

import "@workspace/core/globals.css"
import {
  pretendard,
  hahmlet,
  source,
} from "@workspace/core/app/fonts"
import { ThemeProvider } from "@workspace/core/app/providers"

import "@/app/styles/globals.css"

export const metadata: Metadata = {
  title: "JGPARK",
  description: "JGPARK - Frontend Engineer",
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
