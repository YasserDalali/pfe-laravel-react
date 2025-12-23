## Overview

* Replace Next.js App Router with a vanilla React SPA built on Vite + TypeScript.

* Keep Tailwind, OpenAPI client, and existing UI/components; remove Next-only features.

* Target React 19 with simple client-side data fetching to keep code modular, documented, and easy to maintain.

## Target Stack

* Build tool: Vite (React + TS template)

* Routing: `react-router-dom`

* Styling: Tailwind CSS + existing `globals.css`

* Fonts: `@fontsource/plus-jakarta-sans`, `@fontsource/ibm-plex-mono`, `@fontsource/lora`

* Analytics: remove `@vercel/analytics/next` (optional replacement later)

* Env: `VITE_*` via `import.meta.env`

## Key Replacements

* `app/` file-system routes → React Router routes

* `next/navigation` (`useRouter`, `redirect`) → `react-router-dom` (`useNavigate`, `Navigate`, `Link`)

* `metadata` in `app/layout.tsx` → `<Helmet>` per page via `react-helmet-async`

* `next/font/google` → `@fontsource/*` imports + keep CSS variables (`--font-sans`, `--font-mono`, `--font-serif`)

* Implicit server components → explicit client components with client-side data fetching (`useEffect`)

* `process.env.NEXT_PUBLIC_*` → `import.meta.env.VITE_*`

## Project Structure (Vite)

```
client/
  index.html
  src/
    main.tsx
    App.tsx
    routes.tsx
    pages/
      Home.tsx         // from app/page.tsx
      Login.tsx        // from app/login/page.tsx
      Dashboard.tsx    // from app/dashboard/page.tsx
      Publications.tsx // from app/publications/page.tsx
      Researchers.tsx  // from app/researchers/page.tsx
      Teams.tsx        // from app/teams/page.tsx
    components/        // copy existing shared UI
    lib/               // keep OpenAPI client utilities
    styles/
      globals.css      // move app/globals.css here
```

## Migration Steps

1. Initialize Vite app (React + TS).

   * Add deps: `react-router-dom`, `react-helmet-async`, `@fontsource/*`, `tailwindcss`, `postcss`, `autoprefixer`.

   * Keep `react`/`react-dom` versions consistent with current project.
2. Configure Tailwind.

   * `tailwind.config.js` content scan: `index.html`, `src/**/*.{ts,tsx}`.

   * Import Tailwind directives and existing global styles in `src/styles/globals.css`; include in `main.tsx`.
3. Move assets and styles.

   * Copy `public/` assets if present; keep paths.

   * Move `app/globals.css` to `src/styles/globals.css`; preserve variables and classes.
4. Port layout and fonts.

   * Convert `app/layout.tsx` to `src/App.tsx` wrapping `HelmetProvider` and Router.

   * Replace `next/font/google` with `@fontsource` imports and apply CSS variables on `<html>`/`body`.

   * Remove `@vercel/analytics/next` for now.
5. Implement routing.

   * Create `routes.tsx` with route objects for `/`, `/login`, `/dashboard`, `/publications`, `/researchers`, `/teams`.

   * Replace all `next/navigation` usages with `react-router-dom` equivalents.
6. Port pages to React components.

   * Create `src/pages/*` from each `app/*/page.tsx` (add explicit client components).

   * Replace `loading.tsx` usages with local loading states or Suspense fallbacks.
7. Data fetching.

   * Keep existing OpenAPI client (`getApiClient()`), call inside `useEffect` in pages.

   * Ensure base URL/env pulled from `import.meta.env.VITE_API_BASE`.
8. SEO metadata.

   * Move `metadata` from Next into per-page `<Helmet>` tags.

   * Set defaults in `App.tsx` (title, description, icons where feasible).
9. Environment and config.

   * Create `.env` mapping `NEXT_PUBLIC_*` → `VITE_*`.

   * Remove Next plugin from `tsconfig`; set `jsx: react-jsx` and fix path aliases if used.

   * Delete `next.config.mjs` references; use Vite config if any alias/proxy needed.
10. Dev/prod parity.

* Add `vite.config.ts` proxy if calling a local backend (Laravel) to avoid CORS.

* Update `package.json` scripts: `dev`, `build`, `preview`.

1. Validate.

* Start dev server, navigate routes, verify data loads, styles, fonts, and metadata.

* Fix broken imports and image paths.

## File Mapping

* `app/page.tsx` → `src/pages/Home.tsx`

* `app/login/page.tsx` → `src/pages/Login.tsx`

* `app/dashboard/page.tsx` → `src/pages/Dashboard.tsx`

* `app/publications/{page.tsx,loading.tsx}` → `src/pages/Publications.tsx` (+ local loading)

* `app/researchers/{page.tsx,loading.tsx}` → `src/pages/Researchers.tsx` (+ local loading)

* `app/teams/{page.tsx,loading.tsx}` → `src/pages/Teams.tsx` (+ local loading)

* `app/layout.tsx` → `src/App.tsx` + `index.html` `<Helmet>` defaults

## OpenAPI Client & Backend

* Keep existing OpenAPI client and types.

* Point base URL to Laravel endpoints defined in `openapi.json` via `VITE_API_BASE`.

* Optional: Generate types from `openapi.json` (e.g., `openapi-typescript` or `orval`) later.

## Deliverables

* New `client/` Vite React app with routes/pages migrated.

* Tailwind configured, fonts loaded via `@fontsource`, SEO via Helmet.

* Working SPA calling the same APIs; envs migrated to `VITE_*`.

* Code simplified with modular structure and clear comments explaining replacements and rationale.

## Next

* On approval, I will scaffold the Vite app, migrate files, update imports and envs, and run the dev server to verify the migration end-to-end.

