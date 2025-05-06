"use client"

import { cn } from "@workspace/ui/lib/utils"
import { breakpoints } from "@workspace/ui/consts/breakpoints"

import { useMediaQuery } from "@workspace/core/shared/lib"
import {
  type TableOfContentLevel,
  TableOfContentsList,
  TableOfContentsTitle,
  TableOfContentsItem,
  TableOfContentsLink,
  useToc,
  generateToc,
} from "@workspace/core/features/toc"

interface Props {
  className?: string
  content: string
  levels: TableOfContentLevel
}

export const TableOfContents = ({
  className,
  content,
  levels,
}: Props) => {
  const tableOfContent = generateToc({ content, levels })

  const isDisableToc = useMediaQuery(`(max-width: ${breakpoints.xl})`)
  const activeId = useToc({ levels, disable: isDisableToc })

  return (
    <div className={cn("fixed hidden w-44 translate-x-[56rem] pt-4 md:pt-8 xl:flex", className)}>
      <TableOfContentsList className="w-full text-sm text-muted-foreground">
        <TableOfContentsTitle>
          On This Page
        </TableOfContentsTitle>
        {tableOfContent.map((item) => (
          <TableOfContentsItem key={item.slug} indent>
            <TableOfContentsList>
              <TableOfContentsLink
                href={`#${item.slug}`}
                isActive={item.slug === activeId}
                className={cn("transition-colors hover:text-foreground hover:font-medium")}
              >
                {item.text}
              </TableOfContentsLink>
              {item.children.map((child) => (
                <TableOfContentsItem key={child.slug} indent>
                  <TableOfContentsLink
                    href={`#${child.slug}`}
                    isActive={child.slug === activeId}
                  >
                    {child.text}
                  </TableOfContentsLink>
                </TableOfContentsItem>
              ))}
            </TableOfContentsList>
          </TableOfContentsItem>
        ))}
      </TableOfContentsList>
    </div>
  )
}
