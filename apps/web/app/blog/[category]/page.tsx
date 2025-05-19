import { notFound } from "next/navigation"

import { BlogCategoryPage } from "@/pages/blog"
import { getAllPostsWithExample } from "@/features/blog"
import {
  type ValidCategory,
  BLOG_CATEGORIES,
} from "@/entities/blog"

export const generateStaticParams = async () => {
  return (Object.keys(BLOG_CATEGORIES) as ValidCategory[]).map((category) => ({
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

export default async function Page({
  params,
}: PageProps) {
  const { category } = await params

  if (!isValidCategory(category)) {
    notFound()
  }

  const posts = getAllPostsWithExample(category)
  const blogCategory = BLOG_CATEGORIES[category]

  return (
    <BlogCategoryPage posts={posts} category={blogCategory} />
  )
}
