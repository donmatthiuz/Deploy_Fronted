import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true, 
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  define: {
    'process.env': {},
    global: 'window',
  },
  server: {
    allowedHosts: ['prontoexpress.org', 'localhost', '127.0.0.1'],
  }
});
