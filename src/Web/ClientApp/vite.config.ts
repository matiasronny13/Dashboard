import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        global: 'globalThis',   //required by react-draft-wysiwyg text editor
    },
    server: {
        proxy: {
            "/api": {
                target: "https://localhost:7208/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false
            }
        }
    }
})
