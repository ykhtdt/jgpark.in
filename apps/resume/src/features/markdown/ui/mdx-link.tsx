import { isValidElement } from "react"
import Link from "next/link"

import { ArrowTopRightIcon } from "@radix-ui/react-icons"

export function MDXLink({
  target = "_blank",
  href,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isImageComponent = isValidElement(children) && typeof children.type === "function" && children.type.name === "img"
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"))

  if (isInternalLink) {
    return (
      <Link href={href || ""} target={target} {...rest}>
        {children}
        {!isImageComponent && <ArrowTopRightIcon />}
      </Link>
    )
  }

  return (
    <a href={href || ""} target={target} {...rest}>
      {children}
      {!isImageComponent && <ArrowTopRightIcon />}
    </a>
  )
}
