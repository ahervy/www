import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  site: 'https://arnaudhervy.com',
  integrations: [sitemap()],
});