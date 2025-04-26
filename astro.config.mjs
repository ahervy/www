import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://arnaudhervy.com';
const excludedPaths = ['/samples/how-to/', '/samples/user-guide/'];

export default defineConfig({
  output: 'static',
  site,
  integrations: [
    sitemap({
      filter: (page) => !excludedPaths.includes(new URL(page).pathname),
    }),
  ],
});
