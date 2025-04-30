import {
  type PropsWithChildren,
  Fragment,
} from "react"

import { Header } from "@/widgets/header"
import { Container } from "@/shared/ui"

import "./print-layout.css"

export const PrintLayout = ({
  children,
}: PropsWithChildren) => {
  return (
    <Fragment>
      <Header className="print:hidden mx-auto w-full max-w-4xl px-4" />
      <Container className="border">
        <div className="flex size-full">
          {children}
        </div>
      </Container>
    </Fragment>
  )
}
