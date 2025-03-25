import type { ValidCategory } from "@/entities/blog"

import { notFound } from "next/navigation"

import { BLOG_CATEGORIES } from "@/entities/blog"
import { getAllPostsWithExample } from "@/features/blog"
import { BlogCategoryPage } from "@/pages/blog"

export const generateStaticParams = async () => {
  return Object.keys(BLOG_CATEGORIES).map((category) => ({
    category,
  }))
}

const isValidCategory = (category: string): category is ValidCategory => {
  return category in BLOG_CATEGORIES
}

interface PageProps {
  params: Promise<{
    category: string
  }>
}

const Page = async ({
  params,
}: PageProps) => {
  const { category } = await params

  if (!isValidCategory(category)) {
    notFound()
  }

  const posts = getAllPostsWithExample(category)
  const blogCategory = BLOG_CATEGORIES[category]

  return (
    <BlogCategoryPage
      posts={posts}
      category={blogCategory}
    />
  )
}

export default Page
