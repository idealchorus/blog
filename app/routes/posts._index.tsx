import { file, YAML } from 'bun'
import { readdir } from "node:fs/promises"
import Markdoc from "@markdoc/markdoc"
import type { Route } from "./+types/posts._index"
import { postFrontMatterSchema, postSummarySchema } from "~/library/schemas"
import PostSummary from '~/components/post-summary'

export async function loader() {
	const postsDir = await readdir("./app/posts")

	const rawPosts = await Promise.all(postsDir
		.filter((fileName) => fileName.endsWith(".md"))
		.map<Promise<{ slug: string; content: string }>>((fileName) =>
			new Promise((resolve) => {
				const contentPromise = file(`./app/posts/${fileName}`).text()

				contentPromise.then((content) => {
					resolve({ slug: fileName.replace(".md", ""), content })
				})
			})
		))

	const postSummaries = rawPosts.map((rawPost) => {
		const ast = Markdoc.parse(rawPost.content)
		const frontMatter = postFrontMatterSchema.parse(YAML.parse(ast.attributes.frontmatter))

		return postSummarySchema.parse(({
			...frontMatter,
			slug: rawPost.slug,
		}))
	})

	return postSummaries
}

export default function PostsPage(props: Route.ComponentProps) {
	return (
		<article>
			<header>
				<h1>Posts</h1>
			</header>
			<ul className="flex flex-col gap-3">
				{props.loaderData.map((postSummary) => (
					<PostSummary key={postSummary.slug} postSummary={postSummary} />
				))}
			</ul>
		</article>
	)
}
