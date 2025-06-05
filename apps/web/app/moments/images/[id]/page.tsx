import { notFound } from "next/navigation"

import { MomentsDetailPage } from "@/pages/moments"
import { fetchImageById } from "@/entities/storage"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({
  params,
}: PageProps) {
  const { id } = await params

  const image = await fetchImageById(id)

  if (!image) {
    notFound()
  }

  return (
    <MomentsDetailPage image={image} />
  )
}
