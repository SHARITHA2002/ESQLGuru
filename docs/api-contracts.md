# API Contracts

The API should use a consistent envelope:

```json
{
  "data": {},
  "meta": {
    "requestId": "string",
    "timestamp": "ISO-8601"
  },
  "errors": []
}
```

## `POST /generate-snippet`

### Request
```json
{
  "useCase": "db-insert",
  "context": {
    "aceVersion": "12",
    "inputFormat": "JSON",
    "outputFormat": "XML"
  }
}
```

### Response (`data`)
```json
{
  "snippet": "CREATE COMPUTE MODULE ...",
  "explanation": [
    "Sets output root",
    "Maps required fields"
  ],
  "assumptions": [
    "Input JSON fields exist"
  ]
}
```

## `POST /validate-esql`

### Request
```json
{
  "code": "CREATE COMPUTE MODULE ...",
  "ruleProfile": "default"
}
```

### Response (`data`)
```json
{
  "valid": false,
  "issues": [
    {
      "rule": "exception-handling",
      "severity": "high",
      "message": "Missing exception handler",
      "line": 22,
      "suggestion": "Add a handler block with rollback/logging"
    }
  ]
}
```

## `POST /review-esql`

### Request
```json
{
  "code": "CREATE COMPUTE MODULE ...",
  "focus": ["performance", "maintainability"]
}
```

### Response (`data`)
```json
{
  "summary": "Code is functional but needs stronger error handling",
  "findings": [
    {
      "category": "maintainability",
      "severity": "medium",
      "comment": "Repeated mapping logic should be extracted"
    }
  ],
  "suggestedRefactor": "CREATE FUNCTION mapCustomer() ..."
}
```

## `GET /health`

### Response (`data`)
```json
{
  "status": "ok",
  "services": {
    "api": "up",
    "model": "configured"
  }
}
```
