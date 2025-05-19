import { TableOfContents } from "@workspace/core/widgets/post"
import type { PostFrontmatter } from "@workspace/core/entities/post"

import {
  Frontmatter,
  Giscus,
} from "@/widgets/blog-post"
import { MDXComponents } from "@/features/markdown"

interface BlogPostPageProps {
  frontmatter: PostFrontmatter
  content: string
}

export const BlogPostPage = ({
  frontmatter,
  content,
}: BlogPostPageProps) => {
  return (
    <>
      <TableOfContents content={content} levels={{ topLevel: 2, subLevel: 3 }} />
      <div className="flex flex-col gap-6 sm:gap-10">
        <Frontmatter frontmatter={frontmatter} />
        <article>
          <MDXComponents source={content} />
        </article>
        <Giscus />
      </div>
    </>
  )
}
