import Link from "next/link"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

const components: MDXRemoteProps["components"] = {
  h1: (props) => (
    <h1 {...props} className="text-zinc-950 dark:text-zinc-50 text-xl font-bold mt-2" />
  ),
  h2: (props) => (
    <h2 {...props} className="text-zinc-950 dark:text-zinc-50 text-lg font-semibold mt-12 first:mt-0" />
  ),
  h3: (props) => (
    <h3 {...props} className="text-zinc-950 dark:text-zinc-50 text-lg font-semibold mt-8" />
  ),
  ol: (props) => (
    <ol {...props} className="list-decimal my-3 pl-6 text-sm" />
  ),
  ul: (props) => (
    <ul {...props} className="list-disc my-3 pl-6 text-sm" />
  ),
  li: (props) => (
    <li {...props} className="my-2 leading-7" />
  ),
  p: (props) => (
    <p {...props} className="text-sm leading-6 [&:not(:first-child)]:mt-4" />
  ),
  a: (props) => (
    <Link {...props} href={props.href || ""} className="font-medium underline underline-offset-4" />
  ),
  strong: (props) => (
    <strong {...props} className="text-zinc-950 dark:text-zinc-50" />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="mt-6 border-l-2 pl-6 italic font-serif text-zinc-900 dark:text-zinc-100"
    />
  ),
}

type Props = Pick<MDXRemoteProps, "source">

export default function MDXComponents(props: Props) {
  return (
    <div className="mdx">
      <MDXRemote
        source={props.source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
          },
        }}
        components={{ ...components }}
      />
    </div>
  )
}