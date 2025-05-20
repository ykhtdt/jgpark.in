"use client"

import { Suspense } from "react"
import Link from "next/link"

import { ErrorBoundary } from "react-error-boundary"

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@workspace/ui/components/command"

import { type SearchablePost } from "@/entities/blog"
import { useSearch } from "../model/use-search"

export const BlogSearch = () => {
  return (
    <Suspense fallback={<LoadingState />}>
      <ErrorBoundary fallbackRender={({ error }) => <ErrorState error={error} />}>
        <BlogSearchCommand />
      </ErrorBoundary>
    </Suspense>
  )
}

const BlogSearchCommand = () => {
  const { value, onValueChange, result } = useSearch()

  return (
    <Command shouldFilter={false} className="min-h-42">
      <CommandInput placeholder="Search" value={value} onValueChange={onValueChange} />
      <SearchResults result={result} />
    </Command>
  )
}

const ErrorState = ({
  error,
}: {
  error: Error | null,
}) => (
  <div className="flex flex-col items-center justify-center gap-2 py-6 text-center min-h-42">
    <p className="text-sm text-destructive">
      검색 중 오류가 발생했습니다.
    </p>
    {error &&
      <p className="text-xs text-muted-foreground">
        {error.message}
      </p>
    }
  </div>
)

const LoadingState = () => (
  <div className="flex items-center justify-center py-6 min-h-42">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-800" />
  </div>
)

const SearchResults = ({
  result,
}: {
  result: SearchablePost[],
}) => {
  const isEmptyResult = result.length === 0

  return (
    <CommandList className="h-[calc(300px-var(--spacing)_*_9)] [&>div]:h-full p-2">
      {isEmptyResult ? (
        <CommandEmpty className="flex items-center justify-center py-6 text-center text-sm h-full">
          결과가 없습니다.
        </CommandEmpty>
      ) : (
        result.map((post) => (
          <CommandItem key={post.slug}>
            <Link href={`/blog/${post.category}/${post.slug}`} className="w-full">
              {post.title}
            </Link>
          </CommandItem>
        ))
      )}
    </CommandList>
  )
}
