import { MomentsDetailPage } from "@/pages/moments"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({
  params,
}: PageProps) {
  const { id } = await params

  return (
    <MomentsDetailPage id={id} />
  )
}
