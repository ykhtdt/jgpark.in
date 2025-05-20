"use client"

import Link from "next/link"

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@workspace/ui/components/command"

import { useSearch } from "../model/use-search"

export const BlogSearch = () => {
  const { value, onValueChange, result } = useSearch()

  return (
    <Command shouldFilter={false}>
      <CommandInput placeholder="Search" value={value} onValueChange={onValueChange} />
      <CommandList>
        {result.length === 0 ? (
          <CommandEmpty>결과가 없습니다.</CommandEmpty>
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
    </Command>
  )
}
