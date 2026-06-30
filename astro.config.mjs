// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Dominio canónico del sitio
const SITE_URL = 'https://www.mitinteriorismo.studio';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    build: {
      cssCodeSplit: true,
    },
    ssr: {
      noExternal: ['gsap', 'lenis'],
    },
  },
  compressHTML: true,
  experimental: {},
});