import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function singleFileHtml(): Plugin {
  return {
    name: 'single-file-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const htmlAsset = Object.values(bundle).find(
        (item) => item.type === 'asset' && item.fileName.endsWith('.html'),
      )

      if (!htmlAsset || htmlAsset.type !== 'asset' || typeof htmlAsset.source !== 'string') {
        return
      }

      let html = htmlAsset.source

      for (const item of Object.values(bundle)) {
        if (item.type === 'chunk' && item.fileName.endsWith('.js')) {
          html = html.replace(
            new RegExp(`<script[^>]+src=["']\\.?/?${item.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*></script>`),
            () => `<script type="module">${item.code}</script>`,
          )
          delete bundle[item.fileName]
        }

        if (item.type === 'asset' && item.fileName.endsWith('.css')) {
          html = html.replace(
            new RegExp(`<link[^>]+href=["']\\.?/?${item.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`),
            () => `<style>${item.source}</style>`,
          )
          delete bundle[item.fileName]
        }
      }

      htmlAsset.source = html
    },
  }
}

export default defineConfig({
  base: './',
  build: {
    assetsInlineLimit: 100_000_000,
    copyPublicDir: false,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    singleFileHtml(),
  ],
})
