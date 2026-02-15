import { responseFormatter } from '../utils/responseFormatter.ts';

export function healthRoute() {
  return {
    status: 200,
    payload: responseFormatter({
      status: 'ok',
      services: {
        api: 'up',
        model: 'not-configured',
      },
    }),
  };
}
