# cli/

The `9router` npm package: a CommonJS CLI that installs, starts, updates, and supervises the local 9Router server and desktop tray. It has its own `package.json`, version, and build; do not couple it to the root package's release.

## Commands

```bash
cd cli
npm install
npm run dev             # nodemon watch on cli.js, src/, hooks/
npm run build           # esbuild bundle into cli/app
npm run pack:cli        # build + npm pack --pack-destination ..
npm run publish:cli     # build + npm publish
```

From the repo root, `npm run cli:pack` runs the same build and pack flow.

## Layout

- `cli.js` — entrypoint: argument parsing, server supervision, and update checks.
- `src/cli/` — commands, menus, API client, and terminal UI.
- `hooks/` — postinstall and runtime setup for SQLite and the tray.
- `scripts/` — build scripts.

## Naming conventions

The repo-wide conventions in `../AGENTS.md` apply here and are enforced by `eslint.naming.mjs`:

- `camelCase` variables, parameters, functions, and methods.
- `PascalCase` classes and constructor functions.
- `UPPER_SNAKE_CASE` module constants.
- File names are lowercase or camelCase (`cli.js`, `connectTools.js`, `postinstall.js`).
- OAuth and tool payload keys keep their upstream spelling (`device_code`, `verification_uri`); alias them to `camelCase` locals:
  `const deviceCode = deviceData.device_code;`
- Leading `_` is allowed for internal helpers.

Run `npm run lint:naming` from the repo root to check the whole repository, or `npx eslint cli` for this package.
