"use client"

import type { PropsWithChildren } from "react"

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
})

export const ReactQueryProvider = ({
  children,
}: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
