import { TableOfContents } from "@workspace/core/widgets/post"
import type { PostFrontmatter } from "@workspace/core/entities/post"
import { MDXComponents } from "@workspace/core/shared/ui"

import {
  Frontmatter,
  Giscus,
} from "@/widgets/blog-post"

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
