"use client"

import { cn } from "@workspace/ui/lib/utils"
import { breakpoints } from "@workspace/ui/consts/breakpoints"

import {
  TableOfContentsList,
  TableOfContentsTitle,
  TableOfContentsItem,
  TableOfContentsLink,
  useToc,
  generateToc,
} from "@workspace/core/features/toc"
import { useMediaQuery } from "@workspace/core/shared/lib"

interface Props {
  className?: string
  content: string
}

export const TableOfContent = ({
  className,
  content,
}: Props) => {
  const tableOfContent = generateToc({ content, levels: { topLevel: 2 } })

  const isDisableToc = useMediaQuery(`(max-width: ${breakpoints.xl})`)
  const activeId = useToc({ levels: { topLevel: 2 }, disable: isDisableToc })

  return (
    <div className={cn("fixed hidden w-44 translate-x-[56rem] pt-4 md:pt-8 xl:flex", className)}>
      <TableOfContentsList className="w-full text-sm text-muted-foreground">
        <TableOfContentsTitle>
          On This Page
        </TableOfContentsTitle>
        {tableOfContent.map((item) => (
          <TableOfContentsItem key={item.slug}>
            <TableOfContentsLink
              href={`#${item.slug}`}
              isActive={item.slug === activeId}
              className={cn("transition-colors hover:text-foreground hover:font-medium")}
            >
              {item.text}
            </TableOfContentsLink>
          </TableOfContentsItem>
        ))}
      </TableOfContentsList>
    </div>
  )
}
