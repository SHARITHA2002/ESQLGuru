import { createServer } from 'node:http';
import { env } from './config/env.ts';
import { generateRoute } from './routes/generate.ts';
import { healthRoute } from './routes/health.ts';
import { reviewRoute } from './routes/review.ts';
import { validateRoute } from './routes/validate.ts';
import { logger } from './utils/logger.ts';

type Handler = (body: unknown) => { status: number; payload: unknown };

const routes: Record<string, Handler> = {
  'GET /health': () => healthRoute(),
  'POST /generate-snippet': generateRoute,
  'POST /validate-esql': validateRoute,
  'POST /review-esql': reviewRoute,
};

const server = createServer(async (req, res) => {
  const key = `${req.method ?? 'GET'} ${req.url ?? '/'}`;
  const handler = routes[key];

  if (!handler) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  let rawBody = '';
  for await (const chunk of req) {
    rawBody += chunk;
  }

  let body: unknown = {};
  if (rawBody) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      return;
    }
  }

  const result = handler(body);
  res.writeHead(result.status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(result.payload));
});

server.listen(env.PORT, () => {
  logger(`Server running on http://localhost:${env.PORT}`);
});
