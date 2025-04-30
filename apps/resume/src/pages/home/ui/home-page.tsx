import type { PostFrontmatter } from "@/entities/blog"

import { Fragment } from "react"

import { Header } from "@/widgets/header"
import { ResumeFrontmatter } from "@/widgets/blog-post"
import { MDXComponents } from "@/features/markdown"
import { Container } from "@/shared/ui"

import "@/app/styles/print.css"

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
        <ResumeFrontmatter frontmatter={frontmatter} />
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
