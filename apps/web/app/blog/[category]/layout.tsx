"use client"

import { Fragment } from "react"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const paths = pathname?.split("/").filter(path => path)

  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          {paths && paths.map((path, index) => {
            const isLastItem = index === paths.length - 1

            if (!isLastItem) {
              return (
                <Fragment key={path}>
                  <BreadcrumbItem className="capitalize">
                    <BreadcrumbLink href={`/${paths.slice(0, index + 1).join("/")}`}>
                      {path}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </Fragment>
              )
            }

            return (
              <BreadcrumbItem key={path} className="capitalize">
                <BreadcrumbPage>
                  {path}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* page */}
      {children}

    </div>
  )
}
