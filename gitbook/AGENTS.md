# gitbook/

`9router-docs`, a static Next.js documentation site. It builds to `out/` and is deployed to GitHub Pages.

## Commands

```bash
cd gitbook
npm install
npm run dev       # http://localhost:3001
npm run build     # static export into gitbook/out
npm run deploy    # build + wrangler pages deploy
```

CI: `.github/workflows/gitbook-pages.yml` builds and deploys on pushes to `main` or `master` that touch `gitbook/`.

## Layout

- `app/[lang]/page.js` and `app/[lang]/[...slug]/page.js` — localized doc routes.
- `components/` — React components, one PascalCase file per component.
- `constants/` — docs navigation and language configuration.
- `lib/` and `utils/` — content loading and markdown helpers.
- `content/<lang>/` — Markdown source; file names and slugs are kebab-case.

## Naming conventions

The repo-wide conventions in `../AGENTS.md` apply here and are enforced by `eslint.naming.mjs`:

- `camelCase` variables, parameters, functions, and methods.
- `PascalCase` React components and their files (`DocsSidebar.js`, `LanguageSwitcher.js`).
- `UPPER_SNAKE_CASE` module constants (`SECTION_ICONS`, `DEFAULT_LANG`).
- Helper modules use `camelCase` file names (`content.js`, `markdown.js`).
- Markdown files use kebab-case (`getting-started.md`, `other-tools.md`).
- Keep the `lang` and `slug` contract used by the content loader; alias snake_case data fields when they cross into internal variables.

Run `npm run lint:naming` from the repo root to check the whole repository, or `npx eslint gitbook` for this package.
