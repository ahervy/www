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

Use the Node version in `.node-version` and install locked dependencies:

    npm ci
    npx playwright install --only-shell chromium
    npm run lint
    npm run format:check
    npm run build
    npm test
    npm run test:browser

`npm run build` includes Astro checking. Both test commands inspect the production
build, so rebuild after changing source. Browser tests start and stop their own
Astro preview server on `127.0.0.1:4321`; keep that port free. On Linux, use
`npx playwright install --with-deps --only-shell chromium` to install system dependencies too.

The Node test runner checks generated content, SEO metadata, JSON-LD, assets,
Cloudflare configuration files and the static/no-application-JavaScript contract.
Chromium tests cover desktop and mobile rendering, asset loading, navigation,
keyboard skip links, overflow and browser errors. Tests avoid screenshots and do
not visit external profile sites.

GitHub Actions runs on every PR targeting `main` and every push to `main`, with
read-only repository permissions and no deployment credentials. Proposed required
status checks are **Site validation** and **Browser smoke**; the browser job runs
only after validation passes and rebuilds locally to avoid artifact handoff.
Failures are reported in the Actions job log. `test-results/` is local, ignored
diagnostic output, not a published artifact.

Require both checks before considering allowlisted tooling patch updates for
auto-merge. Astro and sitemap updates should additionally require exact-commit
Cloudflare preview checks. No auto-merge or protection settings are changed here.
See [Cloudflare preview testing](docs/cloudflare-preview-testing.md) for the
separate, credential-isolated design and current limitations.
