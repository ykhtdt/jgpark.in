import Link from "next/link"

import { BaseLayout } from "@/app/layouts"

export const HomePage = () => {
  return (
    <BaseLayout>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          박종광
        </h1>
        <h2 className="text-base font-medium tracking-tight mt-3">
          프론트엔드 엔지니어
        </h2>
        <div className="h-px w-16 bg-zinc-300 dark:bg-zinc-700 my-3 sm:my-4" />
        <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-400">
          미니멀리즘, 단순성, 향상된 UX를 위해.
        </p>

        <nav className="mt-8 sm:mt-10">
          <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <li>
              <Link href="/blog" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                블로그
              </Link>
            </li>
            <li>
              <Link href="/moments" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                순간
              </Link>
            </li>
            <li>
              <Link href="/books" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                도서
              </Link>
            </li>
            <li>
              <Link href="/resume" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                이력서
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </BaseLayout>
  )
}
