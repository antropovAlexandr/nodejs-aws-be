import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.importProductsFile`,
  events: [
    {
      http: {
        method: 'get',
        cors: true,
        path: 'import',
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        },
      }
    }
  ]
}
