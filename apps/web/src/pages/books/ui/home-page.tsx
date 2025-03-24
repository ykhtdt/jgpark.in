"use client"

import { Fragment } from "react"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

interface BookReview {
  id: string
  title: string
  author: string
  startDate?: string
  endDate?: string
  reviewDate?: string
  coverImage: string
  summary: string
  status: "not_started" | "reading" | "finished"
}

const mockReviews: BookReview[] = [
  {
    id: "1",
    title: "코스모스",
    author: "칼 세이건",
    startDate: "2025-03-25",
    coverImage: "/images/books/cosmos.jpg",
    summary: "코스모스는 과거에 있었고, 현재에 있으며, 미래에 있을 그 모든 것이다.",
    status: "reading",
  },
]

export const BooksHomePage = () => {
  return (
    <Fragment>

      {/* Intro */}
      <div className="mb-8">
        <h1 className="text-base font-bold tracking-wider mb-2">
          서재에 머무는 시간
        </h1>
        <p className="text-sm/6 text-zinc-500 dark:text-zinc-400">
          책을 펼치면, 시간은 잠시 멈춥니다.
          <br />
          읽어 내려간 문장들은 나의 과거와 현재를 이어 주고, 서재는 그렇게 쌓인 시간과 이야기를 고요히 품습니다.
        </p>
      </div>

      {/* Reviews */}
      <ul className="flex flex-col gap-3">
        {mockReviews.map((review) => (
          <li key={review.id} className="group flex flex-col sm:flex-row gap-6 py-4">
            <div className="flex-shrink-0">
              <div className="w-36 h-48 bg-zinc-200/25 dark:bg-zinc-800/75 shadow-sm hover:shadow-md transition-all p-3 rounded-xs">
                <div className="relative w-full h-full overflow-hidden rounded-xs">
                  <Image
                    src={review.coverImage}
                    alt={`${review.title} 표지`}
                    fill
                    sizes="(max-width: 640px) 144px, 144px"
                    loading="lazy"
                    className={cn(
                      "object-cover duration-300 group-hover:scale-110 transition-all",
                      {
                        "filter grayscale-25 brightness-95 group-hover:filter-none": review.status !== "finished"
                      },
                    )}
                  />
                  {review.status !== "finished" && (
                    <div className="absolute top-0 right-0 m-2">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        {
                          "bg-blue-600 text-white": review.status === "reading",
                          "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200": review.status === "not_started"
                        }
                      )}>
                        {review.status === "reading" ? "읽는 중" : "읽기 전"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-semibold">
                {review.title}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {review.author}
              </p>
              <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                {review.status === "not_started" ? (
                  <span>아직 읽지 않은 책입니다</span>
                ) : (
                  <>
                    <span>
                      읽은 기간: {review.startDate} {review.status === "reading" ? "~ 현재" : `~ ${review.endDate}`}
                    </span>
                    {review.status === "finished" && (
                      <span className="ml-3">
                        작성일: {review.reviewDate}
                      </span>
                    )}
                  </>
                )}
              </div>
              <p className="mt-3 text-sm">
                {review.summary}
              </p>
              {review.status === "finished" ? (
                <Link href="#" className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                  후기 읽기 →
                </Link>
              ) : (
                <span className="mt-2 text-sm text-zinc-400 dark:text-zinc-500">
                  {review.status === "reading" ? "독서 진행 중..." : "독서 예정..."}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {mockReviews.length === 0 && (
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-8">
          아직 작성된 글이 없습니다.
        </p>
      )}

    </Fragment>
  )
}
