import { ResultAsync } from "neverthrow"

import { type SearchablePost } from "@/entities/blog"

export const fetchSearchablePosts = async (): Promise<SearchablePost[]> => {
  const response = await ResultAsync.fromPromise(
    fetch("/api/search"),
    () => new Error("Blog post search api error"),
  )

  if (response.isErr()) {
    throw response.error
  }

  const data = await response.value.json()

  return data
}
