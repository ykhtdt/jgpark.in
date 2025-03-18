// import fs from "fs"
// import path from "path"
// import matter from "gray-matter"

// import { Post, PostStatus } from "@/entities/blog"
import { BlogHomePage } from "@/pages/blog"

// const getAllMarkdownFiles = (dir: string): string[] => {
//   const dirents = fs.readdirSync(dir, { withFileTypes: true })

//   const files = dirents.map(dirent => {
//     const res = path.join(dir, dirent.name)
//     return dirent.isDirectory() ? getAllMarkdownFiles(res) : res
//   })

//   return Array.prototype.concat(...files)
// }

// const getPostListByStatus = async (status: PostStatus = "published"): Promise<Post[]> => {
//   const contentDir = path.join(process.cwd(), "content")

//   const allFiles = getAllMarkdownFiles(contentDir)

//   const mdFiles = allFiles
//     .filter(file => file.endsWith(".md"))
//     .filter(file => !file.includes(path.join(contentDir, "guide")))

//   const posts = mdFiles
//     .map(file => {
//       const fileContent = fs.readFileSync(file, "utf8")

//       const { data } = matter(fileContent)

//       const postStatus = (data.status || "draft") as PostStatus

//       const relativePath = path.relative(contentDir, file)
//       const slug = relativePath.replace(/\.md$/, "")

//       return {
//         slug,
//         frontmatter: {
//           ...data,
//           status: postStatus
//         }
//       } as Post
//     })
//     .filter(post => post.frontmatter.status === status)
//     .sort((a, b) => {
//       return new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime()
//     })

//   return posts
// }

export default async function Page() {
  // const posts = await getPostListByStatus()

  return (
    <BlogHomePage />
  )
}
