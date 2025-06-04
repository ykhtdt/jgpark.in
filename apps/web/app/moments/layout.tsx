import { BaseLayout } from "@/widgets/layout"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <BaseLayout
      header={<Header />}
      footer={<Footer />}
    >
      {children}
      {modal}
    </BaseLayout>
  )
}
