"use client"

import Link from "next/link"
import { useTheme } from "next-themes"

import { MoonIcon, SunIcon, GitHubLogoIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

const Header = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="py-4 boreder-b">
      <div className="flex justify-between items-center w-full h-16">
        <Link href="/" className="font-bold">
          JGPARK
        </Link>
        <nav>
          <ul className="flex items-center gap-x-5 text-sm [&>li]:flex">
            <li>
              <Button
                asChild
                className="p-0 w-5 h-5 border-none bg-inherit text-foreground shadow-none focus:outline-none focus-visible:ring-0 hover:bg-inherit"
              >
                <Link
                  href="mailto:jgpark7281@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EnvelopeOpenIcon className="w-4 h-4" />
                  <span className="sr-only">
                    JGPARK Email
                  </span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                className="p-0 w-5 h-5 border-none bg-inherit text-foreground shadow-none focus:outline-none focus-visible:ring-0 hover:bg-inherit"
              >
                <Link
                  href="https://github.com/ykhtdt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubLogoIcon className="w-4 h-4" />
                  <span className="sr-only">
                    JGPARK Github
                  </span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                onClick={handleThemeChange}
                className="p-0 w-5 h-5 border-none bg-inherit text-foreground shadow-none focus:outline-none focus-visible:ring-0 hover:bg-inherit"
              >
                <SunIcon className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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

export default Header