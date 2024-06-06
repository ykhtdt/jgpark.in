import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/provider/theme-provider"
import Container from "@/components/ui/layout/container"
import Header from "@/components/ui/header/header"
import Footer from "@/components/ui/footer/footer"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JG Posts",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
