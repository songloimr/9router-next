import { defineConfig, globalIgnores } from "eslint/config";
import { commonJsFiles, lintedFiles, lintIgnores, sharedLanguageOptions } from "./eslint.shared.mjs";
import { complexityRules } from "./eslint.complexity.mjs";

/*
 * Complexity-only config used by `npm run lint:complexity`.
 *
 * Running this instead of the full Next.js config keeps the gate focused on
 * complexity: unrelated pre-existing React findings cannot hide a new
 * over-limit function, and legacy violations stay suppressed by
 * `eslint-suppressions.json`.
 */
export default defineConfig([
  {
    files: lintedFiles,
    languageOptions: sharedLanguageOptions,
    rules: complexityRules,
  },
  {
    files: commonJsFiles,
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  // Inline directives in the full config reference plugins (react-hooks,
  // @next/next, @typescript-eslint) that are not loaded here. Disable inline
  // configuration so those comments are ignored and complexity cannot be
  // bypassed with a local eslint-disable comment.
  {
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: "off",
    },
  },
  globalIgnores(lintIgnores),
]);
