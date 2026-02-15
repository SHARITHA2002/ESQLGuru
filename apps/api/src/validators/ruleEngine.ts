import { exceptionHandlingRule } from './rules/exceptionHandlingRule.ts';
import { hardcodedValuesRule } from './rules/hardcodedValuesRule.ts';
import { namingRule, type RuleResult } from './rules/namingRule.ts';
import { sqlSafetyRule } from './rules/sqlSafetyRule.ts';

export function runRules(code: string): RuleResult[] {
  return [
    ...namingRule(code),
    ...exceptionHandlingRule(code),
    ...hardcodedValuesRule(code),
    ...sqlSafetyRule(code),
  ];
}
