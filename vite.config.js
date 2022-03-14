import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.json', '.js', '.jsx', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/styles/global.scss";'
      }
    }
  },
  plugins: [vue()]
})
