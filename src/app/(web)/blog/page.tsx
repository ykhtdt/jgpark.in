import { Fragment } from "react"
import Link from "next/link"

import { getDocuments } from "outstatic/server"
import { format, parseISO, getYear } from "date-fns"

import { Separator } from "@/components/ui/separator"

async function getData() {
  const posts = getDocuments("posts", [
    "title",
    "publishedAt",
    "slug",
    "coverImage",
    "description",
    "status"
  ])

  const groupedPosts = posts.reduce((groups, post) => {
    const year = getYear(post.publishedAt)

    if (!groups[year]) {
      groups[year] = []
    }

    groups[year].push(post)
    return groups
  }, {} as Record<number, typeof posts[number][]>)

  return groupedPosts
}

const Page = async () => {
  const posts = await getData()

  const sortedPostsKeys = Object.keys(posts).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <main>
      <article className="grid items-center md:py-8 py-4 gap-9 pb-10 md:pb-12">
        <header className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            Blog
          </h1>
          <p className="text-sm leading-8">
            기술과 문제를 조금 더 깊게 파보며 과정과 결과를 기록합니다.
          </p>
        </header>
        <Separator />
        <div className="flex flex-col gap-4">
          {sortedPostsKeys.map((year) => (
            <section key={year} className="flex flex-col gap-2">
              <h2 className="font-medium text-[#76ABAE]">
                {year}
              </h2>
              <div className="flex flex-col gap-2 border-l border-[#76ABAE] ml-4 pl-4">
                {posts[parseInt(year)].map((post) => (
                  <Fragment key={post.slug}>
                    <article>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="font-semibold">
                          {post.title}
                        </h3>
                        <time dateTime={post.publishedAt} className="mb-1 block text-xs text-zinc-500">
                          {format(parseISO(post.publishedAt), "LLLL d, yyyy")}
                        </time>
                        <p className="text-sm leading-8">
                          {post.description}
                        </p>
                      </Link>
                    </article>
                    <Separator />
                  </Fragment>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}

export default Page