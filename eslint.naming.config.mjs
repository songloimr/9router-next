import { defineConfig, globalIgnores } from "eslint/config";
import { namingRules } from "./eslint.naming.mjs";
import { commonJsFiles, lintedFiles, lintIgnores, sharedLanguageOptions } from "./eslint.shared.mjs";

/*
 * Naming-only config used by `npm run lint:naming`. Keeping it separate from
 * the full Next.js config lets the naming gate run without being drowned out
 * by unrelated React hook findings in dashboard components.
 */
export default defineConfig([
  {
    files: lintedFiles,
    languageOptions: sharedLanguageOptions,
    rules: namingRules,
  },
  // The CLI, custom server, and CommonJS scripts allow top-level return.
  {
    files: commonJsFiles,
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  // Ignore inline directives from the full config: their plugins (react-hooks,
  // @next/next, @typescript-eslint) are intentionally not loaded here, and the
  // naming gate must not be disabled inline.
  {
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: "off",
    },
  },
  globalIgnores(lintIgnores),
]);
