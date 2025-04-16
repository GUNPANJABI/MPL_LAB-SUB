import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto", // ✅ ensures service worker gets injected

      srcDir: "dev-dist",
      filename: "sw.js", // ✅ your custom service worker file

      devOptions: {
        enabled: true,
        type: "module",
      },

      manifest: {
        name: "Xchange",
        short_name: "XC",
        start_url: "./",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4a90e2",
        description: "An amazing PWA built with Vite!",
        icons: [
          {
            src: "public/icons8-money-192_imresizer.jpg",
            sizes: "192x192",
            type: "image/jpg",
          },
          {
            src: "public/icons8-money-96_imresizer.jpg",
            sizes: "512x512",
            type: "image/jpg",
          },
        ],
      },
    }),
  ],
});
