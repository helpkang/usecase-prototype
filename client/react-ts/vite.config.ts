import { defineConfig, splitVendorChunkPlugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), splitVendorChunkPlugin()],
  server: {
    hmr: { overlay: true },
     proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: false,
        secure: false,
      },
    }
  },
});
