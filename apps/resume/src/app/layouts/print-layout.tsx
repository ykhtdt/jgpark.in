import {
  type PropsWithChildren,
  Fragment,
} from "react"

import { Header } from "@/widgets/header"

import "./print-layout.css"

export const PrintLayout = ({
  children,
}: PropsWithChildren) => {
  return (
    <Fragment>
      <Header className="print:hidden w-[210mm] mx-auto flex justify-end" />
      <div className="w-[210mm] h-[297mm] mx-auto flex p-5 border">
        <div className="flex size-full border border-dashed border-border print:border-none">
          {children}
        </div>
      </div>
    </Fragment>
  )
}
