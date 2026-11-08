# Cloudflare preview testing design

This phase implements credential-free build and browser CI only. No preview
workflow, Access credential, Cloudflare configuration or branch protection is
created or changed. A green local preview is not a Cloudflare serving test.

## Known deployment contract

- Account: `be8efdf4501bdc37efce0185cdb0a295`.
- Pages project: `www`, production branch `main`, output `dist`.
- Preview deployment hosts: `<deployment-id>.www-9zf.pages.dev`.
- Access application: `17371574-f9c9-4102-a750-0908985577c3`, protecting
  `*.www-9zf.pages.dev`. The audited policy permits an email identity, not CI.
- Production origin for canonical, JSON-LD, robots and sitemap URLs:
  `https://arnaudhervy.com` even when testing a preview host.

Use an immutable deployment URL, never a mutable branch alias or the latest
deployment. The retired contact Worker is not part of this application.

## Access and GitHub configuration needed later

An administrator must create an expiring Access service token dedicated to
preview checks, and add a **Service Auth** policy to the existing preview Access
application. Include only that token; retain the existing human policy. Do not
expose previews publicly or grant the token production access. Verify application
overlap, token expiry, and rotation ownership before use.

Store these in a protected GitHub environment named `cloudflare-preview`, with
deployment limited to trusted default-branch workflows:

- `CF_ACCESS_CLIENT_ID` and `CF_ACCESS_CLIENT_SECRET`: service-token credentials.
- `CF_PAGES_READ_TOKEN`: an API token restricted to this account, with Pages Read
  only, for discovering and validating deployment metadata.

Account ID and project name are non-secret environment variables. The HTTP probe
sends `CF-Access-Client-Id` and `CF-Access-Client-Secret` to the exact authorized
preview host only. Cloudflare documents the necessary
[Service Auth policy and headers](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/).

## Separate trusted probe from untrusted code

Never add these credentials to `ci.yml`, a PR build, `npm ci`, dependency scripts,
Astro configuration, or this repository's PR-controlled Playwright tests. Do not
execute PR code using `pull_request_target` or a privileged `workflow_run` job.

Implement a future default-branch-controlled HTTP probe, for example triggered
after the CI workflow completes via `workflow_run`. It should:

1. Validate the triggering workflow ID, repository, event, PR association and
   successful conclusion using GitHub APIs. Resolve the current PR head SHA and
   ensure it is the revision covered by CI; reject stale/rebased runs. Require
   base `main`. Apply an explicit fork/actor policy rather than trusting labels.
2. Poll the Pages API with a bounded timeout for a successful **preview**
   deployment whose GitHub source owner/repository is `ahervy/www` and
   `deployment_trigger.metadata.commit_hash` exactly equals the accepted PR head
   SHA. Recheck the PR head before publishing results. Failure, missing deployment,
   timeout or a new head must prevent a passing check.
3. Derive the hostname from that API deployment's short ID and the fixed
   `www-9zf.pages.dev` suffix. Require HTTPS, the exact host, default port and no
   userinfo. Never use a URL from a PR body, branch name, check description or
   downloaded artifact. Treat all metadata as untrusted input.
4. Run only a small reviewed HTTP harness from the protected default branch or a
   separately trusted repository. Use the runner's standard HTTP tooling; do not
   install dependencies, check out a PR revision, restore PR caches, download and
   execute PR artifacts, source environment files, or run returned content.
5. Keep Access credentials scoped to individual requests to that one host. Do not
   follow redirects automatically: inspect Location, validate the next host, and
   never forward credentials across origins. Fetch only fixed paths. Apply body
   and request/time limits. Do not log authorization headers, cookies or secrets.
6. Return a stable **Cloudflare preview** check against the verified PR head SHA,
   with minimal reporting permission. Keep the Cloudflare API token confined to
   metadata discovery and the Access token confined to probes. If a GitHub App is
   needed to publish the check, grant Checks write only for this repository.

The privileged harness must not launch a browser against PR HTML with Access
credentials: page code, request routing and diagnostics create credential exposure
risks. Browser coverage stays in the unprivileged local build job in this phase.
Any later authenticated browser design needs its own security review. Human
review is required for changes to this trusted harness and its workflow.

## Assertions on the exact preview

- `/` is 200 with expected content, production canonical and valid Person JSON-LD.
- A fixed nonexistent path is 404 with the custom error page, `noindex` and no
  canonical. A 200 homepage fallback is a failure.
- `/about`, `/about/`, `/contact`, `/contact/` each return 301 with Location `/`.
- The expected CSP, HSTS, frame, content-type, referrer and permissions headers
  appear on relevant responses. Check actual responses, not copied config files.
- Robots, sitemap index and sitemap are 200 and reference the production origin;
  the 404 is excluded. Manifest/icons load with expected content types.
- Homepage cache headers require revalidation; missing-page responses are not
  cached. Reject an Access login redirect, 401/403, or login HTML masquerading as
  application success. Never loosen the test to accept authentication failure.

The Pages deployment check proves upload/build success, not these assertions.
Build-time tests verify `_headers` and `_redirects` copy correctly; Astro preview
does not reproduce Cloudflare's header, redirect, cache or missing-route behavior.

## Gate policy and limits

Propose **Site validation** and **Browser smoke** as required checks for
allowlisted tooling patches. Before auto-merging Astro/sitemap patches, also
require **Cloudflare preview** on the exact PR head. Until that trusted probe is
implemented and proven, keep output-generating dependency updates manually
reviewed. Major changes and mixed-risk groups retain human review.

Preview hosts do not exercise production zone DNS/TLS, `www`/HTTP redirects,
production-only WAF/Access rules or all cache locations. Maintain separate
read-only production probes for those contracts. Neither suite proves dependency
trustworthiness or prevents future Cloudflare configuration drift. GitHub-hosted
Linux CI remains necessary even when the suite passes locally on macOS.
