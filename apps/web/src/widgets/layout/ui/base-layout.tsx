import type {
  PropsWithChildren,
  ReactNode,
} from "react"

import { cn } from "@workspace/ui/lib/utils"

import { Container } from "@/shared/ui"

interface BaseLayoutProps {
  className?: string
  header: ReactNode
  footer: ReactNode
}

export const BaseLayout = ({
  children,
  className,
  header,
  footer,
}: PropsWithChildren<BaseLayoutProps>) => {
  return (
    <div className="flex flex-1 pt-10 sm:pt-20">
      <Container>
        {/* Header */}
        {header}

        {/* Main content */}
        <main className={cn("relative flex-1", className)}>
          {children}
        </main>

        {/* Footer */}
        {footer}
      </Container>
    </div>
  )
}
