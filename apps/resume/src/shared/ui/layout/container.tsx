import type { PropsWithChildren } from "react"

import { cn } from "@workspace/ui/lib/utils"

interface ContainerProps {
  className?: string
}

export const Container = ({
  children,
  className,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <div className={cn("mx-auto w-full max-w-4xl p-4 flex flex-col flex-1 gap-6 sm:gap-12", className)}>
      {children}
    </div>
  )
}
