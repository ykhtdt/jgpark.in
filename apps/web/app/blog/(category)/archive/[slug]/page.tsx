import type { PostFrontmatter } from "@/entities/blog"

import { notFound } from "next/navigation"

import { promises } from "fs"
import path from "path"
import matter from "gray-matter"

import { BlogPostPage } from "@/pages/blog"

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

const getMarkdownContent = async (slug: string) => {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`)

  try {
    await promises.access(filePath)

    const fileContents = await promises.readFile(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      frontmatter: data as PostFrontmatter,
      content,
    }
  } catch {
    return undefined
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
    <BlogPostPage frontmatter={frontmatter} content={content} />
  )
}
