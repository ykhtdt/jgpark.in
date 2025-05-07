import type { PostFrontmatter } from "@/entities/post"

import { notFound } from "next/navigation"

import { promises } from "fs"
import path from "path"
import matter from "gray-matter"

import { HomePage } from "@/pages/home"

const getMarkdownContent = async () => {
  const filePath = path.join(process.cwd(), "content", "resume", "resume.md")

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

const Page = async () => {
  const post = await getMarkdownContent()

  if (!post) {
    notFound()
  }

  const { content, frontmatter } = post

  return (
    <HomePage frontmatter={frontmatter} content={content} />
  )
}

export default Page
