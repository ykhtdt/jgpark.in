import type { Post } from "@/entities/blog"

import Link from "next/link"

import { format, parseISO } from "date-fns"

interface BlogInsightPageProps {
  posts: Post[]
}

export const BlogInsightPage = ({
  posts,
}: BlogInsightPageProps) => (
  <main className="relative flex-1">

    {/* Intro */}
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <div className="h-4 w-0.5 bg-gradient-to-b from-orange-500 to-red-600 mr-2" />
        <h1 className="text-base font-bold tracking-wider">
          잿불
        </h1>
      </div>
      <p className="text-sm/6 text-zinc-500 dark:text-zinc-400">
        때로는 시간이 지나면서 털어내야 할 감정과 기억이 있지만, 때로는 시간이 흘러도 되돌아보며 배워야 하는 것이 있습니다.
      </p>
    </div>

    {/* Posts */}
    <div className="space-y-3">
      {posts.map((post) => (
        <article key={post.slug}>
          <Link href={`/blog/insight/${post.slug}`} className="block border border-zinc-300 dark:bg-zinc-950/50 dark:border-zinc-800 shadow-md rounded-xs py-3 px-4">
            <div className="flex mb-2">
              <time dateTime={post.frontmatter.publishedAt} className="text-xs text-zinc-500 dark:text-zinc-400">
                {format(parseISO(post.frontmatter.publishedAt), "yyyy년 MM월 dd일")}
              </time>
            </div>
            <h2 className="truncate text-base font-semibold">
              {post.frontmatter.title}
            </h2>
            <p className="truncate mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {post.frontmatter.description}
            </p>
          </Link>
        </article>
      ))}

      {posts.length === 0 && (
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-8">
          아직 작성된 글이 없습니다.
        </p>
      )}
    </div>

  </main>
)
