import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // یا @vitejs/plugin-react-swc

export default defineConfig({
  plugins: {
    tailwindcss: {}, 
    autoprefixer: {},
  },
  css: {
    postcss: "./postcss.config.js", // ✅ نام صحیح فایل
  },
  optimizeDeps: {
    include: ["react-toastify"],
  }, // ✅ کامای پایانی
});
