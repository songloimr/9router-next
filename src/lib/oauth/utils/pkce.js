import crypto from "crypto";

/**
 * Generate PKCE code verifier (43-128 characters)
 *
 * @param {number} [bytes=32] number of random bytes (xAI uses 96)
 * @returns {string}
 */
export function generateCodeVerifier(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url");
}

/**
 * Generate PKCE code challenge from verifier (S256 method)
 * @param {string} verifier
 * @returns {string}
 */
export function generateCodeChallenge(verifier) {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

/**
 * Generate random state for CSRF protection
 * @returns {string}
 */
export function generateState() {
  return crypto.randomBytes(32).toString("base64url");
}

/**
 * Generate complete PKCE pair
 * @param {number} [bytes=32]
 * @returns {{ codeVerifier: string, codeChallenge: string, state: string }}
 */
export function generatePKCE(bytes = 32) {
  const codeVerifier = generateCodeVerifier(bytes);
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();

  return {
    codeVerifier,
    codeChallenge,
    state,
  };
}
