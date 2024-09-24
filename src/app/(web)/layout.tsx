import type { Metadata } from "next"

import { pretendard, hahmlet, source } from "@/fonts/web-font"
import { ThemeProvider } from "@/components/provider/theme-provider"
import Container from "@/components/ui/container"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"

import "@/styles/globals.css"
import "@/styles/mdx.css"

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
      <body className={`${pretendard.variable} ${hahmlet.variable} ${source.variable} min-h-screen bg-background`}>
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
