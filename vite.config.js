import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Ensure JSON data files are bundled for production
  build: {
    assetsInclude: ['src/data/**/*.json'],
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
});
