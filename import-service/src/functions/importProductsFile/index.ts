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
        authorizer: {
          arn: '${cf:authorization-service-dev.authFunction}',
          name: 'basicAuthorizer',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token'
        },
      }
    }
  ]
}
