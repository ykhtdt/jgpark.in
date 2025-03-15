import { getMarkdownContent } from "@/shared/lib"
import { MDXComponents } from "@/shared/ui"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params
  const { content, frontmatter } = getMarkdownContent(slug)

  return (
    <article>
      <MDXComponents source={content} />
    </article>
  )
}

export function generateStaticParams() {
  return [{ slug: "example" }]
}

export const dynamicParams = false
