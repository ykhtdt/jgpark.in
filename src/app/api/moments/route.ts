import type {
  FileWithSignedUrl,
  ListResponse,
  SignedUrlResponse,
} from "@/types/moments"

import { NextResponse } from "next/server"

import { supabase } from "@/lib/supabaseclient"

export async function GET() {
  const { data, error }: ListResponse = await supabase.storage
    .from("jgpark")
    .list("moments", { limit: 15 })

  if (error) {
    console.error("Error fetching images:", error)
    return NextResponse.json({ error: "이미지 가져오기 실패" }, { status: 500 })
  }

  if (data) {
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

        return data
          ? {
            id: index + 1,
            name: file.name,
            signedUrl: data.signedUrl,
          }
          : null
      })
    )

    const filteredUrls = urls.filter((file): file is FileWithSignedUrl => file !== null)
    return NextResponse.json(filteredUrls, { status: 200 })
  }

  return NextResponse.json([], { status: 200 })
}
