"use client"

import { useEffect } from "react"

import { useTheme } from "next-themes"

const COMMENTS_ID = "comments"

const getCurrentTheme = (theme?: string, systemTheme?: string) => {
  if (systemTheme === "dark") {
    return "noborder_gray"
  }

  if (systemTheme === "light") {
    return "light"
  }

  if (theme === "dark") {
    return "noborder_gray"
  }

  return "light"
}

export function Giscus() {
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const script = document.createElement("script")

    const attributes = {
      "src": "https://giscus.app/client.js",
      "data-repo": "ykhtdt/jgpark.in",
      "data-repo-id": "R_kgDOMEHs3A",
      "data-category": "General",
      "data-category-id": "DIC_kwDOMEHs3M4CgUvD",
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "bottom",
      "data-theme": getCurrentTheme(theme, systemTheme),
      "data-lang": "ko",
      "crossorigin": "anonymous"
    }

    Object.entries(attributes).forEach(
      ([key, value]) => script.setAttribute(key, value)
    )

    script.async = true

    const comments = document.getElementById(COMMENTS_ID)

    if (comments) {
      comments.appendChild(script)
    }

    return () => {
      if (comments) {
        comments.removeChild(script)
      }
    }
  }, [theme, systemTheme])

  return (
    <section>
      <div id={COMMENTS_ID} />
    </section>
  )
}
