import Link from "next/link"

import { SupabaseClient } from "@supabase/supabase-js"

import { supabase } from "@/lib/supabaseclient"

import { Separator } from "@/components/ui/separator"
import { ImageWithPlaceholder } from "@/components/image/image-with-placeholder"

interface FileObject {
  name: string;
  [key: string]: any;
}

interface SignedUrlData {
  signedUrl: string;
}

interface SignedUrlResponse {
  data: SignedUrlData | null;
  error: Error | null;
}

interface ListResponse {
  data: FileObject[] | null;
  error: Error | null;
}

interface FileWithSignedUrl {
  id: number;
  name: string;
  signedUrl: string;
}

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
              {images.map((image, index) => (
                <Link
                  href={`/moments/?imageId=${image.id}`}
                  as={`/moments/i/${image.id}`}
                  key={image.name}
                  className="relative w-[calc(50%-1.25rem)] sm:w-48 h-auto aspect-square cursor-zoom-in"
                >
                  <ImageWithPlaceholder
                    src={image.signedUrl}
                    alt={image.name}
                    width={192}
                    height={192}
                    loading={index <= 12 ? "eager" : "lazy"}
                    priority={index <= 12 ? true : false}
                    className="absolute w-auto h-auto max-w-[75%] max-h-[75%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}

export default Page