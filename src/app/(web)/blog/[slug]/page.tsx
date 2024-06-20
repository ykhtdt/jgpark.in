import Link from "next/link"
import { notFound } from "next/navigation"

import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server"
import { format, parseISO } from "date-fns"

import MDXComponents from "@/components/mdx/mdx-components"
import { generateToc } from "@/lib/mdx"

interface Params {
  params: {
    slug: string;
  }
}

async function getData(slug: string) {
  const post = getDocumentBySlug("posts", slug, [
    "title",
    "publishedAt",
    "description",
    "slug",
    "author",
    "content",
    "coverImage",
    "tags",
  ])

  if (!post) {
    notFound()
  }

  return post
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs("posts")
  return posts.map((slug) => ({ slug }))
}

const Page = async ({ params }: Params) => {
  const post = await getData(params.slug)
  const tableOfContent = generateToc(post.content)

  /**
   * @todo
   * 현재 스크롤 위치에 따라 TOC를 active 시켜야함
   */
  return (
    <main className="relative md:flex md:flex-row">
      <aside className="fixed order-last hidden translate-x-[864px] w-48 pt-4 md:pt-8 xl:flex">
        <ol className="w-full text-muted-foreground text-sm space-y-2">
          {tableOfContent.map((item) => (
            <li key={item.slug} className="space-y-2">
              <Link href={`#${item.slug}`} className="transition-colors hover:text-foreground hover:font-medium">
                {item.text}
              </Link>
              {item.children.length > 0 && (
                <ol className="space-y-2 pl-4">
                  {item.children.map((child) => (
                    <li key={child.slug}>
                      <Link href={`#${child.slug}`} className="transition-colors hover:text-foreground hover:font-medium">
                        {child.text}
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </aside>
      <div className="grid items-center pt-4 gap-9 pb-10 md:pt-8 md:pb-12">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <time dateTime={post.publishedAt} className="block text-sm text-zinc-500">
              {format(parseISO(post.publishedAt), "LLLL d, yyyy")}
            </time>
            <h1 className="text-xl font-bold">
              {post.title}
            </h1>
            <p className="text-muted-foreground font-normal">
              {post.description}
            </p>
          </div>
        </div>
        <article>
          <MDXComponents source={post.content} />
        </article>
      </div>
    </main>
  )
}

export default Page