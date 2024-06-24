"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

const COMMENTS_ID = "comments"

export default function Giscus() {
  const { theme } = useTheme()

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
      "data-theme": theme === "dark" ? "noborder_gray" : "light",
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
  }, [theme])

  return (
    <section>
      <div id={COMMENTS_ID} />
    </section>
  )
}