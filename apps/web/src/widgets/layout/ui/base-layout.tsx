import type { ReactNode } from "react"

import { Container } from "@/shared/ui"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"

interface BaseLayoutProps {
  children: ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="pt-10 sm:pt-20 flex flex-1">
      <Container>
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="relative flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </Container>
    </div>
  )
}
