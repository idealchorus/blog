import React from "react"
import Markdoc from "@markdoc/markdoc"
import type { Route } from "../../.react-router/types/app/routes/+types/posts.$post.ts"

export async function loader(args: Route.LoaderArgs) {
  const file = await Deno.readTextFile(`./app/posts/${args.params.post}.md`)

  const content = Markdoc.renderers.react(
    Markdoc.transform(Markdoc.parse(file)),
    React,
  )

  return content
}

export default function PostPage(props: Route.ComponentProps) {
  return (
    <article className="page">
      {props.loaderData as React.ReactNode}
    </article>
  )
}
