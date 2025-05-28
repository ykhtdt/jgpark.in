"use client"

import { useEffect } from "react"

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center h-dvh px-2">
      <section className="flex flex-col gap-4">
        <h1 className="text-center">
          <span className="font-bold text-2xl sm:text-3xl">
            이력서를 불러올 수 없습니다
          </span>
          <span className="flex justify-center mt-8">
            <span className="inline-flex h-1 w-16 max-w-full bg-gradient-to-r from-orange-500 to-50% to-red-600" />
          </span>
        </h1>
        <p className="text-center text-xs/5 sm:text-sm/6 font-normal text-foreground dark:text-muted-foreground">
          소유자가 이력서를 업데이트하는 중입니다.
        </p>
      </section>
    </div>
  )
}
