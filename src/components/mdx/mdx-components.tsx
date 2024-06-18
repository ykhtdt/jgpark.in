import Link from "next/link"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
import rehypePrettyCode, { Options } from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug  from "rehype-slug"
import remarkGfm from "remark-gfm"
import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers"

import MDXCodeBlock from "./mdx-code-block"
import MDXHeading from "./mdx-heading"
import MDXLink from "./mdx-link"
import MDXImage from "./mdx-image"

interface Props {
  source: MDXRemoteProps["source"];
}

interface RehypePrettyCodeOptions extends Omit<Options, "theme"> {
  theme: Options["theme"] | "none";
}

const components: MDXRemoteProps["components"] = {
  h2: (props) => <MDXHeading {...props} as="2" />,
  h3: (props) => <MDXHeading {...props} as="3" />,
  pre: (props) => <MDXCodeBlock {...props} />,
  a: (props) => <MDXLink {...props} />,
  img: (props) => <MDXImage {...props} src={props.src || ""} />
}

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: "none",
  transformers: [transformerNotationDiff(), transformerNotationHighlight()],
}

export default function MDXComponents(props: Props) {
  return (
    <div className="mdx">
      <MDXRemote
        source={props.source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions], rehypeAutolinkHeadings, rehypeSlug],
          },
        }}
        components={{ ...components }}
      />
    </div>
  )
}