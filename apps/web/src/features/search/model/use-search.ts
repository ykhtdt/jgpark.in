"use client"

import {
  useCallback,
  useMemo,
  useState,
} from "react"

import { useSuspenseQuery } from "@tanstack/react-query"

import { type SearchablePost } from "@/entities/blog"
import { fetchSearchablePosts } from "../api/search"

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState("")

  const { data } = useSuspenseQuery({
    queryKey: ["searchablePosts"],
    queryFn: fetchSearchablePosts,
  })

  const filteredPosts = useMemo(() => {
    const normalized = searchValue.toLowerCase().trim()
    return data.filter((post: SearchablePost) =>
      post.title.toLowerCase().includes(normalized)
    )
  }, [searchValue, data])

  const handleChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  return {
    value: searchValue,
    onValueChange: handleChange,
    result: filteredPosts,
  }
}
