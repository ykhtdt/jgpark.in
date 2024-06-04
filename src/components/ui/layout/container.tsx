import { ReactNode } from "react"

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen flex flex-col border-l border-r">
      {children}
    </div>
  )
}

export default Container