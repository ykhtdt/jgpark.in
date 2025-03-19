import { BlogArchivePage } from "@/pages/blog"
import { getAllPostsWithExample } from "@/features/blog"

export default async function Page() {
  const posts = getAllPostsWithExample("archive")

  return (
    <BlogArchivePage posts={posts} />
  )
}
