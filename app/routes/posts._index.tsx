import { readdir } from "node:fs/promises"
import Markdoc from "@markdoc/markdoc"
import type { Route } from "./+types/posts._index"

export async function loader() {
	const postsDir = await readdir("./app/posts")

	const postFiles = postsDir.filter((file) => file.endsWith(".md"))

	const posts = await Promise.all(
		postFiles.map((file) => Bun.file(`./app/posts/${file}`).text()),
	)

	const postNodes = posts.map((post) =>
		Bun.YAML.parse(Markdoc.parse(post).attributes.frontmatter),
	)

	return { postNodes }
}

export default function PostsPage(props: Route.ComponentProps) {
	return (
		<div>
			<h1 className="font-mono text-4xl md:text-5xl">Posts</h1>
			<ul>
				{props.loaderData.postNodes.map((post) => (
					<>
						<pre>{JSON.stringify(post?.title, null, 2)}</pre>
					</>
				))}
			</ul>
		</div>
	)
}
