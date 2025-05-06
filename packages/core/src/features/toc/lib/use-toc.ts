import type { TableOfContentLevel } from "../model/types"

import {
  useEffect,
  useState,
} from "react"

import throttle from "lodash-es/throttle"

interface UseTocParams {
  levels: TableOfContentLevel
  disable?: boolean
}

export const useToc = ({
  levels,
  disable = false,
}: UseTocParams) => {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    if (disable) {
      return undefined
    }

    const handleScroll = throttle(() => {
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

    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [levels, disable])

  return activeId
}
