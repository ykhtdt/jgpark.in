import Image from "next/image"

export default function Home() {
  return (
    <main className="text-center pt-32 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">
        Welcome to my blog
      </h1>
      <p className="max-w-[750px] mx-auto leading-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam velit quam, rutrum vel massa non, auctor sollicitudin ante. Fusce eleifend quam et neque sollicitudin eleifend. Nulla et nibh sit amet magna commodo elementum a quis quam. Mauris ac massa tortor. Sed a pretium ipsum. Praesent egestas elementum est vitae sollicitudin. Nunc imperdiet tellus ex, eget malesuada ipsum viverra nec.
      </p>
    </main>
  )
}
