"use client"

import {
  useState,
  useEffect,
  ReactNode,
} from "react"
import {
  useRouter,
  usePathname,
} from "next/navigation"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@workspace/ui/components/dialog"

import { getImageUrl } from "@/entities/storage"
import { Spinner } from "@/shared/ui"
import { useMomentsDetail } from "../hooks/use-moments-detail"

interface MomentsDetailProps {
  imageId: string
}

export function MomentsDetailPage({
  imageId,
}: MomentsDetailProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [previousPath, setPreviousPath] = useState<string>("")
  const { image, error } = useMomentsDetail(imageId)

  useEffect(() => {
    setIsOpen(true)

    const isWindow = typeof window !== "undefined"

    if (isWindow) {
      const previousPath = sessionStorage.getItem("previousPath") || ""
      setPreviousPath(previousPath)
      sessionStorage.setItem("previousPath", pathname || "")
    }
  }, [pathname])

  const closeModal = () => {
    setIsOpen(false)

    const isDirectAccess = !previousPath || !previousPath.includes("/moments")

    if (isDirectAccess) {
      router.push("/moments")
    } else {
      router.back()
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay className="backdrop-blur-md" />
      <DialogContent className="flex flex-col sm:max-w-6xl h-[90vh] overflow-hidden">
        {error ? (
          <ImageDetailContent
            title="이미지 상세"
            description="Image Detail"
            errorMessage="이미지를 불러올 수 없습니다."
          />
        ) : !error && image ? (
          <ImageDetailContent
            title={image.name || "이미지 상세"}
            description="Image Detail"
          >
            <Image
              src={getImageUrl(image.bucket_id || "jgpark.in", `moments/${image.name}`)}
              alt={image.name || "Gallery image"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1536px) 90vw, 1280px"
              priority
              className="object-contain p-4"
            />
          </ImageDetailContent>
        ) : (
          <ImageDetailContent
            title="이미지 상세"
            description="Image Detail"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/75 z-10">
              <Spinner size="small" />
            </div>
          </ImageDetailContent>
        )}
      </DialogContent>
    </Dialog>
  )
}

interface ImageDetailContentProps {
  title: string
  description: string
  errorMessage?: string
  children?: ReactNode
}

const ImageDetailContent = ({
  title,
  description,
  errorMessage,
  children
}: ImageDetailContentProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="sr-only">
          {title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {description}
        </DialogDescription>
      </DialogHeader>

      <div className="relative flex-1 min-h-[50vh] overflow-hidden">
        {errorMessage ? (
          <p className="text-lg">
            {errorMessage}
          </p>
        ) : (
          children
        )}
      </div>
    </>
  )
}
