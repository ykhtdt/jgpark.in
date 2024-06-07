import { NextResponse } from 'next/server'

interface Repository {
  name: string;
  description: string;
  url: string;
  primaryLanguage: {
    name: string;
  } | null;
}

interface PinnedReposResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: Repository[];
      };
    };
  };
}

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const USERNAME = process.env.OWNER_NAME

  const query = `
    {
      user(login: "${USERNAME}") {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              url
              primaryLanguage {
                name
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })

  const json: PinnedReposResponse  = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch pinned repositories' }, { status: res.status })
  }

  const pinnedRepos = json.data.user.pinnedItems.nodes.map((repo: Repository) => {
    return {
      ...repo,
      language: repo.primaryLanguage?.name === "JavaScript" ? "Javascript" : "Typescript"
    }
  })

  return NextResponse.json(pinnedRepos)
}
