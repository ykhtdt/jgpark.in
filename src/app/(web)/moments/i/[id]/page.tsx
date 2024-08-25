import type { PageProps } from "@/types/types"

const Page = ({
  params,
}: PageProps<"id">) => {
  const imageId = Number(params.id)

  return (
    <main>
      Image ID: {imageId}
    </main>
  )
}

export default Page