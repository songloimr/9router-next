/*
 * Shared cyclomatic-complexity policy for every JavaScript package in the
 * repository. The ESLint core `complexity` rule counts independent paths
 * through a function; keeping functions at or below 20 keeps them reviewable
 * and testable. The dashboard, provider executors, and translators all use
 * the same ceiling.
 *
 * Functions that predate this gate are recorded in `eslint-suppressions.json`
 * using ESLint's bulk-suppression format. That file is a debt ledger, not a
 * permanent exemption: refactor a function, then run
 * `npm run lint:complexity:update` to shrink it. Any new or modified function
 * that exceeds the threshold fails `npm run lint:complexity` and `eslint .`.
 */
export const complexityRules = {
  complexity: ["error", { max: 20 }],
};
