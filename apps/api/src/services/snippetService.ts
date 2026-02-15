import type { GenerateSnippetRequest } from '../schemas/generate.schema.ts';

const snippets: Record<string, string> = {
  'db-insert': `CREATE COMPUTE MODULE InsertCustomer\n  CREATE FUNCTION Main() RETURNS BOOLEAN\n  BEGIN\n    INSERT INTO Database.Customer (id, name) VALUES (InputRoot.JSON.Data.id, InputRoot.JSON.Data.name);\n    RETURN TRUE;\n  END;\nEND MODULE;`,
  'db-update': `CREATE COMPUTE MODULE UpdateCustomer\n  CREATE FUNCTION Main() RETURNS BOOLEAN\n  BEGIN\n    UPDATE Database.Customer SET name = InputRoot.JSON.Data.name WHERE id = InputRoot.JSON.Data.id;\n    RETURN TRUE;\n  END;\nEND MODULE;`,
  'exception-handler': `DECLARE CONTINUE HANDLER FOR SQLEXCEPTION\nBEGIN\n  -- Add rollback/logging here\nEND;`,
  'json-transform': `SET OutputRoot.JSON.Data.customerId = InputRoot.JSON.Data.id;\nSET OutputRoot.JSON.Data.customerName = InputRoot.JSON.Data.name;`,
};

export function buildSnippetResponse(input: GenerateSnippetRequest) {
  const snippet = snippets[input.useCase] ?? snippets['json-transform'];

  return {
    snippet,
    explanation: ['Generated from curated starter template', `Use case: ${input.useCase}`],
    assumptions: ['Input message tree follows expected JSON structure'],
  };
}
