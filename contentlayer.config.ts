import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files"

const Author = defineNestedType(() => ({
  name: "Category",
  fields: {
    name: {
      type: "string", 
      required: true
    },
    picture: {
      type: "string", 
      required: true
    },
  },
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.md",
  fields: {
    title: {
      type: "string",
      required: true
    },
    status: {
      type: "enum",
      options: ["published", "draft"],
      required: true
    },
    author: {
      type: "nested",
      of: Author,
    },
    slug: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    coverImage: {
      type: "string",
    },
    publishedAt: {
      type: "date",
      required: true
    },
  },
  computedFields: {
    url: { type: "string", resolve: (post) => `/blog/${post._raw.flattenedPath}` },
  },
}))

export default makeSource({ contentDirPath: "outstatic/content/posts", documentTypes: [Post] })