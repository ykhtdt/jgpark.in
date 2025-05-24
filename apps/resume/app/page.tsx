import { type PostFrontmatter } from "@workspace/core/entities/post"
import { getMarkdownContent } from "@workspace/core/shared/lib"

import { HomePage } from "@/pages/home"

export default async function Page() {
  const resume = await getMarkdownContent<PostFrontmatter>(["content"], "resume")

  if (!resume) {
    throw new Error("이력서 파일을 찾을 수 없습니다. 파일 경로를 확인해주세요.")
  }

  const { content, frontmatter } = resume

  return <HomePage frontmatter={frontmatter} content={content} />
}
