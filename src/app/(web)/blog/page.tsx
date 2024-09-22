import { Fragment } from "react"
import Link from "next/link"

import { getDocuments, getCollections } from "outstatic/server"
import { format, parseISO, getYear } from "date-fns"

import { Separator } from "@/components/ui/separator"

async function getData() {
  // const collections = getCollections()

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
      <article className="grid items-center gap-9 py-4 pb-10 md:py-8 md:pb-12">
        <header className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            Blog
          </h1>
          <p className="text-sm leading-8">
            Learning history
          </p>
        </header>
        <Separator />
        <div className="flex flex-col gap-4">
          {sortedPostsKeys.map((year) => (
            <section key={year} className="flex flex-col gap-2">
              <h2 className="font-medium">
                {year}
              </h2>
              <div className="ml-4 flex flex-col gap-2 border-l pl-4">
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
