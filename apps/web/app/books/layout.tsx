import { BaseLayout } from "@/app/layouts"

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
