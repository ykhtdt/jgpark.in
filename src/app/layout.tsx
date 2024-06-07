import type { Metadata } from "next"
import { Inter, Hahmlet, Source_Code_Pro } from "next/font/google"

import { ThemeProvider } from "@/components/provider/theme-provider"
import Container from "@/components/ui/layout/container"
import Header from "@/components/ui/header/header"
import Footer from "@/components/ui/footer/footer"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' })
const hahmlet = Hahmlet({ subsets: ["latin"], variable: '--font-serif' })
const source = Source_Code_Pro({ subsets: ["latin"], variable: '--font-mono' })

export const metadata: Metadata = {
  title: "jgpark",
  description: "JG Park's personal website for documentation.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} ${hahmlet.variable} ${source.variable} bg-background min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Container>
            <Header />
            {children}
            <Footer />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
