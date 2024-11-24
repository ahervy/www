import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

const site = 'https://arnaudhervy.com';
const excludedPages = [
  `${site}/samples/how-to/`,
  `${site}/samples/user-guide/`
];

export default defineConfig({
  output: 'hybrid',
  adapter: netlify(),
  site,
  integrations: [
    sitemap({
      filter: (page) => !excludedPages.includes(page),
    }),
  ],
  security: {
    checkOrigin: true,
  },
});