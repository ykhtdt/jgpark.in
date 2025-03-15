import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface Frontmatter {
  publishedAt: string
  title: string
  description: string
}

export function getMarkdownContent(slug: string) {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return undefined
  }

  const fileContents = fs.readFileSync(filePath, "utf8")

  const { data, content } = matter(fileContents)

  return {
    frontmatter: data as Frontmatter,
    content,
  }
}
