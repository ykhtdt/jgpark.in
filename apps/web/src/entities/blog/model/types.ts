export type PostStatus = "published" | "draft" | "private" | "archived"

export interface Post {
  slug: string
  frontmatter: {
    title: string
    description: string
    publishedAt: string
    status: PostStatus
    author: {
      name: string
      picture?: string
    }
    [key: string]: any
  }
}
