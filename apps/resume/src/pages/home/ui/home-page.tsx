import { Fragment } from "react"

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
    <Fragment>
      <Header className="print:hidden mx-auto w-full max-w-4xl px-4" />
      <Container className="border print:border-none">
        <TableOfContents content={content} levels={{ topLevel: 2 }} className="print:hidden pt-0 md:pt-0" />
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
              <a href={`mailto:${frontmatter.author.email}`} className="dark:text-muted-foreground">
                {frontmatter.author.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
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
    </Fragment>
  )
}
