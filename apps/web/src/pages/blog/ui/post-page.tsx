import type { PostFrontmatter } from "@/entities/blog"

import { Fragment } from "react"

import { MDXComponents } from "@/features/markdown"
import {
  Frontmatter,
  Giscus,
  TableOfContent,
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
    <Fragment>
      <TableOfContent content={content} />
      <div className="flex flex-col gap-6 sm:gap-10">
        <Frontmatter frontmatter={frontmatter} />
        <article>
          <MDXComponents source={content} />
        </article>
        <Giscus />
      </div>
    </Fragment>
  )
}
