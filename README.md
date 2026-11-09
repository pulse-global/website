# pulse-site

SvelteKit 3 + TypeScript. Node 24 (`.nvmrc`), pnpm (`packageManager` in `package.json`).

```sh
pnpm install
pnpm dev          # dev server
pnpm check        # svelte-check
pnpm lint         # prettier + eslint
pnpm build        # production build
pnpm preview      # preview the build
pnpm run deploy   # build and deploy to Cloudflare (`pnpm deploy` is a pnpm built-in)
pnpm dlx sv add   # add integrations (tailwindcss, vitest, adapters, ...)
```

## Deploy

Static build (`adapter-static`, output in `build/`) served by a Cloudflare Worker with static
assets: https://pulse-site.acc-425.workers.dev. `pnpm run deploy` builds here and uploads with the
`cf` CLI from `deploy/`, a small workspace package holding the Worker config
(`cloudflare.config.ts`, plus `wrangler.config.ts` pointing at `../build`). It lives in its own
folder because `cf` does not support SvelteKit projects yet and refuses to deploy from the root.

## Pages and files

- `/` (`src/routes/+page.svelte`): the landing page, with schema.org structured data (company, founder,
  official profiles in `sameAs`) and footer icons from `src/lib/socials.ts`.
- `/news` and `/news/<slug>`: company news from `src/lib/news.ts`, one prerendered page per item.
  Not linked from the homepage on purpose; add each new item to `static/sitemap.xml` and `static/llms.txt`.
- `/lukas`: the founder's profile page. Also not linked from the homepage; listed in the sitemap and
  llms.txt.
- `static/llms.txt`: plain-language facts for AI crawlers. `static/_headers` serves it and `robots.txt`
  as UTF-8.
- `static/bimi.svg`: the star as SVG Tiny PS, referenced by the BIMI DNS record
  (`default._bimi.pulse.city`). Keep the `version="1.2" baseProfile="tiny-ps"` root and the `<title>`.

Keep the company facts here in line with the public profiles. The source of truth is
`../identity-facts.md`.
