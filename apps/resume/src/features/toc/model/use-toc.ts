import type { TableOfContentLevel } from "./types"

import {
  useEffect,
  useState,
} from "react"

import throttle from "lodash-es/throttle"

const minWidthForTOC = 1280

export function useToc(levels: TableOfContentLevel = { topLevel: 2, subLevel: 3 }) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.innerWidth < minWidthForTOC) {
        return
      }

      const selectors = levels.subLevel
        ? [`.mdx h${levels.topLevel}`, `.mdx h${levels.subLevel}`]
        : [`.mdx h${levels.topLevel}`]

      const headings = Array.from(
        document.querySelectorAll<HTMLElement>(selectors.join(", "))
      )

      let currentActiveId = ""

      for (const heading of headings) {
        if (window.scrollY >= heading.offsetTop) {
          if (heading.tagName.toLowerCase() === `h${levels.topLevel}`) {
            currentActiveId = heading.id
          }
          else if (levels.subLevel) {
            currentActiveId = heading.id
          }
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
  }, [levels])

  return activeId
}
