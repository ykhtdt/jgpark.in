import { isValidElement } from "react"

import Link from "next/link"

import { ArrowTopRightIcon } from "@radix-ui/react-icons"

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> { }

export function MDXLink({
  target = "_blank",
  href,
  children,
  ...rest
}: Props) {
  const isImageComponent = isValidElement(children) && typeof children.type === "function" && children.type.name === "img"

  return (
    <Link target={target} href={href || ""} {...rest}>
      {children}
      {!isImageComponent && <ArrowTopRightIcon />}
    </Link>
  )
}
