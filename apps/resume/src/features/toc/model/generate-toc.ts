import type {
  TableOfContent,
  TableOfContentLevel,
} from "./types"

interface GenerateTocParams {
  content: string
  levels: TableOfContentLevel
}

const HEADING_PATTERN = /^(#{2,3})\s/

const getHeadingInfo = (headingLine: string) => {
  const headingText = headingLine.replace(/^#{2,3}\s*/, "").trim()

  return {
    slug: headingText.replace(/\s/g, "-").toLowerCase(),
    text: headingText
  }
}

export const generateToc = ({
  content,
  levels,
}: GenerateTocParams): TableOfContent[] => {
  const toc = content.split("\n").reduce((tocItems: TableOfContent[], line) => {
    const match = line.match(HEADING_PATTERN)

    if (match && match[1]) {
      const level = match[1].length
      const { slug, text } = getHeadingInfo(line)

      const item: TableOfContent = {
        slug,
        text,
        children: [],
      }

      const isTopLevel = level === levels.topLevel
      const isValidSubLevel = levels.subLevel && level === levels.subLevel && tocItems.length > 0

      if (isTopLevel) {
        tocItems.push(item)
      } else if (isValidSubLevel) {
        tocItems[tocItems.length - 1]?.children.push(item)
      }
    }

    return tocItems
  }, [])

  return toc
}
