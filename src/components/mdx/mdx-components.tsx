import Link from "next/link"
import Image, { ImageProps } from "next/image"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"

const components: MDXRemoteProps["components"] = {
  h1: (props) => (
    <h1 {...props} className="text-xl font-bold">{props.children}</h1>
  ),
  h2: (props) => (
    <h2 {...props} className="text-lg font-semibold">{props.children}</h2>
  ),
  h3: (props) => (
    <h3 {...props} className="text-lg font-semibold">{props.children}</h3>
  ),
  ol: (props) => (
    <ol {...props} className="list-decimal my-3 pl-6">{props.children}</ol>
  ),
  ul: (props) => (
    <ul {...props} className="list-disc my-3 pl-6">{props.children}</ul>
  ),
  li: (props) => (
    <li {...props} className="my-2">{props.children}</li>
  ),
  p: (props) => (
    <p {...props} className="text-sm leading-6">{props.children}</p>
  ),
  a: (props) => (
    <Link {...props} href={props.href || ""} className="font-medium underline underline-offset-4">{props.children}</Link>
  ),
}

export default function MDXComponents(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}