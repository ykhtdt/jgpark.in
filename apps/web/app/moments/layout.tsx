import { BaseLayout } from "@/widgets/layout"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <BaseLayout
      header={<Header />}
      footer={<Footer />}
    >
      {children}
    </BaseLayout>
  )
}
