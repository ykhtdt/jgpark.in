import { PageNotFound } from "@workspace/core/widgets/feedback"

import { BaseLayout } from "@/widgets/layout"
import { Footer } from "@/widgets/footer"
import { Header } from "@/widgets/header"

export default function NotFound() {
  return (
    <BaseLayout
      header={<Header />}
      footer={<Footer />}
    >
      <PageNotFound />
    </BaseLayout>
  )
}
