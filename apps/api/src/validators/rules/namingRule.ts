export type RuleResult = {
  rule: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  line: number;
  suggestion: string;
};

export function namingRule(code: string): RuleResult[] {
  const issues: RuleResult[] = [];
  const lines = code.split('\n');

  lines.forEach((line, index) => {
    if (line.includes('CREATE COMPUTE MODULE')) {
      const moduleName = line.trim().split(/\s+/).at(-1);
      if (moduleName && /[^A-Za-z0-9_]/.test(moduleName)) {
        issues.push({
          rule: 'naming-convention',
          severity: 'medium',
          message: 'Module name should only use letters, numbers, and underscores.',
          line: index + 1,
          suggestion: 'Rename the module to a snake_case or PascalCase safe identifier.',
        });
      }
    }
  });

  return issues;
}
