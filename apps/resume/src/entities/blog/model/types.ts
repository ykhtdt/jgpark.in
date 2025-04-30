export type PostStatus = "published" | "draft" | "private" | "archived"

export interface PostFrontmatter {
  title: string
  description: string
  publishedAt: string
  status: PostStatus
  author: {
    name: string
    picture?: string
  }
  github?: string
  email?: string
  phone?: string
}
