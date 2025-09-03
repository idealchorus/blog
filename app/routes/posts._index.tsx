import { file, YAML } from 'bun'
import { readdir } from "node:fs/promises"
import Markdoc from "@markdoc/markdoc"
import type { Route } from "./+types/posts._index"
import { postFrontMatterSchema, postSummarySchema } from "~/library/schemas"
import PostSummary from '~/components/post-summary'

export async function loader() {
	const postsDir = await readdir("./app/posts")

	const postFileNames = postsDir.filter((file) => file.endsWith(".md"))

	const postFiles = await Promise.all(
		postFileNames.map((fileName) => file(`./app/posts/${fileName}`).text()),
	)

	const postAsts = postFiles.map((post) => Markdoc.parse(post))

	const postSummaries = postAsts.map((ast) => {
		const frontMatter = postFrontMatterSchema.parse(YAML.parse(ast.attributes.frontmatter))

		const post = frontMatter.postType === 'nibble' ? {
			...frontMatter,
			body: Markdoc.transform(ast)
		} : frontMatter

		return postSummarySchema.parse(post)
	})

	return { postSummaries }
}

export default function PostsPage(props: Route.ComponentProps) {
	return (
		<div>
			<h1 className="font-mono text-4xl md:text-5xl mb-6">Posts</h1>
			<ul className="flex flex-col gap-4">
				{props.loaderData.postSummaries.map((postSummary) => (
					<PostSummary key={postSummary.slug} postSummary={postSummary} />
				))}
			</ul>
		</div>
	)
}
