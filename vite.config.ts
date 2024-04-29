import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default () => {
	return defineConfig({
		plugins: [svgr(), react()],
		resolve: {
			alias: {
				"@pages": resolve(__dirname, "src/pages"),
				"@components": resolve(__dirname, "src/components"),
				"@styles": resolve(__dirname, "src/styles"),
				"@store": resolve(__dirname, "src/store"),
				"@hooks": resolve(__dirname, "src/hooks"),
				"@type": resolve(__dirname, "src/type"),
				"@mocks": resolve(__dirname, "src/mocks"),
			},
		},
		server: {
			proxy: {
				// proxy 관련 설정
			},
		},
	});
};
