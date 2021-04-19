import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        cors: true,
        path: 'products',
        documentation: {
          summary: "List of products",
          description: "Return list ol products",
        }
      }
    }
  ]
}
