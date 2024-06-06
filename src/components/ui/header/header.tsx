"use client"

import Link from "next/link"
import { useTheme } from "next-themes"

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu"

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/posts",
    label: "Posts",
  },
]

const Header = () => {
  const { setTheme } = useTheme()

  return (
    <header className="px-8 py-4 boreder-b">
      <div className="flex justify-between items-center w-full h-16">
        <Link href="/" className="font-bold">
          JGPARK
        </Link>
        <nav>
          <ul className="flex items-center gap-x-5 text-sm [&>li]:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="p-0 w-5 h-5 border-none bg-inherit text-foreground shadow-none focus:outline-none focus-visible:ring-0 hover:bg-inherit">
                    <SunIcon className="h-4 w-h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-4 w-h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">
                      Toggle theme
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header