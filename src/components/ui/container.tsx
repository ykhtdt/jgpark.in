import { ReactNode } from "react"

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container flex min-h-screen flex-col xl:px-8">
      {children}
    </div>
  )
}

export default Container