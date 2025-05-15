import { isValidElement } from "react"
import Link from "next/link"

import { ArrowTopRightIcon } from "@radix-ui/react-icons"

type MDXLinkProps = React.ComponentProps<"a">

export const MDXLink = ({
  target = "_blank",
  href,
  children,
  ...rest
}: MDXLinkProps) => {
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
