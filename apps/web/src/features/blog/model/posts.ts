import type { Post } from "@/entities/blog"

import fs from "fs"
import path from "path"
import matter from "gray-matter"

export const getPostsByCategory = (category: string): Post[] => {
  const contentDir = path.join(process.cwd(), "content", category)

  if (!fs.existsSync(contentDir)) {
    return []
  }

  const files = fs.readdirSync(contentDir)

  return files
    .filter(file => file.endsWith(".md"))
    .map(file => {
      const filePath = path.join(contentDir, file)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug: file.replace(".md", ""),
        frontmatter: data as Post["frontmatter"],
      }
    })
    .filter(post => post.frontmatter.status === "published")
}

export const getPostByPath = (filePath: string): Post | null => {
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data } = matter(fileContents)

  if (data.status === "published") {
    return {
      slug: path.basename(filePath).replace(".md", ""),
      frontmatter: data as Post["frontmatter"],
    }
  }

  return null
}

export const sortPostsByDate = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.frontmatter.publishedAt).getTime()
    const dateB = new Date(b.frontmatter.publishedAt).getTime()

    return dateB - dateA
  })
}

export const getAllPostsWithExample = (category: string): Post[] => {
  const categoryPosts = getPostsByCategory(category)
  const examplePath = path.join(process.cwd(), "content", "example.md")
  const examplePost = getPostByPath(examplePath)

  const allPosts = [...categoryPosts]

  if (examplePost) {
    allPosts.push(examplePost)
  }

  return sortPostsByDate(allPosts)
}
