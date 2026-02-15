import { parseGenerateSnippetRequest } from '../schemas/generate.schema.ts';
import { buildSnippetResponse } from '../services/snippetService.ts';
import { responseFormatter } from '../utils/responseFormatter.ts';

export function generateRoute(body: unknown) {
  const parsed = parseGenerateSnippetRequest(body);
  if (!parsed) {
    return { status: 400, payload: { data: null, errors: ['Invalid generate-snippet request payload.'] } };
  }

  return { status: 200, payload: responseFormatter(buildSnippetResponse(parsed)) };
}
