import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Offline support. `generateSW` + registerType 'autoUpdate' means the
    // service worker and its precache list are rebuilt from whatever is
    // actually in `dist/` on *every* `npm run build` — new pages, new
    // photos, new bundle hashes are automatically included with no manual
    // edits here, so future updates to the site stay offline-ready on
    // their own. `manifest: false` because public/manifest.json is
    // already hand-authored and linked from index.html.
    VitePWA({
      registerType: "autoUpdate",
      manifest: false,
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "robots.txt", "images/*"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,json}"],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // biography photos can run a few MB each
        navigateFallback: "/index.html",
        // Biography content is static and doesn't change per-visit, so
        // cache-first for everything already precached is safe and gives
        // instant offline loads.
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: "CacheFirst",
            options: { cacheName: "maar-journey-runtime" },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
