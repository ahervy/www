import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

const site = 'https://arnaudhervy.com';
const excludedPaths = ['/samples/how-to/', '/samples/user-guide/'];

export default defineConfig({
  output: 'static',
  adapter: netlify(),
  site,
  integrations: [
    sitemap({
      filter: (page) => !excludedPaths.includes(new URL(page).pathname),
    }),
  ],
});
