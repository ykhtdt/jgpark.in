/**
 * 게시물의 게시 상태
 */
export type PostStatus =
  /**
   * 공개적으로 게시된 상태
   */
  | "published"
  /**
   * 아직 완성되지 않은 초안 상태
   */
  | "draft"
  /**
   * 작성자 또는 특정 권한자만 볼 수 있는 비공개 상태
   */
  | "private"
  /**
   * 더 이상 활성 상태가 아니며, 기록용으로 보관된 상태
   */
  | "archived"

export interface PostFrontmatter {
  status: PostStatus
  title: string
  description: string
  publishedAt: string
  author: {
    name: string
    picture?: string
    github?: string
    email?: string
    phone?: string
  }
}
