/**
 * Resolve the canonical id for a combo member entry.
 * @param {string | { fullModel?: string, provider?: string, model?: string } | null | undefined} model
 * @returns {string | null}
 */
function comboModelId(model) {
  if (typeof model === "string") return model;
  if (typeof model?.fullModel === "string" && model.fullModel) return model.fullModel;
  if (typeof model?.provider === "string" && typeof model?.model === "string") {
    return `${model.provider}/${model.model}`;
  }
  return null;
}

module.exports = { comboModelId };
