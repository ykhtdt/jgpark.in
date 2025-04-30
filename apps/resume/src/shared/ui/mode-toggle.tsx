"use client"

import {
  useEffect,
  useState,
} from "react"
import { useTheme } from "next-themes"

import {
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

export const ModeToggleDropdown = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-9 border border-border">
          <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
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
  )
}

export const ModeToggle = () => {
  const { theme, systemTheme, setTheme } = useTheme()
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setTheme(isDarkMode ? "dark" : "theme-light")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const mediaQueryList = window.matchMedia("print")

    const handlePrintChange = (event: MediaQueryListEvent) => {
      setIsPrintMode(event.matches)

      if (event.matches) {
        document.documentElement.classList.remove("dark")
      } else {
        const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        document.documentElement.classList[isDark ? "add" : "remove"]("dark")
      }
    }

    setIsPrintMode(mediaQueryList.matches)

    if (mediaQueryList.matches) {
      document.documentElement.classList.remove("dark")
    }

    mediaQueryList.addEventListener("change", handlePrintChange)

    return () => {
      mediaQueryList.removeEventListener("change", handlePrintChange)
    }
  }, [theme])

  useEffect(() => {
    if (!isPrintMode) {
      const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
      document.documentElement.classList[isDark ? "add" : "remove"]("dark")
    }
  }, [theme, isPrintMode])

  const handleClick = () => {
    if (systemTheme === "light" || theme === "light") {
      setTheme("dark")
    } else if (systemTheme === "dark" || theme === "dark") {
      setTheme("light")
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={handleClick} className="cursor-pointer size-5 border-none bg-inherit p-0 text-foreground shadow-none hover:bg-inherit focus:outline-none focus-visible:ring-0">
      <SunIcon className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        Toggle theme
      </span>
    </Button>
  )
}
