export type ValidateEsqlRequest = {
  code: string;
  ruleProfile?: string;
};

export function parseValidateEsqlRequest(body: unknown): ValidateEsqlRequest | null {
  if (!body || typeof body !== 'object') {
    return null;
  }

  const value = body as Record<string, unknown>;
  if (typeof value.code !== 'string' || value.code.trim().length === 0) {
    return null;
  }

  return {
    code: value.code,
    ruleProfile: typeof value.ruleProfile === 'string' ? value.ruleProfile : 'default',
  };
}
