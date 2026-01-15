import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [react(), svgr()],
	css: {
		preprocessorOptions: {
			scss: {
				loadPaths: [path.resolve(__dirname, 'src/styles')],
			},
		},
	},
});
