import { notFound } from "next/navigation"

import { getMarkdownContent } from "@/shared/lib"
import { MDXComponents } from "@/shared/ui"
import { Frontmatter, Giscus } from "@/widgets/blog-post"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params
  const post = getMarkdownContent(slug)

  if (!post) {
    notFound()
  }

  const { content, frontmatter } = post

  return (
    <main className="relative mx-auto w-full max-w-3xl p-4 mb-8">
      <div className="flex flex-col gap-6 sm:gap-10">
        <Frontmatter frontmatter={frontmatter} />
        <article>
          <MDXComponents source={content} />
        </article>
        <Giscus />
      </div>
    </main>
  )
}

export function generateStaticParams() {
  return [{ slug: "example" }]
}

export const dynamicParams = false
