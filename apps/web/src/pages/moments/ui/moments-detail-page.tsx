"use client"

import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@workspace/ui/components/dialog"

import { getImageUrl, type StorageFile } from "@/entities/storage"
import { Spinner } from "@/shared/ui"
import { useMomentsDetail } from "../hooks/use-moments-detail"
import { useModalNavigation } from "../hooks/use-modal-navigation"

const DEFAULT_BUCKET = "jgpark.in"
const MOMENTS_FOLDER = "moments"

interface MomentsDetailProps {
  imageId: string
}

export const MomentsDetailPage = ({
  imageId,
}: MomentsDetailProps) => {
  const {
    image,
    error,
    isLoading,
  } = useMomentsDetail(imageId)

  const {
    isModalOpen,
    handleCloseModal
  } = useModalNavigation()

  return (
    <ImageDetailModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      image={image}
      isLoading={isLoading}
      error={error}
    />
  )
}

interface ImageDetailModalProps {
  isOpen: boolean
  onClose: () => void
  image: StorageFile | null
  isLoading: boolean
  error: Error | null
}

const ImageDetailModal = ({
  isOpen,
  onClose,
  image,
  isLoading,
  error
}: ImageDetailModalProps) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay className="backdrop-blur-md" />
      <DialogContent className="flex flex-col sm:max-w-6xl h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {image?.name || "이미지 상세"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            이미지 상세 보기
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex-1 min-h-[50vh] overflow-hidden">
          <ImageContent
            image={image}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ImageContentProps {
  image: StorageFile | null
  isLoading: boolean
  error: Error | null
}

const ImageContent = ({ image, isLoading, error }: ImageContentProps) => {
  if (error) {
    return <ErrorState />
  }

  if (isLoading) {
    return <LoadingState />
  }

  if (image) {
    return <ImageDisplay image={image} />
  }

  return null
}

const ErrorState = () => (
  <div className="flex items-center justify-center h-full">
    <p className="text-lg text-red-500">
      이미지를 불러올 수 없습니다.
    </p>
  </div>
)

const LoadingState = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/75 z-10">
    <Spinner size="small" />
  </div>
)

interface ImageDisplayProps {
  image: StorageFile
}

const ImageDisplay = ({
  image,
}: ImageDisplayProps) => (
  <Image
    src={getImageUrl(image.bucket_id || DEFAULT_BUCKET, `${MOMENTS_FOLDER}/${image.name}`)}
    alt={image.name || "갤러리 이미지"}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1536px) 90vw, 1280px"
    priority
    className="object-contain p-4"
  />
)
