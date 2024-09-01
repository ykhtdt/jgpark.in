import type {
  FileWithSignedUrl,
  ListResponse,
  SignedUrlResponse,
} from "@/types/moments"

import { SupabaseClient } from "@supabase/supabase-js"

import { supabase } from "@/lib/supabaseclient"

import { Separator } from "@/components/ui/separator"

import { Moments } from "./(components)/moments"

const getImages = async (supabase: SupabaseClient): Promise<FileWithSignedUrl[]> => {
  const { data, error }: ListResponse = await supabase.storage.from("jgpark").list("moments", { limit: 15 })

  if (error) {
    console.log("Error fetching images:", error)
    return []
  } else if (data) {
    const urls = await Promise.all(
      data.map(async (file, index): Promise<FileWithSignedUrl | null> => {
        const { data, error }: SignedUrlResponse = await supabase
          .storage
          .from("jgpark")
          .createSignedUrl(`moments/${file.name}`, 60 * 60)

        if (error) {
          console.error("Error generating signed URL:", error)
          return null
        }

        if (data && data.signedUrl.includes("emptyFolderPlaceholder")) {
          return null
        }

        return data ? {
          id: index + 1,
          name: file.name,
          signedUrl: data.signedUrl
        } : null
      })
    )

    return urls.filter((file): file is FileWithSignedUrl => file !== null)
  } else {
    return []
  }
}

// const getImages = async () => {
//   const response = await fetch(
//     "/api/moments",
//     // {
//     //   next: {
//     //     revalidate: 60,
//     //   }
//     // }
//   )

//   if (!response.ok) {
//     console.log("Error")
//   }

//   const data = await response.json()

//   return data
// }

export const revalidate = 60 * 59

const Page = async () => {
  const images = await getImages(supabase)

  return (
    <main>
      <article className="grid items-center md:py-8 py-4 gap-9 pb-10 md:pb-12">
        <header className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            Moments
          </h1>
          <p className="text-sm leading-8">
            사진을 잘 찍진 않지만...
          </p>
        </header>
        <Separator />
        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-2">
            <h2 className="font-medium">
              Gallery
            </h2>
            <div className="flex flex-wrap gap-5 items-center justify-center">
              <Moments images={images} />
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}

export default Page