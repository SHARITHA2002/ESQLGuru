import { parseReviewEsqlRequest } from '../schemas/review.schema.ts';
import { reviewEsql } from '../services/reviewerService.ts';
import { responseFormatter } from '../utils/responseFormatter.ts';

export function reviewRoute(body: unknown) {
  const parsed = parseReviewEsqlRequest(body);
  if (!parsed) {
    return { status: 400, payload: { data: null, errors: ['Invalid review-esql request payload.'] } };
  }

  return { status: 200, payload: responseFormatter(reviewEsql(parsed.code, parsed.focus ?? [])) };
}
