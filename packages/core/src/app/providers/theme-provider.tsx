"use client"

import { type PropsWithChildren } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps {
  defaultTheme?: "system" | "light" | "dark"
}

export const ThemeProvider = ({
  defaultTheme = "system",
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  )
}
