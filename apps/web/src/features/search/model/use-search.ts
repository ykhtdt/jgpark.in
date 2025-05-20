"use client"

import { useCallback, useState } from "react"

import { useQuery } from "@tanstack/react-query"

import { fetchSearchablePosts } from "../api/search"

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState("")

  const {
    data = [],
    isLoading,
  } = useQuery({
    queryKey: ["searchablePosts"],
    queryFn: fetchSearchablePosts,
  })

  const filteredPosts = data.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))

  const handleChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  return {
    value: searchValue,
    loading: isLoading,
    onValueChange: handleChange,
    result: filteredPosts,
  }
}
