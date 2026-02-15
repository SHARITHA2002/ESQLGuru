export type GenerateSnippetRequest = {
  useCase: string;
  context?: {
    aceVersion?: string;
    inputFormat?: string;
    outputFormat?: string;
  };
};

export function parseGenerateSnippetRequest(body: unknown): GenerateSnippetRequest | null {
  if (!body || typeof body !== 'object') {
    return null;
  }

  const value = body as Record<string, unknown>;
  if (typeof value.useCase !== 'string' || value.useCase.trim().length < 2) {
    return null;
  }

  return { useCase: value.useCase, context: value.context as GenerateSnippetRequest['context'] };
}
