import assert from 'node:assert/strict';
import test from 'node:test';
import { validateEsql } from '../src/services/validatorService.ts';

test('validateEsql flags missing handler in BEGIN block', () => {
  const code = `CREATE COMPUTE MODULE CustomerFlow\nCREATE FUNCTION Main() RETURNS BOOLEAN\nBEGIN\n  RETURN TRUE;\nEND;\nEND MODULE;`;
  const result = validateEsql(code);
  assert.equal(result.valid, false);
  assert.equal(result.issues.some((issue) => issue.rule === 'exception-handling'), true);
});

test('detects dynamic SQL concatenation risk', () => {
  const code = `SET OutputRoot.XMLNSC.Data.Value = PASSTHRU('SELECT * FROM T WHERE ID=' || InputRoot.JSON.Data.id);`;
  const result = validateEsql(code);
  assert.equal(result.issues.some((issue) => issue.rule === 'sql-safety'), true);
});

test('detects hardcoded secrets', () => {
  const code = `SET Environment.Variables.PASSWORD = 'supersecret';`;
  const result = validateEsql(code);
  assert.equal(result.issues.some((issue) => issue.rule === 'hardcoded-values'), true);
});
