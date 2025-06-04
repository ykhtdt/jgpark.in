"use client"

import {
  useState,
  useEffect,
} from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@workspace/ui/components/dialog"

import { useMomentsDetail } from "@/pages/moments"
import { getImageUrl } from "@/entities/storage"

interface MomentsDetailProps {
  id: string
}

export function MomentsDetailPage({
  id,
}: MomentsDetailProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const { image } = useMomentsDetail(id)

  useEffect(() => {
    setIsOpen(true)
  }, [id])

  const closeModal = () => {
    setIsOpen(false)
    router.back()
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} key={`modal-${id}`}>
      <DialogOverlay className="backdrop-blur-md" />
      <DialogContent className="sm:max-w-6xl h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {image?.name || "이미지 상세"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Image Detail
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex-1 min-h-[50vh] overflow-hidden">
          {image ? (
            <Image
              src={getImageUrl(image.bucket_id || "jgpark.in", `moments/${image.name}`)}
              alt={image.name || "갤러리 이미지"}
              fill
              priority
              className="object-contain p-4"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>이미지를 찾을 수 없습니다.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
