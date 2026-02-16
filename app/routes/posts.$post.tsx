import Markdoc from "@markdoc/markdoc"
import type { Route } from "../../.react-router/types/app/routes/+types/posts.$post.ts"
import markdocConfig from "../library/markdoc-config.ts"

export async function loader(args: Route.LoaderArgs) {
  const file = await Deno.readTextFile(`./app/posts/${args.params.post}.md`)

  return Markdoc.renderers.html(
    Markdoc.transform(Markdoc.parse(file), markdocConfig),
  )
}

export default function PostPage(props: Route.ComponentProps) {
  return <div dangerouslySetInnerHTML={{ __html: props.loaderData }} />
}
