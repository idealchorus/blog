import type { Config } from "@react-router/dev/config"
import { readdir } from "node:fs/promises"

export default {
	ssr: true,
	async prerender() {
		const postsDir = await readdir("./app/posts")
		const postPaths = postsDir
			.filter((file) => file.endsWith(".md"))
			.map((file) => `/posts/${file.replace(".md", "")}`)

		return ["/about", ...postPaths]
	},
} satisfies Config
