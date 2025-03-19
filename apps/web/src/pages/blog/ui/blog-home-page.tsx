import { CircleSmallIcon } from "lucide-react"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"

import Link from "next/link"

export const BlogHomePage = () => (
  <main className="relative">

    {/* Intro */}
    <div className="mb-8">
      <h1 className="text-base font-bold tracking-wider mb-2">
        시간을 새기는 서재 속 한 권의 기록
      </h1>
      <p className="text-sm/6 text-zinc-500 dark:text-zinc-400">
        시계공이 정교한 톱니바퀴를 맞물려 시간을 새기듯, 하나의 기록은 조용히 책장에 꽂혀 또 하나의 시간을 담아냅니다.
        <br />
        매 순간이 페이지가 되고, 그 페이지들이 모여 서재를 채워갑니다.
        차곡차곡 쌓인 기록들은 과거와 현재, 그리고 미래를 이어주는 조용한 증인이 되어줍니다.
      </p>
    </div>

    <ul className="flex flex-col gap-3">
      {/* 숲: 학습 */}
      <li className="group flex items-center gap-2">
        <CircleSmallIcon className="size-2" />
        <div className="flex gap-3">
          <Link href="/blog/writing" className="inline-flex items-center gap-0.5 underline underline-offset-4 decoration-zinc-700">
            <span className="text-sm font-medium tracking-wide">
              숲
            </span>
            <ArrowTopRightIcon className="relative -top-1 size-2.5 text-zinc-700 dark:text-zinc-50" />
          </Link>
          <span className="text-sm/6 text-zinc-500 dark:text-zinc-400">
            학습과 관련된 내용은 <span className="font-medium group-hover:bg-gradient-to-r group-hover:from-lime-500 group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent">“숲”</span>에 기록합니다.
          </span>
        </div>
      </li>

      {/* 파도: 업무 */}
      <li className="group flex items-center gap-2">
        <CircleSmallIcon className="size-2" />
        <div className="flex gap-3">
          <Link href="/blog/archive" className="inline-flex items-center gap-0.5 underline underline-offset-4 decoration-zinc-700">
            <span className="text-sm font-medium tracking-wide">
              파도
            </span>
            <ArrowTopRightIcon className="relative -top-1 size-2.5 text-zinc-700 dark:text-zinc-50" />
          </Link>
          <span className="text-sm/6 text-zinc-500 dark:text-zinc-400">
            업무와 관련된 내용은 <span className="font-medium group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent">“파도”</span>에 기록합니다.
          </span>
        </div>
      </li>

      {/* 잿불: 회고 */}
      <li className="group flex items-center gap-2">
        <CircleSmallIcon className="size-2" />
        <div className="flex gap-3">
          <Link href="/blog/insight" className="inline-flex items-center gap-0.5 underline underline-offset-4 decoration-zinc-700">
            <span className="text-sm font-medium tracking-wide">
              잿불
            </span>
            <ArrowTopRightIcon className="relative -top-1 size-2.5 text-zinc-700 dark:text-zinc-50" />
          </Link>
          <span className="text-sm/6 text-zinc-500 dark:text-zinc-400">
            회고와 관련된 내용은 <span className="font-medium group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-600 group-hover:bg-clip-text group-hover:text-transparent">“잿불”</span>에 기록합니다.
          </span>
        </div>
      </li>
    </ul>

  </main>
)
