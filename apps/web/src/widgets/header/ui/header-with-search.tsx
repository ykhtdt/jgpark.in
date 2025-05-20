import { getSearchablePosts } from "@/entities/blog"

import { Header } from "./header"

export const HeaderWithSearch = async () => {
  const posts = getSearchablePosts()

  return (
    <Header posts={posts} />
  )
}
