"use client"

import { useRef, useState } from "react"

import { ClipboardIcon, CheckIcon } from "@radix-ui/react-icons"

import { delay } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Props extends React.HTMLAttributes<HTMLPreElement> {
  "data-language"?: string;
  "data-theme"?: string;
}

export default function MDXCodeBlock({
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyToClipboard = async () => {
    if (typeof window === "undefined") {
      console.warn("Clipboard access is not supported in this environment.")
      return
    }

    if (!window.navigator.clipboard) {
      console.warn("Clipboard not supported.")
      return
    }

    const text = ref.current?.innerText ?? ""

    window.navigator.clipboard.writeText(text)

    setIsCopied(true)

    await delay(2500)
    setIsCopied(false)
  }

  return (
    <pre {...rest}>
      <span ref={ref}>
        {children}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopyToClipboard}
        className="hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
      >
        {isCopied ? (
          <CheckIcon className="w-3.5 h-3.5" />
        ) : (
          <ClipboardIcon className="w-3.5 h-3.5" />
        )}
      </Button>
    </pre>
  )
}