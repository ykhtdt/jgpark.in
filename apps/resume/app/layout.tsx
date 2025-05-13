import type { Metadata } from "next"

import "@workspace/core/globals.css"
import {
  pretendard,
  hahmlet,
  source,
} from "@workspace/core/app/fonts"
import { ThemeProvider } from "@workspace/core/app/providers"

import "@/app/styles/print.css"

export const metadata: Metadata = {
  title: "박종광 | 프론트엔드 엔지니어",
  description: "이력서",
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
