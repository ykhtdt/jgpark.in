"use client"

import { useQuery } from "@tanstack/react-query"

import { StorageFile, fetchImageById } from "@/entities/storage"

interface UseMomentsDetailsResult {
  image: StorageFile | null
  isLoading: boolean
  error: Error | null
}

export function useMomentsDetail(id: string): UseMomentsDetailsResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["moments", id],
    queryFn: () => fetchImageById(id),
    refetchOnWindowFocus: false,
  })

  return {
    image: data || null,
    isLoading,
    error: error,
  }
}
