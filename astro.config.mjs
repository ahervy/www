import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://arnaudhervy.com';
const excludedPages = ['/samples/how-to/', '/samples/user-guide/'];

export default defineConfig({
  site,
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !excludedPages.includes(new URL(page).pathname),
    }),
  ],
});
