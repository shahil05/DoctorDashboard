import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

export default defineConfig({
  build: {
    outDir: "build", // ✅ Keep this to match your vercel.json
    chunkSizeWarningLimit: 2000,
  },
  base: './', // ✅ Change from empty string to './'
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: 4028, // ✅ Change from string to number
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  }
});