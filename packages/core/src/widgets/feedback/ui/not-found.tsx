"use client"

import { useRouter } from "next/navigation"

import { Button } from "@workspace/ui/components/button"

export const PageNotFound = () => {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center flex-1 h-full px-2">
      <section className="flex flex-col gap-4">
        <h1 className="text-center">
          <span className="font-bold text-2xl sm:text-3xl">
            페이지를 찾을 수 없습니다.
          </span>
          <span className="flex justify-center mt-8">
            <span className="inline-flex h-1 w-16 max-w-full bg-gradient-to-r from-orange-500 to-50% to-red-600" />
          </span>
        </h1>
        <p className="text-center text-xs/5 sm:text-sm/6 font-normal text-muted-foreground">
          찾으려는 페이지의 주소가 잘못 입력되었거나,
          <br />
          주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
          <br />
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
        </p>
        <div className="flex justify-center">
          <Button variant="secondary" onClick={() => router.back()} className="cursor-pointer">
            돌아가기
          </Button>
        </div>
      </section>
    </div>
  )
}
