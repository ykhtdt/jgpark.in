import {
  type MDXRemoteProps,
  MDXRemote,
} from "next-mdx-remote-client/rsc"
import rehypePrettyCode, { Options } from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers"

import { MDXCodeBlock } from "./code-block"
import { MDXHeading } from "./heading"
import { MDXLink } from "./link"
import { MDXImage } from "./image"

interface MDXComponentsProps {
  source: MDXRemoteProps["source"]
}

interface RehypePrettyCodeOptions extends Omit<Options, "theme"> {
  theme: Options["theme"] | "none"
}

const components: MDXRemoteProps["components"] = {
  h2: (props) => <MDXHeading {...props} as="2" />,
  h3: (props) => <MDXHeading {...props} as="3" />,
  pre: (props) => <MDXCodeBlock {...props} />,
  a: (props) => <MDXLink {...props} />,
  img: (props) => <MDXImage {...props} src={props.src || ""} />
}

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  /**
   * 테마를 적용하지 않고 커스텀 테마를 적용하기 위해
   * theme: "none"을 했었으나 "none"을 지정하는 경우 구문 강조가 사라지고 [!code hl]과 같이 변경된다.
   * 이에 대한 커스텀 테마에서 구문 강조 등 적용 방법을 현재 파악하지 못해 아래와 같은 임시 방편을 적용한다.
   * 아래와 같이 작성하면, light/dark 각각 테마가 적용되지 않고 커스텀 테마가 적용되며 구문 강조가 정상 동작한다.
   * @see https://github.com/rehype-pretty/rehype-pretty-code/issues/248
   *
   * 또한, MDXRemote 컴포넌트는 서버 컴포넌트로써 테마를 판단할 수 없기에 CSS로 처리해야한다.
   * 이는 @workspace/ui/styles/mdx.css에서 적용하고 있다.
   */
  // theme: "none",
  // theme: "vitesse-dark",
  theme: {
    dark: "vitesse-dark",
    light: "vitesse-light",
  },
  transformers: [transformerNotationDiff(), transformerNotationHighlight()],
}

export const MDXComponents = ({
  source
}: MDXComponentsProps) => {
  return (
    <div className="mdx">
      <MDXRemote
        source={source}
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
