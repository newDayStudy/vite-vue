import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import {
  createStyleImportPlugin,
  VantResolve,
  AndDesignVueResolve,
} from "vite-plugin-style-import";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".json", ".vue", ".js", ".jsx", ".tsx"],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        require("autoprefixer")({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
            "> 1%",
          ],
          grid: true,
        }),
        require("postcss-flexbugs-fixes"),
      ],
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    createStyleImportPlugin({
      resolves: [VantResolve(), AndDesignVueResolve()],
    }),
    viteMockServe({
      mockPath: "./src/mock",
      localEnabled: false,
    }),
  ],
});
