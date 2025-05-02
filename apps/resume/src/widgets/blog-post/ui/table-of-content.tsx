"use client"

import Link from "next/link"

import { cn } from "@workspace/ui/lib/utils"

import {
  type TocLevel,
  useToc,
  generateToc,
} from "@/features/toc"

interface Props {
  className?: string
  content: string
  level: TocLevel
}

export function TableOfContent({
  className,
  content,
  level,
}: Props) {
  const tableOfContent = generateToc(content, level)
  const activeId = useToc(level)

  return (
    <aside className={cn("fixed hidden w-44 translate-x-[56rem] pt-4 md:pt-8 xl:flex", className)}>
      <ol className="w-full space-y-2 text-sm text-muted-foreground">
        {tableOfContent.map((item) => (
          <li key={item.slug} className="space-y-2">
            <Link
              href={`#${item.slug}`}
              className={cn("transition-colors hover:text-foreground hover:font-medium", {
                "text-foreground": item.slug === activeId
              })}
            >
              {item.text}
            </Link>
            {item.children.length > 0 && (
              <ol className="space-y-2 pl-4">
                {item.children.map((child) => (
                  <li key={child.slug}>
                    <Link
                      href={`#${child.slug}`}
                      className={cn("transition-colors hover:text-foreground hover:font-medium", {
                        "text-foreground": child.slug === activeId
                      })}
                    >
                      {child.text}
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </aside>
  )
}
