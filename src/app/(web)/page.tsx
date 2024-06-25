import Link from "next/link"

import clsx from "clsx"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const fetchPinnedRepos = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/github-pinned-repos`,
    {
      next: {
        revalidate: 300
      }
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch pinned repositories.")
  }

  return res.json()
}

export default async function Home() {
  // const repos = await fetchPinnedRepos()

  return (
    <main>
      <section className="grid items-center md:py-8 py-4 gap-9 pb-10 md:pb-12">
        <section className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            Welcome
          </h1>
          <p className="text-sm leading-8">
            프론트엔드 개발자 <span className="font-bold">박종광</span>
          </p>
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">
            <Link href="/blog">
              Blog
            </Link>
          </h2>
          <p className="text-sm leading-8">
            기술과 문제를 조금 더 깊게 파보며 과정과 결과를 기록합니다.
          </p>
        </section>
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
      </section>
    </main>
  )
}
