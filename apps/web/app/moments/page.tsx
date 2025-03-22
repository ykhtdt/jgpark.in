import { MomentsPage } from "@/pages/moments"

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function Page({
  searchParams,
}: PageProps) {
  const { page } = await searchParams

  return (
    <MomentsPage pageIndex={page} />
  )
}
