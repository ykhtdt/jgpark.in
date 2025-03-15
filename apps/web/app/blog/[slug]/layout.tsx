export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      {children}
    </div>
  )
}
