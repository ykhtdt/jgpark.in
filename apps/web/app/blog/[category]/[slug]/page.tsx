import type {
  PostFrontmatter,
  ValidCategory,
} from "@/entities/blog"

import { notFound } from "next/navigation"

import { promises } from "fs"
import path from "path"
import matter from "gray-matter"

import { BLOG_CATEGORIES } from "@/entities/blog"
import { BlogPostPage } from "@/pages/blog"

export const revalidate = 3600

const getMarkdownContent = async (category: string, slug: string) => {
  const filePath = slug === "example"
    ? path.join(process.cwd(), "content", "blog", "example.md")
    : path.join(process.cwd(), "content", "blog", category as ValidCategory, `${slug}.md`)

  const fileContents = await promises.readFile(filePath, "utf8").catch(() => undefined)

  if (!fileContents) {
    return undefined
  }

  const { data, content } = matter(fileContents)

  return {
    frontmatter: data as PostFrontmatter,
    content,
  }
}

export const generateStaticParams = async () => {
  const categories = Object.keys(BLOG_CATEGORIES)

  const params = await Promise.all(
    categories.map(async (category) => {
      const params = [{ category, slug: "example" }]

      const files = await promises.readdir(path.join(process.cwd(), "content", "blog", category))
        .catch(() => [])

      params.push(
        ...files
          .filter(file => file.endsWith(".md"))
          .map(file => ({ category, slug: file.replace(".md", "") }))
      )

      return params
    })
  )

  return params.flat()
}

interface PageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

const Page = async ({
  params,
}: PageProps) => {
  const { category, slug } = await params

  const post = await getMarkdownContent(category, slug)

  if (!post) {
    notFound()
  }

  const { content, frontmatter } = post

  return (
    <BlogPostPage frontmatter={frontmatter} content={content} />
  )
}

export default Page
