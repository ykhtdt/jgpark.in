import Link from "next/link"

const Page = async ({
  params
}: { params: { id: string } }) => {
  const response = await fetch(`https://dummyjson.com/posts/${params.id}`)
  const post = await response.json()

  return (
    <main className="text-center pt-16 px-5">
      <h1 className="text-5xl font-semibold mb-5">
        {post.title}
      </h1>
      <p className="max-w-[750px] mx-auto">
        {post.body}
      </p>
    </main>
  )
}

export default Page