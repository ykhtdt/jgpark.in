import Link from "next/link"

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
    throw new Error('Failed to fetch pinned repositories.')
  }

  return res.json()
}

export default async function Home() {
  // const repos = await fetchPinnedRepos()

  return (
    <main>
      <section className="grid items-center md:py-8 py-4 gap-8 pb-10 md:pb-12">
        <h1 className="text-xl font-bold">
          Welcome
        </h1>
        <section>
          <p className="text-sm leading-8">
            안녕하세요. 프론트엔드 개발자 <span className="font-bold">박종광</span>입니다.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">
            Blog
          </h2>
        </section>
      </section>
    </main>
  )
}
