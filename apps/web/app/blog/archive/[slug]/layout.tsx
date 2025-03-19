import { Fragment } from "react"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Fragment>

      {/* page */}
      {children}

    </Fragment>
  )
}
