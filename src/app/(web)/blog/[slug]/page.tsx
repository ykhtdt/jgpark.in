import Link from "next/link"

import { getDocuments, getDocumentBySlug } from "outstatic/server"
import { compareDesc, format, parseISO } from "date-fns"
import { allPosts, Post } from "contentlayer/generated"

interface Props {
  params: {
    slug: string;
  }
}

const Page = ({ params }: Props) => {
  // const post = getDocumentBySlug("posts", params.slug, [
  //   "title",
  //   "author",
  //   "slug",
  //   "description",
  //   "coverImage",
  //   "content",
  // ])
  const post: Post | undefined = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) {
    return (
      <div>
        Not Found
      </div>
    )
  }

  return (
    <main>
      <article className="grid items-center md:py-8 py-4 gap-9 pb-10 md:pb-12">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <time dateTime={post.publishedAt} className="block text-sm text-zinc-500">
              {format(parseISO(post.publishedAt), "LLLL d, yyyy")}
            </time>
            <h1 className="text-3xl font-bold">
              {post.title}
            </h1>
            <p className="text-muted-foreground font-normal">
              {post.description}
            </p>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </article>
    </main>
  )
}

export default Page