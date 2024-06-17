import Link from "next/link"

import { ArrowTopRightIcon } from "@radix-ui/react-icons"

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function MDXLink({
  target = "_blank",
  href,
  children,
  ...rest
}: Props) {
  return (
    <Link target={target} href={href || ""} {...rest}>
      {children}
      <ArrowTopRightIcon />
    </Link>
  )
}