import type { PostFrontmatter } from "@/entities/blog"

import {
  format,
  parseISO,
} from "date-fns"

interface FrontmatterProps {
  frontmatter: PostFrontmatter
}

export const ResumeFrontmatter = ({
  frontmatter,
}: FrontmatterProps) => {
  console.log(frontmatter)
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">
          {frontmatter.title}
        </h1>
        <p className="font-normal dark:text-muted-foreground">
          {frontmatter.description}
        </p>
      </div>
      <ul className="flex flex-col space-y-px text-sm">
        <li className="flex items-center gap-2">
          <span className="font-bold">
            Email
          </span>
          <a href={`mailto:${frontmatter.email}`} className="dark:text-muted-foreground">
            {frontmatter.email}
          </a>
        </li>
        <li className="flex items-center gap-2">
          <span className="font-bold">
            Github
          </span>
          <a href={frontmatter.github} target="_blank" rel="noopener noreferrer" className="dark:text-muted-foreground">
            {frontmatter.github}
          </a>
        </li>
      </ul>
    </div>
  )
}

export const BlogPostFrontmatter = ({
  frontmatter,
}: FrontmatterProps) => {
  return (
    <div className="space-y-2">
      <time dateTime={frontmatter.publishedAt} className="block text-sm text-zinc-500">
        {format(parseISO(frontmatter.publishedAt), "LLLL d, yyyy")}
      </time>
      <h1 className="text-2xl font-bold">
        {frontmatter.title}
      </h1>
      <p className="font-normal text-muted-foreground">
        {frontmatter.description}
      </p>
    </div>
  )
}
