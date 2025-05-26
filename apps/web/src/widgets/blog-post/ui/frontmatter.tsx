import type { PostFrontmatter } from "@workspace/core/entities/post"

import { format, parseISO } from "date-fns"

interface FrontmatterProps {
  frontmatter: PostFrontmatter
}

export const Frontmatter = ({
  frontmatter,
}: FrontmatterProps) => {
  return (
    <div className="space-y-2">
      <time dateTime={frontmatter.publishedAt} className="block text-sm text-zinc-500">
        {format(parseISO(frontmatter.publishedAt), "LLLL d, yyyy")}
      </time>
      <h1 className="text-2xl font-bold text-emerald-600">
        {frontmatter.title}
      </h1>
      <p className="font-normal text-muted-foreground">
        {frontmatter.description}
      </p>
    </div>
  )
}
