import { readdir } from "node:fs/promises"
import Markdoc from "@markdoc/markdoc"
import type { Route } from "./+types/posts._index"
import { postFrontMatterSchema, postSummarySchema } from "~/library/schemas"
import React from "react"

export async function loader() {
	const postsDir = await readdir("./app/posts")

	const postFileNames = postsDir.filter((file) => file.endsWith(".md"))

	const postFiles = await Promise.all(
		postFileNames.map((file) => Bun.file(`./app/posts/${file}`).text()),
	)

	const postAsts = postFiles.map((post) => Markdoc.parse(post))

	const posts = postAsts.map((ast) => {
		const frontMatter = postFrontMatterSchema.parse(Bun.YAML.parse(ast.attributes.frontmatter))

		const post = frontMatter.postType === 'nibble' ? {
			...frontMatter,
			body: Markdoc.transform(ast)
		} : frontMatter

		return postSummarySchema.parse(post)
	})

	return { posts }
}

export default function PostsPage(props: Route.ComponentProps) {
	return (
		<div>
			<h1 className="font-mono text-4xl md:text-5xl">Posts</h1>
			<ul>
				{props.loaderData.posts.map((post) => (
					post.postType === 'nibble' ? (
						<li key={post.slug}>
              {post.contentType === "static"
                ?
                  Markdoc.renderers.reactStatic(post.body)
                : Markdoc.renderers.react(post.body, React)}
						</li>
					) : (
						<li key={post.slug}>
							<div>{post.title}</div>
							<div>{post.description}</div>
						</li>
					)
				))}
			</ul>
		</div>
	)
}
