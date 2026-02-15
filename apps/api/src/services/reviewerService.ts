import { validateEsql } from './validatorService.ts';

export function reviewEsql(code: string, focus: string[]) {
  const validation = validateEsql(code);

  const findings = validation.issues.map((issue) => ({
    category: focus.includes('performance') ? 'performance' : 'maintainability',
    severity: issue.severity,
    comment: `${issue.message} ${issue.suggestion}`,
  }));

  return {
    summary: validation.valid
      ? 'No critical issues found by deterministic checks.'
      : 'Code is functional but has rule violations to address.',
    findings,
    suggestedRefactor:
      'Extract repeated mapping into helper functions and add explicit exception handlers around database operations.',
  };
}
