import { parse } from "@std/yaml"
import { postFrontmatterSchema, postSummarySchema } from "../library/schemas.ts"
import Markdoc from "@markdoc/markdoc"
import type { Route } from "../../.react-router/types/app/routes/+types/index.ts"
import PostSummary from "../components/post-summary.tsx"

export async function loader() {
  const postsDir = Deno.readDir("./app/posts")

  const rawPosts: { slug: string; content: string }[] = []
  for await (const maybePost of postsDir) {
    if (maybePost.isFile && maybePost.name.endsWith(".md")) {
      const rawPost = await Deno.readTextFile(`./app/posts/${maybePost.name}`)

      rawPosts.push({
        slug: maybePost.name.replace(".md", ""),
        content: rawPost,
      })
    }
  }

  const postSummaries = rawPosts.map((rawPost) => {
    const ast = Markdoc.parse(rawPost.content)

    const frontMatter = postFrontmatterSchema.parse(
      parse(ast.attributes.frontmatter),
    )

    return postSummarySchema.parse({
      ...frontMatter,
      slug: rawPost.slug,
    })
  }).sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())

  return { recentPosts: postSummaries.slice(0, 3) }
}

export default function HomePage(props: Route.ComponentProps) {
  return (
    <article className="page">
      <header>
        <h1>Home</h1>
      </header>
      Welcome to my website! A place for me to share my thoughts, particularly
      around software development and technology. I hope you find it useful
      and/or enjoyable.
      <section>
        <header>
          <h2>Recent posts</h2>
        </header>
        <ul className="flex flex-col divide-y divide-sky-950">
          {props.loaderData.recentPosts.map((postSummary) => (
            <PostSummary key={postSummary.slug} postSummary={postSummary} />
          ))}
        </ul>
      </section>
    </article>
  )
}
