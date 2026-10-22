/*
 * Shared naming policy for every JavaScript package in the repository:
 * dashboard/gateway (src/), open-sse/, cli/, gitbook/, scripts/, and tests/.
 *
 * The conventions are documented in AGENTS.md. External wire formats are
 * deliberately exempt: props and payload fields that mirror provider APIs
 * (for example `response_format`, `prompt_tokens`, or `tool_result`) keep
 * their upstream snake_case spelling. Internal variables are camelCase and
 * are renamed at the boundary when practical.
 *
 * This is plain JavaScript, so we use ESLint's core `camelcase` and `new-cap`
 * rules. `@typescript-eslint/naming-convention` would require type-aware
 * parser services and a tsconfig that do not exist for these sources.
 *
 * The file scope and parser settings shared with the other focused configs
 * live in eslint.shared.mjs.
 */
export const namingRules = {
  // camelCase for variables, functions, parameters, and classes.
  // UPPER_CASE constants and leading/trailing underscores are allowed by the
  // rule. Data properties (object keys and destructured payload fields) are
  // exempt because they mirror external JSON.
  camelcase: [
    "error",
    {
      properties: "never",
      ignoreDestructuring: true,
    },
  ],
  // Constructors must be PascalCase: `new DefaultExecutor()`, not `new defaultExecutor()`.
  "new-cap": [
    "error",
    {
      newIsCap: true,
      capIsNew: false,
      properties: false,
    },
  ],
};
