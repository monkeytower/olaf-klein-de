import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), keystatic(), markdoc()],
  adapter: node({
    mode: 'standalone'
  })
});