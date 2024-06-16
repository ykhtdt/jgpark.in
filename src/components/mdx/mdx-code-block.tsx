"use client"

import { useRef, useState } from "react"

import { ClipboardIcon, CheckIcon } from "@radix-ui/react-icons"

import { delay } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Props extends React.HTMLProps<HTMLPreElement> {
  "data-language"?: string;
  "data-theme"?: string;
}

export default function MDXCodeBlock({
  children,
  ...rest
}: Props) {
  console.log(rest)
  const ref = useRef<HTMLSpanElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyToClipboard = async () => {
    if (typeof window === "undefined") {
      return
    }

    if (!window.navigator.clipboard) {
      console.warn("Clipboard not supported.")
    }

    const text = ref.current?.innerText ?? ""

    window.navigator.clipboard.writeText(text)

    setIsCopied(true)

    await delay(2500)
    setIsCopied(false)
  }

  return (
    <pre {...rest}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopyToClipboard}
        className="absolute top-3 right-2 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
      >
        {isCopied ? (
          <CheckIcon className="w-3.5 h-3.5" />
        ) : (
          <ClipboardIcon className="w-3.5 h-3.5" />
        )}
      </Button>
      <span ref={ref} className="grid">
        {children}
      </span>
    </pre>
  )
}