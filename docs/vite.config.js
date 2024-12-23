import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/AASTU-PC-Registration/", // Set this to '/<repository-name>/'
  build: {
    outDir: "dist", // Ensure build output goes to 'dist'
  },
});
