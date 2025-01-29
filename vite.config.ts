import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html")
    },
    manifest: true, // Ensures Vite generates a manifest for Electron
  },
  base: "./", // Ensure Electron loads assets correctly
});
