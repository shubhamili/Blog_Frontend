
// https://vite.dev/config/
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})


// // vite.config.ts
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react'; // Only if you're using React
// import path from 'path';

// export default defineConfig({
//   plugins: [react()], // Optional: remove if not using React
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// });
