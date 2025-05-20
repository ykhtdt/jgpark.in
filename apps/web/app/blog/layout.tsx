import { BaseLayout } from "@/widgets/layout"
import { HeaderWithSearch } from "@/widgets/header"
import { Footer } from "@/widgets/footer"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <BaseLayout header={<HeaderWithSearch />} footer={<Footer />}>
      {children}
    </BaseLayout>
  )
}
