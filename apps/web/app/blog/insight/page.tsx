import type { BlogCategory } from "@/entities/blog"

import { BLOG_CATEGORIES } from "@/entities/blog"
import { getAllPostsWithExample } from "@/features/blog"
import { BlogCategoryPage } from "@/pages/blog"

export default function Page() {
  const posts = getAllPostsWithExample("insight")

  return (
    <BlogCategoryPage posts={posts} category={BLOG_CATEGORIES.insight as BlogCategory} />
  )
}
