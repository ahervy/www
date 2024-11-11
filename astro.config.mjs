import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: netlify(),
  site: 'https://arnaudhervy.com',
  integrations: [
    sitemap({
      filter: (page) =>
        page !== 'https://arnaudhervy.com/samples/how-to/' &&
        page !== 'https://arnaudhervy.com/samples/user-guide/'
    }),
  ],
  security: {
    checkOrigin: true
  },
});