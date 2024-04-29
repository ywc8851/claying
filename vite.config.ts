import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default () => {
	return defineConfig({
		plugins: [svgr(), react()],
		resolve: {
			alias: [
				{ find: "@", replacement: resolve(__dirname, "src") },
				{ find: "src", replacement: resolve(__dirname, "src/") },
			],
		},
		server: {
			proxy: {
				// proxy 관련 설정
			},
		},
	});
};
