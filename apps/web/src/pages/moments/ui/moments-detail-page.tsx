"use client"

import {
  useState,
  useEffect,
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

import {
  type StorageFile,
  getImageUrl,
} from "@/entities/storage"

interface MomentsDetailProps {
  image: StorageFile
}

export function MomentsDetailPage({
  image,
}: MomentsDetailProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [previousPath, setPreviousPath] = useState<string>("")

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
    <Dialog open={isOpen} onOpenChange={handleOpenChange} key={`modal-${image.id}`}>
      <DialogOverlay className="backdrop-blur-md" />
      <DialogContent className="flex flex-col sm:max-w-6xl h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {image.name || "이미지 상세"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Image Detail
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex-1 min-h-[50vh] overflow-hidden">
          <Image
            src={getImageUrl(image.bucket_id || "jgpark.in", `moments/${image.name}`)}
            alt={image.name || "갤러리 이미지"}
            fill
            priority
            className="object-contain p-4"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
