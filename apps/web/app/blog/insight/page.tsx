import { BlogInsightPage } from "@/pages/blog"
import { getAllPostsWithExample } from "@/features/blog"

export default async function Page() {
  const posts = getAllPostsWithExample("insight")

  return (
    <BlogInsightPage posts={posts} />
  )
}
