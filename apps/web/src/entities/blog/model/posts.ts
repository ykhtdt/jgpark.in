import fs from "fs"
import path from "path"
import matter from "gray-matter"

import type { Post } from "@workspace/core/entities/post"

import {
  ValidCategory,
  BLOG_CATEGORIES,
} from "./categories"

export const getPostsByCategory = (category: string): Post[] => {
  const contentDir = path.join(process.cwd(), "content", "blog", category)

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
  const examplePath = path.join(process.cwd(), "content", "blog", "example.md")
  const examplePost = getPostByPath(examplePath)

  const allPosts = [...categoryPosts]

  if (examplePost) {
    allPosts.push(examplePost)
  }

  return sortPostsByDate(allPosts)
}

export const getAllPosts = (): Array<Post & { category: string }> => {
  const categories = Object.keys(BLOG_CATEGORIES) as ValidCategory[]

  const allPosts = categories.flatMap((category) => {
    const posts = getPostsByCategory(category)
    return posts.map(post => ({
      ...post,
      category
    }))
  })

  return sortPostsByDate(allPosts as any) as Array<Post & { category: string }>
}

export interface SearchablePost {
  slug: string
  title: string
  category: string
}

export const getSearchablePosts = (): SearchablePost[] => {
  const posts = getAllPosts()

  return posts.map(post => ({
    slug: post.slug,
    title: post.frontmatter.title,
    category: post.category
  }))
}
