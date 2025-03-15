"use client"

import { useEffect } from "react"

const COMMENTS_ID = "comments"

export function Giscus() {
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
      "data-theme": "noborder_gray",
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
  }, [])

  return (
    <section>
      <div id={COMMENTS_ID} />
    </section>
  )
}
