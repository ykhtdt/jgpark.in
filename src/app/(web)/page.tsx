import Link from "next/link"

import { cn } from "@/lib/utils"
import { informationConfig, browseConfig, HomeConfig } from "@/config/home"

// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// const fetchPinnedRepos = async () => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_APP_URL}/api/github-pinned-repos`,
//     {
//       next: {
//         revalidate: 300
//       }
//     }
//   )

//   if (!res.ok) {
//     throw new Error("Failed to fetch pinned repositories.")
//   }

//   return res.json()
// }

const Feature = ({ config }: { config: HomeConfig }) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">
        {config.title}
      </h2>
      <ul className="text-sm text-muted-foreground font-light flex flex-col gap-2 list-disc pl-4 lg:pl-0">
        {config.config.map((item) => (
          <li key={item.title} className={cn(
            {
              "pointer-events-none line-through": !item.published
            }
          )}>
            <Link href={item.href} className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function Home() {
  // const repos = await fetchPinnedRepos()

  return (
    <main>
      <article className="grid items-center md:py-8 py-4 gap-9 pb-10 md:pb-12">
        <header className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            Welcome
          </h1>
          <p className="text-sm leading-8">
            프론트엔드 개발자 <span className="font-bold">박종광</span>
          </p>
        </header>
        <Separator />
        <Feature config={browseConfig} />
        <Feature config={informationConfig} />
        {/* <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">
            <Link href="/blog">
              Blog
            </Link>
          </h2>
          <p className="text-sm leading-8">
            기술과 문제를 조금 더 깊게 파보며 과정과 결과를 기록합니다.
          </p>
        </section> */}
        {/* <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">
            <Link
              href="https://github.com/ykhtdt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository
            </Link>
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {repos.slice(0, 4).map((repo: any) => (
              <Card key={repo.name} className="bg-card text-card-foreground rounded-none">
                <CardHeader>
                  <CardTitle className="font-medium">
                    {repo.name}
                  </CardTitle>
                  <CardDescription>
                    {repo.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <span className={clsx("inline-block w-3 h-3 border border-muted-foreground rounded-full", {
                      "bg-yellow-300": repo.language === "Javascript",
                      "bg-blue-500": repo.language === "Typescript"
                    })} />
                    <span className="text-xs text-muted-foreground">
                      {repo.language}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section> */}
      </article>
    </main>
  )
}
