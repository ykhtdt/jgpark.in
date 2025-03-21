import { BaseLayout } from "@/widgets/layout"
import Link from "next/link"

export const HomePage = () => {
  return (
    <BaseLayout>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          PARK JONGGWANG
        </h1>
        <h2 className="text-base font-medium tracking-tight mt-3">
          Frontend Engineer
        </h2>
        <div className="h-px w-16 bg-zinc-300 dark:bg-zinc-700 my-3 sm:my-4" />
        <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-400">
          For minimalism, simplicity, and enhanced UX.
        </p>

        <nav className="mt-8 sm:mt-10">
          <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <li>
              <Link href="/blog" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/moments" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                Moments
              </Link>
            </li>
            <li>
              <Link href="/resume" className="text-sm font-medium hover:text-emerald-600 transition-colors">
                Resume
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </BaseLayout>
  )
}
