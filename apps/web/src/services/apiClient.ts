import type {
  ApiEnvelope,
  HealthResponse,
  ValidateEsqlRequest,
  ValidateEsqlResponse,
} from '../types/api';

const API_BASE_URL = 'http://localhost:3000';

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export const apiClient = {
  health: async (): Promise<ApiEnvelope<HealthResponse>> => requestJson('/health'),

  validateEsql: async (
    payload: ValidateEsqlRequest,
  ): Promise<ApiEnvelope<ValidateEsqlResponse>> =>
    requestJson('/validate-esql', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
