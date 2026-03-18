import Markdoc from "@markdoc/markdoc"
import { readFile } from "node:fs/promises"
import type { Route } from "../../.react-router/types/app/routes/+types/posts.$post.ts"
import Fence from "../components/fence.tsx"
import markdocConfig from "../library/markdoc-config.ts"
import React, { type ReactNode } from "react"

export async function loader(args: Route.LoaderArgs) {
  const file = await readFile(`./app/posts/${args.params.post}.md`, "utf8")

  return Markdoc.renderers.react(Markdoc.transform(Markdoc.parse(file), markdocConfig), React, {
    components: {
      Fence,
    },
  }) satisfies ReactNode
}

export default function PostPage(props: Route.ComponentProps) {
  return <>{props.loaderData}</>
}
