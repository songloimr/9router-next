// Ambient declarations for runtime dependencies that do not ship their own types.
// Keep this file limited to modules used by files in the `tsconfig.json` include
// list; add a declaration here when a newly typed module imports an untyped package.

declare module "node-machine-id" {
  /**
   * Return the stable machine id for the current host.
   * @param original Return the raw id instead of the hashed id.
   */
  export function machineIdSync(original?: boolean): string;

  /**
   * Async variant of {@link machineIdSync}.
   * @param original Return the raw id instead of the hashed id.
   */
  export function machineId(original?: boolean): Promise<string>;
}
