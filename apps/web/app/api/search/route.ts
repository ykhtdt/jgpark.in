import { NextResponse } from "next/server"

import { getSearchablePosts } from "@/entities/blog"

export async function GET() {
  const searchablePosts = getSearchablePosts()

  return NextResponse.json(searchablePosts)
}
