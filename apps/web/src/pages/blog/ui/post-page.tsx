import { MDXComponents } from "@/shared/ui"
import {
  Frontmatter,
  Giscus,
  TableOfContent,
} from "@/widgets/blog-post"

interface BlogPostPageProps {
  frontmatter: {
    publishedAt: string
    title: string
    description: string
  }
  content: string
}

export const BlogPostPage = ({
  frontmatter,
  content,
}: BlogPostPageProps) => {

  return (
    <main className="relative">
      <TableOfContent content={content} />
      <div className="flex flex-col gap-6 sm:gap-10">
        <Frontmatter frontmatter={frontmatter} />
        <article>
          <MDXComponents source={content} />
        </article>
        <Giscus />
      </div>
    </main>
  )
}
