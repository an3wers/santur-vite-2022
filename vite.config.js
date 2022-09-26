import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      // targets: ["defaults", "not IE 11"],
    }),
  ],
  build: {
    // target: ["es2015"],
    // polyfillModulePreload: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000
  }
});
