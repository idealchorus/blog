import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [reactRouter(), tsconfigPaths()],
	// resolve: {
	// 	alias: {
	// 		// TODO - Remove this at some point when the issue is fixed
	// 		"react-dom/server": "react-dom/server.node",
	// 	},
	// },
});
