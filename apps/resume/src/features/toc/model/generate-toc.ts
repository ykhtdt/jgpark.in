import type {
  TableOfContent,
  TableOfContentLevel,
} from "./types"

export const generateToc = (
  content: string,
  levels: TableOfContentLevel = { topLevel: 2, subLevel: 3 }
): TableOfContent[] => {
  return content.split("\n").reduce((acc: TableOfContent[], line) => {
    const match = line.match(/^(#{1,3})\s/)

    if (match && match[1]) {
      const level = match[1].length
      const slug = line.replace(/^#{1,3}\s*/, "").trim().replace(/\s/g, "-").toLowerCase()
      const text = line.replace(/^#{1,3}\s*/, "").trim()
      const item: TableOfContent = {
        slug,
        text,
        children: [],
      }

      if (level === levels.topLevel) {
        acc.push(item)
      } else if (levels.subLevel && level === levels.subLevel && acc.length > 0) {
        acc[acc.length - 1]?.children.push(item)
      }
    }

    return acc
  }, [])
}
