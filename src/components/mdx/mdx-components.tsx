import Link from "next/link"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypePrettyCode, { Options } from "rehype-pretty-code"
import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers"

import MDXCodeBlock from "./mdx-code-block"

interface Props {
  source: MDXRemoteProps['source'];
}

interface RehypePrettyCodeOptions extends Omit<Options, 'theme'> {
  theme: Options['theme'] | 'none';
}

const components: MDXRemoteProps['components'] = {
  a: (props) => (
    <Link {...props} href={props.href || ""} />
  ),
  pre: (props) => <MDXCodeBlock {...props} />
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
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
          },
        }}
        components={{ ...components }}
      />
    </div>
  )
}