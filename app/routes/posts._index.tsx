import Markdoc from "@markdoc/markdoc"
import { readdir, readFile } from "node:fs/promises"
import type { Route } from "../../.react-router/types/app/routes/+types/posts._index.ts"
import yaml from "js-yaml"
import { postFrontmatterSchema, postSummarySchema } from "../library/schemas.ts"
import PostSummaries from "../components/post-summaries.tsx"

export async function loader() {
  const postsDir = await readdir("./app/posts", { withFileTypes: true })

  const rawPosts: { slug: string; content: string }[] = []
  for (const maybePost of postsDir) {
    if (maybePost.isFile() && maybePost.name.endsWith(".md")) {
      const rawPost = await readFile(`./app/posts/${maybePost.name}`, "utf8")

      rawPosts.push({
        slug: maybePost.name.replace(".md", ""),
        content: rawPost,
      })
    }
  }

  const postSummaries = rawPosts.map((rawPost) => {
    const ast = Markdoc.parse(rawPost.content)

    const frontMatter = postFrontmatterSchema.parse(yaml.load(ast.attributes.frontmatter))

    return postSummarySchema.parse({
      ...frontMatter,
      slug: rawPost.slug,
    })
  })

  return postSummaries
}

export default function PostsPage(props: Route.ComponentProps) {
  return (
    <article className="page">
      <header>
        <h1>Posts</h1>
      </header>
      <PostSummaries postSummaries={props.loaderData} />
    </article>
  )
}
