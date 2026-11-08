# Cloudflare preview testing

Authenticated Cloudflare preview testing is not implemented. Current CI runs
credential-free validation and Chromium tests against a locally built site.

## What local checks cannot verify

Astro preview cannot verify Cloudflare response headers, redirects, caching or
missing-route HTTP status codes. Copying `_headers` and `_redirects` into `dist/`
does not prove that Cloudflare serves them correctly. A successful Pages build
also does not establish runtime correctness.

## Requirements for future deployment checks

- Target the exact preview deployment for the current PR commit, not a mutable
  branch alias or whichever deployment happens to be latest.
- Authenticate through Cloudflare Access while keeping credentials isolated from
  PR-controlled code, dependency installation and dependency scripts.
- Validate actual deployed responses, including authentication failures, headers,
  redirects, caching and custom 404 status behavior.

## Dependency update policy

Output-generating updates, including Astro and sitemap changes, remain manually
reviewed until appropriate deployment validation exists. Local checks provide a
foundation for selective tooling updates; they do not enable auto-merge.
