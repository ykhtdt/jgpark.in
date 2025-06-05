import { Metadata } from "next"

import { MomentsPage } from "@/pages/moments"

interface PageProps {
  searchParams: Promise<{ page?: string; imageId?: string }>
}

export const metadata: Metadata = {
  title: "Moments | JGPARK",
  description: "하루의 빛, 스치는 풍경, 사소한 감정들. 순간을 담는 기록들을 모아둔 공간입니다.",
}

export const revalidate = 3600

export default async function Page({
  searchParams,
}: PageProps) {
  const { page } = await searchParams

  return (
    <MomentsPage pageIndex={page} />
  )
}
