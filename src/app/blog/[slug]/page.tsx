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
  const post: Post = allPosts.find((post) => post._raw.flattenedPath === params.slug)!

  console.log(post)
  console.log(post.body.html)

  return (
    <main>
      <div>
        {post.title}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </main>
  )
}

export default Page