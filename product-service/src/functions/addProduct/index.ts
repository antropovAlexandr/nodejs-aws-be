import { handlerPath } from '@libs/handlerResolver';

import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        cors: true,
        path: 'products',
        request: {
          schemas: {
            "application/json": schema,
          }
        },
        documentation: {
          summary: "Add products",
          description: "Add new products",
        }
      }
    }
  ]
}
