import type { PropsWithChildren } from "react"

export const Container = ({
  children,
}: PropsWithChildren) => {
  return (
    <div className="mx-auto w-full max-w-4xl p-4 mb-8 flex flex-col gap-6 sm:gap-10">
      {children}
    </div>
  )
}
