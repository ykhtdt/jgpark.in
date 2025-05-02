import type { PostFrontmatter } from "@/entities/blog"

interface FrontmatterProps {
  frontmatter: PostFrontmatter
}

export const ResumeFrontmatter = ({
  frontmatter,
}: FrontmatterProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
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
