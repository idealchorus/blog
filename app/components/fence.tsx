import { type ComponentPropsWithoutRef } from "react"


type Props = ComponentPropsWithoutRef<"code"> & {
  language: string
}

export default function Fence({
  language,
  children,
  ...rest
}: Props) {
  return (
    <code {...rest}>
      {children}
    </code>
  )
}
