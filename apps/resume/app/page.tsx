import { notFound } from "next/navigation"

import { type PostFrontmatter } from "@workspace/core/entities/post"
import { getMarkdownContent } from "@workspace/core/shared/lib"

import { HomePage } from "@/pages/home"

const Page = async () => {
  const post = await getMarkdownContent<PostFrontmatter>(
    ["content", "resume"],
    "resume",
  )

  if (!post) {
    notFound()
  }

  const { content, frontmatter } = post

  return (
    <HomePage frontmatter={frontmatter} content={content} />
  )
}

export default Page
