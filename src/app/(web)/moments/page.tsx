import Image from "next/image"

import { Separator } from "@/components/ui/separator"

/**
 * 별도의 이미지 저장소 및 로드 필요
 */
const IMAGE_EXAMPLES = [
  {
    src: "/static/images/moments/01.jpg",
    alt: "jg_moments_01",
  }, {
    src: "/static/images/moments/02.jpg",
    alt: "jg_moments_02",
  }, {
    src: "/static/images/moments/03.jpg",
    alt: "jg_moments_03",
  }, {
    src: "/static/images/moments/04.jpg",
    alt: "jg_moments_04",
  }, {
    src: "/static/images/moments/05.jpg",
    alt: "jg_moments_05",
  }, {
    src: "/static/images/moments/06.jpg",
    alt: "jg_moments_06",
  }, {
    src: "/static/images/moments/07.jpg",
    alt: "jg_moments_07",
  }, {
    src: "/static/images/moments/08.jpg",
    alt: "jg_moments_08",
  }, {
    src: "/static/images/moments/09.jpg",
    alt: "jg_moments_09",
  }, {
    src: "/static/images/moments/10.jpg",
    alt: "jg_moments_10",
  }, {
    src: "/static/images/moments/11.jpg",
    alt: "jg_moments_11",
  }, {
    src: "/static/images/moments/12.jpg",
    alt: "jg_moments_12",
  }, {
    src: "/static/images/moments/13.jpg",
    alt: "jg_moments_13",
  }, {
    src: "/static/images/moments/14.jpg",
    alt: "jg_moments_14",
  }, 
]

const Page = () => {
  return (
    <main>
      <article className="grid items-center md:py-8 py-4 gap-9 pb-10 md:pb-12">
        <header className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            Moments
          </h1>
          <p className="text-sm leading-8">
            사진을 잘 찍진 않지만...
          </p>
        </header>
        <Separator />
        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-2">
            <h2 className="font-medium">
              Gallery
            </h2>
            <div className="flex flex-wrap gap-5 items-center justify-center">
              {/* 이미지 Lazy Loader 및 클릭 시 Zoom 기능 및 UI 필요, 이미지 Background를 gray 정도로 줘서 카드처럼 보이게(모바일) */}
              {IMAGE_EXAMPLES.map((image, index) => (
                <figure key={image.src} className="relative w-[calc(50%-1.25rem)] sm:w-48 h-auto aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={192}
                    height={192}
                    loading={index <= 12 ? "eager" : "lazy"}
                    priority={index <= 12 ? true : false}
                    className="absolute w-auto h-auto max-w-[75%] max-h-[75%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </figure>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}

export default Page