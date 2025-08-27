import {
	type RouteConfig,
	index,
	layout,
	prefix,
	route,
} from "@react-router/dev/routes"

export default [
	index("routes/index.tsx"),
	route("about", "routes/about.tsx"),
	...prefix("posts", [
		layout("routes/posts.tsx", [
			index("routes/posts._index.tsx"),
			route(":post", "routes/posts.$post.tsx"),
		]),
	]),
] satisfies RouteConfig
