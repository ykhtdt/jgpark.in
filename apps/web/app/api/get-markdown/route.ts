import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface Frontmatter {
  publishedAt: string
  title: string
  description: string
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get("slug")

  if (!slug) {
    return new Response("Slug is required", { status: 400 })
  }

  const filePath = path.join(process.cwd(), "content", `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return new Response("File not found", { status: 404 })
  }

  const fileContents = fs.readFileSync(filePath, "utf8")

  const { data, content } = matter(fileContents)

  return new Response(
    JSON.stringify({
      frontmatter: data as Frontmatter,
      content,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}
