import { randomUUID } from 'node:crypto';

export function responseFormatter<T>(payload: T) {
  return {
    data: payload,
    meta: {
      requestId: randomUUID(),
      timestamp: new Date().toISOString(),
    },
    errors: [],
  };
}
