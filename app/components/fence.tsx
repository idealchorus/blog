"use client"
import { useLayoutEffect, type ComponentPropsWithoutRef } from "react"
import hljs from "highlight.js"

type Props = ComponentPropsWithoutRef<"code"> & {
  language: string
}

export default function Fence({ language, children, ...rest }: Props) {
  useLayoutEffect(() => {
    hljs.highlightAll()
  }, [])

  return (
    <pre>
      <code className={`language-${language}`} {...rest}>
        {children}
      </code>
    </pre>
  )
}
