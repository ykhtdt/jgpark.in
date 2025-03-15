import fs from "fs"
import path from "path"
import matter from "gray-matter"

export function getMarkdownContent(slug: string) {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return { content: "파일을 찾을 수 없습니다." }
  }

  const fileContents = fs.readFileSync(filePath, "utf8")

  const { data, content } = matter(fileContents)

  return { frontmatter: data, content }
}
