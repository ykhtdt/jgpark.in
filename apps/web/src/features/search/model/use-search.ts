"use client"

import { useCallback, useState } from "react"

import { useQuery } from "@tanstack/react-query"

import { fetchSearchablePosts } from "../api/search"
import { type SearchablePost } from "@/entities/blog"

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState("")

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["searchablePosts"],
    queryFn: fetchSearchablePosts,
  })

  const filteredPosts = isSuccess
    ? data.filter((post: SearchablePost) => post.title.toLowerCase().includes(searchValue.toLowerCase()))
    : []

  const handleChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  return {
    value: searchValue,
    loading: isLoading,
    error: isError ? error : null,
    onValueChange: handleChange,
    result: filteredPosts,
  }
}
