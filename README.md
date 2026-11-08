# arnaudhervy.com

Minimal personal website for Arnaud Hervy.

## Stack

- Astro
- Static HTML and CSS
- Cloudflare Pages deployment

## Development

Requires Node.js 24.16.0 or later within the Node 24 release line.

    npm install
    npm run dev

## Build

    npm run build

## Live

[arnaudhervy.com](https://arnaudhervy.com)

## Validation

    npm ci
    npx playwright install --only-shell chromium
    npm run format:check
    npm run lint
    npm run build
    npm test
    npm run test:browser

Browser tests use port 4321. On Linux, add `--with-deps` when installing Chromium.

CI checks generated output and desktop/mobile browser behavior. Cloudflare
headers, redirects, caching and missing-route statuses require deployment
testing, which is not implemented here.
