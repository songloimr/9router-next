/**
 * @param {unknown} data
 * @returns {string}
 */
export function sseChunk(data) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

/**
 * Build OpenAI chat.completion.chunk SSE frame. Key order: id, object, created, model, choices.
 * @param {{
 *   id: string,
 *   created: number,
 *   model: string,
 *   delta: Record<string, unknown>,
 *   finishReason?: string|null
 * }} params
 * @returns {string}
 */
export function chatChunkSse({ id, created, model, delta, finishReason = null }) {
  return sseChunk({
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  });
}
