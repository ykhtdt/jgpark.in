import Link from "next/link"

import { Link2Icon } from "@radix-ui/react-icons"

interface Props extends React.HTMLProps<HTMLHeadingElement> {
  as: "2" | "3";
}

export default function MDXHeading({
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
        <Link2Icon />
      </Link>
    </Component>
  )
}