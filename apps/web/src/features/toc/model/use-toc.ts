import { useEffect, useState } from "react"

import throttle from "lodash-es/throttle"

const minWidthForTOC = 1280

export function useToc() {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.innerWidth < minWidthForTOC) {
        return
      }

      const headings = Array.from(
        document.querySelectorAll<HTMLElement>(".mdx h2, .mdx h3")
      )

      let currentActiveId = ""

      for (const heading of headings) {
        if (window.scrollY >= heading.offsetTop) {
          currentActiveId = heading.id
        } else {
          break
        }
      }

      setActiveId(currentActiveId)
    }, 25)

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return activeId
}
