import { Suspense } from "react"

import PostsList from "./posts-list"

const Page = async () => {

  return (
    <main className="text-center pt-16 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">
        All Posts
      </h1>
      <Suspense fallback={<PostsList isLoading />}>
        <PostsList isLoading={false} />
      </Suspense>
    </main>
  )
}

export default Page