import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"

const components: MDXRemoteProps["components"] = {
  ol: (props) => (
    <ol {...props} className="list-decimal mt-8 ml-8">{props.children}</ol>
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