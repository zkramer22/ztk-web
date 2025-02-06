import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
    server: {
        proxy: {
            "/api": "http://localhost:5000"
        }
    },
    plugins: [
        vue(),
        svgLoader(),
    ],
    base: '/',
    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
