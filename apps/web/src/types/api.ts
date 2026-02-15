export type Severity = 'low' | 'medium' | 'high';

export type ValidationIssue = {
  rule: string;
  severity: Severity;
  message: string;
  line: number;
  suggestion: string;
};

export type ValidateEsqlRequest = {
  code: string;
  ruleProfile?: string;
};

export type ValidateEsqlResponse = {
  valid: boolean;
  issues: ValidationIssue[];
};

export type ApiEnvelope<T> = {
  data: T;
  meta?: {
    requestId?: string;
    timestamp?: string;
  };
  errors?: string[];
};

export type HealthResponse = {
  status: 'ok' | 'error';
  services?: Record<string, string>;
};
