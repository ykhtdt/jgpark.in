import { ReactNode } from "react"

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container px-8 min-h-screen flex flex-col">
      {children}
    </div>
  )
}

export default Container