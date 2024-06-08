import Link from "next/link"

import { getDocuments } from "outstatic/server"
import { compareDesc, format, parseISO } from "date-fns"
import { allPosts, Post } from "contentlayer/generated"

import { Separator } from "@/components/ui/separator"

const Page = async () => {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
  // const posts = getDocuments("posts", ["title"])

  console.log(posts)

  return (
    <main>
      <section className="grid items-center md:py-8 py-4 gap-9 pb-10 md:pb-12">
        <section className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">
            Blog
          </h1>
          <p className="text-sm leading-8">
            기술과 문제를 조금 더 깊게 파보며 과정과 결과를 기록합니다.
          </p>
        </section>
        <Separator />
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <article key={post.title}>
                <Link href={post.url}>
                  <h2 className="text-lg font-semibold">
                    {post.title}
                  </h2>
                  <time dateTime={post.publishedAt} className="mb-2 block text-xs text-zinc-500">
                    {format(parseISO(post.publishedAt), 'LLLL d, yyyy')}
                  </time>
                  <p className="text-sm leading-8">
                    {post.description}
                  </p>
                  {/* <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} /> */}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default Page