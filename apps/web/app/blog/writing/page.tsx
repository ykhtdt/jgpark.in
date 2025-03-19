import { BlogWritingPage } from "@/pages/blog"
import { getAllPostsWithExample } from "@/features/blog"

export default async function Page() {
  const posts = getAllPostsWithExample("writing")

  return (
    <BlogWritingPage posts={posts} />
  )
}
