import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductsById`,
  events: [
    {
      http: {
        method: 'get',
        cors: true,
        path: 'products/{productId}',
        request: {
          parameters: {
            paths: {
              productId: true
            }
          }
        },
        documentation: {
          summary: "Product",
          description: "Return product by id",
          pathParams: {
            name: 'productId',
            description: 'Product id for search product',
            schema: {
              type: 'string'
            }
          }
        },
      }
    }
  ]
}
