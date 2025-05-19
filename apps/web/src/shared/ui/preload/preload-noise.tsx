import Image from "next/image"

export const PreloadNoise = () => {
  return (
    <Image src="/texture/noise.webp" alt="preload texture" width={1} height={1} priority className="hidden" />
  )
}
