"use client"

import type { FileWithSignedUrl } from "../types"

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
  images: FileWithSignedUrl[];
}

const imageLoader: ImageLoader = ({ src, width }: ImageLoaderProps) => {
  // return `${src}?w=${width}`
  return `${src}`
}

export const Moments = ({
  images,
}: MomentsProps) => {
  const [detailImage, setDetailImage] = useState<FileWithSignedUrl>()
  
  const [isImageDetailDialogOpen, toggleIsImageDetailDialogOpen] = useReducer((state) => !state, false)

  const handleImageClick = (image: FileWithSignedUrl) => {
    toggleIsImageDetailDialogOpen()
    setDetailImage(image)
  }

  return (
    <>
      {images.map((image, index) => (
        <div
          key={image.name}
          className="relative w-[calc(50%-1.25rem)] sm:w-48 h-auto aspect-square cursor-zoom-in"
        >
          {/* ImageWithPlaceholder */}
          <Image
            loader={imageLoader}
            src={image.signedUrl}
            alt={image.name}
            width={192}
            height={192}
            loading={index <= 12 ? "eager" : "lazy"}
            priority={index <= 12 ? true : false}
            onClick={() => handleImageClick(image)}
            className="absolute w-auto h-auto max-w-[75%] max-h-[75%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      ))}
      {!!detailImage &&
        <Dialog open={isImageDetailDialogOpen} onOpenChange={toggleIsImageDetailDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Image Detail</DialogTitle>
              <DialogDescription>
                {detailImage.name}
              </DialogDescription>
              <Image
                loader={imageLoader}
                src={detailImage.signedUrl}
                alt={detailImage.name}
                width={1280}
                height={854}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }
    </>
  )
}