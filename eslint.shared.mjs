/*
 * Shared lint scope for every JavaScript package in the repository:
 * dashboard/gateway (src/), open-sse/, cli/, gitbook/, scripts/, and tests/.
 *
 * Keeping the file globs and ignores in one place means the naming,
 * complexity, and full configs always lint the same authored sources.
 * Generated output and framework artifacts are excluded because they are not
 * hand-written code.
 */
export const lintedFiles = ["**/*.{js,jsx,mjs,cjs}"];

export const lintIgnores = [
  // Generated output and framework artifacts.
  ".next/**",
  "out/**",
  "build/**",
  "next-env.d.ts",
  "cli/app/**",
  "cli/.tray-build/**",
  "gitbook/.next/**",
  "gitbook/out/**",
];

// Parser settings shared by the focused configs (naming, complexity). The
// full Next.js config supplies its own parser setup.
export const sharedLanguageOptions = {
  ecmaVersion: "latest",
  sourceType: "module",
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
};

// The CLI, custom server, and CommonJS scripts allow top-level return.
export const commonJsFiles = ["cli/**/*.js", "custom-server.js", "scripts/**/*.js"];
