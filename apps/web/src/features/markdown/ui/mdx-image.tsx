import Image from "next/image"

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

export function MDXImage({
  src,
  alt,
  children,
  ...rest
}: Props) {
  return (
    <Image src={src} alt={alt || "Uncaptioned"} width="832" height="556" className="aspect-video h-fit w-fit object-cover" {...rest}>
      {children}
    </Image>
  )
}
