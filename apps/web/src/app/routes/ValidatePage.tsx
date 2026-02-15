import { useMemo, useState } from 'react';
import EsqlEditor from '../../components/EsqlEditor';
import RuleViolationTable from '../../components/RuleViolationTable';
import { apiClient } from '../../services/apiClient';
import type { ValidationIssue } from '../../types/api';

const starterCode = `CREATE COMPUTE MODULE CustomerFlow
CREATE FUNCTION Main() RETURNS BOOLEAN
BEGIN
  SET Environment.Variables.PASSWORD = 'secret123';
  SET OutputRoot.XMLNSC.Data.Value = PASSTHRU('SELECT * FROM T WHERE ID=' || InputRoot.JSON.Data.id);
  RETURN TRUE;
END;
END MODULE;`;

export default function ValidatePage() {
  const [code, setCode] = useState(starterCode);
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(() => {
    if (issues.length === 0) {
      return 'No issues yet. Run validation to see results.';
    }

    const highCount = issues.filter((item) => item.severity === 'high').length;
    return `${issues.length} issue(s) found, ${highCount} high severity.`;
  }, [issues]);

  async function onValidate() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.validateEsql({ code, ruleProfile: 'default' });
      setIssues(response.data.issues);
    } catch (validationError) {
      setError(
        validationError instanceof Error
          ? validationError.message
          : 'Failed to validate code. Ensure API server is running.',
      );
      setIssues([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section style={{ display: 'grid', gap: '1rem' }}>
      <h2>Validate ESQL code</h2>
      <EsqlEditor value={code} onChange={setCode} />
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button type="button" onClick={onValidate} disabled={isLoading}>
          {isLoading ? 'Validating…' : 'Run validation'}
        </button>
        <span>{summary}</span>
      </div>
      {error ? <p style={{ color: '#b42318' }}>{error}</p> : null}
      <RuleViolationTable issues={issues} />
    </section>
  );
}
