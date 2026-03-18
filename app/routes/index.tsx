import Markdoc from "@markdoc/markdoc"
import yaml from "js-yaml"
import type { Route } from "../../.react-router/types/app/routes/+types/index.ts"
import PostSummaries from "../components/post-summaries.tsx"
import { readdir, readFile } from "node:fs/promises"
import { postFrontmatterSchema, postSummarySchema } from "../library/schemas.ts"

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

  const postSummaries = rawPosts
    .map((rawPost) => {
      const ast = Markdoc.parse(rawPost.content)

      const frontMatter = postFrontmatterSchema.parse(yaml.load(ast.attributes.frontmatter))

      return postSummarySchema.parse({
        ...frontMatter,
        slug: rawPost.slug,
      })
    })
    .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())

  return { recentPosts: postSummaries.slice(0, 3) }
}

export default function HomePage(props: Route.ComponentProps) {
  return (
    <article className="page">
      <header>
        <h1>Home</h1>
      </header>
      Welcome to my website! A place for me to share my thoughts, particularly around software
      development and technology. I hope you find it useful and/or enjoyable.
      <section>
        <header>
          <h2>Recent posts</h2>
        </header>
        <PostSummaries postSummaries={props.loaderData.recentPosts} />
      </section>
    </article>
  )
}
