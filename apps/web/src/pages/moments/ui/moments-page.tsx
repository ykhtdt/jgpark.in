"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useQuery } from "@tanstack/react-query"

import { fetchImagesWithPagination } from "@/entities/storage"
import { MomentsGrid } from "./moments-grid"
import { MomentsPagination } from "./moments-pagination"
import {
  PaginationSkeleton,
  MomentsGridSkeleton,
} from "./moments-skeleton-grid"

// 한 페이지에 표시할 이미지 개수
const IMAGES_PER_PAGE = 12
// Supabase 버킷 이름
const BUCKET_NAME = "jgpark.in"
// Supabase 버킷 폴더
const FOLDER_PATH = "moments"

interface MomentsPageProps {
  pageIndex?: string
}

export const MomentsPage = ({
  pageIndex,
}: MomentsPageProps) => {
  const router = useRouter()
  const currentPage = pageIndex ? parseInt(pageIndex) : 1

  useEffect(() => {
    const isInvalidUrlParameter = pageIndex && (isNaN(parseInt(pageIndex)) || parseInt(pageIndex) < 1)

    if (isInvalidUrlParameter) {
      router.replace("/moments")
    }
  }, [pageIndex, router])

  const { data, isLoading, isError } = useQuery({
    queryKey: ["moments", currentPage],
    queryFn: async () => {
      const offset = (currentPage - 1) * IMAGES_PER_PAGE
      return await fetchImagesWithPagination(BUCKET_NAME, FOLDER_PATH, {
        limit: IMAGES_PER_PAGE,
        offset: offset,
        sortBy: "created_at",
        sortOrder: "desc"
      })
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  })

  const files = data?.files || null
  const totalCount = data?.totalCount || 0
  const totalPages = Math.ceil(totalCount / IMAGES_PER_PAGE)

  return (
    <>
      {/* Intro */}
      <div className="mb-8">
        <h1 className="text-base font-bold tracking-wider mb-2">
          순간을 담는 기록
        </h1>
        <p className="text-sm/6 text-zinc-500 dark:text-zinc-400">
          하루의 빛, 스치는 풍경, 사소한 감정들. 매일의 순간들이 모여 시간의 조각을 만들어갑니다.
          <br />
          한 장의 사진은 그날의 기억을 조용히 담아내고, 쌓인 순간들은 나만의 이야기가 됩니다.
        </p>
      </div>

      <div className="flex flex-col min-h-[calc(100vh-240px)]">
        {isLoading ? (
          <MomentsGridSkeleton imagesPerPage={IMAGES_PER_PAGE} />
        ) : isError ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">
              이미지를 불러오는 중 오류가 발생했습니다.
            </p>
          </div>
        ) : (
          <MomentsGrid files={files} currentPage={currentPage} imagesPerPage={IMAGES_PER_PAGE} />
        )}

        <div className="pagination-container">
          {isLoading ? (
            <PaginationSkeleton />
          ) : totalPages > 0 ? (
            <MomentsPagination currentPage={currentPage} totalPages={totalPages} />
          ) : null}
        </div>
      </div>
    </>
  )
}
