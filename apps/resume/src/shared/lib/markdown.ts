import { promises } from "fs"
import path from "path"
import matter from "gray-matter"

export const getMarkdownContent = async <T = {
  [key: string]: any
}>(paths: string[], filename: string) => {
  const filePath = path.join(process.cwd(), ...paths, `${filename}.md`)

  const fileContents = await promises.readFile(filePath, "utf8").catch(() => undefined)

  if (!fileContents) {
    return undefined
  }

  const { data, content } = matter(fileContents)

  return {
    frontmatter: data as T,
    content,
  }
}
