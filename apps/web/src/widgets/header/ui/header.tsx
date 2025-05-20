"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

import {
  MoonIcon,
  SunIcon,
  GitHubLogoIcon,
  EnvelopeOpenIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@workspace/ui/components/dialog"

import { BlogSearch } from "@/features/search"
import type { SearchablePost } from "@/entities/blog"
import { Logo } from "@/shared/ui"

interface HeaderProps {
  posts?: SearchablePost[]
}

export const Header = ({
  posts,
}: HeaderProps) => {
  const { theme, setTheme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header>
      <div className="flex h-16 w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="size-6" />
          <span className="font-bold text-sm">
            JGPARK
          </span>
        </Link>
        <nav>
          <ul className="flex items-center gap-x-5 text-sm [&>li]:flex">
            {posts && (
              <li>
                <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                  <DialogTitle className="sr-only">Blog Search</DialogTitle>
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer size-5 border-none bg-inherit p-0 text-foreground shadow-none hover:bg-inherit focus:outline-none focus-visible:ring-0">
                      <MagnifyingGlassIcon className="size-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md p-2">
                    <BlogSearch posts={posts} />
                  </DialogContent>
                </Dialog>
              </li>
            )}
            <li>
              <Button asChild className="cursor-pointer size-5 border-none bg-inherit p-0 text-foreground shadow-none hover:bg-inherit focus:outline-none focus-visible:ring-0">
                <Link
                  href="mailto:jgpark7281@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EnvelopeOpenIcon className="size-4" />
                  <span className="sr-only">
                    JGPARK Email
                  </span>
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild className="cursor-pointer size-5 border-none bg-inherit p-0 text-foreground shadow-none hover:bg-inherit focus:outline-none focus-visible:ring-0">
                <Link href="https://github.com/ykhtdt" target="_blank" rel="noopener noreferrer">
                  <GitHubLogoIcon className="size-4" />
                  <span className="sr-only">
                    JGPARK Github
                  </span>
                </Link>
              </Button>
            </li>
            <li>
              <Button onClick={handleThemeChange} className="cursor-pointer size-5 border-none bg-inherit p-0 text-foreground shadow-none hover:bg-inherit focus:outline-none focus-visible:ring-0">
                <SunIcon className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">
                  Toggle theme
                </span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header >
  )
}
