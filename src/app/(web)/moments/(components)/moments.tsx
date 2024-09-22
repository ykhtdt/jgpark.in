"use client"

import type { FileWithSignedUrl } from "@/types/moments"

import { useState, useReducer } from "react"
import Image, { type ImageLoader, type ImageLoaderProps } from "next/image"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { ImageWithPlaceholder } from "@/components/image/image-with-placeholder"

type MomentsProps = {
  images: string[];
}

const imageLoader: ImageLoader = ({ src, width }: ImageLoaderProps) => {
  // return `${src}?w=${width}`
  return `${src}`
}

export const Moments = ({
  images,
}: MomentsProps) => {
  const [detailImage, setDetailImage] = useState<string>()

  const [isImageDetailDialogOpen, toggleIsImageDetailDialogOpen] = useReducer((state) => !state, false)

  const handleImageClick = (image: string) => {
    toggleIsImageDetailDialogOpen()
    setDetailImage(image)
  }

  return (
    <>
      {images.map((image, index) => (
        <div
          key={`${image}_${index}`}
          className="relative aspect-square h-auto w-[calc(50%-1.25rem)] cursor-zoom-in sm:w-48"
        >
          {/* ImageWithPlaceholder */}
          <Image
            loader={imageLoader}
            src={image}
            alt={image}
            width={192}
            height={192}
            loading={index <= 12 ? "eager" : "lazy"}
            priority={index <= 12 ? true : false}
            onClick={() => handleImageClick(image)}
            unoptimized
            className="absolute left-1/2 top-1/2 size-auto max-h-[75%] max-w-[75%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      ))}
      {!!detailImage &&
        <Dialog open={isImageDetailDialogOpen} onOpenChange={toggleIsImageDetailDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Image Detail</DialogTitle>
              <DialogDescription>
                {detailImage}
              </DialogDescription>
              <Image
                loader={imageLoader}
                src={detailImage}
                alt={detailImage}
                width={1280}
                height={854}
                unoptimized
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }
    </>
  )
}
