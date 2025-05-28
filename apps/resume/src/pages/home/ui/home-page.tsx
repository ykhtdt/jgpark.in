import { TableOfContents } from "@workspace/core/widgets/post"
import { type PostFrontmatter } from "@workspace/core/entities/post"
import { MDXComponents } from "@workspace/core/shared/ui"

import "@/app/styles/print.css"
import { Header } from "@/widgets/header"
import { Container } from "@/shared/ui"

interface HomePageProps {
  frontmatter: PostFrontmatter
  content: string
}

export const HomePage = ({
  frontmatter,
  content,
}: HomePageProps) => {
  return (
    <>
      <Header className="print:hidden mx-auto w-full max-w-4xl px-4" />
      <Container className="py-8 print:border-none">
        <TableOfContents content={content} levels={{ topLevel: 2 }} className="print:hidden pt-0 md:pt-0" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-emerald-600 print:text-foreground">
              {frontmatter.title}
            </h1>
            <p className="font-normal">
              {frontmatter.description}
            </p>
          </div>
          <ul className="space-y-2 text-sm list-disc pl-4 marker:text-muted-foreground">
            <li className="space-x-2">
              <span className="font-bold">
                Phone
              </span>
              <span className="dark:text-muted-foreground">
                {frontmatter.author.phone}
              </span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">
                Email
              </span>
              <a href={`mailto:${frontmatter.author.email}`} className="dark:text-muted-foreground">
                {frontmatter.author.email}
              </a>
            </li>
            <li className="space-x-2">
              <span className="font-bold">
                Github
              </span>
              <a href={frontmatter.author.github} target="_blank" rel="noopener noreferrer" className="dark:text-muted-foreground">
                {frontmatter.author.github}
              </a>
            </li>
          </ul>
        </div>
        <div className="flex size-full">
          <div className="flex flex-col gap-6 sm:gap-10">
            <article>
              <MDXComponents source={content} />
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
