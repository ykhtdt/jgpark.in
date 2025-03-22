import { supabase } from "@/shared/api"

export function getImageUrl(bucketName: string, filePath: string) {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)

  return data.publicUrl
}

