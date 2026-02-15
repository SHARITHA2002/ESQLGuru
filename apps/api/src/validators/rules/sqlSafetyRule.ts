import type { RuleResult } from './namingRule.ts';

export function sqlSafetyRule(code: string): RuleResult[] {
  const issues: RuleResult[] = [];

  code.split('\n').forEach((line, index) => {
    const normalized = line.toUpperCase();
    if (normalized.includes('PASSTHRU') && normalized.includes('||')) {
      issues.push({
        rule: 'sql-safety',
        severity: 'high',
        message: 'Dynamic SQL concatenation detected in PASSTHRU statement.',
        line: index + 1,
        suggestion: 'Use parameterized PASSTHRU placeholders instead of string concatenation.',
      });
    }
  });

  return issues;
}
