import Image from "next/image"

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

export default function MDXImage({
  src,
  alt,
  children,
  ...rest
}: Props) {
  return (
    <Image src={src} alt={alt || "Uncaptioned"} width="832" height="468" priority {...rest}>
      {children}
    </Image>
  )
}