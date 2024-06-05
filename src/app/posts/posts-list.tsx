import Link from "next/link"

import { Skeleton } from "@/components/ui/loading/skeleton"

interface Props {
  isLoading: boolean;
}

const PostsList = async ({
  isLoading
}: Props) => {
  const response = await fetch("https://dummyjson.com/posts?limit=10")
  const data = await response.json()

  if (isLoading) {
    const repeat = Array.from({ length: 10 }, (_, i) => i)

    return (
      <ul>
        {repeat.map((item) => (
          <li key={item} className="mb-3">
            <Skeleton className="h-6" />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul>
      {data.posts.map((post) => (
        <li key={post.id} className="mb-3">
          <Link href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostsList