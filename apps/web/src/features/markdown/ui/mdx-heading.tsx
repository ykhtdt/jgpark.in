import Link from "next/link"

import { LinkIcon } from "lucide-react"

interface Props extends React.HTMLProps<HTMLHeadingElement> {
  as: "2" | "3";
}

export function MDXHeading({
  id,
  as,
  children,
  ...rest
}: Props) {
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
