import type { GenerateSnippetRequest } from '../schemas/generate.schema.ts';

const snippets: Record<string, string> = {
  'db-insert': `CREATE COMPUTE MODULE InsertCustomer
  CREATE FUNCTION Main() RETURNS BOOLEAN
  BEGIN
    INSERT INTO Database.Customer (id, name) VALUES (InputRoot.JSON.Data.id, InputRoot.JSON.Data.name);
    RETURN TRUE;
  END;
END MODULE;`,
  'db-update': `CREATE COMPUTE MODULE UpdateCustomer
  CREATE FUNCTION Main() RETURNS BOOLEAN
  BEGIN
    UPDATE Database.Customer SET name = InputRoot.JSON.Data.name WHERE id = InputRoot.JSON.Data.id;
    RETURN TRUE;
  END;
END MODULE;`,
  'exception-handler': `DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
BEGIN
  -- Add rollback/logging here
END;`,
  'json-transform': `SET OutputRoot.JSON.Data.customerId = InputRoot.JSON.Data.id;
SET OutputRoot.JSON.Data.customerName = InputRoot.JSON.Data.name;`,
};

export function buildSnippetResponse(input: GenerateSnippetRequest) {
  const snippet = snippets[input.useCase] ?? snippets['json-transform'];

  return {
    snippet,
    explanation: ['Generated from curated starter template', `Use case: ${input.useCase}`],
    assumptions: ['Input message tree follows expected JSON structure'],
  };
}
