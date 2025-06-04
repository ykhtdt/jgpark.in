import { MomentsDetailPage } from "@/pages/moments"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ImageModalPage({
  params,
}: PageProps) {
  const { id } = await params

  return (
    <MomentsDetailPage id={id} />
  )
}
