import { runRules } from '../validators/ruleEngine.ts';

export function validateEsql(code: string) {
  const issues = runRules(code);

  return {
    valid: issues.length === 0,
    issues,
  };
}
