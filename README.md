# pulse-site

SvelteKit 3 + TypeScript. Node 24 (`.nvmrc`), pnpm (`packageManager` in `package.json`).

```sh
pnpm install
pnpm dev          # dev server
pnpm check        # svelte-check
pnpm lint         # prettier + eslint
pnpm build        # production build
pnpm preview      # build, then serve it in the Workers runtime (wrangler dev)
pnpm run deploy   # build and deploy to Cloudflare (`pnpm deploy` is a pnpm built-in)
pnpm dlx sv add   # add integrations (tailwindcss, vitest, adapters, ...)
```
