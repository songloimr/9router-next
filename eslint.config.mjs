import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import { complexityRules } from "./eslint.complexity.mjs";
import { namingRules } from "./eslint.naming.mjs";
import { lintedFiles, lintIgnores } from "./eslint.shared.mjs";

// Naming and complexity conventions are documented in AGENTS.md. Both apply
// to every hand-written JavaScript file in the repository.
const eslintConfig = defineConfig([
  ...nextVitals,
  {
    files: lintedFiles,
    rules: {
      ...namingRules,
      ...complexityRules,
    },
  },
  globalIgnores(lintIgnores),
]);

export default eslintConfig;
