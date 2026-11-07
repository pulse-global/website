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
