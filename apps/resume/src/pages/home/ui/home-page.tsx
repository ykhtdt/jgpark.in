import type { PostFrontmatter } from "@/entities/blog"

import { PrintLayout } from "@/app/layouts"
import { MDXComponents } from "@/features/markdown"

interface HomePageProps {
  frontmatter: PostFrontmatter
  content: string
}

export const HomePage = ({
  frontmatter,
  content,
}: HomePageProps) => {
  console.log(frontmatter)

  return (
    <PrintLayout>
      <div className="flex flex-col gap-6 sm:gap-10">
        <article>
          <MDXComponents source={content} />
        </article>
      </div>
    </PrintLayout>
  )
}
