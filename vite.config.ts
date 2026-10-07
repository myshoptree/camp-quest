import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this app at https://myshoptree.github.io/camp-quest/,
// so every asset URL must be prefixed with /camp-quest/ in production builds.
// Dev stays at the root so `http://localhost:3000/` just works.
const BASE_PATH = '/camp-quest/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE_PATH : '/',
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      // Build as a static SPA (shell + JS) — GitHub Pages only serves statics.
      spa: {
        enabled: true,
      },
    }),
    viteReact(),
  ],
}))
