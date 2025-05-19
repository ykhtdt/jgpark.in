import Link from "next/link"

import { BaseLayout } from "@/widgets/layout"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"

export const HomePage = () => {
  return (
    <BaseLayout header={<Header />} footer={<Footer />}>

      {/* Intro */}
      <div className="flex flex-col gap-y-12">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">
            박종광
          </h1>
          <h2 className="text-base font-medium mt-4">
            프론트엔드 엔지니어
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            넓은 우주를 꿈꾸며, 작은 별에 나만의 의미를 담는 사람
          </p>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/blog" className="text-sm font-medium hover:underline hover:underline-offset-4">
                블로그
              </Link>
            </li>
          </ul>
        </nav>
      </div>

    </BaseLayout>
  )
}
