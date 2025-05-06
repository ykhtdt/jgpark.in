import type { PostFrontmatter } from "@/entities/blog"

import { Fragment } from "react"

import { TableOfContents } from "@workspace/core/widgets/blog-post"

import { MDXComponents } from "@/features/markdown"
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
    <Fragment>
      <TableOfContents content={content} levels={{ topLevel: 2, subLevel: 3 }} />
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
