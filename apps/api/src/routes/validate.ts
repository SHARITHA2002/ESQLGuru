import { parseValidateEsqlRequest } from '../schemas/validate.schema.ts';
import { validateEsql } from '../services/validatorService.ts';
import { responseFormatter } from '../utils/responseFormatter.ts';

export function validateRoute(body: unknown) {
  const parsed = parseValidateEsqlRequest(body);
  if (!parsed) {
    return { status: 400, payload: { data: null, errors: ['Invalid validate-esql request payload.'] } };
  }

  return { status: 200, payload: responseFormatter(validateEsql(parsed.code)) };
}
