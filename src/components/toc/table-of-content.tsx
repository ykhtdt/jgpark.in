"use client"

import Link from "next/link"

import { useToc } from "@/hooks/use-toc"
import { generateToc } from "@/lib/mdx"
import { cn } from "@/lib/utils"

interface Props {
  content: string;
}

export default function TableOfContent({
  content
}: Props) {
  const tableOfContent = generateToc(content)
  const activeId = useToc()

  return (
    <aside className="fixed order-last hidden w-44 translate-x-[864px] pt-4 md:pt-8 xl:flex">
      <ol className="w-full space-y-2 text-sm text-muted-foreground">
        {tableOfContent.map((item) => (
          <li key={item.slug} className="space-y-2">
            <Link href={`#${item.slug}`} className={cn(
              "transition-colors hover:text-foreground hover:font-medium", {
                "text-foreground": item.slug === activeId
              }
            )}>
              {item.text}
            </Link>
            {item.children.length > 0 && (
              <ol className="space-y-2 pl-4">
                {item.children.map((child) => (
                  <li key={child.slug}>
                    <Link href={`#${child.slug}`} className={cn(
                      "transition-colors hover:text-foreground hover:font-medium", {
                        "text-foreground": child.slug === activeId
                      }
                    )}>
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