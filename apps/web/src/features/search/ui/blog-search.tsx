"use client"

import { useState } from "react"
import Link from "next/link"

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@workspace/ui/components/command"

import { SearchablePost } from "@/entities/blog"

interface SearchProps {
  posts: SearchablePost[]
}

export const BlogSearch = ({
  posts,
}: SearchProps) => {
  const [search, setSearch] = useState("")

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <Command shouldFilter={false}>
      <CommandInput placeholder="Search" value={search} onValueChange={setSearch} />
      <CommandList>
        {filteredPosts.length === 0 ? (
          <CommandEmpty>결과가 없습니다.</CommandEmpty>
        ) : (
          filteredPosts.map((post) => (
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
