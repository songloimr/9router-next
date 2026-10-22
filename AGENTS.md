# AGENTS.md

Guidance for autonomous agents working in this repository. `CLAUDE.md` carries the same architecture summary for Claude Code; `docs/ARCHITECTURE.md` and `open-sse/AGENTS.md` go deeper.

## What this is

9Router (`9router-app`) is a local AI routing gateway plus a Next.js dashboard. It exposes an OpenAI-compatible `/v1/*` API and routes requests across 40+ providers with format translation, combo/account fallback, OAuth/API-key credentials, token refresh, and usage tracking.

The repository contains three apps and one independent test package:

- Root `package.json` (`9router-app`) — dashboard and gateway.
- `cli/` (published as `9router` on npm) — CLI launcher and tray; independent version and build.
- `gitbook/` (`9router-docs`) — static Next.js documentation site.
- `tests/` — Vitest suite that imports the root app and `open-sse/`.

## Setup and commands

### Dashboard/gateway (repo root)

```bash
cp .env.example .env
npm install
npm run dev                             # webpack dev server on http://localhost:20127
npm run build && PORT=20128 npm start   # production on http://localhost:20128
```

- Dashboard: `http://localhost:20127/dashboard` in dev, `http://localhost:20128/dashboard` in production.
- API: `/v1` (rewritten to `/api/v1`).
- Default dashboard password is `123456` via `INITIAL_PASSWORD`; set a real value in `.env`.
- Bun variants: `npm run dev:bun`, `build:bun`, `start:bun`.

### Tests

```bash
npm install                 # root deps first
cd tests && npm install     # Vitest deps
cd tests && npx vitest run  # full suite
cd tests && npx vitest run unit/capabilities.test.js
```

The suite is not all-green on a clean checkout (roughly 64 expected failures). Compare against `tests/__baseline__/known-fails.txt` and `tests/__baseline__/verify-no-regression.mjs` instead of treating every red test as a regression. `tests/unit/embeddings.cloud.test.js` always fails because the upstream `cloud/` worker directory is not part of this repository.

### CLI

```bash
cd cli && npm install
npm run dev          # nodemon watch
npm run build        # bundle into cli/app
npm run pack:cli     # build + npm pack
```

From the repo root, `npm run cli:pack` runs the same build and pack flow.

### GitBook

```bash
cd gitbook && npm install
npm run dev          # http://localhost:3001
npm run build        # static export into gitbook/out
```

## Naming conventions (enforced)

These rules apply to every JavaScript file in the repository: root `src/`, `open-sse/`, `cli/`, `gitbook/`, `scripts/`, and `tests/`. They are defined in `eslint.naming.mjs` and applied by both `eslint.config.mjs` and `eslint.naming.config.mjs`.

| Kind | Convention | Examples |
| --- | --- | --- |
| Variables, parameters, functions, methods | `camelCase` | `responseFormat`, `getExecutor`, `parseModel` |
| Classes, constructors, React components | `PascalCase` | `DefaultExecutor`, `ProviderCard` |
| Module-level constants | `UPPER_SNAKE_CASE` | `DEFAULT_PORT`, `MAX_RETRIES` |
| React hooks | `use` prefix | `useModelSelect`, `useProviders` |
| Private/internal helpers | Leading `_` allowed | `_refreshAccessToken` |
| Test files | `*.test.js` under `tests/` | `unit/capabilities.test.js` |
| Next.js App Router files | Framework names | `page.js`, `layout.js`, `route.js` |
| React component files | `PascalCase.js` | `ModelSelectModal.js` |
| Other modules | `camelCase.js` or kebab-case provider ids | `chatCore.js`, `alicode-intl.js` |

Upstream wire fields are the deliberate exception. Object keys and destructured payloads keep the provider's spelling (`response_format`, `tool_calls`, `access_token`). When a value is used as an internal variable, alias it at the boundary:

```js
const { response_format: responseFormat } = body;
```

Do not introduce new snake_case internal identifiers. If a new provider field must stay snake_case, keep it as an object key and alias the local binding.

Run the naming check with:

```bash
npm run lint:naming
```

## Complexity (enforced)

Every JavaScript file is checked by ESLint's core `complexity` rule with a maximum of 20 (defined in `eslint.complexity.mjs`). Functions that predate the rule are recorded in `eslint-suppressions.json` using ESLint's bulk-suppression format, so the gate fails on new or worsened complexity without blocking work on legacy code.

```bash
npm run lint:complexity         # fail on new over-limit functions
npm run lint:complexity:update  # after refactoring: rewrite and prune the debt ledger
```

Do not add suppressions by hand. Refactor the function instead; when a counted function drops below the threshold, run the update command so `eslint-suppressions.json` shrinks. `npx eslint .` applies the same rule, so a new over-limit function also fails the full lint.

For the full config, use `npx eslint <paths>` on the files you changed. The full run also surfaces pre-existing `react-hooks` findings in dashboard components, so judge regressions from the files you touched rather than the total error count.

## Architecture pointers

- Request flow: `src/app/api/v1/*` → `src/sse/handlers/chat.js` → `open-sse/handlers/chatCore.js` → executors and translators.
- `open-sse/` is the provider-agnostic engine; read `open-sse/AGENTS.md` before editing it.
- State is SQLite under `src/lib/db/` with a driver fallback chain. Import new code from `@/lib/db/index.js`; `src/lib/localDb.js` is a compatibility shim.
- Provider registry files live in `open-sse/providers/registry/`; `registry/index.js` is generated, so do not hand-edit it.
- Translators self-register in `open-sse/translator/index.js`; a new translator that is not imported there never runs.

## Security and data handling

- Never commit `.env`, credentials, tokens, or generated databases.
- `custom-server.js` derives client IPs from the TCP socket and ignores attacker-controlled `X-Forwarded-For` unless the request came through a loopback proxy. Preserve that behavior when touching request/IP/rate-limit code.
- Override `INITIAL_PASSWORD`, `JWT_SECRET`, `API_KEY_SECRET`, and `MACHINE_ID_SALT` outside local development.
- Treat provider responses and user content as untrusted; keep the existing redaction and masking in logs intact.

## More documentation

- `CLAUDE.md` — command and architecture summary.
- `docs/ARCHITECTURE.md` — full request lifecycle, fallback, OAuth, cloud sync, and data model.
- `open-sse/AGENTS.md` — engine conventions and how to add providers, executors, and translators.
- `cli/AGENTS.md` and `gitbook/AGENTS.md` — package-specific paths, commands, and naming notes.
