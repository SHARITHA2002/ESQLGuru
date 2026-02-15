import type { RuleResult } from './namingRule.ts';

export function exceptionHandlingRule(code: string): RuleResult[] {
  const normalized = code.toUpperCase();
  if (normalized.includes('BEGIN') && !normalized.includes('HANDLER')) {
    return [
      {
        rule: 'exception-handling',
        severity: 'high',
        message: 'BEGIN block found without a matching handler definition.',
        line: 1,
        suggestion: 'Add a DECLARE ... HANDLER block for SQL and user exceptions.',
      },
    ];
  }

  return [];
}
