import { type SearchablePost } from "@/entities/blog"

export const fetchSearchablePosts = async (): Promise<SearchablePost[]> => {
  try {
    const response = await fetch("/api/search")

    if (!response.ok) {
      throw new Error(`HTTP Error status: ${response.status}`)
    }

    const data = await response.json() as SearchablePost[]

    return data

  } catch (error) {
    throw Error("Blog post search api error: " + String(error))
  }
}
