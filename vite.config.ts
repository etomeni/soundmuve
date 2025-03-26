import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      srcDir: 'src',
      filename: 'serviceWorker.ts',
      strategies: 'injectManifest',
      injectManifest: {
        swDest: "dist/serviceWorker.js",
      },
      manifest: {
        name: "SoundMuve",
        short_name: "Soundmuve",
        description: "Easily distribute your music to Spotify, Apple Music, TikTok, and all major platforms. Affordable music distribution for independent artists and labels. Start sharing your music worldwide today and connect with a global audience!",
        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        theme_color: "#FFB01F",
        background_color: "#FFFFE6",
        start_url: "/",
        // scope: "/",
        display: "standalone",
        orientation: "portrait",
      }

    })
  ],

  resolve: {
    alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
})