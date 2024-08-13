import Image, { ImageProps} from "next/image"

import { getImageBase64 } from "@/lib/get-image-base64"

type ImageWithPlaceholderProps = Omit<ImageProps, "src"> & {
  src: string;
}

export const ImageWithPlaceholder = async ({
  src,
  alt,
  ...rest
}: ImageWithPlaceholderProps) => {
  const { base64, image } = await getImageBase64(src)

  return (
    <Image
      src={image.src}
      alt={alt}
      placeholder="blur"
      blurDataURL={base64}
      {...rest}
    />
  )
}
