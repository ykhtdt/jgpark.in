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

import { cn } from "@/shared/lib/utils"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()

  const paths = pathname?.split("/").filter(path => path)

  return (
    <div className="mx-auto w-full max-w-3xl p-4 mb-8 flex flex-col gap-6 sm:gap-10">
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
                <BreadcrumbPage className="capitalize">
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
