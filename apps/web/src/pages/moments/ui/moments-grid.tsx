import Image from "next/image"

import { ImageIcon } from "lucide-react"

import { StorageFile } from "@/entities/storage"

interface MomentsGridProps {
  files: (StorageFile & { url: string })[] | null
  currentPage: number
  imagesPerPage: number
}

export const MomentsGrid = ({
  files,
  imagesPerPage,
}: MomentsGridProps) => {
  const hasNoImages = !files || files.length === 0

  if (hasNoImages) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">
          No images found.
        </p>
      </div>
    )
  }

  const needsEmptyItems = files.length < imagesPerPage
  const emptyCellCount = needsEmptyItems ? imagesPerPage - files.length : 0
  const emptyCells = needsEmptyItems ? Array(emptyCellCount).fill(null) : []

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Image Cells */}
      {files.map((file, index) => {
        const indexInPage = index % imagesPerPage
        const priority = indexInPage <= 3

        return (
          <div
            key={file.id || file.name}
            className="aspect-square rounded-xs overflow-hidden bg-zinc-100 dark:bg-zinc-800/75 shadow-sm hover:shadow-md transition-all p-4"
          >
            <div className="relative w-full h-full overflow-hidden rounded-xs">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative size-full rounded-xs overflow-hidden group">
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 22vw"
                    loading={priority ? undefined : "lazy"}
                    priority={priority}
                    className="object-cover duration-300 group-hover:scale-110 filter grayscale-25 brightness-95 group-hover:filter-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Empty Cells */}
      {emptyCells.map((_, index) => (
        <div
          key={`empty-${index}`}
          className="hidden sm:flex items-center justify-center aspect-square rounded-xs overflow-hidden bg-zinc-100 dark:bg-zinc-800/50 shadow-sm p-4"
        >
          <div className="w-full h-full rounded-xs flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500">
            <ImageIcon className="w-9 h-9 mb-2 opacity-50 stroke-1" />
            <span className="text-xs opacity-70">
              Empty
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
