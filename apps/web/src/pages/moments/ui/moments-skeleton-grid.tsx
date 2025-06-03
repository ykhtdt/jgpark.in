import { ImageIcon } from "lucide-react"

interface MomentsGridSkeletonProps {
  imagesPerPage: number
}

export const MomentsGridSkeleton = ({
  imagesPerPage,
}: MomentsGridSkeletonProps) => {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: imagesPerPage }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="aspect-square rounded-xs overflow-hidden bg-zinc-200/25 dark:bg-zinc-800/75 shadow-sm p-4 animate-pulse"
        >
          <div className="relative w-full h-full overflow-hidden rounded-xs flex items-center justify-center">
            <div className="absolute inset-0 bg-zinc-300/50 dark:bg-zinc-700/50" />
            <ImageIcon className="w-9 h-9 text-zinc-400 dark:text-zinc-500 opacity-50 stroke-1 relative z-10" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const PaginationSkeleton = () => {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <div className="w-9 h-9 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      <div className="w-9 h-9 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      <div className="w-9 h-9 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      <div className="w-9 h-9 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      <div className="w-9 h-9 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
    </div>
  )
}
