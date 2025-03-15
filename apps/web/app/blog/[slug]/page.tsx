import { notFound } from "next/navigation"

import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { MDXComponents } from "@/shared/ui"
import {
  Frontmatter,
  Giscus,
  TableOfContent,
} from "@/widgets/blog-post"

interface PageProps {
  params: Promise<{ slug: string }>
}

interface Frontmatter {
  publishedAt: string
  title: string
  description: string
}

const getMarkdownContent = async (slug: string) => {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return undefined
  }

  const fileContents = fs.readFileSync(filePath, "utf8")

  const { data, content } = matter(fileContents)

  return {
    frontmatter: data as Frontmatter,
    content,
  }
}

// const fetchMarkdown = async (slug: string) => {
//   const res = await fetch(`${process.env.APP_URL}/api/get-markdown?slug=${slug}`)

//   if (!res.ok) {
//     throw new Error("Failed to fetch markdown")
//   }

//   const data = await res.json()

//   return data
// }

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params
  const post = await getMarkdownContent(slug)

  if (!post) {
    notFound()
  }

  const { content, frontmatter } = post

  return (
    <main className="relative mx-auto w-full max-w-3xl p-4 mb-8">
      <TableOfContent content={content} />
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
