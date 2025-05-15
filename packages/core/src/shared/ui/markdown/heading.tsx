import Link from "next/link"

import { LinkIcon } from "lucide-react"

interface MDXHeadingProps extends React.ComponentProps<"h2" | "h3"> {
  as: "2" | "3"
}

export const MDXHeading = ({
  id,
  as,
  children,
  ...rest
}: MDXHeadingProps) => {
  const Component = `h${as}` as "h2" | "h3"

  return (
    <Component id={id} {...rest}>
      <Link href={`#${id}`}>
        {children}
        <LinkIcon />
      </Link>
    </Component>
  )
}
