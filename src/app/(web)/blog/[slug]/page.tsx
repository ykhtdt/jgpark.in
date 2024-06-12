import { notFound } from "next/navigation"

import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server"
import { format, parseISO } from "date-fns"

import MDXComponents from "@/components/mdx/mdx-components"

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

  return (
    <main>
      <div className="grid items-center md:py-8 py-4 gap-9 pb-10 md:pb-12">
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