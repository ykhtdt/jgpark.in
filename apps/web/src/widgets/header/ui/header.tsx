"use client"

import Link from "next/link"

import { useTheme } from "next-themes"

import {
  MoonIcon,
  SunIcon,
  GitHubLogoIcon,
  EnvelopeOpenIcon,
} from "@radix-ui/react-icons"

import { Button } from "@workspace/ui/components/button"

export const Header = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="py-4">
      <div className="flex h-16 w-full items-center justify-between">
        <Link href="/" className="font-bold">
          JGPARK
        </Link>
        <nav>
          <ul className="flex items-center gap-x-5 text-sm [&>li]:flex">
            <li>
              <Button asChild className="size-5 border-none bg-inherit p-0 text-foreground shadow-none hover:bg-inherit focus:outline-none focus-visible:ring-0">
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
              <Button asChild className="size-5 border-none bg-inherit p-0 text-foreground shadow-none hover:bg-inherit focus:outline-none focus-visible:ring-0">
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
    </header>
  )
}
