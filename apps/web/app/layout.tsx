import type { Metadata } from "next"

import "@workspace/core/globals.css"
import {
  pretendard,
  hahmlet,
  source,
} from "@workspace/core/app/fonts"
import { ThemeProvider } from "@workspace/core/app/providers"

import "@/app/styles/globals.css"
import { ReactQueryProvider } from "@/app/providers"
import { PreloadNoise } from "@/shared/ui"

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
        <PreloadNoise />
        <ThemeProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
