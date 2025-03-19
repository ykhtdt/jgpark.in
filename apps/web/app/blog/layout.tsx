import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { Container } from "@/shared/ui"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="pt-10 sm:pt-20 flex flex-1">
      <Container>
        {/* Header */}
        <Header />

        {/* page */}
        {children}

        {/* Footer */}
        <Footer />
      </Container>
    </div>
  )
}
