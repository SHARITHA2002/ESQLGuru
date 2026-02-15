import type { RuleResult } from './namingRule.ts';

const hardcodedPattern = /(PASSWORD|TOKEN|SECRET)\s*=\s*['\"][^'\"]+['\"]/i;

export function hardcodedValuesRule(code: string): RuleResult[] {
  const issues: RuleResult[] = [];

  code.split('\n').forEach((line, index) => {
    if (hardcodedPattern.test(line)) {
      issues.push({
        rule: 'hardcoded-values',
        severity: 'high',
        message: 'Potential hardcoded secret detected.',
        line: index + 1,
        suggestion: 'Move credentials/secrets to ACE policy or environment configuration.',
      });
    }
  });

  return issues;
}
