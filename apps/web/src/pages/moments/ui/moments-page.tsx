import { Fragment } from "react"

import { fetchImagesWithPagination } from "@/entities/storage"
import { MomentsGrid } from "./moments-grid"
import { MomentsPagination } from "./moments-pagination"

// 한 페이지에 표시할 이미지 개수
const IMAGES_PER_PAGE = 12
// Supabase 버킷 이름
const BUCKET_NAME = "jgpark.in"
// Supabase 버킷 폴더
const FOLDER_PATH = "moments"

interface MomentsPageProps {
  pageIndex?: string
}

export const MomentsPage = async ({ pageIndex }: MomentsPageProps) => {
  const currentPage = pageIndex ? parseInt(pageIndex) : 1

  /**
   * offset이란,
   * 페이지네이션에서 데이터 목록의 시작 위치를 나타낸다.
   * 예를 들어, 페이지 번호가 1일 때, offset은 0이다.
   * 페이지 번호가 2일 때, offset은 12이다.
   * 페이지 번호가 3일 때, offset은 24이다.
   */
  const offset = (currentPage - 1) * IMAGES_PER_PAGE

  const { files, totalCount } = await fetchImagesWithPagination(BUCKET_NAME, FOLDER_PATH, {
    limit: IMAGES_PER_PAGE,
    offset: offset,
    sortBy: "created_at",
    sortOrder: "desc"
  })

  const totalPages = Math.ceil(totalCount / IMAGES_PER_PAGE)

  return (
    <Fragment>

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
        {/* Images */}
        <MomentsGrid files={files} currentPage={currentPage} imagesPerPage={IMAGES_PER_PAGE} />

        {/* Pagination */}
        {totalPages > 0 && (
          <MomentsPagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </Fragment>
  )
}
