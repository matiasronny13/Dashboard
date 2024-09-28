import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/dashboard',
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:5000/",
                changeOrigin: true,
                //rewrite: (path) => path.replace(/\/dashboard/, ''),
                secure: false
            }
        }
    }
})
