import Link from "next/link"

import {
  format,
  parseISO,
} from "date-fns"

import type { Post } from "@workspace/core/entities/post"

interface BlogCategoryPageProps {
  posts: Post[]
  category: {
    name: string
    path: string
    description: string
    gradient: {
      from: string
      to: string
    }
  }
}

export const BlogCategoryPage = ({
  posts,
  category,
}: BlogCategoryPageProps) => {
  return (
    <div className="flex flex-col gap-8">

      {/* Intro */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <h1 className="text-base font-bold tracking-wider">
            {category.name}
          </h1>
        </div>
        <p className="text-sm/6 text-muted-foreground">
          {category.description}
        </p>
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${category.path}/${post.slug}`} className="block border border-zinc-300 dark:bg-zinc-950/25 dark:border-zinc-800 shadow-md rounded-xs py-3 px-4">
              <div className="flex mb-2">
                <time dateTime={post.frontmatter.publishedAt} className="text-xs text-muted-foreground">
                  {format(parseISO(post.frontmatter.publishedAt), "yyyy년 MM월 dd일")}
                </time>
              </div>
              <h2 className="truncate text-base font-semibold">
                {post.frontmatter.title}
              </h2>
              <p className="truncate mt-1 text-xs text-muted-foreground">
                {post.frontmatter.description}
              </p>
            </Link>
          </article>
        ))}

        {posts.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            아직 작성된 글이 없습니다.
          </p>
        )}
      </div>
    </div>
  )
}
