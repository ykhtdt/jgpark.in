import { BaseLayout } from "@/widgets/layout"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  )
}
