import type { ValidationIssue } from '../types/api';

type RuleViolationTableProps = {
  issues: ValidationIssue[];
};

const severityColor: Record<ValidationIssue['severity'], string> = {
  high: '#b42318',
  medium: '#b54708',
  low: '#175cd3',
};

export default function RuleViolationTable({ issues }: RuleViolationTableProps) {
  if (issues.length === 0) {
    return <p>No rule violations found.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left' }}>Rule</th>
          <th style={{ textAlign: 'left' }}>Severity</th>
          <th style={{ textAlign: 'left' }}>Line</th>
          <th style={{ textAlign: 'left' }}>Message</th>
          <th style={{ textAlign: 'left' }}>Suggestion</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr key={`${issue.rule}-${issue.line}-${issue.message}`}>
            <td>{issue.rule}</td>
            <td>
              <span
                style={{
                  color: '#fff',
                  backgroundColor: severityColor[issue.severity],
                  borderRadius: '12px',
                  padding: '0.1rem 0.5rem',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                }}
              >
                {issue.severity}
              </span>
            </td>
            <td>{issue.line}</td>
            <td>{issue.message}</td>
            <td>{issue.suggestion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
