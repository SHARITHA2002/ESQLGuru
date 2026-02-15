export type ReviewEsqlRequest = {
  code: string;
  focus?: string[];
};

export function parseReviewEsqlRequest(body: unknown): ReviewEsqlRequest | null {
  if (!body || typeof body !== 'object') {
    return null;
  }

  const value = body as Record<string, unknown>;
  if (typeof value.code !== 'string' || value.code.trim().length === 0) {
    return null;
  }

  return {
    code: value.code,
    focus: Array.isArray(value.focus) ? value.focus.filter((item): item is string => typeof item === 'string') : undefined,
  };
}
