import fetch from "node-fetch"
import { getPlaiceholder } from "plaiceholder"

export const getImageBase64 = async (src: string) => {
  const response = await fetch(src)

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const {
    // metadata: { width, height },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 })

  return {
    ...plaiceholder,
    image: { src },
  }
}
