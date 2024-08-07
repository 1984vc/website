import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@library', replacement: fileURLToPath(new URL('./src/library', import.meta.url)) },
    ],
  },
  plugins: [
    react(),
    // scopeTailwind({react: true})
  ]

})
