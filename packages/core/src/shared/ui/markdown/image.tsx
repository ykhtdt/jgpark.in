import Image from "next/image"

interface MDXImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string
  alt?: string
  width?: number
  height?: number
}

export const MDXImage = ({
  src,
  alt,
  width = 832,
  height = 556,
  children,
  ...rest
}: MDXImageProps) => {
  return (
    <Image
      src={src}
      alt={alt || "Uncaptioned"}
      width={width}
      height={height}
      className="aspect-video h-fit w-fit object-cover"
      {...rest}
    >
      {children}
    </Image>
  )
}
